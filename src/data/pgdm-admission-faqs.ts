// The five PGDM Admission FAQs, in the client-supplied wording from
// "FOSTIIMA_PGDM_FAQs.docx". The /pgdm-admission FAQ section
// (src/components/home/FAQSection.tsx) and its FAQPage JSON-LD
// (src/config/structured-data.ts) are both built from this list, so the
// visible text and the structured data always match. Paragraph breaks ("\n\n")
// and line breaks ("\n") follow the document and are shown as written.

import type { FaqItem } from "@/components/home/FAQSection";

export const PGDM_ADMISSION_FAQS: readonly FaqItem[] = [
  {
    id: "pgdm-eligibility",
    question:
      "What is the eligibility criteria for PGDM admission at FOSTIIMA Business School?",
    answer:
      "50% marks or equivalent CGPA. Applicants appearing for the final year of the Bachelor's degree and those who have completed the degree requirements and are awaiting results can also apply. The Institute considers CAT / XAT / CMAT scores for admission to the PGDM Program. The expected cut-offs are 70%ile for CAT/XAT and 85%ile for CMAT.",
  },
  {
    id: "pgdm-entrance-exams",
    question: "Which entrance exams are accepted for PGDM admission at FOSTIIMA?",
    answer: "1. CAT, XAT and CMAT\n2. FEAT",
  },
  {
    id: "pgdm-without-cat-xat",
    question: "Can I get admission to FOSTIIMA without appearing for CAT or XAT?",
    answer: [
      "A Bachelor's Degree in any discipline recognized by the UGC with a minimum of 50% marks or equivalent CGPA.",
      "Applicants appearing for the final year of the Bachelor's degree and those who have completed the degree requirements and are awaiting results can also apply.",
      "The Institute considers CAT / XAT / CMAT scores for admission to the PGDM Program.",
      "The expected cut-offs are 70%ile for CAT/XAT and 85%ile for CMAT.",
      "The Application Forms of applicants who fulfill the eligibility criteria will be shortlisted for further participation in the selection process. The selection for shortlisted students is carried out through a structured process which considers the applicant's composite academic performance at school, graduation, score in CAT/XAT/CMAT examinations, Writing Ability and performance in Group Discussion and Personal / Skype / Online Interviews.",
      "Selection is based on a weighted average score of an applicant's overall performance. Applicants with relevant work experience of at least two years and extra-curricular accomplishments will be given special consideration in the selection process. If you have not appeared for entrance exam then you can give college entrance exam i.e. FEAT.",
    ].join("\n\n"),
  },
  {
    id: "pgdm-fee-scholarships",
    question:
      "What is the total fee for the two-year PGDM programme at FOSTIIMA, and are scholarships available?",
    answer: [
      "For the 2027–29 batch, total fee is ₹11.95 lakh for two years.",
      "For Select Group, total fee is ₹12.75 lakh for two years.",
      "Academic Scholarships: For 60% or above throughout marks in 10th, 12th & Graduation = Rs. 25,000/-",
      "Single Mother Concession - Rs. 50,000/-",
    ].join("\n\n"),
  },
  {
    // The document gives no recruiter names; none are added.
    id: "pgdm-placement-package",
    question:
      "What is the average placement package at FOSTIIMA, and which companies recruit?",
    answer: ["Highest Package - ₹30 LPA.", "Average Package - 11.20 LPA."].join(
      "\n\n",
    ),
  },
];
