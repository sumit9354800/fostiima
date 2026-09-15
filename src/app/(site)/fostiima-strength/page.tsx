import type { Metadata } from "next";

import StrengthHero from "@/components/strength/StrengthHero";
import StrengthDifference from "@/components/strength/StrengthDifference";
import StrengthFaculty from "@/components/strength/StrengthFaculty";
import StrengthCurriculum from "@/components/strength/StrengthCurriculum";
import StrengthCorporateLinkages from "@/components/strength/StrengthCorporateLinkages";
import StrengthKeyPoints from "@/components/strength/StrengthKeyPoints";

export const metadata: Metadata = {
  title: "FOSTIIMA Strength | The FOSTIIMA Difference",
  description:
    "Discover the strengths of FOSTIIMA Business School including IIM graduate faculty, contemporary curriculum, experiential learning and corporate linkages.",
};

export default function FostiimaStrengthPage() {
  return (
    <main>
      <StrengthHero />
      <StrengthDifference />
      <StrengthFaculty />
      <StrengthCurriculum />
      <StrengthCorporateLinkages />
      <StrengthKeyPoints />
    </main>
  );
}