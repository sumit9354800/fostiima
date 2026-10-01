export type FeeInstallment = {
  id: string;
  name: string;
  amount: string;
  due: string;
};

export type FeeStructureData = {
  title: string;
  program: string;
  totalFee: string;
  installments: FeeInstallment[];

  selectGroup: {
    totalFee: string;
    placement: string;
    eligibility: string[];
  };

  inclusions: string[];
  cuttingEdgeCourses: string[];
  certificationDetails: string[];
};

export const feeStructureData: FeeStructureData = {
  title: "Fee Structure",

  program: "Total Fee for PGDM Admissions 2027-29",

  totalFee: "Rs. 11,95,000/-",

  installments: [],

  selectGroup: {
    totalFee: "Rs. 12,75,000/-",

    placement:
      "Committed placement opportunities in the range of Rs.10-25 lacs per annum",

    eligibility: [
      "CAT / XAT Exams: 75 Percentile or more",
      "60% or above throughout 10th, 12th, and Graduation",
    ],
  },

  inclusions: [
    "Included in the fee is a program of TEAM BUILDING & LEADERSHIP CAMP at an exotic location.",

    "Also included in the fee is an INTERNATIONAL EXPOSURE & EDUCATIONAL PROGRAM of 4-5 days with exposure and interaction with the students & faculty of a University or a college in the middle east or far east. All students are advised to get their passport, if they do not hold one already.",
    "Included in the Fee is the cost of Laptop, Books & Study Material.",
  ],

  cuttingEdgeCourses: [
    "Predictive Analytics",
    "Advanced Excel",
    "Digital Marketing",
    "Business Analytics",
    "Big Data Analytics",
    "Artificial Intelligence (AI) + Prompt Engineering",
    "Power BI / Tableau",
    "Fund Accounting",
  ],

  certificationDetails: [
    "These courses are designed to enhance job prospects.",

    "Separate certificates are provided for the advanced study of these courses.",

    "To qualify for a certificate, students must pass the exams with greater than 75% marks",
  ],
};
