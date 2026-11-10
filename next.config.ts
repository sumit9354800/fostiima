import type { NextConfig } from "next";

// Retired WordPress URLs reported by Google Search Console. They must answer
// directly from the slashed URL (200 or genuine 404) instead of 308-ing to
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
      {
        // Same segments and 308 as the built-in rule, minus the paths above.
        // Must stay first so slashed legacy URLs keep their existing hops.
        source: `/:path((?!(?:${DIRECT_RESPONSE_PATHS.join("|")})/$)[^/]+(?:/[^/]+)*)/`,
        destination: "/:path",
        permanent: true,
      },
      {
        source: "/blog/what-is-the-difference-between-ugc-and-aicte",
        destination: "/blog/difference-between-ugc-and-aicte",
        permanent: true,
      },
      {
        source: "/blog/nmat-exam-dates",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/mba-syllabus",
        destination: "/blog/mba-syllabus-2025-overview",
        permanent: true,
      },
      {
        source: "/blog/list-of-mba-specializations-in-india",
        destination: "/blog/mba-specializations-in-india",
        permanent: true,
      },
    ];
  },
};


export default nextConfig;
