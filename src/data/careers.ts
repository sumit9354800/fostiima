export type CareerOpening = {
  id: string;
  badge?: string;
  title: string;
  company?: string;
  location?: string;
  jobType?: string;
  qualification?: string;
  experience?: string;
  joining?: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  eligibility?: string[];
  skillsRequired?: string[];
  applicationNote?: string;
  applyNowText?: string;
  email: string;
  contactNumber?: string;
};

export const careerOpenings: CareerOpening[] = [
  {
    id: "student-relationship-executive",
    title: "Student Relationship Executive",
    company: "Fostiima Business School",
    location: "Dwarka, New Delhi",
    jobType: "Full-time",
    qualification: "Graduate",
    experience: "Relevant experience required",
    joining: "Immediate joiner preferred",
    description:
      "Fostiima Business School is looking for a dynamic and student-focused Student Relationship Executive to manage student queries, support the admission process, and build strong relationships with prospective and enrolled students.",
    responsibilities: [
      "Handle student queries and provide admission-related guidance.",
      "Follow up with prospective students and admission leads.",
      "Assist students throughout the admission and enrolment process.",
      "Maintain student records, CRM data, and MIS reports.",
      "Coordinate with internal teams to ensure smooth operations.",
      "Build positive relationships and ensure student satisfaction.",
    ],
    requirements: [
      "Graduate in any discipline.",
      "Experience in student relations, admissions, counselling, customer service, or a relevant field.",
      "Excellent communication and interpersonal skills.",
      "Good coordination, follow-up, and problem-solving abilities.",
      "Basic knowledge of MS Office and CRM tools.",
      "Immediate joiners will be preferred.",
    ],
    applicationNote: "Interested candidates can share their resumes at:",
    email: "shila.negi@fostiima.org",
    contactNumber: "9310403941",
  },
  {
    id: "admission-counsellor",
    badge: "WE ARE HIRING!",
    title: "Admission Counsellor",
    company: "Fostiima Business School",
    location: "Dwarka, New Delhi",
    jobType: "Full-time",
    qualification: "Graduate (Any Stream)",
    experience: "0–6 months or above",
    joining: "Freshers are also welcome to apply!",
    description:
      "We are looking for enthusiastic and motivated Admission Counsellors to join our team.",
    eligibility: [
      "Graduate in any stream.",
      "Minimum 6 months of experience in admissions, counselling, sales, or a related field.",
      "Freshers are also welcome to apply!",
    ],
    responsibilities: [
      "Counsel students regarding courses and admission procedures.",
      "Handle student enquiries through calls, emails, and walk-ins.",
      "Explain course details, fees, and eligibility criteria.",
      "Follow up with prospective students and convert enquiries into admissions.",
      "Assist students throughout the admission process.",
    ],
    skillsRequired: [
      "Good communication and interpersonal skills.",
      "Convincing and counselling abilities.",
      "Positive attitude and willingness to learn.",
      "Basic computer knowledge.",
    ],
    applicationNote:
      "Interested candidates can share their updated resumes and apply now!",
    applyNowText: "Apply Now – Be a part of our team!",
    email: "shila.negi@fostiima.org",
    contactNumber: "9310403941",
  },
];

export const careerPositions = [
  "Student Relationship Executive",
  "Admission Counsellor",
];
