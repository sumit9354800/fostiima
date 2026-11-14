// Unit tests for src/lib/lead-attribution.ts. Run: npm test
// Browser behaviour is exercised with an in-memory window/localStorage; no
// network, database or real form submission is involved.

import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  ATTRIBUTION_STORAGE_KEY,
  ATTRIBUTION_TTL_DAYS,
  LEAD_SOURCE,
  attributionFromPageView,
  attributionSummary,
  captureAttribution,
  classifyLeadSource,
  formatLeadSource,
  parseAttribution,
  resetAttributionMemoryForTests,
  resolveLeadAttribution,
  thankYouPath,
  type LeadAttribution,
} from "../src/lib/lead-attribution";

const NOW = Date.UTC(2026, 10, 14, 10, 0, 0);
const DAY = 24 * 60 * 60 * 1000;
const GCLID = "Cj0KCQiA_test-gclid_1234567890";
const FBCLID = "IwAR0_test-fbclid_1234567890";

function classify(input: Record<string, unknown>) {
  return classifyLeadSource(parseAttribution(input, NOW));
}

// ---------------------------------------------------------------------------
// Classification and precedence
// ---------------------------------------------------------------------------

describe("classifyLeadSource", () => {
  test("ChatGPT: chatgpt / paid", () => {
    assert.equal(classify({ utm_source: "chatgpt", utm_medium: "paid" }).label, LEAD_SOURCE.CHATGPT);
  });

  test("ChatGPT: chatgpt.com with no medium (ChatGPT's own link tag)", () => {
    assert.equal(classify({ utm_source: "chatgpt.com" }).label, LEAD_SOURCE.CHATGPT);
  });

  test("ChatGPT: any medium and any case, raw values preserved", () => {
    for (const medium of ["PAID", "cpc", "paid_ads", "referral", "ai"]) {
      const attribution = parseAttribution({ utm_source: " ChatGPT ", utm_medium: medium }, NOW);
      assert.equal(classifyLeadSource(attribution).label, LEAD_SOURCE.CHATGPT, medium);
      assert.equal(attribution?.utm_source, "ChatGPT");
      assert.equal(attribution?.utm_medium, medium);
    }
  });

  test("Google Ads: google / cpc (and other paid mediums)", () => {
    for (const medium of ["cpc", "CPC", "ppc", "paid", "display"]) {
      assert.equal(classify({ utm_source: "google", utm_medium: medium }).label, LEAD_SOURCE.GOOGLE_ADS, medium);
    }
  });

  test("Google Ads: gclid alone", () => {
    assert.equal(classify({ gclid: GCLID }).label, LEAD_SOURCE.GOOGLE_ADS);
  });

  test("Google Ads: gbraid / wbraid (iOS auto-tagging)", () => {
    assert.equal(classify({ gbraid: GCLID }).label, LEAD_SOURCE.GOOGLE_ADS);
    assert.equal(classify({ wbraid: GCLID }).label, LEAD_SOURCE.GOOGLE_ADS);
  });

  test("Precedence: a Google click id overrides conflicting UTMs", () => {
    const result = classify({ utm_source: "chatgpt", utm_medium: "paid", gclid: GCLID });
    assert.equal(result.label, LEAD_SOURCE.GOOGLE_ADS);
    assert.equal(result.rule, "google-click-id");
  });

  test("Precedence: UTMs override the referrer", () => {
    assert.equal(
      classify({ utm_source: "chatgpt", utm_medium: "paid", referrer: "https://www.google.com/" }).label,
      LEAD_SOURCE.CHATGPT,
    );
  });

  test("Malformed gclid is ignored, not treated as Google Ads", () => {
    assert.equal(classify({ gclid: "x" }).label, LEAD_SOURCE.WEBSITE);
    assert.equal(classify({ gclid: "<script>alert(1)</script>" }).label, LEAD_SOURCE.WEBSITE);
  });

  test("Google Organic: Google search referrer, no paid identifiers", () => {
    for (const referrer of [
      "https://www.google.com/",
      "https://www.google.co.in/",
      "https://google.com/search?q=pgdm",
      "android-app://com.google.android.googlequicksearchbox/",
    ]) {
      assert.equal(classify({ referrer }).label, LEAD_SOURCE.GOOGLE_ORGANIC, referrer);
    }
  });

  test("Google Organic is not Google Ads, and Gmail is not Google search", () => {
    assert.notEqual(classify({ referrer: "https://www.google.com/" }).label, LEAD_SOURCE.GOOGLE_ADS);
    assert.equal(classify({ referrer: "https://mail.google.com/" }).label, LEAD_SOURCE.OTHER);
  });

  test("Google Organic: utm_source=google with organic medium", () => {
    assert.equal(classify({ utm_source: "google", utm_medium: "organic" }).label, LEAD_SOURCE.GOOGLE_ORGANIC);
  });

  test("Direct: nothing at all -> FOSTIIMA Website", () => {
    assert.equal(classifyLeadSource(null).label, LEAD_SOURCE.WEBSITE);
    assert.equal(classify({ landing_page: "/", first_touch_at: new Date(NOW).toISOString() }).label, LEAD_SOURCE.WEBSITE);
  });

  test("Direct: internal referrers are not referrals", () => {
    assert.equal(classify({ referrer: "https://www.fostiima.org/programs" }).label, LEAD_SOURCE.WEBSITE);
    assert.equal(classify({ referrer: "https://fbsapplication.extraaedge.com/" }).label, LEAD_SOURCE.WEBSITE);
  });

  test("Facebook Ads: facebook|fb with a paid medium", () => {
    for (const source of ["facebook", "Facebook", "fb"]) {
      for (const medium of ["paid", "cpc", "paid_social"]) {
        assert.equal(classify({ utm_source: source, utm_medium: medium }).label, LEAD_SOURCE.FACEBOOK_ADS, `${source}/${medium}`);
      }
    }
  });

  test("Instagram Ads: instagram|ig with a paid medium", () => {
    for (const source of ["instagram", "ig"]) {
      assert.equal(classify({ utm_source: source, utm_medium: "paid" }).label, LEAD_SOURCE.INSTAGRAM_ADS, source);
    }
  });

  test("Facebook with an organic medium is another campaign, not Facebook Ads", () => {
    const result = classify({ utm_source: "facebook", utm_medium: "social" });
    assert.equal(result.label, LEAD_SOURCE.OTHER);
    assert.equal(formatLeadSource(result), "Other campaign source: facebook / social");
  });

  test("Other campaign: raw source and medium are preserved in the label", () => {
    const result = classify({ utm_source: "Newsletter", utm_medium: "Email", utm_campaign: "Nov Drive" });
    assert.equal(result.label, LEAD_SOURCE.OTHER);
    assert.equal(formatLeadSource(result), "Other campaign source: Newsletter / Email");
  });

  test("Other campaign: google without a known medium is not guessed", () => {
    assert.equal(formatLeadSource(classify({ utm_source: "google" })), "Other campaign source: google / (no medium)");
  });

  test("Unknown: UTM parameters without utm_source", () => {
    const result = classify({ utm_medium: "cpc", utm_campaign: "x" });
    assert.equal(result.label, LEAD_SOURCE.UNKNOWN);
  });

  test("fbclid alone: Meta click, paid or organic -> other campaign", () => {
    const result = classify({ fbclid: FBCLID, referrer: "https://l.instagram.com/" });
    assert.equal(result.label, LEAD_SOURCE.OTHER);
    assert.equal(formatLeadSource(result), "Other campaign source: Meta click (fbclid) via l.instagram.com");
  });

  test("Referral: ChatGPT referrer without UTMs", () => {
    assert.equal(classify({ referrer: "https://chatgpt.com/" }).label, LEAD_SOURCE.CHATGPT);
  });

  test("Referral: any other external site", () => {
    assert.equal(formatLeadSource(classify({ referrer: "https://www.shiksha.com/x?y=1" })), "Other campaign source: referral / www.shiksha.com");
  });
});

// ---------------------------------------------------------------------------
// Validation of untrusted input
// ---------------------------------------------------------------------------

describe("parseAttribution", () => {
  test("rejects non-objects", () => {
    for (const input of [null, undefined, "chatgpt", 42, ["utm_source"]]) {
      assert.equal(parseAttribution(input, NOW), null);
    }
  });

  test("drops values that look like an email or a mobile number", () => {
    const result = parseAttribution(
      { utm_source: "student@example.com", utm_campaign: "9876543210", utm_content: "+91 98765 43210", utm_term: "pgdm" },
      NOW,
    );
    assert.deepEqual(result, { utm_term: "pgdm" });
  });

  test("keeps long numeric ad identifiers (not phone numbers)", () => {
    assert.equal(parseAttribution({ utm_campaign: "21234567890" }, NOW)?.utm_campaign, "21234567890");
  });

  test("strips markup/control characters and truncates", () => {
    const result = parseAttribution({ utm_source: "<b>news\u0000letter</b>", utm_campaign: "x".repeat(400) }, NOW);
    assert.equal(result?.utm_source, "bnewsletter/b");
    assert.equal(result?.utm_campaign?.length, 150);
  });

  test("landing page keeps the path only", () => {
    assert.equal(parseAttribution({ landing_page: "/pgdm-admission?utm_source=x&email=a@b.co#top" }, NOW)?.landing_page, "/pgdm-admission");
    assert.equal(parseAttribution({ landing_page: "https://evil.example/" }, NOW), null);
    assert.equal(parseAttribution({ landing_page: "//evil.example/" }, NOW), null);
  });

  test("referrer keeps the origin only", () => {
    assert.equal(parseAttribution({ referrer: "https://www.google.com/search?q=private" }, NOW)?.referrer, "https://www.google.com");
    assert.equal(parseAttribution({ referrer: "javascript:alert(1)" }, NOW), null);
  });

  test("first-touch timestamp must be plausible", () => {
    assert.equal(parseAttribution({ first_touch_at: "2026-11-10T08:00:00.000Z" }, NOW)?.first_touch_at, "2026-11-10T08:00:00.000Z");
    assert.equal(parseAttribution({ first_touch_at: "2099-01-01T00:00:00Z" }, NOW), null);
    assert.equal(parseAttribution({ first_touch_at: "yesterday" }, NOW), null);
  });

  test("a client-supplied label is ignored", () => {
    const result = resolveLeadAttribution({ label: "ChatGPT", source: "ChatGPT" }, NOW);
    assert.equal(result.source, LEAD_SOURCE.WEBSITE);
  });
});

describe("thankYouPath", () => {
  test("carries UTM parameters only", () => {
    const attribution: LeadAttribution = {
      utm_source: "chatgpt.com",
      utm_medium: "paid",
      utm_campaign: "PGDM 2026",
      gclid: GCLID,
      landing_page: "/pgdm-admission",
      referrer: "https://chatgpt.com",
    };
    assert.equal(thankYouPath(attribution), "/thank-you?utm_source=chatgpt.com&utm_medium=paid&utm_campaign=PGDM+2026");
  });

  test("plain path without attribution", () => {
    assert.equal(thankYouPath(null), "/thank-you");
    assert.equal(thankYouPath({ landing_page: "/" }), "/thank-you");
  });
});

describe("attributionSummary", () => {
  test("lists every field for the notification email", () => {
    const { attribution, classification } = resolveLeadAttribution(
      { utm_source: "chatgpt", utm_medium: "paid", gclid: GCLID, landing_page: "/", first_touch_at: "2026-11-10T08:00:00.000Z" },
      NOW,
    );
    const rows = Object.fromEntries(attributionSummary(attribution, classification));
    assert.equal(rows["Lead Source"], "Google Ads");
    assert.equal(rows["UTM Source"], "chatgpt");
    assert.equal(rows["Click IDs"], `gclid: ${GCLID}`);
    assert.equal(rows["Landing Page"], "/");
  });
});

// ---------------------------------------------------------------------------
// Browser capture (simulated window)
// ---------------------------------------------------------------------------

class MemoryStorage {
  private data = new Map<string, string>();
  getItem(key: string) {
    return this.data.has(key) ? this.data.get(key)! : null;
  }
  setItem(key: string, value: string) {
    this.data.set(key, String(value));
  }
  removeItem(key: string) {
    this.data.delete(key);
  }
  clear() {
    this.data.clear();
  }
}

class ThrowingStorage {
  getItem(): string | null {
    throw new Error("blocked");
  }
  setItem(): void {
    throw new Error("blocked");
  }
  removeItem(): void {
    throw new Error("blocked");
  }
}

type FakeBrowser = {
  localStorage: MemoryStorage | ThrowingStorage;
  sessionStorage: MemoryStorage | ThrowingStorage;
  // A full page load: new URL and new document.referrer.
  load(url: string, referrer?: string): void;
  // Next.js client-side navigation: URL changes, document.referrer does not.
  navigate(url: string): void;
};

const globals = globalThis as unknown as { window?: unknown; document?: unknown };

function installBrowser(options: { blocked?: boolean } = {}): FakeBrowser {
  const localStorage = options.blocked ? new ThrowingStorage() : new MemoryStorage();
  const sessionStorage = options.blocked ? new ThrowingStorage() : new MemoryStorage();
  const location = { search: "", pathname: "/", hostname: "www.fostiima.org" };
  const document = { referrer: "" };

  function setUrl(url: string) {
    const parsed = new URL(url, "https://www.fostiima.org");
    location.search = parsed.search;
    location.pathname = parsed.pathname;
  }

  globals.window = { localStorage, sessionStorage, location };
  globals.document = document;

  return {
    localStorage,
    sessionStorage,
    load(url, referrer = "") {
      setUrl(url);
      document.referrer = referrer;
    },
    navigate(url) {
      setUrl(url);
    },
  };
}

describe("captureAttribution (browser)", () => {
  let browser: FakeBrowser;

  beforeEach(() => {
    resetAttributionMemoryForTests();
    browser = installBrowser();
  });

  afterEach(() => {
    delete globals.window;
    delete globals.document;
    resetAttributionMemoryForTests();
  });

  test("returns null on the server (no window)", () => {
    delete globals.window;
    assert.equal(captureAttribution(NOW), null);
  });

  test("scenario 1: ChatGPT landing is captured with landing page and timestamp", () => {
    browser.load("/pgdm-admission?utm_source=chatgpt&utm_medium=paid&utm_campaign=pgdm_nov", "https://chatgpt.com/");
    const attribution = captureAttribution(NOW);
    assert.deepEqual(attribution, {
      utm_source: "chatgpt",
      utm_medium: "paid",
      utm_campaign: "pgdm_nov",
      landing_page: "/pgdm-admission",
      referrer: "https://chatgpt.com",
      first_touch_at: new Date(NOW).toISOString(),
    });
    assert.equal(classifyLeadSource(attribution).label, LEAD_SOURCE.CHATGPT);
  });

  test("scenarios 3 & 13: survives client-side navigation across pages before the form", () => {
    browser.load("/?utm_source=chatgpt.com", "");
    captureAttribution(NOW);
    browser.navigate("/programs");
    captureAttribution(NOW + 1000);
    browser.navigate("/contact-us");
    const atSubmit = captureAttribution(NOW + 2000);
    assert.equal(atSubmit?.utm_source, "chatgpt.com");
    assert.equal(atSubmit?.landing_page, "/");
  });

  test("scenario 12: survives a refresh (full reload of the tagged URL)", () => {
    browser.load("/blog/x?utm_source=google&utm_medium=cpc", "https://www.google.com/");
    captureAttribution(NOW);
    resetAttributionMemoryForTests(); // a reload loses module memory
    browser.load("/blog/x?utm_source=google&utm_medium=cpc", "https://www.google.com/");
    const after = captureAttribution(NOW + 60_000);
    assert.equal(after?.first_touch_at, new Date(NOW).toISOString());
  });

  test("scenario 11: first-touch ChatGPT is not overwritten by a later direct visit", () => {
    browser.load("/?utm_source=chatgpt&utm_medium=paid");
    captureAttribution(NOW);
    resetAttributionMemoryForTests();
    browser.load("/pgdm-admission", ""); // typed URL next day
    const later = captureAttribution(NOW + DAY);
    assert.equal(classifyLeadSource(later).label, LEAD_SOURCE.CHATGPT);
  });

  test("first non-direct touch wins over a later campaign too", () => {
    browser.load("/?utm_source=chatgpt&utm_medium=paid");
    captureAttribution(NOW);
    browser.load("/?utm_source=google&utm_medium=cpc&gclid=" + GCLID, "https://www.google.com/");
    assert.equal(captureAttribution(NOW + DAY)?.utm_source, "chatgpt");
  });

  test("a stored direct visit is upgraded by a later campaign visit", () => {
    browser.load("/", "");
    assert.equal(classifyLeadSource(captureAttribution(NOW)).label, LEAD_SOURCE.WEBSITE);
    browser.load("/pgdm-admission?utm_source=chatgpt.com", "");
    assert.equal(classifyLeadSource(captureAttribution(NOW + DAY)).label, LEAD_SOURCE.CHATGPT);
  });

  test("scenario 7: direct visitor -> FOSTIIMA Website, landing page kept", () => {
    browser.load("/fee-structure", "");
    const attribution = captureAttribution(NOW);
    assert.equal(attribution?.landing_page, "/fee-structure");
    assert.equal(classifyLeadSource(attribution).label, LEAD_SOURCE.WEBSITE);
  });

  test("scenario 6: Google organic referrer", () => {
    browser.load("/programs/pgdm", "https://www.google.co.in/");
    assert.equal(classifyLeadSource(captureAttribution(NOW)).label, LEAD_SOURCE.GOOGLE_ORGANIC);
  });

  test("an internal full page load is not a referral", () => {
    browser.load("/about-us", "https://www.fostiima.org/");
    assert.equal(classifyLeadSource(captureAttribution(NOW)).label, LEAD_SOURCE.WEBSITE);
  });

  test("record expires after the TTL and is replaced", () => {
    browser.load("/?utm_source=chatgpt&utm_medium=paid");
    captureAttribution(NOW);
    browser.load("/", "");
    const expired = captureAttribution(NOW + (ATTRIBUTION_TTL_DAYS + 1) * DAY);
    assert.equal(classifyLeadSource(expired).label, LEAD_SOURCE.WEBSITE);
  });

  test("a tampered or corrupt stored record is discarded", () => {
    browser.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, "{not json");
    browser.load("/?utm_source=chatgpt.com");
    assert.equal(captureAttribution(NOW)?.utm_source, "chatgpt.com");

    browser.localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify({ v: 2, direct: false, expires_at: NOW + 1000 * DAY, attribution: { utm_source: "chatgpt" } }),
    );
    resetAttributionMemoryForTests();
    browser.load("/", "");
    assert.equal(classifyLeadSource(captureAttribution(NOW)).label, LEAD_SOURCE.WEBSITE);
  });

  test("legacy sessionStorage record is migrated once", () => {
    browser.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify({ utm_source: "chatgpt", utm_medium: "paid", utm_campaign: "launch" }),
    );
    browser.load("/pgdm-admission", "");
    const attribution = captureAttribution(NOW);
    assert.equal(attribution?.utm_source, "chatgpt");
    assert.equal(attribution?.utm_campaign, "launch");
    assert.equal(browser.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY), null);
    assert.ok(browser.localStorage.getItem(ATTRIBUTION_STORAGE_KEY));
  });

  test("blocked storage: attribution still survives client navigation in memory", () => {
    delete globals.window;
    browser = installBrowser({ blocked: true });
    browser.load("/?utm_source=chatgpt&utm_medium=paid");
    captureAttribution(NOW);
    browser.navigate("/pgdm-admission");
    assert.equal(captureAttribution(NOW + 1000)?.utm_source, "chatgpt");
  });

  test("personal data in the URL is never stored", () => {
    browser.load("/?utm_source=chatgpt&utm_content=student%40example.com&email=a%40b.co");
    captureAttribution(NOW);
    const stored = browser.localStorage.getItem(ATTRIBUTION_STORAGE_KEY) ?? "";
    assert.ok(!stored.includes("example.com"));
    assert.ok(!stored.includes("a@b.co"));
  });

  test("scenario 16: Thank You page without query keeps the saved attribution", () => {
    browser.load("/pgdm-admission?utm_source=chatgpt&utm_medium=paid");
    captureAttribution(NOW);
    browser.navigate("/thank-you");
    assert.equal(captureAttribution(NOW + 1000)?.utm_source, "chatgpt");
  });
});

describe("attributionFromPageView", () => {
  test("captures every supported parameter", () => {
    const attribution = attributionFromPageView({
      search: `?utm_source=Google&utm_medium=CPC&utm_campaign=PGDM&utm_term=mba+delhi&utm_content=ad1&gclid=${GCLID}&fbclid=${FBCLID}`,
      pathname: "/programs/pgdm",
      referrer: "https://www.google.com/",
      now: NOW,
    });
    assert.deepEqual(attribution, {
      utm_source: "Google",
      utm_medium: "CPC",
      utm_campaign: "PGDM",
      utm_term: "mba delhi",
      utm_content: "ad1",
      gclid: GCLID,
      fbclid: FBCLID,
      landing_page: "/programs/pgdm",
      referrer: "https://www.google.com",
      first_touch_at: new Date(NOW).toISOString(),
    });
  });
});
