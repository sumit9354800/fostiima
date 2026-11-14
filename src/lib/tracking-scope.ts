// Which routes may load third-party tracking (GTM and Microsoft Clarity).
//
// Admin pages show student names, emails and phone numbers as page text, so
// tracking must never run there. Every other route is public and tracked,
// including the standalone landing pages (/pgdm-admission, /ag-landing-page),
// /thank-you and 404 pages, exactly as before.

export const GTM_ID = "GTM-5V6T54N";
export const CLARITY_PROJECT_ID = "zcg11c51hw";

// `/admin` and every nested Admin route (`/admin/...`), including the login
// page and Admin 404s. A missing pathname fails closed (not tracked).
export function isTrackedPath(pathname: string | null | undefined): boolean {
  if (typeof pathname !== "string" || pathname === "") return false;
  const path = pathname.toLowerCase();
  return !(path === "/admin" || path.startsWith("/admin/"));
}

// Scripts cannot be unloaded once they run. If tracking already started in
// this document (a public page was viewed) and the visitor then reaches an
// Admin route by client-side navigation (e.g. the browser Back button after
// "Back to Website"), the page must be reloaded so Admin renders in a fresh
// document with no tracking. Never reloads otherwise, so there is no loop:
// after the reload, tracking has not started in the new document.
export function shouldReloadToStopTracking(
  pathname: string | null | undefined,
  trackingStarted: boolean,
): boolean {
  return trackingStarted && !isTrackedPath(pathname);
}
