// Google Ads Enhanced Conversions helpers.
//
// ON HOLD: nothing imports this module yet. It must not be wired into a form
// until (1) approved privacy-policy and consent wording is live and (2) the
// GTM conversion tag is set up to read user-provided data. See
// Performance-Audit/controlled-implementation-report.md.
//
// Normalization follows Google's documented rules for user-provided data:
// trim and lowercase email; for gmail.com / googlemail.com remove dots before
// the "@"; phone numbers in E.164; SHA-256, lowercase hex.

import { toIndianE164 } from "@/lib/phone";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmailForAds(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email)) return null;

  const at = email.lastIndexOf("@");
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);

  if (domain === "gmail.com" || domain === "googlemail.com") {
    const stripped = local.replace(/\./g, "");
    return stripped ? `${stripped}@${domain}` : null;
  }

  return email;
}

export async function sha256Hex(value: string): Promise<string | null> {
  if (!value) return null;
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) return null;

  try {
    const digest = await subtle.digest("SHA-256", new TextEncoder().encode(value));
    return Array.from(new Uint8Array(digest), (b) =>
      b.toString(16).padStart(2, "0"),
    ).join("");
  } catch {
    return null;
  }
}

export type HashedUserData = {
  sha256_email_address?: string;
  sha256_phone_number?: string;
};

// Returns hashed identifiers only. Empty or invalid values are omitted, never
// hashed. Returns null when nothing valid remains.
export async function buildHashedUserData(input: {
  email: string;
  mobile: string;
}): Promise<HashedUserData | null> {
  const email = normalizeEmailForAds(input.email);
  const phone = toIndianE164(input.mobile);

  const [emailHash, phoneHash] = await Promise.all([
    email ? sha256Hex(email) : Promise.resolve(null),
    phone ? sha256Hex(phone) : Promise.resolve(null),
  ]);

  const userData: HashedUserData = {};
  if (emailHash) userData.sha256_email_address = emailHash;
  if (phoneHash) userData.sha256_phone_number = phoneHash;

  return Object.keys(userData).length > 0 ? userData : null;
}
