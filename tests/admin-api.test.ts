// Admin API tests: authentication/authorization and the selected lead fields.
// Run: npm test (needs --experimental-test-module-mocks, set in package.json).
//
// Isolated: Better Auth and next/headers are replaced with module mocks, and
// Prisma with an in-memory stand-in (src/lib/prisma.ts uses globalThis.prisma
// outside production). No database, session store or network is touched.

import { before, beforeEach, describe, mock, test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

delete process.env.DATABASE_URL;

// Not in the production database yet (removed from prisma/schema.prisma).
const ATTRIBUTION_FIELDS = [
  "utmSource", "utmMedium", "utmCampaign", "utmTerm", "utmContent",
  "gclid", "gbraid", "wbraid", "fbclid", "landingPage", "referrer", "firstTouchAt",
];

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
};

const NEW_ADMISSION = {
  ...LEGACY_ADMISSION,
  id: "new-1",
  source: "ChatGPT",
  createdAt: new Date("2026-11-14T09:00:00Z"),
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

describe("Admin lead data", () => {
  beforeEach(() => {
    currentSession = { user: { role: "admin" } };
  });

  test("admission list selects source and no attribution column", async () => {
    await admissionAdmin.GET(listRequest());
    assert.equal(lastAdmissionSelect?.source, true);
    for (const field of ATTRIBUTION_FIELDS) {
      assert.equal(lastAdmissionSelect?.[field], undefined, field);
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

  test("admission list returns each stored source label unchanged", async () => {
    const json = await (await admissionAdmin.GET(listRequest())).json();
    assert.deepEqual(
      json.enquiries.map((row: { source: string }) => row.source),
      ["ChatGPT", "FOSTIIMA Website"],
    );
  });

  test("contact list returns the stored rows", async () => {
    contactRows = [
      { id: "c-new", name: "New Contact", status: "NEW" },
      { id: "c-old", name: "Old Contact", status: "REPLIED" },
    ];
    const json = await (await contactAdmin.GET()).json();
    assert.deepEqual(
      json.enquiries.map((row: { id: string }) => row.id),
      ["c-new", "c-old"],
    );
  });
});
