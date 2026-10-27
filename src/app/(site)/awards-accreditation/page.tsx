import type { Metadata } from "next";

import AccreditationGrid from "@/components/awards-accreditation/AccreditationGrid";
import AwardsAccreditationHero from "@/components/awards-accreditation/AwardsAccreditationHero";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Awards & Accreditation | FOSTIIMA Business School",
  description:
    "Explore FOSTIIMA Business School's awards, accreditations and recognitions highlighting its commitment to management education.",

  alternates: {
    canonical: getCanonicalUrl("/awards-accreditation"),
  },
};

export default function AwardsAccreditationPage() {
  return (
    <main className="min-h-screen bg-white">
      <AwardsAccreditationHero />
      <AccreditationGrid />
    </main>
  );
}