
export type Semester = {
  title: string;
  subjects: string[];
};

export type ProgramKey =
  | "pgdm"
  | "marketing"
  | "finance"
  | "hr"
  | "businessAnalytics"
  | "internationalBusiness"
  | "aiAnalyticsOperations";

export type ProgramData = {
  slug: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  description: string;
  overview: string;
  highlights: string[];
  heroImage?: string;
  semesters: Semester[];
  specialization?: {
    title: string;
    subjects: string[];
  };
  sortOrder: number;
  isActive: boolean;
};

const programs: Record<ProgramKey, ProgramData> = {
  pgdm: {
    slug: "pgdm",
    title: "PGDM",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    imageUrl:
      "/home/programs/programs1.webp",
    description:
      "A comprehensive two-year full-time management program designed to build strong business knowledge, analytical capabilities, leadership skills and industry readiness.",
    overview:
      "FOSTIIMA's two-year full-time PGDM program is designed to develop strong business knowledge, practical skills and leadership capabilities for tomorrow's business environment.",
    highlights: [],
     heroImage:
      "/home/programs/programs1.webp",
    semesters: [
      {
        title: "Semester I",
        subjects: [
          "Accounting For Managers & Financial Reporting",
          "Aptitude Building Course-5",
          "Computer Applications in Management",
          "Contemporary Business Review - I",
          "Decision Science",
          "Effective Business Communication",
          "Legal Aspects of Business",
          "Managing Self, People & Organization - I",
          "Human Capital Management - I",
          "Marketing Management - I",
          "Managerial Economics",
          "Attitude Building & Personality Development - I",
          "Business Statistics",
          "Technology & Operations Management",
          "Written Analysis of Cases",
          "Quantitative & Logical Skills",
          "Basic & Advanced Excel",
          "Digital Marketing-I",
        ],
      },
      {
        title: "Semester II",
        subjects: [
          "Marketing Management - II",
          "Sales & Distribution Management",
          "International Business",
          "Managing Self, People & Organization - II",
          "Human Capital Management - II",
          "Supply Chain Management",
          "Managerial Accounting",
          "Financial Management",
          "Aptitude Building Course - II",
          "Strategic Management",
          "Marketing Research",
          "Attitude Building & Personality Development - II",
          "Financial Services & Insurance",
          "High Impact Soft Skills - I",
          "Contemporary Business Review - II",
          "Tableau and Power BI",
          "Managing E-Business",
          "Digital Marketing - I",
          "Business Analytics",
          "Legal Aspects of Business - II",
        ],
      },
      {
        title: "Semester III",
        subjects: [
          "Perspectives in Banking",
          "Aptitude Building Course-III",
          "Digital Marketing - III",
          "Management Information System",
          "High Impact Soft Skills - II",
          "The Entrepreneur Manager",
          "Contemporary Business Review - III",
          "Business Simulation Models",
          "Transforming Business Through Emerging Technologies",
        ],
      },
      {
        title: "Semester IV",
        subjects: [
          "Management of Technology, Innovation & Change",
          "Strategic Financial Management",
          "Strategic Marketing Management",
          "Strategic International Business",
          "Corporate Social Responsibility & Business Ethics",
          "Strategic Human Capital Management",
          "Strategic Analytics & Operations Management",
        ],
      },
    ],
    sortOrder: 1,
    isActive: true,
  },

  marketing: {
    slug: "pgdm-marketing",
    title: "PGDM (Marketing)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    imageUrl:
      "/home/programs/programs2.webp",
    description:
      "A management program focused on developing expertise in marketing, customer understanding, brand management, digital marketing and strategic decision-making.",
    overview:
      "The PGDM Marketing program focuses on developing practical marketing knowledge, customer understanding, brand building and strategic decision-making skills.",
    highlights: [],
    heroImage:
      "/home/programs/programs2.webp",
    specialization: {
      title: "Marketing Specialization",
      subjects: [
        "Integrated Marketing Communication",
        "Product & Brand Management",
        "Business Marketing & Sales",
        "Rural Marketing",
        "Customer Relationship Management",
        "Neuroscience & Consumer Behavior",
        "Retail Marketing",
        "Services Marketing",
        "Marketing Analytics",
        "International Marketing",
      ],
    },
    semesters: [],
    sortOrder: 2,
    isActive: true,
  },

  finance: {
    slug: "pgdm-finance",
    title: "PGDM (Finance)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    imageUrl:
      "/home/programs/programs3.webp",
    description:
      "A management program designed to develop financial management, analytical and strategic decision-making capabilities for modern business environments.",
    overview:
      "The PGDM Finance program develops an understanding of financial management, analysis, investment and business decision-making.",
    highlights: [],
    heroImage:
      "/home/programs/programs3.webp",
    specialization: {
      title: "Finance Specialization",
      subjects: [
        "International Financial Management",
        "Project Financing & Management",
        "Security Analysis & Portfolio Management",
        "Future, Options & Derivatives",
        "Mergers, Acquisitions & Corporate Restructuring",
        "Financial Modelling & Analytics",
      ],
    },
    semesters: [],
    sortOrder: 3,
    isActive: true,
  },

  hr: {
    slug: "pgdm-human-resource-management",
    title: "PGDM (HR)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    imageUrl:
      "/home/programs/programs4.webp",
    description:
      "A management program focused on human capital, leadership, employee relations, organizational development and modern HR practices.",
    overview:
      "The PGDM HR program focuses on people management, organisational behaviour, talent development and strategic human resource practices.",
    highlights: [],
    heroImage:
      "/home/programs/programs4.webp",
    specialization: {
      title: "HR - Specialization",
      subjects: [
        "Talent Acquisition",
        "Learning & Development",
        "Performance Management",
        "Compensation Management",
        "Managerial Interpersonal Skill & Group Dynamics",
        "Leadership Power & Control",
        "HR Analytics",
        "Manpower Development in Technological Change",
        "Diversity & Inclusion",
        "Employee Relations & Organisational Relations",
      ],
    },
    semesters: [],
    sortOrder: 4,
    isActive: true,
  },

  businessAnalytics: {
    slug: "business-analytics",
    title: "PGDM (Business Analytics)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    imageUrl:
      "/home/programs/programs5.webp",
    description:
      "A management program focused on developing business analytics, data-driven decision-making, analytical thinking and modern business management capabilities.",
    overview:
      "The PGDM Business Analytics program combines management education with analytical thinking and data-driven business decision-making.",
    highlights: [],
    heroImage:
      "/home/programs/programs5.webp",
    specialization: {
      title: "Business Analytics Specialization",
      subjects: [
        "Business Analytics",
        "Data-Driven Decision Making",
        "Predictive Analytics",
        "Data Visualization",
        "Statistical Analysis for Business",
      ],
    },
    semesters: [],
    sortOrder: 5,
    isActive: true,
  },

  internationalBusiness: {
    slug: "international-business",
    title: "International Business - Specialization",
    category: "Specialization",
    duration: "PGDM Specialization",
    imageUrl:
      "/home/programs/programs6.webp",
    description:
      "A specialized area of study focused on international trade, global business operations, foreign exchange, logistics and international marketing.",
    overview:
      "A specialized area of management education focused on international business, global trade, international logistics, foreign exchange and international marketing.",
    highlights: [],
    heroImage:
      "/home/programs/programs6.webp",
    specialization: {
      title: "International Business - Specialization",
      subjects: [
        "Exim Financing, Documentation & Forex Management",
        "Foreign Trade & Policy",
        "Global Services & Supply Management",
        "International Logistics Management",
        "International Marketing",
        "Perspectives in International Business",
      ],
    },
    semesters: [],
    sortOrder: 6,
    isActive: true,
  },

  aiAnalyticsOperations: {
    slug: "ai-analytics-operations",
    title: "AI, Analytics & Operations - Specialization",
    category: "Specialization",
    duration: "PGDM Specialization",
    imageUrl:
      "/home/programs/programs7.webp",
    description:
      "A specialized area focused on analytics, artificial intelligence, operations management, predictive insights and data-driven business decision-making.",
    overview:
      "A specialized area focused on analytics, artificial intelligence, operations management and data-driven business decision-making.",
    highlights: [],
    heroImage:
      "/home/programs/programs7.webp",
    specialization: {
      title: "AI, Analytics & Operations - Specialization",
      subjects: [
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
    semesters: [],
    sortOrder: 7,
    isActive: true,
  },
};

export const programDetails = Object.values(programs);

export function getPrograms() {
  return programs;
}

export function getHomePrograms() {
  return programDetails
    .filter((program) => program.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProgramBySlug(slug: string) {
  return programDetails.find((program) => program.slug === slug);
}
