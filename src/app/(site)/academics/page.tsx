import type { Metadata } from "next";

import AcademicsHero from "@/components/academics/AcademicsHero";
import AcademicOverview from "@/components/academics/AcademicOverview";
import AcademicHighlights from "@/components/academics/AcademicHighlights";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Academics | FOSTIIMA Business School",
  description:
    "Explore academics at FOSTIIMA Business School, including industry-relevant management education, contemporary curriculum, analytical learning and key academic strengths.",

  alternates: {
    canonical: getCanonicalUrl("/academics"),
  },
};

export default function AcademicsPage() {
  return (
    <main>
      <AcademicsHero />
      <AcademicOverview />
      <AcademicHighlights />
    </main>
  );
}