"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/lead-attribution";

/**
 * Records first-touch lead attribution (see src/lib/lead-attribution.ts).
 *
 * Mounted once in the root layout, so it runs on every public route,
 * including the standalone landing pages (/pgdm-admission, /ag-landing-page)
 * and /thank-you, on the first page view and after each client-side
 * navigation. Admin pages are skipped. Forms read the same record again at
 * submit time, so there is no ordering dependency between this component and
 * a form mounting.
 */
export default function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    captureAttribution();
  }, [pathname]);

  return null;
}
