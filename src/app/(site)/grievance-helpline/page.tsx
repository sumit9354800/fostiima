import type { Metadata } from "next";

import GrievanceHero from "@/components/grievance/GrievanceHero";
import GrievanceCommittee from "@/components/grievance/GrievanceCommittee";
import GrievanceFeedback from "@/components/grievance/GrievanceFeedback";
import WomanHelpline from "@/components/grievance/WomanHelpline";
import PsychologicalCounselling from "@/components/grievance/PsychologicalCounselling";

export const metadata: Metadata = {
  title: "Grievance & Helpline | FOSTIIMA Business School",
  description:
    "Grievance redressal, feedback, suggestions, woman helpline and psychological counselling contact details for FOSTIIMA Business School.",
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