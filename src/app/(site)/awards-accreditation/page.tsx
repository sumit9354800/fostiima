import type { Metadata } from "next";

import AccreditationGrid from "@/components/awards-accreditation/AccreditationGrid";
import AwardsAccreditationHero from "@/components/awards-accreditation/AwardsAccreditationHero";
import { buildPageMetadata, withPageSeo } from "@/lib/seo";

const pageMetadata: Metadata = buildPageMetadata({
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

export const metadata: Metadata = withPageSeo("/awards-accreditation", pageMetadata);
