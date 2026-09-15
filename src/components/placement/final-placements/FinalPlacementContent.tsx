"use client";

import { useState } from "react";

import type { FinalPlacementBatch } from "@/data/placement/final-placements";

import FinalPlacementBatchSelector from "./FinalPlacementBatchSelector";
import FinalPlacementsHero from "./FinalPlacementsHero";
import PlacementHighlights from "./PlacementHighlights";
import PlacementStudents from "./PlacementStudents";
import PlacementChart from "./PlacementCharts";

type FinalPlacementContentProps = {
  batches: FinalPlacementBatch[];
};

export default function FinalPlacementContent({
  batches,
}: FinalPlacementContentProps) {
  const [selectedBatchId, setSelectedBatchId] = useState(
    batches[0]?.id ?? "",
  );

  const selectedBatch =
    batches.find(
      (batch) => batch.id === selectedBatchId,
    ) ?? batches[0];

  if (!selectedBatch) {
    return null;
  }

  return (
    <>
      <FinalPlacementsHero />

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="space-y-10">
            <FinalPlacementBatchSelector
              batches={batches}
              selectedBatchId={selectedBatch.id}
              onBatchChange={setSelectedBatchId}
            />

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#c31e3b]">
                Selected Batch
              </p>

              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#102a56] sm:text-3xl">
                {selectedBatch.title}
              </h1>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {selectedBatch.placementCharts.map((chart) => (
                <PlacementChart
                  key={chart.id}
                  title={chart.title}
                  data={chart.data}
                />
              ))}
            </div>

            <PlacementHighlights
              batch={selectedBatch.batch}
              content={selectedBatch.highlights}
            />

            <PlacementStudents
              batch={selectedBatch.batch}
              students={selectedBatch.students}
            />
          </div>
        </div>
      </section>
    </>
  );
}