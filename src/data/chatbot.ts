export type ChatbotFaq = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
};

export const chatbotFaqs: ChatbotFaq[] = [
  {
    id: "about-fostiima",
    question: "What is FOSTIIMA Business School?",
    answer:
      "FOSTIIMA Business School is a management education institution founded by Friends of the class of PGP Seventy Three of IIM Ahmedabad. The school focuses on interactive, experiential and industry-oriented management education.",
    keywords: ["about", "fostiima", "business school", "college"],
  },
  {
    id: "pgdm",
    question: "What PGDM programme does FOSTIIMA offer?",
    answer:
      "FOSTIIMA offers a two-year full-time PGDM programme approved by AICTE (Ministry of HRD).",
    keywords: ["pgdm", "mba", "course", "program", "programme"],
  },
  {
    id: "eligibility",
    question: "What is the eligibility for PGDM?",
    answer:
      "Graduates in any subject with an equivalent UGC-recognized degree can apply. Final-year students can also apply, subject to providing proof of graduation by 30 September 2026.",
    keywords: ["eligibility", "eligible", "graduation", "graduate", "final year"],
  },
  {
    id: "entrance-exams",
    question: "Which entrance exams are considered?",
    answer:
      "The admission process considers CAT, XAT and CMAT scores. Applicants who did not appear for CAT, XAT or CMAT can appear for FEAT.",
    keywords: ["cat", "xat", "cmat", "exam", "entrance"],
  },
  {
    id: "feat",
    question: "What is FEAT?",
    answer:
      "FEAT is the written aptitude test for applicants who did not appear for CAT, XAT or CMAT. It is followed by Group Discussion and Personal Interview, with a composite assessment that also considers academic and extracurricular achievements.",
    keywords: ["feat", "test", "aptitude"],
  },
  {
    id: "application",
    question: "How do I apply?",
    answer:
      "The application can be submitted in person or online. The application includes the completed form, required academic transcripts, photographs and available CAT/XAT/CMAT/FEAT score sheets.",
    keywords: ["apply", "application", "admission", "online", "form"],
  },
  {
    id: "documents",
    question: "Which documents are required?",
    answer:
      "The supplied admission requirements include photocopies of transcripts and certificates/mark sheets reflecting graduation and school levels, one self-attested passport-size photograph on the form, two extra photographs, and photocopies of CAT/XAT/CMAT/FEAT score sheets.",
    keywords: ["documents", "transcript", "marksheet", "photograph", "certificate"],
  },
  {
    id: "application-kit",
    question: "What is the application kit fee?",
    answer:
      "The supplied admission information states an application kit charge of Rs. 1200/- by demand draft in favour of FOSTIIMA Business School. A payment gateway is also available.",
    keywords: ["application kit", "1200", "fee", "demand draft"],
  },
  {
    id: "admission-process",
    question: "What is the admission process?",
    answer:
      "The admission process considers academic performance, entrance-test performance and the GD/PI process. The supplied information says admissions start in June every year.",
    keywords: ["admission process", "gd", "pi", "personal interview", "group discussion"],
  },
  {
    id: "cutoff",
    question: "What cutoff is required?",
    answer:
      "The supplied admission information indicates that the cutoff is likely above 50% in graduation and CAT/XAT performance above the 75 percentile.",
    keywords: ["cutoff", "percentile", "percentage", "75", "50"],
  },
  {
    id: "work-experience",
    question: "Does work experience matter?",
    answer:
      "Yes. The supplied admission information says relevant supervisory work experience receives due weight because the school values experiential learning, leadership potential and a diverse class profile.",
    keywords: ["work experience", "experience", "job", "supervisory"],
  },
  {
    id: "curriculum",
    question: "What is the curriculum like?",
    answer:
      "The curriculum is described as contemporary and industry-aligned. It is designed with inputs from academicians, industry experts and leading global business schools, includes emerging areas and is reviewed periodically.",
    keywords: ["curriculum", "syllabus", "academic", "industry", "learning"],
  },
  {
    id: "faculty",
    question: "Tell me about the faculty.",
    answer:
      "FOSTIIMA's supplied content states that almost the entire core, adjunct and guest faculty are IIM graduates. The teaching approach combines academic theory with practical and experiential learning.",
    keywords: ["faculty", "professor", "teachers", "iim", "teaching"],
  },
  {
    id: "strength",
    question: "What is special about FOSTIIMA?",
    answer:
      "The supplied FOSTIIMA Strength content highlights IIM-Ahmedabad educated founders and management, an IIM-benchmarked curriculum, IIM-educated faculty with corporate experience, a pan IIT-IIM network, an AICTE-approved two-year full-time PGDM, research- and case-study-based delivery, and world-class infrastructure.",
    keywords: ["strength", "difference", "special", "why", "iim"],
  },
  {
    id: "placements",
    question: "What does FOSTIIMA say about placements?",
    answer:
      "The supplied Strength content states that the PGDM batch of 2023–25 averaged placements above ₹11.15 lakhs per annum. It also describes placement support through the pan IIT-IIM global network and a placement cell headed by IIMA alumni.",
    keywords: ["placement", "placements", "salary", "package", "recruitment"],
  },
  {
    id: "summer-internship",
    question: "What about summer internships?",
    answer:
      "FOSTIIMA maintains summer internship information by batch, including 2024–26, 2023–25, 2022–24, 2021–23, 2020–22 and 2019–21. The internship information is presented by functional area.",
    keywords: ["summer internship", "sip", "internship", "summer"],
  },
  {
    id: "infrastructure",
    question: "What infrastructure does FOSTIIMA have?",
    answer:
      "The supplied official-source material describes modern air-conditioned buildings with multimedia and instructional technology.",
    keywords: ["infrastructure", "campus", "building", "facility"],
  },
  {
    id: "location",
    question: "Where is FOSTIIMA located?",
    answer:
      "The supplied website contact information lists Dwarka Sector 9 as the location.",
    keywords: ["location", "address", "dwarka", "sector 9", "delhi"],
  },
  {
    id: "contact",
    question: "How can I contact admissions?",
    answer:
      "You can contact FOSTIIMA at no-reply@fostiima.org or +91-7678389436. The supplied website contact information lists Dwarka Sector 9.",
    keywords: ["contact", "phone", "email", "admissions", "admission office"],
  },
];

export const chatbotQuickQuestions = [
  "How do I apply?",
  "What is the PGDM eligibility?",
  "Which entrance exams are accepted?",
  "What is the fee?",
  "Tell me about placements",
  "Tell me about the faculty",
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\w\s₹]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function getChatbotAnswer(question: string) {
  const normalizedQuestion = normalize(question);

  if (!normalizedQuestion) {
    return "Please type your question.";
  }

  const exactMatch = chatbotFaqs.find((faq) =>
    normalize(faq.question) === normalizedQuestion,
  );

  if (exactMatch) {
    return exactMatch.answer;
  }

  const scored = chatbotFaqs
    .map((faq) => {
      const searchableText = normalize(
        `${faq.question} ${faq.answer} ${faq.keywords.join(" ")}`,
      );

      const queryWords = normalizedQuestion.split(" ");
      let score = 0;

      queryWords.forEach((word) => {
        if (word.length < 2) return;
        if (searchableText.includes(word)) score += 1;
      });

      faq.keywords.forEach((keyword) => {
        if (normalizedQuestion.includes(normalize(keyword))) {
          score += 2;
        }
      });

      return { faq, score };
    })
    .sort((a, b) => b.score - a.score);

  if (scored[0]?.score && scored[0].score >= 2) {
    return scored[0].faq.answer;
  }

  return (
    "I do not have confirmed information for that question yet. " +
    "Please contact FOSTIIMA Admissions at no-reply@fostiima.org or +91-7678389436."
  );
}
