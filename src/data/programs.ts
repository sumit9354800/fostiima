export type ProgramDetail = {
  slug: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  overview: string;
  highlights: string[];
};

export const programDetails: ProgramDetail[] = [
  {
    slug: "pgdm",
    title: "PGDM",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    overview:
      "FOSTIIMA's two-year full-time PGDM program is designed to develop strong business knowledge, practical skills and leadership capabilities for tomorrow's business environment.",
    highlights: [
      "2 Year Full-Time Program",
      "AICTE Approved",
      "Industry-aligned curriculum",
      "Practical and experiential learning",
      "Leadership and professional development",
    ],
  },

  {
    slug: "pgdm-marketing",
    title: "PGDM (Marketing)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
    overview:
      "The PGDM Marketing program focuses on developing practical marketing knowledge, customer understanding, brand building and strategic decision-making skills.",
    highlights: [
      "Marketing Management",
      "Brand Management",
      "Digital Marketing",
      "Consumer Behaviour",
      "Sales and Business Development",
    ],
  },

  {
    slug: "pgdm-finance",
    title: "PGDM (Finance)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    overview:
      "The PGDM Finance program develops an understanding of financial management, analysis, investment and business decision-making.",
    highlights: [
      "Financial Management",
      "Investment Analysis",
      "Corporate Finance",
      "Financial Markets",
      "Business Analytics",
    ],
  },

  {
    slug: "pgdm-hr",
    title: "PGDM (HR)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    overview:
      "The PGDM HR program focuses on people management, organisational behaviour, talent development and strategic human resource practices.",
    highlights: [
      "Human Resource Management",
      "Organisational Behaviour",
      "Talent Management",
      "Learning and Development",
      "Performance Management",
    ],
  },

  {
    slug: "pgdm-business-analytics",
    title: "PGDM (Business Analytics)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    overview:
      "The PGDM Business Analytics program combines management education with analytical thinking and data-driven business decision-making.",
    highlights: [
      "Business Analytics",
      "Data-driven Decision Making",
      "Predictive Analytics",
      "Data Visualisation",
      "Business Intelligence",
    ],
  },
  {
    slug: "international-business",
    title: "International Business - Specialization",
    category: "Specialization",
    duration: "PGDM Specialization",
    imageUrl: "/programs/international-business.png",
    overview:
      "A specialized area of management education focused on international business, global trade, international logistics, foreign exchange and international marketing.",
    highlights: [
      "Exim Financing, Documentation & Forex Management",
      "Foreign Trade & Policy",
      "Global Services & Supply Management",
      "International Logistics Management",
      "International Marketing",
      "Perspectives in International Business",
    ],
  },

  {
    slug: "ai-analytics-operations",
    title: "AI, Analytics & Operations - Specialization",
    category: "Specialization",
    duration: "PGDM Specialization",
    imageUrl: "/programs/ai-analytics-operations.png",
    overview:
      "A specialized area focused on analytics, artificial intelligence, operations management and data-driven business decision-making.",
    highlights: [
      "TQM, Six Sigma & BPR",
      "Predictive Analytics",
      "Big Data Analytics",
      "Enterprise Resource Planning",
      "Logistics Management",
      "Service Operations Management",
      "Introduction to Artificial Intelligence",
      "AI in Business and Decision Making",
      "Ethics and Governance in AI",
      "Lean Manufacturing, Strategic Sourcing and E Business Operations",
    ],
  },
];

export function getProgramBySlug(slug: string) {
  return programDetails.find((program) => program.slug === slug);
}
