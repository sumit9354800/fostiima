import type { Metadata } from "next";
import Link from "next/link";

import { SITE_ROUTES } from "@/config/site-routes";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sitemap",
  description:
    "Every page on the FOSTIIMA Business School website: programmes, admissions, placements, faculty, campus life, events and blog.",
  path: "/sitemap",
});

const SECTION_NAMES: Record<string, string> = {
  "": "Main pages",
  "awards-accreditation": "Awards & Accreditation",
  blog: "Blog",
  "conclave-conference": "Conclaves & Conferences",
  events: "Events",
  faculties: "Faculty",
  "life-at-fostiima": "Life at FOSTIIMA",
  placement: "Placement",
  programs: "Programmes",
};

const WORD_OVERRIDES: Record<string, string> = {
  ai: "AI",
  aicte: "AICTE",
  cat: "CAT",
  cmat: "CMAT",
  fostiima: "FOSTIIMA",
  hr: "HR",
  mba: "MBA",
  nba: "NBA",
  ncr: "NCR",
  nirf: "NIRF",
  pgdm: "PGDM",
  roi: "ROI",
  ugc: "UGC",
};

function labelFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map(
      (word) =>
        WORD_OVERRIDES[word.toLowerCase()] ??
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

function labelFromPath(path: string): string {
  if (path === "/") {
    return "Home";
  }

  const segments = path.split("/").filter(Boolean);

  return labelFromSlug(segments[segments.length - 1]);
}

/** Groups routes by their first path segment; top-level pages go together. */
function groupRoutes(routes: readonly string[]) {
  const groups = new Map<string, string[]>();

  for (const route of routes) {
    const segments = route.split("/").filter(Boolean);
    const section =
      segments.length > 1 || SECTION_NAMES[segments[0] ?? ""] ? segments[0] ?? "" : "";
    const list = groups.get(section) ?? [];

    list.push(route);
    groups.set(section, list);
  }

  return [...groups.entries()].map(([section, paths]) => ({
    section,
    name: SECTION_NAMES[section] ?? labelFromSlug(section),
    paths,
  }));
}

export default function SitemapPage() {
  const groups = groupRoutes(SITE_ROUTES);

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#061a3a] px-6 py-14 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold sm:text-4xl">Sitemap</h1>
          <p className="mt-3 max-w-3xl text-white/80">
            All pages on the FOSTIIMA Business School website.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {groups.map((group) => (
          <section key={group.section || "main"}>
            <h2 className="border-b border-slate-200 pb-2 text-lg font-bold text-[#123b79]">
              {group.name}
            </h2>
            <ul className="mt-4 space-y-2">
              {group.paths.map((path) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="text-sm text-slate-700 hover:text-[#c31e3b] hover:underline"
                  >
                    {labelFromPath(path)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
