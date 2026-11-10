/**
 * Confirmed Student Achievements Data
 * Source: "Website Update Requirement - Web Wisdom Team.docx" & "Beyond classroom.docx"
 *
 * Confirmed Asset Scope: Exactly three original WebP images extracted from "Beyond classroom.docx".
 */

export interface StudentAchievementHighlight {
  label: string;
  value: string;
  description: string;
}

export interface StudentAchievementImage {
  src: string;
  alt: string;
  caption: string;
}

export interface StudentAchievementsContent {
  preferredTitle: string;
  fallbackTitle: string;
  eyebrow: string;
  leadParagraph: string;
  studentTeam: string[];
  competition: string;
  highlights: StudentAchievementHighlight[];
  images: StudentAchievementImage[];
}

export const studentAchievementsData: StudentAchievementsContent = {
  preferredTitle: "Beyond the Classroom: Our Students in Action",
  fallbackTitle: "Competing, Learning & Achieving",
  eyebrow: "Student Achievement & Excellence",
  leadParagraph:
    "At our institution, financial education extends beyond lecture halls into competitive national arenas. Our student delegation, Team FinSights, recently demonstrated analytical rigor and tactical execution at IIM Indore's flagship finance festival, Finopoly.",
  studentTeam: ["Kriti Jain", "Rajat Jain", "Devraj Rai", "Mohd Umair Ansari"],
  competition: "Finopoly — IIM Indore Flagship Finance Festival",
  highlights: [
    {
      label: "National Standing",
      value: "Top 20 Teams",
      description:
        "Secured a spot among the Top 20 teams nationwide, competing against premier management institutions across India.",
    },
    {
      label: "Portfolio Performance",
      value: "30% Net Profit",
      description:
        "Generated an outstanding 30% net profit during the live simulated stock trading challenge.",
    },
    {
      label: "Research Excellence",
      value: "4th Position Nationally",
      description:
        "Attained 4th position in the competitive Equity Research and valuation track.",
    },
  ],
  // Three confirmed original WebP images extracted from "Beyond classroom.docx"
  images: [
    {
      src: "/student-achievements/finsights_image_1.webp",
      alt: "Team FinSights members Kriti Jain, Rajat Jain, Devraj Rai, and Mohd Umair Ansari representing FOSTIIMA",
      caption: "Team FinSights Student Delegation",
    },
    {
      src: "/student-achievements/finsights_image_2.webp",
      alt: "Team FinSights presenting their equity research valuation track at IIM Indore Finopoly",
      caption: "Equity Research & Valuation Track Presentation",
    },
    {
      src: "/student-achievements/finsights_image_3.webp",
      alt: "Team FinSights with certificates of excellence for securing top national ranking at Finopoly",
      caption: "National Recognition & Certificate of Excellence",
    },
  ],
};
