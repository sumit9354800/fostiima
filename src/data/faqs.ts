export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const faqData: FAQ[] = [
  {
    id: "what-is-fostiima-pgdm",
    category: "Admissions",
    question: "What is the PGDM programme offered by FOSTIIMA?",
    answer:
      "FOSTIIMA Business School offers a two-year full-time PGDM programme designed to develop management knowledge, practical skills and leadership capabilities.",
  },
  {
    id: "is-pgdm-aicte-approved",
    category: "Academics",
    question: "Is FOSTIIMA's PGDM programme AICTE approved?",
    answer:
      "Yes. FOSTIIMA's PGDM programme is approved by the All India Council for Technical Education (AICTE).",
  },
  {
    id: "pgdm-specializations",
    category: "Academics",
    question: "What specializations are available?",
    answer:
      "The programme offers specialization areas including Finance, Marketing, Human Resources, AI/Analytics & Operations, and International Business.",
  },
  {
    id: "eligibility",
    category: "Admissions",
    question: "What is the eligibility criteria for admission?",
    answer:
      "Candidates should meet the eligibility requirements prescribed for admission to the PGDM programme. Please refer to the official admissions process for the current eligibility requirements.",
  },
  {
    id: "programme-duration",
    category: "Academics",
    question: "What is the duration of the PGDM programme?",
    answer:
      "The PGDM programme is a two-year full-time management programme.",
  },
  {
    id: "campus-location",
    category: "Campus",
    question: "Where is FOSTIIMA Business School located?",
    answer:
      "FOSTIIMA Business School is located in Dwarka Sector 9, New Delhi.",
  },
  {
    id: "placements",
    category: "Placements",
    question: "Does FOSTIIMA provide placement assistance?",
    answer:
      "FOSTIIMA provides placement assistance and facilitates interaction between students and industry through its corporate interface and placement activities.",
  },
  {
    id: "application",
    category: "Admissions",
    question: "How can I apply to FOSTIIMA?",
    answer:
      "Students can apply through the FOSTIIMA admissions process. The application process, eligibility requirements and other admission details are available through the admissions section of the website.",
  },
];