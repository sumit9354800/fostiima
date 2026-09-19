import type { Metadata } from "next";

import AccreditationGrid from "@/components/awards-accreditation/AccreditationGrid";
import AwardsAccreditationHero from "@/components/awards-accreditation/AwardsAccreditationHero";

export const metadata: Metadata = {
  title: "Awards & Accreditations | FOSTIIMA Business School",
  description:
    "View AICTE approval records and accreditation information for FOSTIIMA Business School.",
};

export default function AwardsAccreditationPage() {
  return (
    <>
      <AwardsAccreditationHero />

      <AccreditationGrid />
    </>
  );
}