import type { PageSeo } from "@/lib/seo";

// Client-supplied SEO metadata from "Meta Data - Fostiima.xlsx" (Sheet1).
// Keys are page paths; R<n> is the spreadsheet row. Values are used exactly
// as given (applied by withPageSeo() in src/lib/seo.ts). Blog posts listed
// here override their CMS metadata; other posts keep the CMS values.
// All 34 rows are applied, including the client-approved NBA (R9) and MBA
// wording (R2, R16, R30, R31). Only metadata is set here; the pages' visible
// content and documents are unchanged.
export const PAGE_SEO: Readonly<Record<string, PageSeo>> = {
  "/": {
    // R2
    title: "Best MBA College in Delhi NCR | PGDM | Fostiima",
    description: "Looking for MBA colleges in Delhi NCR? Fostiima in Dwarka offers AICTE-approved PGDM programs. Explore fees and admissions.",
    keywords: "mba colleges in delhi ncr, mba colleges in delhi, mba institute in delhi, mba institute in delhi ncr, mba colleges in dwarka delhi, Fostiima PGDM",
    ogTitle: "Fostiima | MBA Colleges in Delhi NCR (Dwarka)",
    ogDescription: "Fostiima Business School, an MBA institute in Delhi NCR offering AICTE-approved PGDM. Explore programs, placements and admissions.",
  },
  "/about-us": {
    // R3
    title: "About Fostiima | Business School in Delhi",
    description: "Learn about Fostiima Business School in Delhi: our vision, leadership, faculty and approach to PGDM management education.",
    keywords: "about Fostiima, Fostiima Business School, business school in Delhi, PGDM college Delhi",
    ogTitle: "About Fostiima Business School, Delhi",
    ogDescription: "Know Fostiima Business School: its story, people and PGDM-focused approach to management education in Delhi.",
  },
  "/academics": {
    // R4
    title: "Academics | PGDM Curriculum at Fostiima",
    description: "Explore the PGDM curriculum, learning approach and academic experience at Fostiima Business School, Delhi.",
    keywords: "Fostiima academics, PGDM curriculum, PGDM academics Delhi",
    ogTitle: "Academics at Fostiima Business School",
    ogDescription: "See how Fostiima structures its PGDM curriculum and academic practices for management students in Delhi.",
  },
  "/alumni": {
    // R5
    title: "Fostiima Alumni | Network of PGDM Graduates",
    description: "Meet the Fostiima alumni community and explore how PGDM graduates stay connected with the institute.",
    keywords: "Fostiima alumni, PGDM alumni, alumni network",
    ogTitle: "Fostiima Alumni Network",
    ogDescription: "Connect with Fostiima’s PGDM alumni community.",
  },
  "/awards-accreditation": {
    // R6
    title: "Awards & Accreditation | Fostiima",
    description: "View Fostiima’s awards, AICTE approvals and accreditation details for its PGDM programs at this Delhi business school.",
    keywords: "Fostiima accreditation, AICTE approved PGDM, NBA approval, PGDM awards Delhi",
    ogTitle: "Awards and Accreditation at Fostiima",
    ogDescription: "Explore Fostiima’s recognitions, AICTE approvals and accreditation for its PGDM programs.",
  },
  "/awards-accreditation/aicte-approval-2025-26": {
    // R7
    title: "AICTE Approval 2025-26 | Fostiima",
    description: "View Fostiima’s AICTE approval for the 2025-26 academic year covering its PGDM programs in Delhi.",
    keywords: "AICTE approval 2025-26, Fostiima AICTE approval",
    ogTitle: "AICTE Approval 2025-26 | Fostiima",
    ogDescription: "AICTE approval details for Fostiima’s PGDM programs for the 2025-26 academic year.",
  },
  "/awards-accreditation/aicte-approval-2026-27": {
    // R8
    title: "AICTE Approved PGDM Colleges in Delhi 2026-27",
    description: "Fostiima’s PGDM programs hold AICTE approval for 2026-27. Check the approval details for AICTE approved PGDM colleges in Delhi.",
    keywords: "aicte approved pgdm colleges in delhi, AICTE approval 2026-27, Fostiima AICTE approval, approved PGDM college",
    ogTitle: "AICTE Approved PGDM Colleges in Delhi | Fostiima",
    ogDescription: "See Fostiima’s AICTE approval for 2026-27 and why it matters for PGDM aspirants in Delhi.",
  },
  "/awards-accreditation/nba-approval-28.03.2025": {
    // R9
    title: "NBA Approval 28.03.2025 | Fostiima",
    description: "View the NBA approval dated 28 March 2025 for Fostiima’s programs, part of its accreditation record in Delhi.",
    keywords: "NBA approval, NBA accreditation Fostiima, Fostiima accreditation",
    ogTitle: "NBA Approval 2025 | Fostiima",
    ogDescription: "NBA approval details for Fostiima’s programs, dated 28 March 2025.",
  },
  "/careers": {
    // R10
    title: "Careers at Fostiima | Join Our Team",
    description: "Explore career opportunities at Fostiima Business School in Delhi and join a team shaping future managers.",
    keywords: "Fostiima careers, jobs at Fostiima Business School, join Fostiima",
    ogTitle: "Careers at Fostiima Business School",
    ogDescription: "Find out how to join the Fostiima team in Delhi and grow with us.",
  },
  "/conclave-conference": {
    // R11
    title: "Conclaves & Conferences | Fostiima",
    description: "Explore conclaves, conferences and leadership conversations hosted by Fostiima Business School in Delhi.",
    keywords: "Fostiima conclave, management conferences Delhi, Fostiima conferences",
    ogTitle: "Fostiima Conclaves and Conferences",
    ogDescription: "See the conclaves and conferences hosted by Fostiima Business School.",
  },
  // Client-approved descriptions (November 2026), not from the spreadsheet.
  // Description only: the titles stay as generated from the event data, and
  // event.excerpt (shown on the page) is unchanged.
  "/conclave-conference/margdarshak-4": {
    description: "Explore Margdarshak 4.0 by FOSTIIMA Business School, featuring Mission AI Sashakt Bharat, an initiative focused on AI-driven innovation and India's future.",
    ogDescription: "Explore Margdarshak 4.0 by FOSTIIMA Business School, featuring Mission AI Sashakt Bharat, an initiative focused on AI-driven innovation and India's future.",
  },
  "/conclave-conference/mission-ai-sashakt-bharat": {
    description: "Discover Mission AI Sashakt Bharat, an event by FOSTIIMA Business School exploring artificial intelligence, innovation and India's AI-powered future.",
    ogDescription: "Discover Mission AI Sashakt Bharat, an event by FOSTIIMA Business School exploring artificial intelligence, innovation and India's AI-powered future.",
  },
  "/contact-us": {
    // R12
    title: "Contact Us | Fostiima Business School, Delhi",
    description: "Get in touch with Fostiima Business School in Delhi for admission queries and program information.",
    keywords: "contact Fostiima, Fostiima Business School contact, Fostiima address",
    ogTitle: "Contact Fostiima Business School",
    ogDescription: "Reach the Fostiima team for admissions and program details.",
  },
  "/faculties": {
    // R13
    title: "Our Faculty | Fostiima Business School",
    description: "Meet the faculty of Fostiima Business School, Delhi, and explore their profiles and areas of expertise.",
    keywords: "Fostiima faculty, PGDM faculty Delhi, management faculty",
    ogTitle: "Meet the Faculty | Fostiima",
    ogDescription: "Know the faculty guiding PGDM students at Fostiima Business School, Delhi.",
  },
  "/fee-structure": {
    // R14
    title: "Fee Structure | PGDM at Fostiima Delhi",
    description: "Check the PGDM fee structure at Fostiima Business School, Delhi: program fees, payment details and other charges.",
    keywords: "Fostiima fee structure, PGDM fees Delhi, PGDM fee structure, Fostiima PGDM fees",
    ogTitle: "PGDM Fee Structure | Fostiima",
    ogDescription: "Know the PGDM fees at Fostiima Business School, Delhi before you apply.",
  },
  "/fostiima-strength": {
    // R15
    title: "The Fostiima Strength | Why Choose Fostiima",
    description: "Discover what sets Fostiima Business School apart in Delhi and why aspirants choose its PGDM programs.",
    keywords: "why choose Fostiima, Fostiima strengths, PGDM college Delhi",
    ogTitle: "Why Choose Fostiima Business School",
    ogDescription: "Explore the strengths that define Fostiima’s PGDM experience in Delhi.",
  },
  "/how-to-apply": {
    // R16
    title: "MBA Admission in Delhi NCR | Apply to Fostiima",
    description: "MBA admission in Delhi NCR and PGDM admission in Delhi: learn the eligibility, process and steps to apply at Fostiima.",
    keywords: "mba admission in delhi ncr, mba admission delhi ncr, mba admission delhi, pgdm admission in delhi, pgdm admission in delhi ncr, how to apply Fostiima",
    ogTitle: "How to Apply | MBA & PGDM Admission, Fostiima",
    ogDescription: "Apply for MBA and PGDM admission in Delhi NCR at Fostiima. See eligibility and the application process.",
  },
  "/life-at-fostiima": {
    // R17
    title: "Life at Fostiima | Campus Life in Delhi",
    description: "Explore campus life at Fostiima Business School, Delhi: cultural events, sports, team building and learning beyond classrooms.",
    keywords: "life at Fostiima, campus life Delhi, PGDM campus life, student life Fostiima",
    ogTitle: "Campus Life at Fostiima, Delhi",
    ogDescription: "See cultural events, sports and team-building experiences at Fostiima.",
  },
  "/margdarshak": {
    // R18
    title: "Margdarshak | Fostiima Initiative",
    description: "Learn about Margdarshak, an initiative of Fostiima Business School, Delhi, and its award ceremonies.",
    keywords: "Margdarshak, Fostiima Margdarshak, Margdarshak award ceremony",
    ogTitle: "Margdarshak at Fostiima",
    ogDescription: "Know about Margdarshak, an initiative of Fostiima Business School, Delhi.",
  },
  "/nirf": {
    // R19
    title: "NIRF | Fostiima Business School, Delhi",
    description: "View NIRF-related disclosures and ranking information for Fostiima Business School, Delhi.",
    keywords: "Fostiima NIRF, NIRF data, Fostiima ranking",
    ogTitle: "NIRF Information | Fostiima",
    ogDescription: "NIRF disclosures and ranking information for Fostiima Business School.",
  },
  "/placement": {
    // R20
    title: "PGDM Placements in Delhi | Fostiima",
    description: "Explore placements at Fostiima Business School, Delhi: recruiters, final placements, placement rate and summer internships.",
    keywords: "Fostiima placements, PGDM placements Delhi, placement record, summer internship",
    ogTitle: "Placements at Fostiima Business School",
    ogDescription: "See recruiters, final placements, placement rate and internships at Fostiima.",
  },
  "/placement/companies-visited": {
    // R21
    title: "Companies Visited | Fostiima Placements",
    description: "See the companies that visited Fostiima Business School, Delhi, for campus recruitment of PGDM students.",
    keywords: "companies visited Fostiima, Fostiima recruiters, campus recruitment PGDM",
    ogTitle: "Recruiters Visiting Fostiima",
    ogDescription: "Explore the companies that visit Fostiima for PGDM campus recruitment.",
  },
  "/placement/final-placements": {
    // R22
    title: "Final Placements | Fostiima Business School",
    description: "Review the final placement outcomes of Fostiima PGDM students at this Delhi business school.",
    keywords: "final placements Fostiima, PGDM final placements, Fostiima placement report",
    ogTitle: "Final Placements at Fostiima",
    ogDescription: "See final placement outcomes for Fostiima PGDM students.",
  },
  "/placement/placement-rate": {
    // R23
    title: "Placement Rate | Fostiima PGDM Placements",
    description: "Check the placement rate of Fostiima’s PGDM programs at this Delhi business school.",
    keywords: "Fostiima placement rate, PGDM placement rate Delhi",
    ogTitle: "Placement Rate at Fostiima",
    ogDescription: "Know the placement rate of Fostiima’s PGDM programs.",
  },
  "/placement/summer-internship": {
    // R24
    title: "Summer Internship | Fostiima PGDM",
    description: "Learn about summer internships for PGDM students at Fostiima Business School, Delhi.",
    keywords: "summer internship PGDM, Fostiima summer internship, PGDM internships Delhi",
    ogTitle: "Summer Internships at Fostiima",
    ogDescription: "Summer internship details for Fostiima PGDM students.",
  },
  "/programs": {
    // R25
    title: "PGDM Courses & Specializations | Fostiima",
    description: "Explore PGDM courses and specializations at Fostiima, Delhi, including finance, marketing, HR, analytics and international business",
    keywords: "PGDM courses, PGDM specializations, Fostiima programs, PGDM finance, PGDM marketing, PGDM HR, PGDM business analytics, PGDM international business",
    ogTitle: "PGDM Courses & Specializations at Fostiima",
    ogDescription: "Choose from multiple PGDM courses and specializations in finance, marketing, HR, analytics, international business and more at Fostiima.",
  },
  "/programs/pgdm": {
    // R26
    title: "PGDM in Delhi NCR | PGDM Courses | Fostiima",
    description: "Pursue PGDM in Delhi at Fostiima. Explore PGDM courses in Delhi NCR, curriculum, specializations and admission details.",
    keywords: "pgdm in delhi, pgdm in delhi ncr, pgdm courses in delhi, pgdm courses in delhi ncr, Fostiima PGDM",
    ogTitle: "PGDM in Delhi NCR | Fostiima Business School",
    ogDescription: "Fostiima’s PGDM in Delhi NCR: courses, specializations and admissions for future managers.",
  },
  "/programs/ai-analytics-operations": {
    // R27
    title: "PGDM in AI, Analytics & Operations | Fostiima",
    description: "Explore Fostiima’s PGDM in AI, Analytics and Operations in Delhi: curriculum, skills and career pathways for future managers.",
    keywords: "PGDM AI analytics operations, PGDM operations, Fostiima AI analytics program",
    ogTitle: "PGDM in AI, Analytics & Operations",
    ogDescription: "Explore Fostiima’s PGDM in AI, Analytics and Operations, built for future managers in Delhi.",
  },
  "/programs/business-analytics": {
    // R28
    title: "PGDM in Business Analytics | Fostiima Delhi",
    description: "Study PGDM in Business Analytics at Fostiima, Delhi, and build skills to turn data into business decisions.",
    keywords: "PGDM business analytics, business analytics course Delhi, Fostiima business analytics",
    ogTitle: "PGDM in Business Analytics | Fostiima",
    ogDescription: "Build data-driven decision skills with Fostiima’s PGDM in Business Analytics.",
  },
  "/programs/international-business": {
    // R29
    title: "PGDM in International Business | Fostiima",
    description: "Explore PGDM in International Business at Fostiima, Delhi, and learn how global trade and cross-border business work.",
    keywords: "PGDM international business, international business course Delhi, Fostiima international business",
    ogTitle: "PGDM in International Business | Fostiima",
    ogDescription: "Prepare for global business careers with Fostiima’s PGDM in International Business.",
  },
  "/programs/pgdm-finance": {
    // R30
    title: "PGDM Finance | MBA Finance in Delhi | Fostiima",
    description: "Pursue MBA Finance in Delhi through Fostiima’s PGDM Finance program: core finance skills, markets and career pathways.",
    keywords: "mba finance in delhi, PGDM finance, finance specialization Delhi, Fostiima finance",
    ogTitle: "PGDM Finance | MBA Finance in Delhi",
    ogDescription: "Build finance expertise with Fostiima’s PGDM Finance, an MBA finance program in Delhi.",
  },
  "/programs/pgdm-human-resource-management": {
    // R31
    title: "PGDM HRM | MBA in HR in Delhi | Fostiima",
    description: "MBA in HR in Delhi: study the PGDM in Human Resource Management at Fostiima, an MBA in Human Resource Management in Delhi.",
    keywords: "mba in hr in delhi, mba in human resource management in delhi, PGDM HRM, HR specialization Delhi",
    ogTitle: "PGDM in Human Resource Management | Fostiima",
    ogDescription: "Fostiima’s PGDM in HRM prepares students for MBA in HR roles in Delhi and beyond.",
  },
  "/programs/pgdm-marketing": {
    // R32
    title: "PGDM in Marketing | Fostiima Business School",
    description: "Explore PGDM in Marketing at Fostiima, Delhi, and the marketing skills it builds for future managers.",
    keywords: "PGDM marketing, marketing specialization Delhi, Fostiima marketing",
    ogTitle: "PGDM in Marketing | Fostiima",
    ogDescription: "Build marketing skills with Fostiima’s PGDM in Marketing in Delhi.",
  },
  "/blog/best-mba-colleges-in-delhi-ncr-comparing-roi-placement-packages-and-fees": {
    // R33
    title: "Best MBA Colleges in Delhi NCR: ROI & Fees",
    description: "Compare the best MBA colleges in Delhi NCR on ROI, placements and fees, including top MBA colleges in Delhi.",
    keywords: "best mba colleges in delhi ncr, best mba colleges in delhi, top mba colleges in delhi ncr, top mba colleges in delhi, best business schools in delhi, mba colleges in delhi with fees, best private colleges for mba in delhi, top mba institute in delhi",
    ogTitle: "Top MBA Colleges in Delhi NCR: ROI & Fees",
    ogDescription: "Which are the best MBA colleges in Delhi? Compare fees, ROI and placements across top MBA institutes in Delhi NCR.",
  },
  "/blog/best-pgdm-colleges-in-delhi-ncr": {
    // R34
    title: "Best PGDM Colleges in Delhi NCR | Top Picks",
    description: "Looking for the best PGDM colleges in Delhi? See top PGDM colleges in Delhi NCR and the best PGDM institute in Delhi for you.",
    keywords: "best pgdm colleges in delhi ncr, best pgdm colleges in delhi, top pgdm colleges in delhi, top pgdm colleges in delhi ncr, best pgdm institute in delhi",
    ogTitle: "Best PGDM Colleges in Delhi NCR",
    ogDescription: "Compare the best PGDM colleges and institutes in Delhi NCR before you choose your management program.",
  },
  "/blog/pgdm-colleges-in-delhi-ncr-a-complete-guide-for-management-aspirants": {
    // R35
    title: "PGDM Colleges in Delhi NCR: A Complete Guide",
    description: "Guide to PGDM colleges in Delhi NCR and PGDM colleges in Delhi: courses, admissions and choosing a PGDM institute in Delhi.",
    keywords: "pgdm colleges in delhi ncr, pgdm colleges in delhi, pgdm institute in delhi, PGDM guide, management aspirants",
    ogTitle: "PGDM Colleges in Delhi NCR: Complete Guide",
    ogDescription: "Everything management aspirants need to know about PGDM colleges, courses and admissions in Delhi NCR.",
  },
};
