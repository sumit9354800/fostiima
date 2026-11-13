// Indian mobile number helpers shared by the admission form and its API route.
//
// The CRM/API format is the bare 10-digit subscriber number (e.g. 9876543210).
// E.164 (+919876543210) is only derived for advertising measurement and is
// never sent to the API.

// Indian mobile numbers are 10 digits and start with 6, 7, 8 or 9.
const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;

export function isValidIndianMobile(tenDigits: string): boolean {
  if (!INDIAN_MOBILE_PATTERN.test(tenDigits)) return false;
  // Reject one digit repeated ten times (e.g. 9999999999).
  return !/^(\d)\1{9}$/.test(tenDigits);
}

// Returns the 10-digit subscriber number, or null when the input is not a
// valid Indian mobile number. Never truncates: only these shapes are accepted:
//   10 digits                 9876543210 (including numbers that start with 91)
//   12 digits starting 91     +91 98765 43210, 919876543210, +91-9876-543-210
// 11-digit values (e.g. 09876543210) are rejected: stripping a leading 0 would
// also turn STD-format landlines (080-2234-5678) into a different number.
export function normalizeIndianMobile(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");

  let subscriber: string;

  if (digits.length === 10) {
    subscriber = digits;
  } else if (digits.length === 12 && digits.startsWith("91")) {
    subscriber = digits.slice(2);
  } else {
    return null;
  }

  return isValidIndianMobile(subscriber) ? subscriber : null;
}

// E.164 form for Google Ads Enhanced Conversions only.
export function toIndianE164(raw: string): string | null {
  const subscriber = normalizeIndianMobile(raw);
  return subscriber ? `+91${subscriber}` : null;
}
