import { cloudinaryAsset } from "@/lib/cloudinary";

export type PlacementPage = {
  title: string;
  description: string;
  rowImages?: string[];
  fullImages?: string[];
};

export const placementStats = [
  {
    value: "₹30.0 LPA",
    label: "Highest Package",
  },
  {
    value: "₹11.20 LPA",
    label: "Average Package",
  },
  {
    value: "100%",
    label: "Placement Rate",
    href: "/placement/placement-rate",
  },
  {
    value: "128+",
    label: "Companies Visited",
    href: "/placement/companies-visited",
  },
] as const;

export const placementPages = {
  "placement-rate": {
    title: "Our Placements",
    description:
      "FOSTIIMA Business School's placement outcomes and student placement highlights.",
    rowImages: [
      cloudinaryAsset("/placement/col1.jpeg"),
      cloudinaryAsset("/placement/col2.jpeg"),
      cloudinaryAsset("/placement/col3.jpeg"),
      cloudinaryAsset("/placement/col4.jpeg"),
      cloudinaryAsset("/placement/col55.jpeg"),
    ],
    fullImages: [
      cloudinaryAsset("/placement/placement1.webp"),
      cloudinaryAsset("/placement/placement2.webp"),
    ],
  },

  "companies-visited": {
    title: "Companies Visited",
    description:
      "Companies and recruiters associated with FOSTIIMA's placement opportunities.",
    rowImages: [],
    fullImages: [
      cloudinaryAsset("/placement/company1.webp"),
      cloudinaryAsset("/placement/company2.webp"),
    ],
  },
} as const;

export const placementAdvantages = [
  {
    number: "01",
    title: "Corporate Linkages",
    description:
      "FOSTIIMA has a wide Pan IIT-IIM alumni network, with alumni holding leadership positions across industries.",
  },
  {
    number: "02",
    title: "Industry Interaction",
    description:
      "Students get opportunities to interact with industry veterans with cross-functional and cross-industry experience.",
  },
  {
    number: "03",
    title: "Placement Support",
    description:
      "The placement cell supports students through industry interactions and campus placement opportunities.",
  },
  {
    number: "04",
    title: "Experiential Learning",
    description:
      "FOSTIIMA combines management theory with practical and experiential learning to connect classroom learning with business situations.",
  },
] as const;

export const placementHighlights = [
  "Wide Pan IIT-IIM alumni network",
  "Campus placement opportunities",
  "Placement cell headed by IIMA alumni",
  "Interaction with industry veterans",
  "Cross-functional and cross-industry experience",
  "Practical and experiential learning",
] as const;

export const placementDomains = [
  "Finance",
  "Human Resources",
  "Marketing",
  "Sales",
  "Digital Marketing",
  "Operations",
  "Logistics",
  "Analytics",
  "Research & Consulting",
] as const;
