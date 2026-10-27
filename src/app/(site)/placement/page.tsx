import type { Metadata } from "next";

import PlacementHero from "@/components/placement/PlacementHero";
import PlacementSnapshot from "@/components/placement/PlacementSnapshot";
import PlacementAdvantage from "@/components/placement/PlacementAdvantage";
import PlacementCorporate from "@/components/placement/PlacementCorporate";
import PlacementCTA from "@/components/placement/PlacementCTA";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Placement | FOSTIIMA Business School",
  description:
    "Explore placement opportunities at FOSTIIMA Business School, including corporate linkages, industry interaction and placement support.",

  alternates: {
    canonical: getCanonicalUrl("/placement"),
  },

  openGraph: {
    type: "website",
    url: getCanonicalUrl("/placement"),
    title: "Placement | FOSTIIMA Business School",
    description:
      "Explore placement opportunities at FOSTIIMA Business School, including corporate linkages, industry interaction and placement support.",
    siteName: "FOSTIIMA Business School",
  },
};

export default function PlacementPage() {
  return (
    <>
      <PlacementHero />

      <PlacementSnapshot />

      <PlacementAdvantage />

      <PlacementCorporate />

      <PlacementCTA />
    </>
  );
}
