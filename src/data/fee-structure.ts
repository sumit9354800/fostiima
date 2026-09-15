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
  program: "Total Fee for PGDM Admissions 2026-28",
  totalFee: "Rs. 11,50,000/-",

  installments: [
    {
      id: "registration",
      name: "Registration Fee",
      amount: "Rs. 75,000/-",
      due: "Payable immediately on receipt of Offer Letter",
    },
    {
      id: "first",
      name: "First Installment",
      amount: "Rs. 2,50,000/-",
      due: "Payable within 30 days of Registration",
    },
    {
      id: "second",
      name: "Second Installment",
      amount: "Rs. 3,00,000/-",
      due: "Payable by or before 14.08.2026",
    },
    {
      id: "third",
      name: "Third Installment",
      amount: "Rs. 2,00,000/-",
      due: "Payable on or before 15.01.2027",
    },
    {
      id: "fourth",
      name: "Fourth Installment",
      amount: "Rs. 1,50,000/-",
      due: "Payable on or before 14.06.2027",
    },
    {
      id: "fifth",
      name: "Fifth Installment",
      amount: "Rs. 1,75,000/-",
      due: "Payable on or before 01.08.2027",
    },
    {
      id: "total",
      name: "Total Fee for PGDM Admissions 2026-28",
      amount: "Rs. 11,50,000/-",
      due: "",
    },
  ],

  selectGroup: {
    totalFee: "Rs. 12,50,000/-",
    placement:
      "Committed placement opportunities in the range of Rs.10-25 lacs per annum",
    eligibility: [
      "CAT / XAT Exams: 75 Percentile or more",
      "60% or above throughout 10th, 12th, and Graduation",
    ],
  },

  inclusions: [
    "Included in the Fee is the cost of Laptop, Books & Study Material.",
    "Included in the fee is a program of TEAM BUILDING & LEADERSHIP CAMP at an exotic location.",
    "Also included in the fee is an INTERNATIONAL EXPOSURE & EDUCATIONAL PROGRAM of 4-5 days with exposure and interaction with the students & faculty of a University or a college in the middle east or far east. All students are advised to get their passport, if they do not hold one already.",
  ],

  cuttingEdgeCourses: [
    "Predictive Analytics",
    "Advanced Excel",
    "Digital Marketing",
    "Business Analytics",
    "Big Data Analytics",
    "Artificial Intelligence (AI) + Prompt Engineering",
    "Block Chain",
    "Power BI / Tableau",
    "Fund Accounting",
    "Machine Learning",
  ],

  certificationDetails: [
    "These courses are designed to enhance job prospects.",
    "Separate certificates are provided for the advanced study of these courses.",
    "To qualify for a certificate, students must pass the exams with greater than 75% marks",
  ],
};