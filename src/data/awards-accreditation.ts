import { cloudinaryAsset } from "@/lib/cloudinary";

export type Accreditation = {
  id: string;
  title: string;
  year: string;
  logo: string;
  description: string;
  image: string[];
};

export const accreditations: Accreditation[] = [
  {
    id: "nba-approval-28.03.2025",
    title: "NBA",
    year: "2025-26",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 28.03.2025",

    logo: cloudinaryAsset("/badge/badge1.webp"),

    image: [
      cloudinaryAsset("/awards-accreditation/nba/NBA1.jpg"),
      cloudinaryAsset("/awards-accreditation/nba/NBA2.jpg"),
    ],
  },

  {
    id: "aicte-approval-2026-27",
    title: "AICTE APPROVAL",
    year: "2026-27",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2026-27",

    logo: cloudinaryAsset("/badge/badge2.webp"),

   image: [
      cloudinaryAsset("/awards-accreditation/acte/2026-27-1.webp"),
      cloudinaryAsset("/awards-accreditation/acte/2026-27-2.webp"),
    ],
  },

  {
    id: "aicte-approval-2025-26",
    title: "AICTE APPROVAL",
    year: "2025-26",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2025-26",

    logo: cloudinaryAsset("/badge/badge3.webp"),

    image: [],
  },
];