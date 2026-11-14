// Admin display rules, DB column mapping, duplicate-submission guard and GTM
// privacy. Run: npm test

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import {
  LEGACY_ATTRIBUTION_LABEL,
  attributionColumns,
  describeLeadAttribution,
  parseAttribution,
} from "../src/lib/lead-attribution";
import {
  CONTACT_LEAD_EVENT,
  GENERATE_LEAD_EVENT,
  buildLeadEvent,
  isConfirmedLeadResponse,
  pushLeadEvent,
} from "../src/lib/lead-events";
import { createSubmissionGuard } from "../src/lib/submission-guard";

describe("attributionColumns", () => {
  test("maps validated attribution to Prisma columns", () => {
    const columns = attributionColumns(
      parseAttribution({ utm_source: "chatgpt", gclid: "Cj0KCQiA_test-gclid_1234567890", first_touch_at: "2026-11-10T08:00:00.000Z" }, Date.UTC(2026, 10, 14)),
    );
    assert.equal(columns.utmSource, "chatgpt");
    assert.equal(columns.gclid, "Cj0KCQiA_test-gclid_1234567890");
    assert.deepEqual(columns.firstTouchAt, new Date("2026-11-10T08:00:00.000Z"));
    assert.equal(columns.utmMedium, null);
  });

  test("null attribution -> every column null", () => {
    assert.ok(Object.values(attributionColumns(null)).every((value) => value === null));
  });
});

describe("describeLeadAttribution (Admin panel)", () => {
  test("legacy admission row: not reclassified, stored default shown separately", () => {
    const display = describeLeadAttribution({ source: "FOSTIIMA Website" });
    assert.equal(display.legacy, true);
    assert.equal(display.sourceLabel, LEGACY_ATTRIBUTION_LABEL);
    assert.equal(display.storedSource, "FOSTIIMA Website");
  });

  test("legacy row labelled by the previous implementation is still legacy", () => {
    // e.g. a "ChatGPT" lead saved between 12 and 14 Nov 2026, before columns existed
    const display = describeLeadAttribution({ source: "ChatGPT", utmSource: null, firstTouchAt: null });
    assert.equal(display.sourceLabel, LEGACY_ATTRIBUTION_LABEL);
    assert.equal(display.storedSource, "ChatGPT");
  });

  test("legacy contact row (source NULL)", () => {
    const display = describeLeadAttribution({ source: null });
    assert.equal(display.legacy, true);
    assert.equal(display.storedSource, null);
  });

  test("direct-visit lead is NOT legacy (landing page + first touch captured)", () => {
    const display = describeLeadAttribution({
      source: "FOSTIIMA Website",
      landingPage: "/fee-structure",
      firstTouchAt: "2026-11-14T09:00:00.000Z",
    });
    assert.equal(display.legacy, false);
    assert.equal(display.sourceLabel, "FOSTIIMA Website");
    assert.equal(display.rows.find((row) => row.label === "Landing page")?.value, "/fee-structure");
  });

  test("null and empty fields are handled safely", () => {
    const display = describeLeadAttribution({
      source: "Google Organic",
      referrer: "https://www.google.com",
      utmSource: "",
      utmMedium: null,
      firstTouchAt: new Date("2026-11-14T09:00:00.000Z"),
    });
    assert.equal(display.legacy, false);
    assert.equal(display.firstTouchAt, "2026-11-14T09:00:00.000Z");
    assert.equal(display.rows.find((row) => row.label === "UTM source")?.value, null);
    assert.equal(display.rows.find((row) => row.label === "Click IDs")?.value, null);
  });

  test("attribution present but no source value -> Unknown, never a guessed channel", () => {
    assert.equal(describeLeadAttribution({ source: "", utmSource: "x" }).sourceLabel, "Unknown / Unclassified");
  });

  test("lists all available click identifiers", () => {
    const display = describeLeadAttribution({ source: "Google Ads", gclid: "g1234567890", fbclid: "f1234567890" });
    assert.equal(display.rows.find((row) => row.label === "Click IDs")?.value, "gclid: g1234567890\nfbclid: f1234567890");
  });
});

describe("createSubmissionGuard (scenario 20: duplicate submissions)", () => {
  test("a second submit while one is in flight is rejected", () => {
    const guard = createSubmissionGuard();
    assert.equal(guard.tryAcquire(), true);
    assert.equal(guard.tryAcquire(), false);
    assert.equal(guard.isLocked(), true);
  });

  test("released after a failure, so the user can retry", () => {
    const guard = createSubmissionGuard();
    guard.tryAcquire();
    guard.release();
    assert.equal(guard.tryAcquire(), true);
  });

  test("simulated double click: only one request is sent", async () => {
    const guard = createSubmissionGuard();
    let requests = 0;
    const submit = async () => {
      if (!guard.tryAcquire()) return;
      requests += 1;
      await new Promise((resolve) => setTimeout(resolve, 5));
      // success: keep the lock (navigating to /thank-you)
    };
    await Promise.all([submit(), submit(), submit()]);
    assert.equal(requests, 1);
  });
});

describe("GTM lead event privacy", () => {
  test("admission: generate_lead (unchanged name) with lead_type only", () => {
    assert.deepEqual(buildLeadEvent("admission"), { event: "generate_lead", lead_type: "admission" });
    assert.equal(GENERATE_LEAD_EVENT, "generate_lead");
  });

  test("contact: its own event name, so no generate_lead tag fires on it", () => {
    assert.deepEqual(buildLeadEvent("contact"), { event: "contact_lead", lead_type: "contact" });
    assert.notEqual(CONTACT_LEAD_EVENT, GENERATE_LEAD_EVENT);
  });

  for (const leadType of ["admission", "contact"] as const) {
    test(`${leadType}: pushes exactly one event with only event + lead_type, no personal data`, () => {
      const target: { dataLayer?: unknown[] } = {};
      assert.equal(pushLeadEvent(target, leadType), true);
      assert.equal(target.dataLayer?.length, 1);
      assert.deepEqual(Object.keys(target.dataLayer?.[0] as object).sort(), ["event", "lead_type"]);
      const serialized = JSON.stringify(target.dataLayer);
      for (const forbidden of ["user_data", "sha256", "email", "phone", "mobile", "name", "utm", "gclid", "gbraid", "wbraid", "fbclid", "landing", "referrer", "@"]) {
        assert.ok(!serialized.includes(forbidden), forbidden);
      }
    });
  }

  test("appends to the existing dataLayer (GTM bootstrap stays separate)", () => {
    const bootstrap = { "gtm.start": 1, event: "gtm.js" };
    const target: { dataLayer?: unknown[] } = { dataLayer: [bootstrap] };
    pushLeadEvent(target, "admission");
    assert.deepEqual(target.dataLayer, [bootstrap, { event: "generate_lead", lead_type: "admission" }]);
  });

  test("never throws when dataLayer is broken", () => {
    const target = { dataLayer: { push() { throw new Error("broken"); } } as unknown as unknown[] };
    assert.equal(pushLeadEvent(target, "contact"), false);
  });
});

describe("isConfirmedLeadResponse (success-only lead events)", () => {
  test("confirmed only for HTTP success AND success:true", () => {
    assert.equal(isConfirmedLeadResponse(true, { success: true }), true);
    assert.equal(isConfirmedLeadResponse(true, { success: true, id: "x" }), true);
  });

  const notConfirmed: [string, boolean, unknown][] = [
    ["validation error (400 + success:false)", false, { success: false, error: "Invalid" }],
    ["API/database error (500)", false, { success: false }],
    ["HTTP 200 but success:false", true, { success: false }],
    ["HTTP 200 with success:'true' string", true, { success: "true" }],
    ["error status with success:true body", false, { success: true }],
    ["empty or unparseable body", true, null],
    ["non-object body", true, "ok"],
    ["body without success", true, {}],
  ];
  for (const [name, ok, body] of notConfirmed) {
    test(`not confirmed: ${name}`, () => {
      assert.equal(isConfirmedLeadResponse(ok, body), false);
    });
  }
});

describe("Form submit flow: lead events fire once, after success, before /thank-you", () => {
  const forms = [
    { file: "src/components/forms/AdmissionEnquiryForm.tsx", call: 'pushLeadEvent(window, "admission")' },
    { file: "src/components/forms/ContactForm.tsx", call: 'pushLeadEvent(window, "contact")' },
  ];

  for (const { file, call } of forms) {
    test(`${path.basename(file)}: exactly one lead event, between the success check and router.push`, () => {
      const text = readFileSync(path.resolve(file), "utf8");
      assert.equal(text.split("pushLeadEvent(").length - 1, 1, "one pushLeadEvent call");
      const check = text.indexOf("if (!isConfirmedLeadResponse(");
      const push = text.indexOf(call);
      const redirect = text.indexOf("router.push(thankYouPath(");
      const catchBlock = text.indexOf("} catch", push);
      assert.ok(check > 0 && push > check, "event after the confirmed-response check");
      assert.ok(redirect > push, "event before navigating to /thank-you");
      assert.ok(catchBlock > redirect, "event is inside the try block, never in the error path");
    });

    test(`${path.basename(file)}: event is not fired from an effect (no rerender duplicates)`, () => {
      const text = readFileSync(path.resolve(file), "utf8");
      const push = text.indexOf("pushLeadEvent(window");
      const handlerStart = Math.max(text.lastIndexOf("async function handleSubmit", push), text.lastIndexOf("const handleSubmit = async", push));
      const effectStart = text.lastIndexOf("useEffect(", push);
      assert.ok(handlerStart > 0, "inside the submit handler");
      assert.ok(effectStart < handlerStart, "no useEffect opens between the handler and the event");
    });
  }

  test("/thank-you sends no lead or conversion event (refresh cannot count a lead)", () => {
    const text = readFileSync(path.resolve("src/app/thank-you/page.tsx"), "utf8");
    for (const forbidden of ["pushLeadEvent", "dataLayer", "gtag", "generate_lead", "contact_lead"]) {
      assert.ok(!text.includes(forbidden), forbidden);
    }
  });

  // Source guard: no other code may push to the dataLayer or build user_data.
  function sourceFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((entry) => {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) return entry === "generated" ? [] : sourceFiles(full);
      return /\.(ts|tsx)$/.test(entry) ? [full] : [];
    });
  }

  // Approved client requirement ("Thank You DataLayer"): the admission form
  // makes exactly one extra push of { email, phone }. Every other file keeps
  // the original rule.
  const ADMISSION_FORM = "src/components/forms/AdmissionEnquiryForm.tsx";

  test("only src/lib/lead-events.ts (and the approved admission push) pushes to the dataLayer; no user_data anywhere", () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(path.resolve("src"))) {
      const text = readFileSync(file, "utf8");
      const relative = path.relative(process.cwd(), file).replace(/\\/g, "/");
      const allowedPush = relative === "src/lib/lead-events.ts" || relative === ADMISSION_FORM;
      if (/dataLayer\.push\(/.test(text) && !allowedPush) offenders.push(relative);
      if (/user_data/.test(text) && relative !== "src/lib/lead-events.ts") offenders.push(`${relative} (user_data)`);
    }
    assert.deepEqual(offenders, []);
  });

  test("admission form: exactly one dataLayer push, containing only email and phone, after success and before /thank-you", () => {
    const text = readFileSync(path.resolve(ADMISSION_FORM), "utf8");
    const pushes = [...text.matchAll(/dataLayer\.push\(\{([\s\S]*?)\}\);/g)];
    assert.equal(text.split("dataLayer.push(").length - 1, 1, "one push call");
    assert.equal(pushes.length, 1, "push of a literal object");
    const keys = [...pushes[0][1].matchAll(/^\s*([A-Za-z_$][\w$]*)\s*:/gm)].map((m) => m[1]);
    assert.deepEqual(keys, ["email", "phone"]);

    const push = pushes[0].index ?? -1;
    const check = text.indexOf("if (!isConfirmedLeadResponse(");
    const redirect = text.indexOf("router.push(thankYouPath(");
    const catchBlock = text.indexOf("} catch", push);
    const handlerStart = text.lastIndexOf("async function handleSubmit", push);
    assert.ok(check > 0 && push > check, "after the confirmed-response check");
    assert.ok(redirect > push, "before navigating to /thank-you");
    assert.ok(catchBlock > redirect, "inside the try block, never in the error path");
    assert.ok(handlerStart > 0 && text.lastIndexOf("useEffect(", push) < handlerStart, "in the submit handler, not an effect");
  });
});
