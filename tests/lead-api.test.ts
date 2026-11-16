// API route tests with an in-memory Prisma stand-in. Run: npm test
//
// src/lib/prisma.ts uses globalThis.prisma when it is set outside production,
// so a fake client is installed BEFORE the routes are imported. Email and
// Turnstile environment variables are cleared, so nothing leaves the machine:
// no database connection, no Resend email, no Turnstile call.

import { before, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";

for (const key of [
  "DATABASE_URL",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "ADMISSIONS_EMAIL",
  "CONTACT_EMAIL",
  "TURNSTILE_SECRET_KEY",
]) {
  delete process.env[key];
}

type Row = Record<string, unknown>;
const created: { model: string; data: Row }[] = [];
let failNextCreate = false;

function fakeModel(model: string) {
  return {
    async create({ data }: { data: Row }) {
      if (failNextCreate) {
        failNextCreate = false;
        throw new Error("simulated database failure");
      }
      created.push({ model, data });
      return { id: `${model}-${created.length}`, createdAt: new Date(), ...data };
    },
    async update() {
      return {};
    },
  };
}

(globalThis as unknown as { prisma: unknown }).prisma = {
  admissionEnquiry: fakeModel("admissionEnquiry"),
  contactEnquiry: fakeModel("contactEnquiry"),
};

type RouteModule = { POST: (request: Request) => Promise<Response> };
let admissionRoute: RouteModule;
let contactRoute: RouteModule;

before(async () => {
  admissionRoute = await import("../src/app/api/admission-enquiries/route");
  contactRoute = await import("../src/app/api/contact/route");
});

beforeEach(() => {
  created.length = 0;
  failNextCreate = false;
});

const GCLID = "Cj0KCQiA_test-gclid_1234567890";
const FBCLID = "IwAR0_test-fbclid_1234567890";

// Attribution columns are not in the production database yet (they were
// removed from prisma/schema.prisma), so no route may write them.
const ATTRIBUTION_FIELDS = [
  "utmSource", "utmMedium", "utmCampaign", "utmTerm", "utmContent",
  "gclid", "gbraid", "wbraid", "fbclid", "landingPage", "referrer", "firstTouchAt",
] as const;

// The columns each table has (prisma/schema.prisma). A create may only use these.
const ADMISSION_COLUMNS = new Set([
  "fullName", "mobile", "email", "state", "city", "course", "graduationStatus",
  "remarks", "consent", "source", "status", "emailSent",
]);
const CONTACT_COLUMNS = new Set([
  "name", "email", "phone", "subject", "message", "status", "emailSent",
]);

function unknownColumns(data: Row, columns: Set<string>): string[] {
  return Object.keys(data).filter((key) => !columns.has(key));
}

function post(body: unknown): Request {
  return new Request("http://localhost/api/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const admission = {
  fullName: "Test Student",
  mobile: "9876543210",
  email: "test.student@example.com",
  state: "Delhi",
  city: "New Delhi",
  course: "PGDM",
  graduationStatus: "Graduated",
  remarks: "",
  consent: true,
};

const contact = {
  name: "Test Student",
  email: "test.student@example.com",
  phone: "9876543210",
  subject: "Admissions",
  message: "Please call me about the PGDM programme.",
};

describe("POST /api/admission-enquiries", () => {
  test("scenario 14: ChatGPT attribution is classified and saved as the source", async () => {
    const response = await admissionRoute.POST(
      post({ ...admission, attribution: { utm_source: "chatgpt.com", utm_medium: "paid", landing_page: "/pgdm-admission" } }),
    );
    const json = await response.json();
    assert.equal(response.status, 201);
    assert.equal(json.success, true);
    assert.equal(created.length, 1);
    assert.equal(created[0].data.source, "ChatGPT");
  });

  test("Google Ads gclid and other campaigns are classified server-side", async () => {
    await admissionRoute.POST(post({ ...admission, attribution: { gclid: "Cj0KCQiA_test-gclid_1234567890" } }));
    await admissionRoute.POST(post({ ...admission, attribution: { utm_source: "newsletter", utm_medium: "email" } }));
    assert.deepEqual(
      created.map((row) => row.data.source),
      ["Google Ads", "Other campaign source: newsletter / email"],
    );
  });

  test("full attribution: saves the source label only, never the attribution columns", async () => {
    await admissionRoute.POST(
      post({
        ...admission,
        attribution: {
          utm_source: "Google",
          utm_medium: "CPC",
          utm_campaign: "PGDM 2026",
          utm_term: "mba delhi",
          utm_content: "ad_1",
          gclid: GCLID,
          gbraid: GCLID,
          wbraid: GCLID,
          landing_page: "/programs/pgdm?utm_source=google",
          referrer: "https://www.google.com/search?q=private",
          first_touch_at: "2026-11-10T08:00:00.000Z",
          unknown_field: "ignored",
        },
      }),
    );
    const data = created[0].data;
    assert.equal(data.source, "Google Ads");
    assert.deepEqual(unknownColumns(data, ADMISSION_COLUMNS), []);
    assert.ok(ATTRIBUTION_FIELDS.every((field) => !(field in data)));
    assert.equal("unknown_field" in data, false);
  });

  test("no attribution (old browser tab / direct) -> FOSTIIMA Website, existing columns only", async () => {
    await admissionRoute.POST(post(admission));
    assert.equal(created[0].data.source, "FOSTIIMA Website");
    assert.deepEqual(unknownColumns(created[0].data, ADMISSION_COLUMNS), []);
  });

  test("personal data inside attribution is not persisted", async () => {
    await admissionRoute.POST(
      post({ ...admission, attribution: { utm_source: "chatgpt", utm_content: "test.student@example.com", utm_term: "9876543210" } }),
    );
    const data = created[0].data;
    assert.equal(data.source, "ChatGPT");
    assert.deepEqual(unknownColumns(data, ADMISSION_COLUMNS), []);
  });

  test("a forged body.source label is ignored", async () => {
    await admissionRoute.POST(post({ ...admission, source: "ChatGPT" }));
    assert.equal(created[0].data.source, "FOSTIIMA Website");
  });

  test("scenario 15: validation failure creates no lead and returns success:false", async () => {
    const response = await admissionRoute.POST(post({ ...admission, mobile: "123", attribution: { utm_source: "chatgpt" } }));
    const json = await response.json();
    assert.equal(response.status, 400);
    assert.equal(json.success, false);
    assert.equal(created.length, 0);
  });

  test("database failure returns 500 and success:false (form stays put)", async () => {
    failNextCreate = true;
    const response = await admissionRoute.POST(post(admission));
    assert.equal(response.status, 500);
    assert.equal((await response.json()).success, false);
  });
});

describe("POST /api/contact", () => {
  test("scenario 18: contact enquiry with full attribution writes no source or attribution columns", async () => {
    const response = await contactRoute.POST(
      post({
        ...contact,
        attribution: {
          utm_source: "facebook",
          utm_medium: "paid",
          utm_campaign: "pgdm_nov",
          utm_term: "mba",
          utm_content: "carousel_1",
          fbclid: FBCLID,
          landing_page: "/contact-us?x=1",
          referrer: "https://l.facebook.com/l.php?u=private",
          first_touch_at: "2026-11-10T08:00:00.000Z",
        },
      }),
    );
    const json = await response.json();
    assert.equal(response.status, 200);
    assert.equal(json.success, true);
    assert.equal(created.length, 1);
    assert.equal("source" in created[0].data, false);
    assert.deepEqual(unknownColumns(created[0].data, CONTACT_COLUMNS), []);
  });

  test("contact without attribution: existing columns only", async () => {
    await contactRoute.POST(post(contact));
    assert.deepEqual(unknownColumns(created[0].data, CONTACT_COLUMNS), []);
  });

  test("contact: a forged source label is never written", async () => {
    await contactRoute.POST(post({ ...contact, source: "Google Ads", attribution: { label: "Google Ads" } }));
    assert.equal("source" in created[0].data, false);
  });

  test("malformed attribution never breaks a contact enquiry", async () => {
    const response = await contactRoute.POST(post({ ...contact, attribution: "<script>" }));
    assert.equal((await response.json()).success, true);
    assert.deepEqual(unknownColumns(created[0].data, CONTACT_COLUMNS), []);
  });

  test("contact: database failure returns 500 and success:false", async () => {
    failNextCreate = true;
    const response = await contactRoute.POST(post(contact));
    assert.equal(response.status, 500);
    assert.equal((await response.json()).success, false);
  });

  test("validation failure creates no record", async () => {
    const response = await contactRoute.POST(post({ ...contact, email: "not-an-email" }));
    assert.equal(response.status, 400);
    assert.equal(created.length, 0);
  });
});
