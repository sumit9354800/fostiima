export type CareerOpening = {
  id: string;
  title: string;
  description: string;
  eligibility?: string[];
  experience?: string;
  preferred?: string;
  education?: string;
  email: string;
  responsibilities?: string[];
  applicationNote?: string;
};

export const careerOpenings: CareerOpening[] = [
  {
    id: "faculty-positions",
    title: "Faculty Positions",
    description:
      "FOSTIIMA Business School is inviting applications for the positions of Assistant Professor, Associate Professor, and Professor for its PGDM program across various specializations.",
    eligibility: [
      "Ph.D. is mandatory",
      "Relevant teaching experience as per the position applied for",
      "Strong academic background in the respective subject area",
    ],
    email: "rajeeva.kansal@fostiima.org",
    applicationNote:
      "Interested candidates may send their updated CV to the email address above. Applications can also be submitted via post to the mailing address mentioned on our official website. Candidates may also attend a walk-in interview with prior appointment.",
  },
  {
    id: "placement-officer",
    title: "Placement Officer",
    description:
      "FOSTIIMA Business School invites applications for the post of Placement Officer.",
    experience: "1 - 2 Years and above",
    preferred: "Male Candidate",
    education: "UG/PG",
    email: "neetu.sharma@fostiima.org",
    responsibilities: [
      "Aggressively contact industries and corporates to develop partnerships for placements for students, interns and short-term projects by doing rigorous telecalling on an everyday basis.",
      "Create and maintain a database of recruiting industries and organizations and in particular for summer internships.",
      "Ability to facilitate Industry / Institute Interaction.",
      "To assist in day-to-day activities of placement.",
      "To create and maintain a database on alumni and their present position.",
      "To arrange for interview facilities at the campus.",
      "Participate in the coordination and organization of on/off-campus recruitments.",
      "To follow up and collect feedback from industries coming for placement.",
    ],
    applicationNote:
      "Interested candidates may apply to the email address mentioned above.",
  },
];

export const careerPositions = [
  "Assistant Professor",
  "Associate Professor",
  "Professor",
  "Placement Officer",
];