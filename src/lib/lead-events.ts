// GTM dataLayer lead events. The ONLY place the site pushes a lead event.
//
// Privacy rule: nothing personal reaches the dataLayer. No email, phone, name,
// form values, click identifiers or attribution, and no Enhanced Conversions
// `user_data` (raw or hashed). Each event carries only its name and a fixed,
// non-personal `lead_type`.
// (Until 14 Nov 2026 `generate_lead` also carried raw email/phone in
// `user_data`; any GTM tag or variable that read `user_data` must be
// reconfigured.)
//
// Event names:
//  - Admission enquiry: `generate_lead` (unchanged name, so existing GTM
//    triggers keep firing), plus `lead_type: "admission"`.
//  - Contact enquiry: `contact_lead`, plus `lead_type: "contact"`. It has a
//    separate name on purpose. The GTM container has not been inspected, and
//    any tag triggered by `generate_lead` (for example a Google Ads
//    conversion) would otherwise start counting contact enquiries without
//    anyone deciding it should. Until a GTM trigger is added for
//    `contact_lead`, no tag fires on it.

export const GENERATE_LEAD_EVENT = "generate_lead";
export const CONTACT_LEAD_EVENT = "contact_lead";

export type LeadType = "admission" | "contact";

const EVENT_BY_LEAD_TYPE = {
  admission: GENERATE_LEAD_EVENT,
  contact: CONTACT_LEAD_EVENT,
} as const;

export type LeadEvent = {
  event: (typeof EVENT_BY_LEAD_TYPE)[LeadType];
  lead_type: LeadType;
};

export function buildLeadEvent(leadType: LeadType): LeadEvent {
  return { event: EVENT_BY_LEAD_TYPE[leadType], lead_type: leadType };
}

type DataLayerWindow = { dataLayer?: unknown[] };

// Pushes one lead event. Never throws: a broken dataLayer must not block the
// redirect to the Thank You page.
export function pushLeadEvent(
  target: DataLayerWindow,
  leadType: LeadType,
): boolean {
  try {
    target.dataLayer = target.dataLayer || [];
    target.dataLayer.push(buildLeadEvent(leadType));
    return true;
  } catch {
    return false;
  }
}

// A lead counts only when the API confirmed it was saved: an HTTP success
// status AND `{ success: true }` in the body. Validation errors, API errors,
// network errors and unexpected bodies are all not confirmed. Forms call
// this before pushing a lead event or redirecting to /thank-you.
export function isConfirmedLeadResponse(ok: boolean, body: unknown): boolean {
  return (
    ok === true &&
    typeof body === "object" &&
    body !== null &&
    (body as { success?: unknown }).success === true
  );
}
