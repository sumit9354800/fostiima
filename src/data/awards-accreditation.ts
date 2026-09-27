import { cloudinaryAsset } from "@/lib/cloudinary";

export type Accreditation = {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
  pdf: string;
};

export const accreditations: Accreditation[] = [
  {
    id: "nba-approval-28.03.2025",
    title: "NBA",
    year: "2025-26",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 28.03.2025",
    image: cloudinaryAsset("awards-accreditation/nba"),
    pdf: cloudinaryAsset("/awards-accreditation/NBA-28.03.2025.pdf"),
  },

  {
    id: "aicte-approval-2026-27",
    title: "AICTE APPROVAL",
    year: "2026-27",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2026-27",
    image: cloudinaryAsset("award"),
    pdf: cloudinaryAsset("/awards-accreditation/2026-27.pdf"),
  },

  {
    id: "aicte-approval-2025-26",
    title: "AICTE APPROVAL",
    year: "2025-26",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2025-26",
    image: cloudinaryAsset("award"),
    pdf: cloudinaryAsset("/awards-accreditation/2025-26.pdf"),
  },

  {
    id: "aicte-approval-2024-25",
    title: "AICTE APPROVAL",
    year: "2024-25",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2024-25",
    image: cloudinaryAsset("award"),
    pdf: cloudinaryAsset("/awards-accreditation/2024-25.pdf"),
  },

  {
    id: "aicte-approval-2022-23",
    title: "AICTE APPROVAL",
    year: "2022-23",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2022-23",
    image: cloudinaryAsset("award"),
    pdf: cloudinaryAsset("/awards-accreditation/2022-23.pdf"),
  },

  {
    id: "aicte-approval-2021-22",
    title: "AICTE APPROVAL",
    year: "2021-22",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2021-22",
    image: cloudinaryAsset("award"),
    pdf: cloudinaryAsset("/awards-accreditation/2021-22.pdf"),
  },

  {
    id: "aicte-approval-2020-21",
    title: "AICTE APPROVAL",
    year: "2020-21",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2020-21",
    image: cloudinaryAsset("award"),
    pdf: cloudinaryAsset("/awards-accreditation/2020-21.pdf"),
  },

  {
    id: "aicte-approval-2019-20",
    title: "AICTE APPROVAL",
    year: "2019-20",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2019-20",
    image: cloudinaryAsset("award"),
    pdf: cloudinaryAsset("/awards-accreditation/2019-20.pdf"),
  },
];
