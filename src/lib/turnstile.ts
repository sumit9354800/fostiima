// Cloudflare Turnstile server-side verification for the admission enquiry API.
//
// Activation: enforced only when TURNSTILE_SECRET_KEY is set (server-only env,
// never NEXT_PUBLIC_). The browser widget renders only when
// NEXT_PUBLIC_TURNSTILE_SITE_KEY is set at build time. Set both together.
// Optional: TURNSTILE_ALLOWED_HOSTNAMES (comma-separated) to check the
// hostname Cloudflare reports for the token.
//
// Fails closed: a missing, invalid, expired or reused token is rejected (400);
// if Cloudflare cannot be reached or the secret is wrong the enquiry is not
// stored (503). Tokens and personal data are never logged.

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT_MS = 5000;
const MAX_TOKEN_LENGTH = 2048;
export const TURNSTILE_ACTION = "admission_enquiry";

// Cloudflare error codes caused by our configuration, not by the visitor.
const CONFIG_ERROR_CODES = ["missing-input-secret", "invalid-input-secret"];

export type TurnstileResult =
  | { ok: true }
  | { ok: false; status: 400 | 503; error: string };

const REJECTED: TurnstileResult = {
  ok: false,
  status: 400,
  error: "Please complete the verification and try again.",
};
const UNAVAILABLE: TurnstileResult = {
  ok: false,
  status: 503,
  error: "Verification is temporarily unavailable. Please try again shortly.",
};

export function isTurnstileEnforced(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

type SiteverifyResponse = {
  success?: unknown;
  "error-codes"?: unknown;
  hostname?: unknown;
  action?: unknown;
};

export async function verifyTurnstile(
  token: unknown,
  remoteIp: string | null,
  fetchImpl: typeof fetch = fetch,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return UNAVAILABLE;

  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > MAX_TOKEN_LENGTH
  ) {
    return REJECTED;
  }

  let data: SiteverifyResponse;
  try {
    const response = await fetchImpl(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(remoteIp ? { remoteip: remoteIp } : {}),
        idempotency_key: crypto.randomUUID(),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[TURNSTILE] siteverify HTTP", response.status);
      return UNAVAILABLE;
    }
    data = (await response.json()) as SiteverifyResponse;
  } catch (error) {
    console.error(
      "[TURNSTILE] siteverify unreachable:",
      error instanceof Error ? error.name : "unknown error",
    );
    return UNAVAILABLE;
  }

  const codes = Array.isArray(data["error-codes"])
    ? data["error-codes"].filter((c): c is string => typeof c === "string")
    : [];

  if (data.success !== true) {
    if (codes.some((c) => CONFIG_ERROR_CODES.includes(c))) {
      console.error("[TURNSTILE_CONFIG] secret rejected:", codes.join(","));
      return UNAVAILABLE;
    }
    return REJECTED;
  }

  const allowedHosts = (process.env.TURNSTILE_ALLOWED_HOSTNAMES || "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  if (
    allowedHosts.length > 0 &&
    !(typeof data.hostname === "string" &&
      allowedHosts.includes(data.hostname.toLowerCase()))
  ) {
    return REJECTED;
  }

  if (typeof data.action === "string" && data.action && data.action !== TURNSTILE_ACTION) {
    return REJECTED;
  }

  return { ok: true };
}
