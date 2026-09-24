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
  title: "Admission Process",

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
        "One self-attested passport size photograph pasted at the designated spot on the form along with two extra photographs.",
    },
    {
      id: "entrance-score-sheets",
      title: "Entrance Exam Score Sheets",
      description:
        "Photocopies of the CAT / XAT / CMAT / FEAT Score Sheets.",
    },
  ],

  submission: {
    title: "Submission of Application",
    paragraphs: [
      "Hand over the Application Form in person or fill and submit it online.",
      "The documents listed above may be uploaded online or submitted at the time of the Personal Interview if invited.",
    ],
  },

  applicationKit: {
    title: "Application Kit",
    paragraphs: [
      "A complete Application Kit that comprises the Prospectus, Information Bulletins & Application Form, if desired, can be requisitioned.",
      "Make a payment of Rs. 1,200/- by demand draft in favor of the FOSTIIMA Business School to receive the Application Kit.",
      "Payments may also be made through the payment gateway at the FOSTIIMA website.",
    ],
  },

  pgdm: {
    title: "Post Graduate Diploma in Management at FOSTIIMA",
    paragraphs: [],
  },

  admissionProcess: {
    title: "The Admission Process & Cutoff Points",
    intro: "",
    factors: [],
    cutoff: "",
  },

  workExperience: {
    title: "Admission Criteria: Work Experience",
    paragraphs: [],
  },

  feat: {
    title: "FOSTIIMA Eligibility and Aptitude Test",
    paragraphs: [],
  },
};