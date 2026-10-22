import type { MetadataRoute } from "next";

const BASE_URL = "https://www.fostiima.org";

// Synced with the supplied FOSTIIMA sitemap (last modified: 2026-10-21).
// Keep this list updated when pages are added, removed, or renamed.
const ROUTES = [
  "/",
  "/about-us",
  "/academics",
  "/alumni",
  "/awards-accreditation",
  "/awards-accreditation/aicte-approval-2025-26",
  "/awards-accreditation/aicte-approval-2026-27",
  "/awards-accreditation/nba-approval-28.03.2025",
  "/balance-sheet",
  "/blog",
  "/blog/best-mba-colleges-accepting-cmat-score-in-delhi",
  "/blog/best-mba-colleges-in-delhi-ncr-comparing-roi-placement-packages-and-fees",
  "/blog/best-pgdm-colleges-in-delhi-ncr",
  "/blog/best-pgdm-colleges-in-delhi-ncr-2",
  "/blog/cat-score-and-cat-percentile",
  "/blog/collaborative-mastery-interpersonal-skills-team-performance",
  "/blog/difference-between-ugc-and-aicte",
  "/blog/full-form-of-mba-and-benefits-of-mba",
  "/blog/mba-roi-vs-placements-how-to-choose-the-best-b-school-in-india",
  "/blog/mba-specializations-in-india",
  "/blog/mba-syllabus-2025-overview",
  "/blog/pgdm-colleges-in-delhi-ncr-a-complete-guide-for-management-aspirants",
  "/blog/pgdm-in-the-ai-era-skills-management-students-need-for-future-careers",
  "/blog/pgdm-vs-mba-for-the-future-of-work-which-management-path-fits-your-goals",
  "/blog/the-future-of-ai-in-management-education-insights-from-fostiima-business-schools-aicte-vaani-conference",
  "/blog/top-pgdm-institutes-in-delhi-ncr-courses-fees-admissions-career-opportunities",
  "/blog/top-pgdm-institutes-in-india-admission-specializations-fees-career-scope",
  "/careers",
  "/conclave-conference",
  "/conclave-conference/aima-51st-nmc-2024",
  "/conclave-conference/anil-somani-conversation-with-sadhguru",
  "/conclave-conference/anil-somani-with-ashwini-vaishnaw",
  "/conclave-conference/discussion-on-budget-2024",
  "/conclave-conference/dr-s-jaishankar-indian-express-adda",
  "/conclave-conference/exit-poll",
  "/conclave-conference/fostiima-convocation-2026",
  "/conclave-conference/hr-round-table-2024",
  "/conclave-conference/margdarshak-3",
  "/conclave-conference/margdarshak-4",
  "/conclave-conference/margdarshak-awards-Ceremony",
  "/conclave-conference/mission-ai-sashakt-bharat",
  "/conclave-conference/olympians-manu-bhaker",
  "/conclave-conference/responsible-ai-summit-2026",
  "/contact-us",
  "/faculties",
  "/faculties/ajit-gupta",
  "/faculties/amit-grover",
  "/faculties/arun-sahay",
  "/faculties/atul-mehta",
  "/faculties/brig-ajay-mehta",
  "/faculties/dr-aditya-vij",
  "/faculties/dr-tanuj-jain",
  "/faculties/ferzand",
  "/faculties/gita-ms-agrawal",
  "/faculties/harman-mangat",
  "/faculties/jayant-bose",
  "/faculties/mohammad-maroof",
  "/faculties/mr-anil-somani",
  "/faculties/mr-gautam-kaul",
  "/faculties/mr-hitesh-manocha",
  "/faculties/mr-rajeeva-kansal",
  "/faculties/mr-shagun-s",
  "/faculties/mr-sunil-kala",
  "/faculties/mr-vinod-kaul",
  "/faculties/ms-dishi-s",
  "/faculties/ms-mohini-deshwal",
  "/faculties/ms-ridhi-sehgal",
  "/faculties/nadira-chaturvedi",
  "/faculties/nimisha-srivastava",
  "/faculties/preeti-taneja",
  "/faculties/pulak-palit",
  "/faculties/rakesh-kumar",
  "/faculties/ritika-arora",
  "/faculties/ruchika-yadav",
  "/faculties/sameer-kathuria",
  "/faculties/sanjay-chandwani",
  "/faculties/sc-bansal",
  "/faculties/shailaja-manocha",
  "/faculties/sharad-kumar",
  "/faculties/vikram-tyagi",
  "/faculties/vivek-kumar",
  "/fee-structure",
  "/fostiima-strength",
  "/grievance-helpline",
  "/how-to-apply",
  "/hr-policy",
  "/life-at-fostiima",
  "/life-at-fostiima/academic-excellence",
  "/life-at-fostiima/brain-storming",
  "/life-at-fostiima/business-exposure-tips",
  "/life-at-fostiima/corporate-talk",
  "/life-at-fostiima/cultural-events",
  "/life-at-fostiima/cultural-events/aagaman-day",
  "/life-at-fostiima/cultural-events/diwali-mela",
  "/life-at-fostiima/cultural-events/marketing-carnival",
  "/life-at-fostiima/cultural-events/milan",
  "/life-at-fostiima/cultural-events/swadeshi-mela",
  "/life-at-fostiima/cultural-events/teachers-day",
  "/life-at-fostiima/cultural-events/vitt-manthan",
  "/life-at-fostiima/sports-and-fitness",
  "/life-at-fostiima/team-building-camp",
  "/margdarshak",
  "/nirf",
  "/placement",
  "/placement/companies-visited",
  "/placement/final-placements",
  "/placement/placement-rate",
  "/placement/summer-internship",
  "/privacy-policy",
  "/programs",
  "/programs/ai-analytics-operations",
  "/programs/business-analytics",
  "/programs/international-business",
  "/programs/pgdm",
  "/programs/pgdm-finance",
  "/programs/pgdm-human-resource-management",
  "/programs/pgdm-marketing",
  "/refund-policy",
  "/terms-and-conditions",
] as const;

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
