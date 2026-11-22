// Admission enquiry select options, shared by the form
// (src/components/forms/AdmissionEnquiryForm.tsx) and the API allowlist
// (src/app/api/admission-enquiries/route.ts), so the two cannot drift apart.

// "12th Pass / Undergrad" was removed in November 2026. Old records that
// hold it are unchanged and still shown in Admin.
export const GRADUATION_STATUS_OPTIONS = [
  "Graduated",
  "Final Year Student",
] as const;

export const QUALIFYING_EXAM_LABEL = "Have you qualified ?";

export const QUALIFYING_EXAM_OPTIONS = [
  "CAT",
  "CMAT",
  "XAT",
] as const;

export function isOneOf<T extends string>(
  options: readonly T[],
  value: string,
): value is T {
  return (options as readonly string[]).includes(value);
}
