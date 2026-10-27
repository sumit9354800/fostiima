
import type { Metadata } from "next";

import GrievanceHero from "@/components/grievance/GrievanceHero";
import GrievanceCommittee from "@/components/grievance/GrievanceCommittee";
import GrievanceFeedback from "@/components/grievance/GrievanceFeedback";
import WomanHelpline from "@/components/grievance/WomanHelpline";
import PsychologicalCounselling from "@/components/grievance/PsychologicalCounselling";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Grievance & Helpline | FOSTIIMA Business School",
  description:
    "Grievance redressal, feedback, suggestions, woman helpline and psychological counselling contact details for FOSTIIMA Business School.",

  alternates: {
    canonical: getCanonicalUrl("/grievance-helpline"),
  },

  openGraph: {
    type: "website",
    url: getCanonicalUrl("/grievance-helpline"),
    title: "Grievance & Helpline | FOSTIIMA Business School",
    description:
      "Grievance redressal, feedback, suggestions, woman helpline and psychological counselling contact details for FOSTIIMA Business School.",
    siteName: "FOSTIIMA Business School",
  },
};

export default function GrievanceHelplinePage() {
  return (
    <>
      <GrievanceHero />

      <GrievanceCommittee />

      <GrievanceFeedback />

      <WomanHelpline />

      <PsychologicalCounselling />
    </>
  );
}
