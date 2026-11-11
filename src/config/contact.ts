// The one admissions phone number used across the site (header, footer, mobile
// menu, contact page, WhatsApp button). Keep it identical to the Google
// Business Profile and any schema markup.
export const ADMISSIONS_PHONE = {
  /** As shown to visitors. */
  display: "+91-76783 91245",
  /** For tel: links. */
  href: "tel:+917678391245",
  /** Digits only, with country code, for wa.me links. */
  whatsapp: "917678391245",
} as const;

export const WHATSAPP_URL = `https://wa.me/${ADMISSIONS_PHONE.whatsapp}`;
