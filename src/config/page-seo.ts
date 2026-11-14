import type { PageSeo } from "@/lib/seo";

// Client-supplied SEO metadata from "Meta Data - Fostiima.xlsx" (Sheet1), for
// static pages. Keys are page paths; R<n> is the spreadsheet row. Values are
// used as given. Fields that are absent here keep the page's existing value:
// they were held because the copy is not supported by the site's content
// (see Performance-Audit/meta-data-fostiima-implementation-audit.md):
// - R2 title, OG title and OG description, R16, R30, R31 title, description
//   and OG description: describe FOSTIIMA as an MBA college or programme;
//   AICTE approves its PGDM only.
// - R9: claims NBA approval; that page's document is the AICTE extension of
//   approval for 2025-26.
// Meta keywords are not output (see src/app/(site)/blog/[slug]/page.tsx).
// Blog posts (R33-R35) get their metadata from the CMS, not from here.
export const PAGE_SEO: Readonly<Record<string, PageSeo>> = {
  "/": {
    // R2 (held: title, ogTitle, ogDescription)
    description: "Looking for MBA colleges in Delhi NCR? Fostiima in Dwarka offers AICTE-approved PGDM programs. Explore fees and admissions.",
  },
  "/about-us": {
    // R3
    title: "About Fostiima | Business School in Delhi",
    description: "Learn about Fostiima Business School in Delhi: our vision, leadership, faculty and approach to PGDM management education.",
    ogTitle: "About Fostiima Business School, Delhi",
    ogDescription: "Know Fostiima Business School: its story, people and PGDM-focused approach to management education in Delhi.",
  },
  "/academics": {
    // R4
    title: "Academics | PGDM Curriculum at Fostiima",
    description: "Explore the PGDM curriculum, learning approach and academic experience at Fostiima Business School, Delhi.",
    ogTitle: "Academics at Fostiima Business School",
    ogDescription: "See how Fostiima structures its PGDM curriculum and academic practices for management students in Delhi.",
  },
  "/alumni": {
    // R5
    title: "Fostiima Alumni | Network of PGDM Graduates",
    description: "Meet the Fostiima alumni community and explore how PGDM graduates stay connected with the institute.",
    ogTitle: "Fostiima Alumni Network",
    ogDescription: "Connect with Fostiima’s PGDM alumni community.",
  },
  "/awards-accreditation": {
    // R6
    title: "Awards & Accreditation | Fostiima",
    description: "View Fostiima’s awards, AICTE approvals and accreditation details for its PGDM programs at this Delhi business school.",
    ogTitle: "Awards and Accreditation at Fostiima",
    ogDescription: "Explore Fostiima’s recognitions, AICTE approvals and accreditation for its PGDM programs.",
  },
  "/awards-accreditation/aicte-approval-2025-26": {
    // R7
    title: "AICTE Approval 2025-26 | Fostiima",
    description: "View Fostiima’s AICTE approval for the 2025-26 academic year covering its PGDM programs in Delhi.",
    ogTitle: "AICTE Approval 2025-26 | Fostiima",
    ogDescription: "AICTE approval details for Fostiima’s PGDM programs for the 2025-26 academic year.",
  },
  "/awards-accreditation/aicte-approval-2026-27": {
    // R8
    title: "AICTE Approved PGDM Colleges in Delhi 2026-27",
    description: "Fostiima’s PGDM programs hold AICTE approval for 2026-27. Check the approval details for AICTE approved PGDM colleges in Delhi.",
    ogTitle: "AICTE Approved PGDM Colleges in Delhi | Fostiima",
    ogDescription: "See Fostiima’s AICTE approval for 2026-27 and why it matters for PGDM aspirants in Delhi.",
  },
  // /awards-accreditation/nba-approval-28.03.2025: R9 — all fields held.
  "/careers": {
    // R10
    title: "Careers at Fostiima | Join Our Team",
    description: "Explore career opportunities at Fostiima Business School in Delhi and join a team shaping future managers.",
    ogTitle: "Careers at Fostiima Business School",
    ogDescription: "Find out how to join the Fostiima team in Delhi and grow with us.",
  },
  "/conclave-conference": {
    // R11
    title: "Conclaves & Conferences | Fostiima",
    description: "Explore conclaves, conferences and leadership conversations hosted by Fostiima Business School in Delhi.",
    ogTitle: "Fostiima Conclaves and Conferences",
    ogDescription: "See the conclaves and conferences hosted by Fostiima Business School.",
  },
  "/contact-us": {
    // R12
    title: "Contact Us | Fostiima Business School, Delhi",
    description: "Get in touch with Fostiima Business School in Delhi for admission queries and program information.",
    ogTitle: "Contact Fostiima Business School",
    ogDescription: "Reach the Fostiima team for admissions and program details.",
  },
  "/faculties": {
    // R13
    title: "Our Faculty | Fostiima Business School",
    description: "Meet the faculty of Fostiima Business School, Delhi, and explore their profiles and areas of expertise.",
    ogTitle: "Meet the Faculty | Fostiima",
    ogDescription: "Know the faculty guiding PGDM students at Fostiima Business School, Delhi.",
  },
  "/fee-structure": {
    // R14
    title: "Fee Structure | PGDM at Fostiima Delhi",
    description: "Check the PGDM fee structure at Fostiima Business School, Delhi: program fees, payment details and other charges.",
    ogTitle: "PGDM Fee Structure | Fostiima",
    ogDescription: "Know the PGDM fees at Fostiima Business School, Delhi before you apply.",
  },
  "/fostiima-strength": {
    // R15
    title: "The Fostiima Strength | Why Choose Fostiima",
    description: "Discover what sets Fostiima Business School apart in Delhi and why aspirants choose its PGDM programs.",
    ogTitle: "Why Choose Fostiima Business School",
    ogDescription: "Explore the strengths that define Fostiima’s PGDM experience in Delhi.",
  },
  // /how-to-apply: R16 — all fields held.
  "/life-at-fostiima": {
    // R17
    title: "Life at Fostiima | Campus Life in Delhi",
    description: "Explore campus life at Fostiima Business School, Delhi: cultural events, sports, team building and learning beyond classrooms.",
    ogTitle: "Campus Life at Fostiima, Delhi",
    ogDescription: "See cultural events, sports and team-building experiences at Fostiima.",
  },
  "/margdarshak": {
    // R18
    title: "Margdarshak | Fostiima Initiative",
    description: "Learn about Margdarshak, an initiative of Fostiima Business School, Delhi, and its award ceremonies.",
    ogTitle: "Margdarshak at Fostiima",
    ogDescription: "Know about Margdarshak, an initiative of Fostiima Business School, Delhi.",
  },
  "/nirf": {
    // R19
    title: "NIRF | Fostiima Business School, Delhi",
    description: "View NIRF-related disclosures and ranking information for Fostiima Business School, Delhi.",
    ogTitle: "NIRF Information | Fostiima",
    ogDescription: "NIRF disclosures and ranking information for Fostiima Business School.",
  },
  "/placement": {
    // R20
    title: "PGDM Placements in Delhi | Fostiima",
    description: "Explore placements at Fostiima Business School, Delhi: recruiters, final placements, placement rate and summer internships.",
    ogTitle: "Placements at Fostiima Business School",
    ogDescription: "See recruiters, final placements, placement rate and internships at Fostiima.",
  },
  "/placement/companies-visited": {
    // R21
    title: "Companies Visited | Fostiima Placements",
    description: "See the companies that visited Fostiima Business School, Delhi, for campus recruitment of PGDM students.",
    ogTitle: "Recruiters Visiting Fostiima",
    ogDescription: "Explore the companies that visit Fostiima for PGDM campus recruitment.",
  },
  "/placement/final-placements": {
    // R22
    title: "Final Placements | Fostiima Business School",
    description: "Review the final placement outcomes of Fostiima PGDM students at this Delhi business school.",
    ogTitle: "Final Placements at Fostiima",
    ogDescription: "See final placement outcomes for Fostiima PGDM students.",
  },
  "/placement/placement-rate": {
    // R23
    title: "Placement Rate | Fostiima PGDM Placements",
    description: "Check the placement rate of Fostiima’s PGDM programs at this Delhi business school.",
    ogTitle: "Placement Rate at Fostiima",
    ogDescription: "Know the placement rate of Fostiima’s PGDM programs.",
  },
  "/placement/summer-internship": {
    // R24
    title: "Summer Internship | Fostiima PGDM",
    description: "Learn about summer internships for PGDM students at Fostiima Business School, Delhi.",
    ogTitle: "Summer Internships at Fostiima",
    ogDescription: "Summer internship details for Fostiima PGDM students.",
  },
  "/programs": {
    // R25
    title: "PGDM Courses & Specializations | Fostiima",
    description: "Explore PGDM courses and specializations at Fostiima, Delhi, including finance, marketing, HR, analytics and international business",
    ogTitle: "PGDM Courses & Specializations at Fostiima",
    ogDescription: "Choose from multiple PGDM courses and specializations in finance, marketing, HR, analytics, international business and more at Fostiima.",
  },
  "/programs/pgdm": {
    // R26
    title: "PGDM in Delhi NCR | PGDM Courses | Fostiima",
    description: "Pursue PGDM in Delhi at Fostiima. Explore PGDM courses in Delhi NCR, curriculum, specializations and admission details.",
    ogTitle: "PGDM in Delhi NCR | Fostiima Business School",
    ogDescription: "Fostiima’s PGDM in Delhi NCR: courses, specializations and admissions for future managers.",
  },
  "/programs/ai-analytics-operations": {
    // R27
    title: "PGDM in AI, Analytics & Operations | Fostiima",
    description: "Explore Fostiima’s PGDM in AI, Analytics and Operations in Delhi: curriculum, skills and career pathways for future managers.",
    ogTitle: "PGDM in AI, Analytics & Operations",
    ogDescription: "Explore Fostiima’s PGDM in AI, Analytics and Operations, built for future managers in Delhi.",
  },
  "/programs/business-analytics": {
    // R28
    title: "PGDM in Business Analytics | Fostiima Delhi",
    description: "Study PGDM in Business Analytics at Fostiima, Delhi, and build skills to turn data into business decisions.",
    ogTitle: "PGDM in Business Analytics | Fostiima",
    ogDescription: "Build data-driven decision skills with Fostiima’s PGDM in Business Analytics.",
  },
  "/programs/international-business": {
    // R29
    title: "PGDM in International Business | Fostiima",
    description: "Explore PGDM in International Business at Fostiima, Delhi, and learn how global trade and cross-border business work.",
    ogTitle: "PGDM in International Business | Fostiima",
    ogDescription: "Prepare for global business careers with Fostiima’s PGDM in International Business.",
  },
  // /programs/pgdm-finance: R30 — all fields held.
  "/programs/pgdm-human-resource-management": {
    // R31 (held: title, description, ogDescription)
    ogTitle: "PGDM in Human Resource Management | Fostiima",
  },
  "/programs/pgdm-marketing": {
    // R32
    title: "PGDM in Marketing | Fostiima Business School",
    description: "Explore PGDM in Marketing at Fostiima, Delhi, and the marketing skills it builds for future managers.",
    ogTitle: "PGDM in Marketing | Fostiima",
    ogDescription: "Build marketing skills with Fostiima’s PGDM in Marketing in Delhi.",
  },
};
