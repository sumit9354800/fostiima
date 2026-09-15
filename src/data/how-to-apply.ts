export type ApplicationRequirement = {
  id: string;
  title: string;
  description: string;
};

export type HowToApplyData = {
  title: string;
  intro: string;

  applicationRequirements: ApplicationRequirement[];

  submission: {
    title: string;
    paragraphs: string[];
  };

  applicationKit: {
    title: string;
    paragraphs: string[];
  };

  pgdm: {
    title: string;
    paragraphs: string[];
  };

  admissionProcess: {
    title: string;
    intro: string;
    factors: string[];
    cutoff: string;
  };

  workExperience: {
    title: string;
    paragraphs: string[];
  };

  feat: {
    title: string;
    paragraphs: string[];
  };
};

export const howToApplyData: HowToApplyData = {
  title: "How to Apply",

  intro:
    "A complete application needs to include the following documents and information.",

  applicationRequirements: [
    {
      id: "application-form",
      title: "Application Form",
      description:
        "The Application Form, duly filled in capitals.",
    },
    {
      id: "academic-transcripts",
      title: "Academic Transcripts",
      description:
        "Photocopies of transcripts (Certificates & Mark Sheets that reflect graduations and school levels).",
    },
    {
      id: "photographs",
      title: "Passport Size Photographs",
      description:
        "One self-attested passport size photograph was pasted at the designated spot on the form along with two extra photographs.",
    },
    {
      id: "entrance-score-sheets",
      title: "Entrance Exam Score Sheets",
      description:
        "Photocopies of the CAT/XAT/CMAT/FEAT Score Sheets.",
    },
  ],

  submission: {
    title: "Submit Your Application",
    paragraphs: [
      "Hand over the Application Form in person or fill and submit it online.",
      "The documents listed above may be submitted at the Group Discussion and the Personal Interview if invited.",
    ],
  },

  applicationKit: {
    title: "Application Kit",
    paragraphs: [
      "A complete Application Kit that comprises the Prospectus, Information Bulletins & Application Form, if desired, can be requisitioned.",
      "Make a payment of Rs. 1200/- by demand draft in favor of the FOSTIIMA Business School to receive the Application Kit.",
      "Payments may also be made through the Payment Gateway at the FOSTIIMA website.",
    ],
  },

  pgdm: {
    title: "Post Graduate Diploma in Management at FOSTIIMA",
    paragraphs: [
      "The FOSTIIMA PGDM Approved by GOVT. of India AICTE (Ministry of HRD) two-year full-time program is designed for graduates in any subject.",
      "The PGDM is also meant for those who have completed an equivalent degree in any discipline recognized by the UGC as eligible for Post Graduate Studies.",
      "Students yet to appear in the final year Degree examination may also apply.",
      "Testimonials as proof of graduation need to be submitted by 30th September 2026 at the latest.",
    ],
  },

  admissionProcess: {
    title: "The Admission Process & Cutoff Points",
    intro:
      "Admissions to the FOSTIIMA two-year full-time PGDM Program that commences in the month of June every year are carried out through a structured process. The institution considers several factors:",

    factors: [
      "The applicant’s academic performance during graduation and at school",
      "Scores in the CAT/XAT/CMAT exams",
      "Performances in the Group Discussions and Personal Interviews",
    ],

    cutoff:
      "The short-listing and selection criteria represent a weighted average of the applicant’s overall performance. Cutoff levels to qualify for admission calls would probably be above 50% marks in graduation and a CAT or XAT score above the 75 percentile.",
  },

  workExperience: {
    title: "Admission Criteria: Work Experience",
    paragraphs: [
      "Possessing a supervisory nature of work experience is immensely relevant for admission to the FOSTIIMA’s ‘experiential learning’ pedagogy. The candidate’s work experience receives due weight while taking decisions with regard to course selection.",
      "FOSTIIMA makes an unbiased assessment of the applicant’s leadership potential. The candidate’s academic abilities and personal characteristics go through a careful evaluation.",
      "The institution wishes to create a diverse class of students that contain unique records of accomplishment and leadership, intellectual curiosity, zeal, and drive.",
    ],
  },

  feat: {
    title: "FOSTIIMA Eligibility and Aptitude Test",
    paragraphs: [
      "Applicants who did not appear for an MBA Entrance Exam (CAT / XAT / CMAT) can appear for the FOSTIIMA Eligibility and Aptitude Test.",
      "The FEAT (FOSTIIMA Eligibility & Aptitude Test) is a written aptitude test that FOSTIIMA conducts, followed by Group Discussions and Personal Interviews.",
      "The Composite Score arrived at for the admission process is based on academic and extra-curricular achievements during the candidate’s high school and graduation career.",
    ],
  },
};