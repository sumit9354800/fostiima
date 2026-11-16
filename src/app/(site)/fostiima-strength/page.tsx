
import type { Metadata } from "next";

import StrengthHero from "@/components/strength/StrengthHero";
import StrengthDifference from "@/components/strength/StrengthDifference";
import StrengthFaculty from "@/components/strength/StrengthFaculty";
import StrengthCurriculum from "@/components/strength/StrengthCurriculum";
import StrengthCorporateLinkages from "@/components/strength/StrengthCorporateLinkages";
import StrengthKeyPoints from "@/components/strength/StrengthKeyPoints";
import { getCanonicalUrl, withPageSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { PAGE_STRUCTURED_DATA } from "@/config/structured-data";

const pageMetadata: Metadata = {
  title: "FOSTIIMA Strength | The FOSTIIMA Difference",
  description:
    "Discover the strengths of FOSTIIMA Business School including IIM graduate faculty, contemporary curriculum, experiential learning and corporate linkages.",

  alternates: {
    canonical: getCanonicalUrl("/fostiima-strength"),
  },

  openGraph: {
    type: "website",
    url: getCanonicalUrl("/fostiima-strength"),
    title: "FOSTIIMA Strength | The FOSTIIMA Difference",
    description:
      "Discover the strengths of FOSTIIMA Business School including IIM graduate faculty, contemporary curriculum, experiential learning and corporate linkages.",
    siteName: "FOSTIIMA Business School",
  },
};

export default function FostiimaStrengthPage() {
  return (
    <main>
      <JsonLd data={PAGE_STRUCTURED_DATA["/fostiima-strength"]} />

      <StrengthHero />
      <StrengthDifference />
      <StrengthFaculty />
      <StrengthCurriculum />
      <StrengthCorporateLinkages />
      <StrengthKeyPoints />
    </main>
  );
}

export const metadata: Metadata = withPageSeo("/fostiima-strength", pageMetadata);
