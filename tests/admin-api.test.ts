// Admin API tests: authentication/authorization and attribution fields.
// Run: npm test (needs --experimental-test-module-mocks, set in package.json).
//
// Isolated: Better Auth and next/headers are replaced with module mocks, and
// Prisma with an in-memory stand-in (src/lib/prisma.ts uses globalThis.prisma
// outside production). No database, session store or network is touched.

import { before, beforeEach, describe, mock, test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { describeLeadAttribution, LEGACY_ATTRIBUTION_LABEL } from "../src/lib/lead-attribution";

delete process.env.DATABASE_URL;

type Session = { user: { role?: string | null; banned?: boolean | null } } | null;
let currentSession: Session = null;

mock.module(pathToFileURL(path.resolve("src/lib/auth.ts")).href, {
  namedExports: {
    auth: { api: { getSession: async () => currentSession } },
  },
});
mock.module("next/headers", {
  namedExports: { headers: async () => new Headers() },
});

const LEGACY_ADMISSION = {
  id: "legacy-1",
  fullName: "Old Lead",
  source: "FOSTIIMA Website",
  status: "NEW",
  createdAt: new Date("2026-11-01T10:00:00Z"),
  utmSource: null, utmMedium: null, utmCampaign: null, utmTerm: null, utmContent: null,
  gclid: null, gbraid: null, wbraid: null, fbclid: null,
  landingPage: null, referrer: null, firstTouchAt: null,
};

const NEW_ADMISSION = {
  ...LEGACY_ADMISSION,
  id: "new-1",
  source: "ChatGPT",
  utmSource: "chatgpt.com",
  utmMedium: "paid",
  landingPage: "/pgdm-admission",
  firstTouchAt: new Date("2026-11-14T09:00:00Z"),
};

let lastAdmissionSelect: Record<string, unknown> | undefined;
let contactRows: Record<string, unknown>[] = [];

(globalThis as unknown as { prisma: unknown }).prisma = {
  admissionEnquiry: {
    async findMany(args: { select?: Record<string, unknown> }) {
      lastAdmissionSelect = args.select;
      return [NEW_ADMISSION, LEGACY_ADMISSION];
    },
    async count() {
      return 2;
    },
    async groupBy() {
      return [{ status: "NEW", _count: { _all: 2 } }];
    },
  },
  contactEnquiry: {
    async findMany() {
      return contactRows;
    },
    async count() {
      return contactRows.length;
    },
  },
};

type GetRoute = { GET: (request: Request) => Promise<Response> };
let admissionAdmin: GetRoute;
let contactAdmin: { GET: () => Promise<Response> };

before(async () => {
  admissionAdmin = await import("../src/app/api/admin/admission-enquiries/route");
  contactAdmin = await import("../src/app/api/admin/contact-enquiries/route");
});

beforeEach(() => {
  currentSession = null;
  lastAdmissionSelect = undefined;
  contactRows = [];
});

const listRequest = () => new Request("http://localhost/api/admin/admission-enquiries");

describe("Admin authentication", () => {
  const denied: [string, Session][] = [
    ["no session", null],
    ["non-admin user", { user: { role: "user" } }],
    ["banned admin", { user: { role: "admin", banned: true } }],
  ];

  for (const [name, session] of denied) {
    test(`admission enquiries: ${name} -> 401, no data`, async () => {
      currentSession = session;
      const response = await admissionAdmin.GET(listRequest());
      assert.equal(response.status, 401);
      assert.equal((await response.json()).enquiries, undefined);
    });

    test(`contact enquiries: ${name} -> 401, no data`, async () => {
      currentSession = session;
      contactRows = [{ id: "c1", name: "Someone" }];
      const response = await contactAdmin.GET();
      assert.equal(response.status, 401);
      assert.equal((await response.json()).enquiries, undefined);
    });
  }

  test("admin -> 200", async () => {
    currentSession = { user: { role: "admin", banned: false } };
    assert.equal((await admissionAdmin.GET(listRequest())).status, 200);
    assert.equal((await contactAdmin.GET()).status, 200);
  });
});

describe("Admin attribution data", () => {
  beforeEach(() => {
    currentSession = { user: { role: "admin" } };
  });

  test("admission list selects every attribution column", async () => {
    await admissionAdmin.GET(listRequest());
    for (const field of [
      "source", "utmSource", "utmMedium", "utmCampaign", "utmTerm", "utmContent",
      "gclid", "gbraid", "wbraid", "fbclid", "landingPage", "referrer", "firstTouchAt",
    ]) {
      assert.equal(lastAdmissionSelect?.[field], true, field);
    }
  });

  test("existing filters and pagination still work", async () => {
    const response = await admissionAdmin.GET(
      new Request("http://localhost/api/admin/admission-enquiries?status=NEW&page=2&search=delhi"),
    );
    const json = await response.json();
    assert.equal(response.status, 200);
    assert.equal(json.pagination.page, 2);
    assert.equal(json.counts.NEW, 2);

    const invalid = await admissionAdmin.GET(
      new Request("http://localhost/api/admin/admission-enquiries?status=BOGUS"),
    );
    assert.equal(invalid.status, 400);
  });

  test("API output feeds the panel: new lead shows its label, legacy lead is not reclassified", async () => {
    const json = await (await admissionAdmin.GET(listRequest())).json();
    const [fresh, legacy] = json.enquiries.map(describeLeadAttribution);

    assert.equal(fresh.legacy, false);
    assert.equal(fresh.sourceLabel, "ChatGPT");
    assert.equal(fresh.firstTouchAt, "2026-11-14T09:00:00.000Z");

    assert.equal(legacy.legacy, true);
    assert.equal(legacy.sourceLabel, LEGACY_ATTRIBUTION_LABEL);
    assert.equal(legacy.storedSource, "FOSTIIMA Website");
  });

  test("contact list returns attribution columns; legacy rows have null source", async () => {
    contactRows = [
      { id: "c-new", source: "Google Ads", gclid: "Cj0KCQiA_test-gclid_1234567890", landingPage: "/contact-us", firstTouchAt: "2026-11-14T09:00:00.000Z" },
      { id: "c-old", source: null, landingPage: null, firstTouchAt: null },
    ];
    const json = await (await contactAdmin.GET()).json();
    const [fresh, legacy] = json.enquiries.map(describeLeadAttribution);
    assert.equal(fresh.sourceLabel, "Google Ads");
    assert.equal(fresh.rows.find((row: { label: string }) => row.label === "Click IDs")?.value, "gclid: Cj0KCQiA_test-gclid_1234567890");
    assert.equal(legacy.sourceLabel, LEGACY_ATTRIBUTION_LABEL);
    assert.equal(legacy.storedSource, null);
  });
});
