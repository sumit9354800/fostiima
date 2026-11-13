"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/lead-attribution";

/**
 * Initializes campaign lead attribution on public pages.
 *
 * Runs on initial public landing and subsequent client-side navigation.
 * Allowlisted campaign parameters (e.g. utm_source=chatgpt&utm_medium=paid)
 * are captured into sessionStorage on first touch so attribution is preserved
 * when the visitor navigates internally to an admission enquiry form.
 */
export default function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  return null;
}
