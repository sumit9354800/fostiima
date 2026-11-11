import type { MetadataRoute } from "next";

import { SITE_ROUTES } from "@/config/site-routes";

const BASE_URL = "https://www.fostiima.org";

const ROUTES = SITE_ROUTES;

function getPriority(path: string): number {
  if (path === "/") return 1;
  if (path === "/how-to-apply" || path === "/fee-structure" || path === "/programs" || path === "/programs/pgdm") return 0.9;
  if (path === "/about-us" || path === "/academics" || path === "/faculties" || path === "/placement" || path === "/life-at-fostiima" || path === "/blog") return 0.8;
  if (path.startsWith("/blog/") || path.startsWith("/programs/") || path.startsWith("/faculties/")) return 0.7;
  if (path.startsWith("/placement/") || path.startsWith("/life-at-fostiima/") || path.startsWith("/conclave-conference/") || path.startsWith("/awards-accreditation/")) return 0.7;
  if (["/privacy-policy", "/refund-policy", "/terms-and-conditions"].includes(path)) return 0.3;
  if (["/balance-sheet", "/hr-policy", "/nirf"].includes(path)) return 0.5;
  return 0.6;
}

function getChangeFrequency(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path === "/" || path === "/blog" || path.startsWith("/blog/")) return "weekly";
  if (["/balance-sheet", "/hr-policy", "/nirf", "/privacy-policy", "/refund-policy", "/terms-and-conditions"].includes(path)) return "yearly";
  return "monthly";
}


export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-21");

  return ROUTES.map((path) => ({
    url: path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: getChangeFrequency(path),
    priority: getPriority(path),
  }));
}
