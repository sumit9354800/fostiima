import type { Metadata } from "next";

import AboutMargdarshak from "@/components/margdarshak/AboutMargdarshak";
import MargdarshakHero from "@/components/margdarshak/MargdarshakHero";
import MargdarshakTabs from "@/components/margdarshak/MargdarshakTabs";
import { getCanonicalUrl, withPageSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { PAGE_STRUCTURED_DATA } from "@/config/structured-data";
const pageMetadata: Metadata = {
  title: "Margdarshak | FOSTIIMA Business School",
  description:
    "Explore the Margdarshak Awards, their editions, award process, jury panels, advisory councils and winners at FOSTIIMA Business School.",

  alternates: {
    canonical: getCanonicalUrl("/margdarshak"),
  },

  openGraph: {
    type: "website",
    url: getCanonicalUrl("/margdarshak"),
    title: "Margdarshak | FOSTIIMA Business School",
    description:
      "Explore the Margdarshak Awards, their editions, award process, jury panels, advisory councils and winners at FOSTIIMA Business School.",
    siteName: "FOSTIIMA Business School",
  },
};

export default function MargdarshakPage() {
  return (
    <main>
      <JsonLd data={PAGE_STRUCTURED_DATA["/margdarshak"]} />

      <MargdarshakHero />

      <AboutMargdarshak />

      <MargdarshakTabs />
    </main>
  );
}

export const metadata: Metadata = withPageSeo("/margdarshak", pageMetadata);
