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
    // Old NextGEN Gallery pages: every album, page and image under the PHP
    // life-at-fostiima page, plus the page itself.
    source: "/life-at-fostiima.php/:path*",
    destination: "/life-at-fostiima",
  },
  {
    // Destination as given in the October GSC sheet.
    source: "/blog/tag/top-mba-college-in-delhi/feed",
    destination: "/life-at-fostiima",
  },
  {
    // The post's slug lost the hyphen in "mba-pgdm" when it was migrated.
    source: "/blog/the-ultimate-guide-to-success-when-seeking-an-mba-pgdm",
    destination: "/blog/the-ultimate-guide-to-success-when-seeking-an-mbapgdm",
  },
  // Stray homepage URLs ("/&", "/$") Google picked up from malformed links.
  { source: "/&", destination: "/" },
  { source: "/\\$", destination: "/" },
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
  "/our-vision.php": "/about-us",
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
  "/margdarshak-3.php": "/conclave-conference/margdarshak-3",
  "/margdarshak-4-upcoming-event.php": "/conclave-conference/margdarshak-4",

  // Accreditation and disclosures
  "/award.php": "/awards-accreditation",
  "/awards.php": "/awards-accreditation",
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
