import type { Metadata } from "next";

import AccreditationGrid from "@/components/awards-accreditation/AccreditationGrid";
import AwardsAccreditationHero from "@/components/awards-accreditation/AwardsAccreditationHero";
import { buildPageMetadata, withPageSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { PAGE_STRUCTURED_DATA } from "@/config/structured-data";

const pageMetadata: Metadata = buildPageMetadata({
  title: "Awards & Accreditation",
  description:
    "Explore FOSTIIMA Business School's awards, accreditations and recognitions highlighting its commitment to management education.",
  path: "/awards-accreditation",
});

export default function AwardsAccreditationPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={PAGE_STRUCTURED_DATA["/awards-accreditation"]} />

      <AwardsAccreditationHero />
      <AccreditationGrid />
    </main>
  );
}

export const metadata: Metadata = withPageSeo("/awards-accreditation", pageMetadata);
