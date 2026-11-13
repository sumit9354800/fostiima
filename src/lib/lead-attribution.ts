// Campaign attribution for the admission enquiry form.
//
// Only allowlisted campaigns are recognised. URL values never reach the
// stored lead source directly: the API maps a recognised campaign to a fixed
// label, and anything else falls back to the existing source behaviour.
//
// Storage: sessionStorage only (cleared when the tab closes), campaign
// parameters only, never personal data. First touch wins within a session.

export type LeadAttribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign?: string;
  utm_content?: string;
};

type Campaign = { source: string; medium: string; label: string };

// utm_source / utm_medium pairs (lowercase) and the lead source they map to.
const RECOGNISED_CAMPAIGNS: readonly Campaign[] = [
  { source: "chatgpt", medium: "paid", label: "ChatGPT" },
];

const STORAGE_KEY = "fostiima_lead_attribution";

// Campaign / creative identifiers: letters, digits, _ - . only.
const TOKEN_PATTERN = /^[a-z0-9_.-]{1,100}$/;

function cleanToken(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const token = value.trim().toLowerCase();
  return TOKEN_PATTERN.test(token) ? token : undefined;
}

function findCampaign(source: unknown, medium: unknown): Campaign | undefined {
  const s = cleanToken(source);
  const m = cleanToken(medium);
  if (!s || !m) return undefined;
  return RECOGNISED_CAMPAIGNS.find((c) => c.source === s && c.medium === m);
}

// Validates untrusted input (URL params, storage or a request body).
export function parseAttribution(input: {
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_content?: unknown;
}): LeadAttribution | null {
  const campaign = findCampaign(input.utm_source, input.utm_medium);
  if (!campaign) return null;

  const attribution: LeadAttribution = {
    utm_source: campaign.source,
    utm_medium: campaign.medium,
  };
  const utmCampaign = cleanToken(input.utm_campaign);
  const utmContent = cleanToken(input.utm_content);
  if (utmCampaign) attribution.utm_campaign = utmCampaign;
  if (utmContent) attribution.utm_content = utmContent;
  return attribution;
}

// Server side: the lead source label for a recognised campaign, else null.
export function attributionSourceLabel(input: unknown): string | null {
  if (!input || typeof input !== "object") return null;
  const a = input as Record<string, unknown>;
  return findCampaign(a.utm_source, a.utm_medium)?.label ?? null;
}

// Every value the API may store in the lead `source` column. Client-supplied
// strings are never stored as-is. Note: UTM parameters are user-controlled
// signals, not proof of an ad click, so a recognised label is attribution,
// not verification.
export const DEFAULT_LEAD_SOURCE = "FOSTIIMA Website";

export function resolveLeadSource(body: {
  attribution?: unknown;
}): string {
  return attributionSourceLabel(body.attribution) ?? DEFAULT_LEAD_SOURCE;
}

function readStored(): LeadAttribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? parseAttribution(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

// Browser side: records a recognised campaign from the current URL unless
// one is already stored for this session, and returns the attribution to
// send with the enquiry (or null).
export function captureAttribution(): LeadAttribution | null {
  if (typeof window === "undefined") return null;

  const stored = readStored();
  if (stored) return stored;

  const params = new URLSearchParams(window.location.search);
  const fromUrl = parseAttribution({
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
  });

  if (fromUrl) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      // Storage unavailable (private mode, blocked): attribution still
      // applies to a submission made from this page view.
    }
  }

  return fromUrl;
}
