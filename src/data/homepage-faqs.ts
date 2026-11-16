// The six FAQs shown on the homepage, in the client-approved wording from
// "Fostiima- Schema Codes .docx". The homepage FAQ section
// (src/components/home/FAQSection.tsx) and its FAQPage JSON-LD
// (src/config/structured-data.ts) are both built from this list, so the
// visible text and the structured data always match. Ids and categories are
// those of the matching FAQ records in the database.

export type HomepageFaq = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const HOMEPAGE_FAQS: readonly HomepageFaq[] = [
  {
    id: "q1-international-placements",
    question: "Does FOSTIIMA offer international placements?",
    answer: "Yes, some students do get international placements.",
    category: "Placements",
  },
  {
    id: "q2-scholarship",
    question: "Does FOSTIIMA provide scholarships to its students?",
    answer: "Yes, scholarships are provided to deserving candidates.",
    category: "Admissions",
  },
  {
    id: "q3-average-ctc",
    question: "What is the average CTC and median salary at FOSTIIMA?",
    answer:
      "The average CTC is ₹11.20 lakh and the median salary is ₹11.60 lakh per annum.",
    category: "Placements",
  },
  {
    id: "q4-other-branch",
    question: "Does FOSTIIMA have any other branches in India?",
    answer: "No, FOSTIIMA does not have any other branches in India.",
    category: "General",
  },
  {
    id: "q5-education-loan",
    question: "Does FOSTIIMA help students obtain education loans?",
    answer:
      "Yes. All nationalized banks offer education loans to students of the PGDM programme. Loans up to ₹4 lakh are processed by banks without collateral. Loans above ₹4 lakh are also offered subject to their respective norms.",
    category: "Admissions",
  },
  {
    id: "q6-dual-specialization",
    question: "Does FOSTIIMA offer dual specialization?",
    answer:
      "Yes, FOSTIIMA offers dual specialization, which students can opt for in the second year of the PGDM programme.",
    category: "Academics",
  },
];
