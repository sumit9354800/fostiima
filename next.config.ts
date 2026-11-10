import type { NextConfig } from "next";

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
];

// Legacy URLs that Google Search Console reports as "Alternate page with proper
// canonical tag". Each is redirected in a single hop, with or without a
// trailing slash, so these entries go before the trailing-slash rule.
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  {
    source:
      "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/1/image/45",
    destination: "/life-at-fostiima",
  },
  {
    source:
      "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/1/image/22-1",
    destination: "/life-at-fostiima",
  },
  {
    source:
      "/life-at-fostiima.php/nggallery/album/Workshop-on-Self-Awareness/image/self-awarness",
    destination: "/life-at-fostiima",
  },
  {
    source:
      "/life-at-fostiima.php/nggallery/album/Workshop-on-Self-Awareness/image/self-awarness-1",
    destination: "/life-at-fostiima",
  },
  {
    source:
      "/life-at-fostiima.php/nggallery/album/Workshop-on-Self-Awareness/image/self-awarness-3",
    destination: "/life-at-fostiima",
  },
  {
    source:
      "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8715",
    destination: "/life-at-fostiima",
  },
  {
    // Destination as given in the October GSC sheet.
    source: "/blog/tag/top-mba-college-in-delhi/feed",
    destination: "/life-at-fostiima",
  },
];

const nextConfig: NextConfig = {
  // Next's built-in "/:path+/" redirect cannot exclude individual paths, and it
  // runs before Proxy. It is re-declared as the first entry in redirects() below.
  skipTrailingSlashRedirect: true,
  images: {
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
    ];
  },
};


export default nextConfig;
