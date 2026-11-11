import type { Metadata } from "next";

import AccreditationGrid from "@/components/awards-accreditation/AccreditationGrid";
import AwardsAccreditationHero from "@/components/awards-accreditation/AwardsAccreditationHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Awards & Accreditation",
  description:
    "Explore FOSTIIMA Business School's awards, accreditations and recognitions highlighting its commitment to management education.",
  path: "/awards-accreditation",
});

export default function AwardsAccreditationPage() {
  return (
    <main className="min-h-screen bg-white">
      <AwardsAccreditationHero />
      <AccreditationGrid />
    </main>
  );
}