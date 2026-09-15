import type { Metadata } from "next";
import FinalPlacementContent from "@/components/placement/final-placements/FinalPlacementContent";
import FinalPlacementsHero from "@/components/placement/final-placements/FinalPlacementsHero";
import { finalPlacementBatches } from "@/data/placement/final-placements";

export const metadata: Metadata = {
  title: "Final Placements | FOSTIIMA Business School",
  description:
    "Explore final placement highlights, placement insights and student outcomes across FOSTIIMA batches.",
};

export default function FinalPlacementsPage() {
  return (
    <main className="bg-white">
      <FinalPlacementsHero />

      <FinalPlacementContent
        batches={finalPlacementBatches}
      />
    </main>
  );
}