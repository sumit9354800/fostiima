import type { Metadata } from "next";
import FinalPlacementContent from "@/components/placement/final-placements/FinalPlacementContent";
import FinalPlacementsHero from "@/components/placement/final-placements/FinalPlacementsHero";
import { finalPlacementBatches } from "@/data/placement/final-placements";
import { getCanonicalUrl } from "@/lib/seo";
export const metadata: Metadata = {
  title: "Final Placements | FOSTIIMA Business School",
  description:
    "Explore final placement highlights, placement insights and student outcomes across FOSTIIMA batches.",

  alternates: {
    canonical: getCanonicalUrl("/placement/final-placements"),
  },

  openGraph: {
    type: "website",
    url: getCanonicalUrl("/placement/final-placements"),
    title: "Final Placements | FOSTIIMA Business School",
    description:
      "Explore final placement highlights, placement insights and student outcomes across FOSTIIMA batches.",
    siteName: "FOSTIIMA Business School",
  },
};
export default function FinalPlacementsPage() {
  return (
    <main className="bg-white">
      <FinalPlacementsHero />

      <FinalPlacementContent batches={finalPlacementBatches} />
    </main>
  );
}
