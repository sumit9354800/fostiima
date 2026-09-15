export type InternshipProfile = {
  id: string;
  specialization: string;
  percentage: number;
};

export type InternshipBatch = {
  id: string;
  batch: string;
  title: string;
  profiles: InternshipProfile[];
  highlights: string;
};

export const summerInternshipBatches: InternshipBatch[] = [
  {
    id: "sip-2024-2026",
    batch: "2024 - 2026",
    title: "Summer Internship (2024 - 2026)",
    profiles: [
      {
        id: "finance",
        specialization: "Finance",
        percentage: 35,
      },
      {
        id: "hr",
        specialization: "HR",
        percentage: 5,
      },
      {
        id: "marketing-sales",
        specialization: "Marketing & Sales (Including Digital Marketing)",
        percentage: 45,
      },
      {
        id: "operations-logistics",
        specialization: "Operations & Logistics",
        percentage: 5,
      },
      {
        id: "research-consulting",
        specialization: "Research & Consulting",
        percentage: 10,
      },
    ],
    highlights:
      "At FOSTIIMA, the batch of 2024-26 got excellent exposure in terms of the summer internship. They were placed in various domains in the industry like Consulting, human resources, logistics operations, manufacturing, and so on. Altogether it was a great experience for them.",
  },

  {
    id: "sip-2023-2025",
    batch: "2023 - 2025",
    title: "Summer Internship (2023 - 2025)",
    profiles: [
      {
        id: "finance",
        specialization: "Finance",
        percentage: 30,
      },
      {
        id: "hr",
        specialization: "HR",
        percentage: 5,
      },
      {
        id: "marketing",
        specialization: "Marketing",
        percentage: 25,
      },
      {
        id: "operations",
        specialization: "Operations",
        percentage: 10,
      },
      {
        id: "sales",
        specialization: "Sales",
        percentage: 7,
      },
      {
        id: "digital-marketing",
        specialization: "Digital Marketing",
        percentage: 8,
      },
      {
        id: "analytics",
        specialization: "Analytics",
        percentage: 15,
      },
    ],
    highlights:
      "At FOSTIIMA, the batch of 2023-25 got excellent exposure in terms of the summer internship. They were placed in various domains in the industry like Consulting, human resources, logistics operations, manufacturing, and so on. Altogether it was a great experience for them.",
  },

  {
    id: "sip-2022-2024",
    batch: "2022 - 2024",
    title: "Summer Internship (2022 - 2024)",
    profiles: [
      {
        id: "finance",
        specialization: "Finance",
        percentage: 32,
      },
      {
        id: "hr",
        specialization: "HR",
        percentage: 7,
      },
      {
        id: "marketing",
        specialization: "Marketing",
        percentage: 22,
      },
      {
        id: "operations",
        specialization: "Operations",
        percentage: 8,
      },
      {
        id: "sales",
        specialization: "Sales",
        percentage: 6,
      },
      {
        id: "digital-marketing",
        specialization: "Digital Marketing",
        percentage: 10,
      },
      {
        id: "analytics",
        specialization: "Analytics",
        percentage: 15,
      },
    ],
    highlights:
      "At FOSTIIMA, the batch of 2022-24 got excellent exposure in terms of the summer internship. They were placed in various domains in the industry like Consulting, human resources, logistics operations, manufacturing, and so on. Altogether it was a great experience for them.",
  },

  {
    id: "sip-2021-2023",
    batch: "2021 - 2023",
    title: "Summer Internship (2021 - 2023)",
    profiles: [
      {
        id: "finance",
        specialization: "Finance",
        percentage: 40,
      },
      {
        id: "hr",
        specialization: "HR",
        percentage: 5,
      },
      {
        id: "marketing",
        specialization: "Marketing",
        percentage: 22,
      },
      {
        id: "operations",
        specialization: "Operations",
        percentage: 8,
      },
      {
        id: "sales",
        specialization: "Sales",
        percentage: 6,
      },
      {
        id: "digital-marketing",
        specialization: "Digital Marketing",
        percentage: 10,
      },
      {
        id: "analytics",
        specialization: "Analytics",
        percentage: 7,
      },
    ],
    highlights:
      "At FOSTIIMA, the batch of 2021-23 got excellent exposure in terms of the summer internship. They were placed in various domains in the industry like Consulting, human resources, logistics operations, manufacturing, and so on. Altogether it was a great experience for them.",
  },

  {
    id: "sip-2020-2022",
    batch: "2020 - 2022",
    title: "Summer Internship (2020 - 2022)",
    profiles: [
      {
        id: "finance",
        specialization: "Finance",
        percentage: 40,
      },
      {
        id: "hr",
        specialization: "HR",
        percentage: 5,
      },
      {
        id: "marketing",
        specialization: "Marketing",
        percentage: 22,
      },
      {
        id: "operations",
        specialization: "Operations",
        percentage: 8,
      },
      {
        id: "sales",
        specialization: "Sales",
        percentage: 6,
      },
      {
        id: "digital-marketing",
        specialization: "Digital Marketing",
        percentage: 10,
      },
      {
        id: "analytics",
        specialization: "Analytics",
        percentage: 7,
      },
    ],
    highlights:
      "Students belonging to the batch of 2020-22 got a mind-blowing opportunity for The summer internship. They were placed in various fields of management like HR, Finance, Banking, and so on. It was a great experience for the students as They understood the actual functioning of the private sector.",
  },

  {
    id: "sip-2019-2021",
    batch: "2019 - 2021",
    title: "Summer Internship (2019 - 2021)",
    profiles: [
      {
        id: "sales",
        specialization: "Sales",
        percentage: 9,
      },
      {
        id: "hr",
        specialization: "HR",
        percentage: 5,
      },
      {
        id: "marketing",
        specialization: "Marketing",
        percentage: 20,
      },
      {
        id: "logistics-operations",
        specialization: "Logistics/Operations",
        percentage: 4,
      },
      {
        id: "finance",
        specialization: "FINANCE",
        percentage: 45,
      },
      {
        id: "digital-marketing",
        specialization: "Digital Marketing",
        percentage: 18,
      },
    ],
    highlights:
      "Like every year our students were selected for internship by early March 2020 but with the onset of COVID19, it was not advisable to expose our students to physical working environment, in short period we succeeded in alternate internship in safe work from home mode for the entire 2019-21 batch. The internship were in diverse sectors such as Banking, Advertising, Financial sector, insurance, FMCG, light engineering, Automotive etc.",
  },
];

export const defaultSummerInternshipBatch =
  summerInternshipBatches[0];