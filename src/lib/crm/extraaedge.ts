// ExtraaEdge CRM adapter: INTERFACE ONLY, NOT CONNECTED.
//
// Nothing imports this module. It is not wired into the admission API because
// ExtraaEdge's server-side Lead API contract has not been provided: endpoint,
// server auth credential, field names, the Source / sub-source values (or
// IDs) for "ChatGPT", duplicate-lead behaviour and response codes. See
// Performance-Audit/final-approved-implementation-report.md for the exact list.
//
// The website DB row stays the system of record (and the outbox): the lead is
// saved first, and CRM delivery state would be tracked per row so a failed
// delivery is retried, never lost.

export type CrmLeadInput = {
  enquiryId: string; // admission_enquiry.id, used as the idempotency key
  fullName: string;
  mobile: string; // 10-digit Indian mobile (existing format)
  email: string;
  state: string;
  city: string;
  course: string;
  graduationStatus: string;
  remarks: string | null;
  source: string; // allowlisted label, e.g. "ChatGPT" or "FOSTIIMA Website"
  utmCampaign?: string;
  utmContent?: string;
};

export type CrmDeliveryResult =
  | { status: "delivered"; crmLeadId?: string }
  | { status: "duplicate"; crmLeadId?: string }
  | { status: "retryable_error"; reason: string }
  | { status: "permanent_error"; reason: string };

export interface CrmAdapter {
  // Must be idempotent on input.enquiryId and must not throw.
  deliverLead(input: CrmLeadInput): Promise<CrmDeliveryResult>;
}

// Returns null until the vendor-confirmed configuration exists. Variable names
// are placeholders to be finalised with ExtraaEdge; no defaults are assumed.
export function getCrmAdapter(): CrmAdapter | null {
  return null;
}
