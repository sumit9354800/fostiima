import type { NextConfig } from "next";

import { GSC_NOV_2026_REDIRECTS } from "./src/config/gsc-redirects-nov-2026";

// Every redirect on the site is a 301. Next's `permanent: true` would send 308.
const PERMANENT_REDIRECT = 301 as const;

// Retired WordPress URLs reported by Google Search Console. They must answer
// directly from the slashed URL (200 or genuine 404) instead of redirecting to
// their slashless form first. Matched exactly: paths without leading/trailing "/".
const DIRECT_RESPONSE_PATHS = [
  "blog/mat-exam",
  "blog/welcome-to-top-ranking-fostiima-business-school-for-the-session-22-24",
  "blog/tag/management-colleges-in-delhi/feed",
  "blog/tag/management-colleges/feed",
  "blog/author/admin/page/2",
  "blog/tag/mdp",
  "blog/tag/top-business-school-in-delhi/feed",
  "blog/tag/top-mba-colleges-in-delhi-ncr/feed",
  "blog/tag/best-aicte-approved-mba-colleges-in-delhi/feed",
  "blog/tag/best-mba-pgdm-specialization/feed",
  "blog/tag/best-mba-colleges-syllabus/feed",
  "blog/tag/best-pgdm-colleges-in-delhi-ncr/feed",
  "blog/tag/mba-institute-in-delhi-ncr/feed",
  "blog/tag/best-pgdm-college-in-delhi-ncr/feed",
  // GSC sheet: "Keep 404" (also blocked in robots.ts).
  "blog/the-ultimate-guide-to-success-when-seeking-an-mba-pgdm",
];

// Legacy URLs that Google Search Console reports as "Alternate page with proper
// canonical tag". Each is redirected in a single hop, with or without a
// trailing slash, so these entries go before the trailing-slash rule.
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  // Only these gallery URLs are redirected. Every other
  // "/life-at-fostiima.php/nggallery/..." URL stays a 404 (GSC sheet: "Keep
  // 404") and is blocked in robots.ts. Keep this list in sync with the
  // matching Allow rules there.
  ...[
    "freshy-meet-2021-new/page/1/image/45",
    "freshy-meet-2021-new/page/1/image/22-1",
    "Workshop-on-Self-Awareness/image/self-awarness",
    "Workshop-on-Self-Awareness/image/self-awarness-1",
    "Workshop-on-Self-Awareness/image/self-awarness-3",
    "lohri-2024/page/2/image/img_8715",
  ].map((album) => ({
    source: `/life-at-fostiima.php/nggallery/album/${album}`,
    destination: "/life-at-fostiima",
  })),
  {
    // Destination as given in the October GSC sheet.
    source: "/blog/tag/top-mba-college-in-delhi/feed",
    destination: "/life-at-fostiima",
  },
  {
    // "Restore old post": the migrated post's slug ends in a stray hyphen.
    source: "/blog/what-is-the-full-form-of-mba-and-benefits-of-mba",
    destination: "/blog/what-is-the-full-form-of-mba-and-benefits-of-mba-",
  },
  // Margdarshak event slugs renamed to match the edition each page shows
  // (the old "margdarshak-3" page was the 2.0 ceremony) and to remove the
  // uppercase "C", which made case-duplicate URLs possible.
  {
    source: "/conclave-conference/margdarshak-3",
    destination: "/conclave-conference/margdarshak-2-award-ceremony",
  },
  {
    source:
      "/conclave-conference/margdarshak-awards-:ceremony(Ceremony|ceremony)",
    destination: "/conclave-conference/margdarshak-3-award-ceremony",
  },
];
// Pages from the old PHP site that Google still crawls (GSC "Look out for
// previous internal links and remove them", October 2026). Nothing on the site
// links to them any more, so each is sent to its closest current page.
const LEGACY_PHP_PAGES: Record<string, string> = {
  // Home
  "/index.php": "/",
  "/faqs.php": "/",

  // About
  "/aboutus.php": "/about-us",
  "/about-fbs.php": "/about-us",
  "/aboutus/message-from-chairman.php": "/about-us",
  "/aboutus/message-from-director.php": "/about-us",
  "/aboutus/our-vision.php": "/about-us",
  "/aboutus/our-objectives.php": "/about-us",
  "/aboutus/founder-trustees.php": "/about-us",
  "/aboutus/founder-trustees/anil-somani.php": "/faculties/mr-anil-somani",
  "/aboutus/founder-trustees/sunil-kala.php": "/faculties/mr-sunil-kala",
  "/aboutus/founder-trustees/rajesh-kaura.php": "/about-us",
  "/aboutus/founder-trustees/jaithirth-rao.php": "/about-us",
  "/aboutus/founder-trustees/kamal-sharma.php": "/about-us",
  "/aboutus/founder-trustees/t-l-palani-kumar.php": "/about-us",
  "/committee-members.php": "/about-us",
  "/advisory-board.php": "/about-us",
  "/iqac.php": "/about-us",
  "/fostiima-strength.php": "/fostiima-strength",

  // Academics and programmes
  "/academics.php": "/academics",
  "/academics/mba-pgdm-courses.php": "/programs",
  "/academics/mba-pgdm-courses/course-eligibility.php": "/programs/pgdm",
  "/academics/mba-pgdm-courses/course-module.php": "/programs/pgdm",
  "/pgdm-brochure.php": "/programs/pgdm",
  "/academics/the-pinnacle-hybrid-executive-mba.php": "/programs",
  "/academics/the-pinnacle-hybrid-executive-mba/the-pinnacle-mba.php":
    "/programs",
  "/academics/the-pinnacle-hybrid-executive-mba/the-pinnacle-mba/admission-process.php":
    "/programs",
  "/academics/the-pinnacle-hybrid-executive-mba/the-pinnacle-mba/course-module.php":
    "/programs",
  "/academics/the-pinnacle-hybrid-executive-mba/the-pinnacle-mba/the-pinnacle-faculty.php":
    "/faculties",

  // Faculty
  "/academics/faculty.php": "/faculties",
  "/academics/faculty/core-faculty.php": "/faculties",
  "/academics/faculty/visiting-faculty.php": "/faculties",
  "/academics/faculty/advisory-council.php": "/faculties",
  "/faculty-innovations-in-teaching.php": "/faculties",

  // Admissions
  "/admissions.php": "/how-to-apply",
  "/admissions/how-to-apply.php": "/how-to-apply",
  "/admission-closed-2022-24.php": "/how-to-apply",
  "/applicationexecmba.php": "/how-to-apply",
  "/registration.php": "/how-to-apply",
  "/pgdm-admission.php": "/pgdm-admission",
  "/admissions/fee-structure.php": "/fee-structure",
  "/admissions/student-testimonial.php": "/alumni",

  // Placement
  "/placement.php": "/placement",
  "/placement/final-placements/:batch([^/]+)\\.php": "/placement/final-placements",
  "/placement/summer-internship/:batch([^/]+)\\.php":
    "/placement/summer-internship",

  // Life at FOSTIIMA
  "/life-at-fostiima.php": "/life-at-fostiima",
  "/life-at-fostiima-2.php": "/life-at-fostiima",

  // Events, conclaves and Margdarshak
  "/news-events.php": "/conclave-conference",
  "/conferences.php": "/conclave-conference",
  "/call-for-papers.php": "/conclave-conference",
  "/ai-conclave-2026.php": "/conclave-conference",
  "/about-margdarshak.php": "/margdarshak",
  "/margdharshak-contact-details.php": "/margdarshak",
  "/margdarshak-1.php": "/margdarshak",
  "/margdarshak-2.php": "/margdarshak",
  "/margdarshak-3.php": "/conclave-conference/margdarshak-3-award-ceremony",
  "/margdarshak-4-upcoming-event.php": "/conclave-conference/margdarshak-4",

  // Accreditation and disclosures
  "/award.php": "/awards-accreditation",
  "/awards-accreditations.php": "/awards-accreditation",
  "/aicte-approval-2020.php": "/awards-accreditation",
  "/nirf.php": "/nirf",
  "/balance-sheet.php": "/balance-sheet",
  "/hr-policy-2024-25.php": "/hr-policy",

  // Contact, careers and policies
  "/contact-us.php": "/contact-us",
  "/careers.php": "/careers",
  "/grievance-helpline.php": "/grievance-helpline",
  "/privacy-policy.php": "/privacy-policy",
  "/terms-conditions.php": "/terms-and-conditions",
  "/refund-policy-cancellation-policy.php": "/refund-policy",
};

for (const [source, destination] of Object.entries(LEGACY_PHP_PAGES)) {
  LEGACY_REDIRECTS.push({ source, destination });
}

// Old URLs listed in "GSC issues nov 2026" (src/config/gsc-redirects-nov-2026.ts).
// One rule per destination holds an exact list of paths as alternatives, so
// the 374 paths add about 30 rules instead of 748 (Vercel allows at most 1,024
// redirects). Each path is matched exactly, with or without a trailing slash,
// and redirected in one hop. Lists are split into chunks to keep every
// pattern short.
const GSC_NOV_2026_CHUNK_SIZE = 40;

// Path (with leading "/") to a path-to-regexp pattern. Regex characters are
// escaped. A space may arrive encoded or not, and "//" is collapsed to "/" by
// Next.js before redirects run, so both forms are accepted.
function toExactPathPattern(path: string): string {
  return path
    .slice(1)
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/ /g, "(?: |%20)")
    .replace(/\/\//g, "/+");
}

const GSC_NOV_2026_RULES = Object.entries(GSC_NOV_2026_REDIRECTS).flatMap(
  ([destination, sources]) => {
    const rules: { source: string; destination: string }[] = [];

    for (let i = 0; i < sources.length; i += GSC_NOV_2026_CHUNK_SIZE) {
      const pattern = sources
        .slice(i, i + GSC_NOV_2026_CHUNK_SIZE)
        .map(toExactPathPattern)
        .join("|");

      // The named parameter is not used in the destination, so the matched
      // path is not added to it.
      rules.push(
        { source: `/:gscPath(${pattern})`, destination },
        { source: `/:gscPath(${pattern})/`, destination },
      );
    }

    return rules;
  },
);

// Folders in /public that hold images or video, and the media extensions that
// get the cache policy below (see headers()).
const PUBLIC_MEDIA_FOLDERS = [
  "about",
  "alumni",
  "awards-accreditation",
  "badge",
  "banner",
  "conclave",
  "events",
  "final-placement",
  "home",
  "life-at-fostiima",
  "placement",
  "student-achievements",
  "uploads",
];
const PUBLIC_MEDIA_EXTENSIONS = [
  "webp",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "avif",
  "svg",
  "mp4",
  "webm",
  "mov",
  "MOV",
];
const PUBLIC_MEDIA_CACHE_CONTROL =
  "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  // Next's built-in "/:path+/" redirect cannot exclude individual paths, and it
  // runs before Proxy. It is re-declared as the first entry in redirects() below.
  skipTrailingSlashRedirect: true,
  images: {
    // The default list ends at 3840px, which full-width images without a
    // "sizes" hint requested on large screens. 2048px covers 1024px CSS at 2x.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bdaddtyz0jzeqxij.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      ...LEGACY_REDIRECTS.flatMap(({ source, destination }) =>
        [source, `${source}/`].map((path) => ({
          source: path,
          destination,
          statusCode: PERMANENT_REDIRECT,
        })),
      ),
      // Also ahead of the trailing-slash rule, so slashed URLs redirect in
      // one hop instead of first losing their slash.
      ...GSC_NOV_2026_RULES.map(({ source, destination }) => ({
        source,
        destination,
        statusCode: PERMANENT_REDIRECT,
      })),
      {
        // Same segments as the built-in rule, minus the paths above, but 301
        // instead of the built-in 308.
        // Must stay ahead of the redirects below so slashed legacy URLs keep
        // their existing hops.
        source: `/:path((?!(?:${DIRECT_RESPONSE_PATHS.join("|")})/$)[^/]+(?:/[^/]+)*)/`,
        destination: "/:path",
        statusCode: PERMANENT_REDIRECT,
      },
      {
        source: "/blog/what-is-the-difference-between-ugc-and-aicte",
        destination: "/blog/difference-between-ugc-and-aicte",
        statusCode: PERMANENT_REDIRECT,
      },
      {
        source: "/blog/nmat-exam-dates",
        destination: "/blog",
        statusCode: PERMANENT_REDIRECT,
      },
      {
        source: "/blog/mba-syllabus",
        destination: "/blog/mba-syllabus-2025-overview",
        statusCode: PERMANENT_REDIRECT,
      },
      {
        source: "/blog/list-of-mba-specializations-in-india",
        destination: "/blog/mba-specializations-in-india",
        statusCode: PERMANENT_REDIRECT,
      },
      {
        // Duplicate of the complete post (exact match only).
        source: "/blog/best-pgdm-colleges-in-delhi-ncr-2",
        destination: "/blog/best-pgdm-colleges-in-delhi-ncr",
        statusCode: PERMANENT_REDIRECT,
      },
      {
        source: "/life-at-fostiima/cultural-events/stockify",
        destination: "/events/stockify",
        statusCode: PERMANENT_REDIRECT,
      },
      {
        source: "/life-at-fostiima/cultural-events/finquest",
        destination: "/events/finquest",
        statusCode: PERMANENT_REDIRECT,
      },
    ];
  },
  async headers() {
    // Browser caching for image and video files in /public. Their names are
    // not content-hashed and a file can be replaced under the same name, so
    // they are NOT cached as immutable: fresh for 1 day, then served stale for
    // up to 7 more days while the browser revalidates in the background.
    // HTML, API routes, PDFs (/documents), sitemaps and root files keep the
    // default headers; /_next/static and /_next/image are not affected.
    // Several of these folder names are also page routes (/alumni,
    // /events/..., /placement/..., /life-at-fostiima, /awards-accreditation),
    // so the rule only matches paths that end in a media file extension.
    return [
      {
        source: `/:folder(${PUBLIC_MEDIA_FOLDERS.join("|")})/:file(.+\\.(?:${PUBLIC_MEDIA_EXTENSIONS.join("|")}))`,
        headers: [
          {
            key: "Cache-Control",
            value: PUBLIC_MEDIA_CACHE_CONTROL,
          },
        ],
      },
    ];
  },
};


export default nextConfig;
