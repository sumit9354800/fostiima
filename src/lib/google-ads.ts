export function trackLeadConversion() {
  if (typeof window === "undefined" || !window.gtag) {
    console.warn("Google Ads tag is not available.");
    return;
  }

  window.gtag("event", "conversion", {
    send_to: "AW-18383056369/QQL4CJKM644dEPHb3L1E",
    value: 1.0,
    currency: "INR",
  });
}
