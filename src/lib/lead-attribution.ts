// Lead attribution: first-touch campaign capture (browser) and lead source
// classification (server).
//
// This module has no imports so it can be used by client components, API
// routes and unit tests (tests/lead-attribution.test.ts) alike.
//
// Privacy: only campaign parameters, click identifiers, the landing page PATH
// (no query string) and the referrer ORIGIN are kept. Values that look like an
// email address or an Indian mobile number are dropped. Nothing personal is
// ever stored, put in a URL or sent to GTM by this module.
//
// Storage policy (browser): one record in localStorage under
// ATTRIBUTION_STORAGE_KEY, expiring ATTRIBUTION_TTL_DAYS after the first touch
// (fixed, not sliding). The first NON-DIRECT touch wins: a later direct visit
// never replaces a campaign/referral touch, but a stored direct visit is
// upgraded by a later campaign or referral touch. If storage is unavailable the
// record is kept in memory for the life of the page (client navigation still
// keeps it).
//
// Trust: the browser sends raw values only. The server re-validates them with
// parseAttribution() and derives the label with classifyLeadSource(); a
// client-supplied label is never stored. UTM values are still user-controlled
// signals, so a label is attribution, not proof of an ad click.

export const ATTRIBUTION_STORAGE_KEY = "fostiima_lead_attribution";
export const ATTRIBUTION_TTL_DAYS = 90;
const ATTRIBUTION_TTL_MS = ATTRIBUTION_TTL_DAYS * 24 * 60 * 60 * 1000;
const STORAGE_VERSION = 2;

export const LEAD_SOURCE = {
  CHATGPT: "ChatGPT",
  GOOGLE_ADS: "Google Ads",
  GOOGLE_ORGANIC: "Google Organic",
  WEBSITE: "FOSTIIMA Website",
  FACEBOOK_ADS: "Facebook Ads",
  INSTAGRAM_ADS: "Instagram Ads",
  OTHER: "Other campaign source",
  UNKNOWN: "Unknown / Unclassified",
} as const;

export type LeadSourceLabel = (typeof LEAD_SOURCE)[keyof typeof LEAD_SOURCE];

// Kept for compatibility: the database default for AdmissionEnquiry.source.
export const DEFAULT_LEAD_SOURCE = LEAD_SOURCE.WEBSITE;

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

// gclid / gbraid / wbraid: Google Ads auto-tagging (gbraid/wbraid on iOS).
// fbclid: added by Facebook/Instagram to paid AND organic outbound links.
export const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid", "fbclid"] as const;

type UtmKey = (typeof UTM_KEYS)[number];
type ClickIdKey = (typeof CLICK_ID_KEYS)[number];

export type LeadAttribution = Partial<Record<UtmKey | ClickIdKey, string>> & {
  landing_page?: string;
  referrer?: string;
  first_touch_at?: string;
};

export type LeadSourceClassification = {
  label: LeadSourceLabel;
  // Raw source/medium (or referrer) for the generic labels only.
  detail?: string;
  // Which precedence rule matched (documentation and tests).
  rule: string;
};

// ---------------------------------------------------------------------------
// Classification rules. Matching is case-insensitive on trimmed values.
// Facebook/Instagram source values follow Meta's defaults ("facebook", "fb",
// "instagram", "ig"); confirm the values the marketing team actually uses.
// ---------------------------------------------------------------------------

const CHATGPT_SOURCES = new Set(["chatgpt", "chatgpt.com"]);
const GOOGLE_SOURCES = new Set(["google"]);
const FACEBOOK_SOURCES = new Set(["facebook", "fb"]);
const INSTAGRAM_SOURCES = new Set(["instagram", "ig"]);

const PAID_MEDIUMS = new Set([
  "cpc",
  "ppc",
  "paid",
  "paidsearch",
  "paid_search",
  "paid-search",
  "sem",
  "cpm",
  "cpv",
  "display",
  "paid_social",
  "paidsocial",
  "paid-social",
  "social_paid",
  "paid_ads",
  "ads",
]);

const ORGANIC_MEDIUMS = new Set(["organic"]);

// Google web search, any country domain (google.com, www.google.co.in ...).
const GOOGLE_SEARCH_HOST = /^(www\.)?google\.[a-z]{2,3}(\.[a-z]{2})?$/;
const GOOGLE_SEARCH_APP = "android-app://com.google.android.googlequicksearchbox";
const CHATGPT_HOSTS = new Set(["chatgpt.com", "chat.openai.com"]);

// Hosts that are part of FOSTIIMA's own journey, never an acquisition source.
const INTERNAL_HOSTS = ["fostiima.org", "fbsapplication.extraaedge.com"];

// ---------------------------------------------------------------------------
// Validation of untrusted values (URL, storage or request body).
// ---------------------------------------------------------------------------

const MAX_UTM_LENGTH = 150;
const MAX_PATH_LENGTH = 300;
const MAX_REFERRER_LENGTH = 200;
const CLICK_ID_PATTERN = /^[A-Za-z0-9_-]{10,300}$/;
const EMAIL_PATTERN = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const INDIAN_MOBILE_PATTERN = /^(\+?91|0)?[6-9]\d{9}$/;
const EARLIEST_TIMESTAMP = Date.UTC(2024, 0, 1);
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function looksPersonal(value: string): boolean {
  return (
    EMAIL_PATTERN.test(value) ||
    INDIAN_MOBILE_PATTERN.test(value.replace(/[\s().-]/g, ""))
  );
}

function cleanText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value
    .replace(/[\u0000-\u001f\u007f<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength)
    .trim();
  return text || undefined;
}

function cleanUtm(value: unknown): string | undefined {
  const text = cleanText(value, MAX_UTM_LENGTH);
  return text && !looksPersonal(text) ? text : undefined;
}

function cleanClickId(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const id = value.trim();
  return CLICK_ID_PATTERN.test(id) ? id : undefined;
}

function cleanLandingPage(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const path = value.split(/[?#]/)[0];
  if (!path.startsWith("/") || path.startsWith("//")) return undefined;
  const text = cleanText(path, MAX_PATH_LENGTH);
  return text && !text.includes("@") ? text : undefined;
}

function isInternalHost(host: string, siteHosts: readonly string[]): boolean {
  return [...INTERNAL_HOSTS, ...siteHosts].some(
    (internal) =>
      internal && (host === internal || host.endsWith(`.${internal}`)),
  );
}

// Returns the referrer origin only (no path or query), or undefined for an
// internal, missing or unparseable referrer.
function cleanReferrer(
  value: unknown,
  siteHosts: readonly string[] = [],
): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const raw = value.trim();

  const app = raw.match(/^android-app:\/\/([a-z0-9._]{1,100})/i);
  if (app) return `android-app://${app[1].toLowerCase()}`;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return undefined;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;

  const host = url.hostname.toLowerCase();
  if (!host || isInternalHost(host, siteHosts)) return undefined;

  return `${url.protocol}//${host}`.slice(0, MAX_REFERRER_LENGTH);
}

function cleanTimestamp(value: unknown, now: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const time = Date.parse(value);
  if (Number.isNaN(time) || time < EARLIEST_TIMESTAMP || time > now + ONE_DAY_MS) {
    return undefined;
  }
  return new Date(time).toISOString();
}

// Validates untrusted attribution input field by field. Unknown keys are
// ignored; invalid values are dropped. Returns null when nothing is valid.
export function parseAttribution(
  input: unknown,
  now: number = Date.now(),
): LeadAttribution | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const raw = input as Record<string, unknown>;
  const attribution: LeadAttribution = {};

  for (const key of UTM_KEYS) {
    const value = cleanUtm(raw[key]);
    if (value) attribution[key] = value;
  }
  for (const key of CLICK_ID_KEYS) {
    const value = cleanClickId(raw[key]);
    if (value) attribution[key] = value;
  }

  const landingPage = cleanLandingPage(raw.landing_page);
  const referrer = cleanReferrer(raw.referrer);
  const firstTouchAt = cleanTimestamp(raw.first_touch_at, now);
  if (landingPage) attribution.landing_page = landingPage;
  if (referrer) attribution.referrer = referrer;
  if (firstTouchAt) attribution.first_touch_at = firstTouchAt;

  return Object.keys(attribution).length ? attribution : null;
}

// True when the touch carries anything other than a direct visit.
export function hasCampaignSignal(attribution: LeadAttribution | null): boolean {
  if (!attribution) return false;
  return (
    UTM_KEYS.some((key) => attribution[key]) ||
    CLICK_ID_KEYS.some((key) => attribution[key]) ||
    Boolean(attribution.referrer)
  );
}

// Builds the attribution of one page view from its URL and document.referrer.
export function attributionFromPageView(view: {
  search: string;
  pathname: string;
  referrer: string;
  siteHosts?: readonly string[];
  now?: number;
}): LeadAttribution {
  const now = view.now ?? Date.now();
  const params = new URLSearchParams(view.search);
  const raw: Record<string, unknown> = {
    landing_page: view.pathname,
    first_touch_at: new Date(now).toISOString(),
  };
  for (const key of [...UTM_KEYS, ...CLICK_ID_KEYS]) {
    raw[key] = params.get(key) ?? undefined;
  }
  raw.referrer = cleanReferrer(view.referrer, view.siteHosts);

  return parseAttribution(raw, now) ?? {};
}

// ---------------------------------------------------------------------------
// Source classification. Precedence (first match wins):
//   1. Google Ads click id (gclid / gbraid / wbraid)        -> Google Ads
//      (overrides manual UTMs, like Google Analytics' default)
//   2. utm_source:
//        chatgpt | chatgpt.com, any medium                    -> ChatGPT
//        google + paid medium                                 -> Google Ads
//        google + organic medium                              -> Google Organic
//        facebook | fb + paid medium                          -> Facebook Ads
//        instagram | ig + paid medium                         -> Instagram Ads
//        anything else                                        -> Other campaign source
//   3. Other UTM params without utm_source                    -> Unknown / Unclassified
//   4. fbclid only (Meta click, paid or organic)              -> Other campaign source
//   5. Referrer: Google search                                -> Google Organic
//                chatgpt.com / chat.openai.com                -> ChatGPT
//                any other external site                      -> Other campaign source
//   6. Nothing (direct visit, or no attribution received)     -> FOSTIIMA Website
// ---------------------------------------------------------------------------

function lower(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

export function classifyLeadSource(
  attribution: LeadAttribution | null,
): LeadSourceClassification {
  if (!attribution) return { label: LEAD_SOURCE.WEBSITE, rule: "no-attribution" };

  if (attribution.gclid || attribution.gbraid || attribution.wbraid) {
    return { label: LEAD_SOURCE.GOOGLE_ADS, rule: "google-click-id" };
  }

  const source = lower(attribution.utm_source);
  const medium = lower(attribution.utm_medium);

  if (source) {
    if (CHATGPT_SOURCES.has(source)) {
      return { label: LEAD_SOURCE.CHATGPT, rule: "utm-chatgpt" };
    }
    if (GOOGLE_SOURCES.has(source) && PAID_MEDIUMS.has(medium)) {
      return { label: LEAD_SOURCE.GOOGLE_ADS, rule: "utm-google-paid" };
    }
    if (GOOGLE_SOURCES.has(source) && ORGANIC_MEDIUMS.has(medium)) {
      return { label: LEAD_SOURCE.GOOGLE_ORGANIC, rule: "utm-google-organic" };
    }
    if (FACEBOOK_SOURCES.has(source) && PAID_MEDIUMS.has(medium)) {
      return { label: LEAD_SOURCE.FACEBOOK_ADS, rule: "utm-facebook-paid" };
    }
    if (INSTAGRAM_SOURCES.has(source) && PAID_MEDIUMS.has(medium)) {
      return { label: LEAD_SOURCE.INSTAGRAM_ADS, rule: "utm-instagram-paid" };
    }
    return {
      label: LEAD_SOURCE.OTHER,
      detail: `${attribution.utm_source} / ${attribution.utm_medium ?? "(no medium)"}`,
      rule: "utm-other",
    };
  }

  const otherUtm = UTM_KEYS.filter((key) => key !== "utm_source").find(
    (key) => attribution[key],
  );
  if (otherUtm) {
    return {
      label: LEAD_SOURCE.UNKNOWN,
      detail: `${otherUtm}=${attribution[otherUtm]} without utm_source`,
      rule: "utm-without-source",
    };
  }

  if (attribution.fbclid) {
    const via = attribution.referrer ? ` via ${hostOf(attribution.referrer)}` : "";
    return {
      label: LEAD_SOURCE.OTHER,
      detail: `Meta click (fbclid)${via}`,
      rule: "fbclid-only",
    };
  }

  if (attribution.referrer) {
    const host = hostOf(attribution.referrer);
    if (attribution.referrer === GOOGLE_SEARCH_APP || GOOGLE_SEARCH_HOST.test(host)) {
      return { label: LEAD_SOURCE.GOOGLE_ORGANIC, rule: "referrer-google" };
    }
    if (CHATGPT_HOSTS.has(host)) {
      return { label: LEAD_SOURCE.CHATGPT, rule: "referrer-chatgpt" };
    }
    return {
      label: LEAD_SOURCE.OTHER,
      detail: `referral / ${host}`,
      rule: "referrer-other",
    };
  }

  return { label: LEAD_SOURCE.WEBSITE, rule: "direct" };
}

function hostOf(referrer: string): string {
  if (referrer.startsWith("android-app://")) return referrer;
  try {
    return new URL(referrer).hostname;
  } catch {
    return referrer;
  }
}

// The value stored in the lead's `source` column (VARCHAR(150)): the label,
// plus the raw source/medium or referrer for the generic labels, so that
// campaign data is not lost while only this column exists.
export function formatLeadSource(classification: LeadSourceClassification): string {
  const value = classification.detail
    ? `${classification.label}: ${classification.detail}`
    : classification.label;
  return value.slice(0, 150);
}

// Server side: validate the submitted attribution and derive the lead source.
export function resolveLeadAttribution(
  input: unknown,
  now: number = Date.now(),
): {
  attribution: LeadAttribution | null;
  classification: LeadSourceClassification;
  source: string;
} {
  const attribution = parseAttribution(input, now);
  const classification = classifyLeadSource(attribution);
  return { attribution, classification, source: formatLeadSource(classification) };
}

// Readable label/value pairs for internal notification emails.
export function attributionSummary(
  attribution: LeadAttribution | null,
  classification: LeadSourceClassification,
): [label: string, value: string][] {
  const a = attribution ?? {};
  const clickIds = CLICK_ID_KEYS.filter((key) => a[key])
    .map((key) => `${key}: ${a[key]}`)
    .join(", ");

  return [
    ["Lead Source", formatLeadSource(classification)],
    ["UTM Source", a.utm_source ?? ""],
    ["UTM Medium", a.utm_medium ?? ""],
    ["UTM Campaign", a.utm_campaign ?? ""],
    ["UTM Term", a.utm_term ?? ""],
    ["UTM Content", a.utm_content ?? ""],
    ["Click IDs", clickIds],
    ["Landing Page", a.landing_page ?? ""],
    ["Referrer", a.referrer ?? ""],
    ["First Touch", a.first_touch_at ?? ""],
  ];
}

// ---------------------------------------------------------------------------
// Database columns (AdmissionEnquiry / ContactEnquiry) and Admin display.
// ---------------------------------------------------------------------------

export type LeadAttributionColumns = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  landingPage: string | null;
  referrer: string | null;
  firstTouchAt: Date | null;
};

// Validated attribution -> Prisma column values (null when absent). Lengths
// already fit the columns: parseAttribution() caps every value.
export function attributionColumns(
  attribution: LeadAttribution | null,
): LeadAttributionColumns {
  const a = attribution ?? {};
  return {
    utmSource: a.utm_source ?? null,
    utmMedium: a.utm_medium ?? null,
    utmCampaign: a.utm_campaign ?? null,
    utmTerm: a.utm_term ?? null,
    utmContent: a.utm_content ?? null,
    gclid: a.gclid ?? null,
    gbraid: a.gbraid ?? null,
    wbraid: a.wbraid ?? null,
    fbclid: a.fbclid ?? null,
    landingPage: a.landing_page ?? null,
    referrer: a.referrer ?? null,
    firstTouchAt: a.first_touch_at ? new Date(a.first_touch_at) : null,
  };
}

export const LEGACY_ATTRIBUTION_LABEL = "Legacy record — attribution not captured";

// A lead row as the Admin APIs return it (dates arrive as ISO strings).
export type LeadAttributionRecord = {
  source?: string | null;
} & {
  [K in keyof LeadAttributionColumns]?: K extends "firstTouchAt"
    ? string | Date | null
    : string | null;
};

export type LeadAttributionDisplay = {
  // True when the row has no captured attribution at all.
  legacy: boolean;
  // What Admin shows as the source. Legacy rows never show a channel label.
  sourceLabel: string;
  // The value in the `source` column for a legacy row (e.g. the old
  // "FOSTIIMA Website" default), shown separately so it is not mistaken for
  // a classification.
  storedSource: string | null;
  rows: { label: string; value: string | null }[];
  firstTouchAt: string | null;
};

const ATTRIBUTION_COLUMN_KEYS = [
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmTerm",
  "utmContent",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "landingPage",
  "referrer",
  "firstTouchAt",
] as const satisfies readonly (keyof LeadAttributionColumns)[];

function presentText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

// Builds the Admin attribution panel. Every attribution capture records at
// least the landing page and first-touch time, so a row where all attribution
// columns are empty predates the feature (or arrived without attribution) and
// is shown as legacy rather than reclassified.
export function describeLeadAttribution(
  record: LeadAttributionRecord,
): LeadAttributionDisplay {
  const firstTouch = record.firstTouchAt;
  const firstTouchAt =
    firstTouch instanceof Date
      ? firstTouch.toISOString()
      : presentText(firstTouch);

  const legacy = ATTRIBUTION_COLUMN_KEYS.every((key) =>
    key === "firstTouchAt" ? !firstTouchAt : !presentText(record[key]),
  );

  const clickIds = (["gclid", "gbraid", "wbraid", "fbclid"] as const)
    .filter((key) => presentText(record[key]))
    .map((key) => `${key}: ${record[key]}`)
    .join("\n");

  const storedSource = presentText(record.source);

  return {
    legacy,
    sourceLabel: legacy
      ? LEGACY_ATTRIBUTION_LABEL
      : (storedSource ?? LEAD_SOURCE.UNKNOWN),
    storedSource: legacy ? storedSource : null,
    firstTouchAt,
    rows: [
      { label: "UTM source", value: presentText(record.utmSource) },
      { label: "Medium", value: presentText(record.utmMedium) },
      { label: "Campaign", value: presentText(record.utmCampaign) },
      { label: "Term", value: presentText(record.utmTerm) },
      { label: "Content", value: presentText(record.utmContent) },
      { label: "Landing page", value: presentText(record.landingPage) },
      { label: "Referrer", value: presentText(record.referrer) },
      { label: "Click IDs", value: clickIds || null },
    ],
  };
}

// The common Thank You URL, carrying the UTM parameters only (never click
// ids or anything personal). The lead record stays the source of truth.
export function thankYouPath(attribution: LeadAttribution | null): string {
  const params = new URLSearchParams();
  for (const key of UTM_KEYS) {
    const value = attribution?.[key];
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `/thank-you?${query}` : "/thank-you";
}

// ---------------------------------------------------------------------------
// Browser storage.
// ---------------------------------------------------------------------------

type StoredRecord = {
  v: typeof STORAGE_VERSION;
  direct: boolean;
  expires_at: number;
  attribution: LeadAttribution;
};

// Fallback when localStorage is unavailable (blocked, some in-app browsers).
let memoryRecord: StoredRecord | null = null;

function decodeRecord(raw: string, now: number): StoredRecord | null {
  try {
    const value = JSON.parse(raw) as Partial<StoredRecord>;
    if (
      value?.v !== STORAGE_VERSION ||
      typeof value.expires_at !== "number" ||
      value.expires_at <= now ||
      value.expires_at > now + ATTRIBUTION_TTL_MS + ONE_DAY_MS
    ) {
      return null;
    }
    const attribution = parseAttribution(value.attribution, now) ?? {};
    return {
      v: STORAGE_VERSION,
      direct: value.direct === true || !hasCampaignSignal(attribution),
      expires_at: value.expires_at,
      attribution,
    };
  } catch {
    return null;
  }
}

function writeRecord(record: StoredRecord): void {
  memoryRecord = record;
  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable: the in-memory record still covers this page.
  }
}

// The previous implementation kept {utm_source, utm_medium, utm_campaign?,
// utm_content?} in sessionStorage under the same key. Move it once.
function migrateLegacySessionRecord(now: number): StoredRecord | null {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(ATTRIBUTION_STORAGE_KEY);

    const attribution = parseAttribution(JSON.parse(raw), now);
    if (!attribution || !hasCampaignSignal(attribution)) return null;

    const record: StoredRecord = {
      v: STORAGE_VERSION,
      direct: false,
      expires_at: now + ATTRIBUTION_TTL_MS,
      attribution: { ...attribution, first_touch_at: new Date(now).toISOString() },
    };
    writeRecord(record);
    return record;
  } catch {
    return null;
  }
}

function readRecord(now: number): StoredRecord | null {
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (raw) {
      const record = decodeRecord(raw, now);
      if (record) return record;
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
    }
  } catch {
    // Fall through to the in-memory record.
  }

  if (memoryRecord && memoryRecord.expires_at > now) return memoryRecord;
  return migrateLegacySessionRecord(now);
}

// Browser side: records this page view as the first touch when appropriate and
// returns the attribution to send with an enquiry. Synchronous and idempotent,
// so it is safe to call from AttributionCapture and again at submit time.
export function captureAttribution(now: number = Date.now()): LeadAttribution | null {
  if (typeof window === "undefined") return null;

  const stored = readRecord(now);
  if (stored && !stored.direct) return stored.attribution;

  const current = attributionFromPageView({
    search: window.location.search,
    pathname: window.location.pathname,
    referrer: document.referrer,
    siteHosts: [window.location.hostname],
    now,
  });

  if (hasCampaignSignal(current)) {
    writeRecord({
      v: STORAGE_VERSION,
      direct: false,
      expires_at: now + ATTRIBUTION_TTL_MS,
      attribution: current,
    });
    return current;
  }

  if (stored) return stored.attribution;

  writeRecord({
    v: STORAGE_VERSION,
    direct: true,
    expires_at: now + ATTRIBUTION_TTL_MS,
    attribution: current,
  });
  return current;
}

// Test helper: forget the in-memory fallback record.
export function resetAttributionMemoryForTests(): void {
  memoryRecord = null;
}
