import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Lightbulb,
  Network,
  Target,
  type LucideIcon,
} from "lucide-react";

export type StrengthSection = {
  id: string;
  eyebrow: string;
  title: string;
  content: string[];
  icon: LucideIcon;
};

export type StrengthPoint = {
  id: string;
  title: string;
  description: string;
};

export type StrengthData = {
  title: string;
  heroDescription: string;
  sections: StrengthSection[];
  keyStrengths: StrengthPoint[];
};

export const strengthData: StrengthData = {
  title: "The FOSTIIMA Difference",

  heroDescription:
    "FOSTIIMA Business School provides the enabling support and culture of learning which values teamwork, vision, creativity and discipline. We offer a highly interactive platform and experiential environment.",

  sections: [
    {
      id: "faculty",
      eyebrow: "Faculty",
      title: "Industry Experience Meets Experiential Learning",
      icon: GraduationCap,
      content: [
        "Almost the entire core, adjunct and guest faculty at FOSTIIMA are IIM graduates. They have spent several years in the corporate world holding diverse portfolios and responsibilities.",
        "They share their rich, practical experiences with FOSTIIMA students, creating a learning environment where management theory is connected with real-world business situations.",
        "Thus, a FOSTIIMA class is a unique mixture of theory and experiential learning, a methodology adopted by leading B-Schools around the world.",
      ],
    },

    {
      id: "curriculum",
      eyebrow: "Curriculum",
      title: "Contemporary Curriculum Built for Industry",
      icon: BookOpen,
      content: [
        "Management education at FOSTIIMA focuses on learning key business concepts while simultaneously developing analytical skills of students.",
        "The course curriculum is contemporary and in tune with the needs of the industry. It has been designed taking inputs from eminent academicians, industry experts and leading B-Schools.",
        "Care has been exercised to encapsulate knowledge inputs in all new and emerging areas.",
        "The curriculum is reviewed periodically so that it maintains its cutting edge and relevance to the industry.",
      ],
    },

    {
      id: "corporate-linkages",
      eyebrow: "Corporate Linkages",
      title: "Strong Connections With the Corporate World",
      icon: Network,
      content: [
        "FOSTIIMA maintains close contacts with Corporates through its wide network of pan IIT-IIM Alumni, who occupy leadership positions in prominent Indian and transnational corporations.",
        "Through them FOSTIIMA ensures Campus Placements of its students in positions commensurate with their talents.",
        "FOSTIIMA has a placement cell headed by an IIMA alumni who maintain strong links with leading corporate entities through collegial networking.",
        "This cell is responsible for exploring the requirements of MNCs and local organizations for arranging campus interviews for placement of students.",
      ],
    },
  ],

  keyStrengths: [
    {
      id: "top-20",
      title: "Amongst Top 20 B-Schools in India",
      description:
        "Recognised amongst top 20 B-schools in India in terms of education and placements.",
    },
    {
      id: "aicte-pgdm",
      title: "Two Year Full Time PGDM",
      description:
        "Two Year Full Time AICTE Approved PGDM Program.",
    },
    {
      id: "delhi-ncr-ranking",
      title: "Top Ranked in Delhi NCR",
      description:
        "Consistently top ranked Business School in Delhi NCR.",
    },
    {
      id: "infrastructure",
      title: "State-of-the-Art Infrastructure",
      description:
        "World Class State of the Art Infrastructure.",
    },
    {
      id: "futuristic-curriculum",
      title: "Modern & Futuristic Curriculum",
      description:
        "A modern and futuristic course curriculum designed around contemporary management education.",
    },
    {
      id: "case-study",
      title: "Research & Case Study Driven",
      description:
        "Research driven and case study based delivery methodology.",
    },
    {
      id: "placements",
      title: "Strong Placement Outcomes",
      description:
        "PGDM batch of 2023 - 25 averaging placements above ₹11.15 lakhs per annum.",
    },
    {
      id: "iim-faculty",
      title: "IIM Graduate Core Faculty",
      description:
        "Entire core faculty are IIM Graduates.",
    },
  ],
};