"use client";

import { useState } from "react";
import InternshipBatchSelector from "./InternshipBatchSelector";
import InternshipChart from "./InternshipChart";
import InternshipHighlights from "./InternshipHighlights";
import InternshipProfileTable from "./InternshipProfileTable";
import type { InternshipBatch } from "@/data/placement/summer-internship";

type SummerInternshipContentProps = {
  batches: InternshipBatch[];
};

export default function SummerInternshipContent({
  batches,
}: SummerInternshipContentProps) {
  const [selectedBatchId, setSelectedBatchId] = useState(
    batches[0]?.id ?? "",
  );

  const selectedBatch =
    batches.find((batch) => batch.id === selectedBatchId) ??
    batches[0];

  if (!selectedBatch) {
    return null;
  }

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="space-y-6">
          <InternshipBatchSelector
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

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <InternshipProfileTable
              profiles={selectedBatch.profiles}
            />

            <InternshipChart
              profiles={selectedBatch.profiles}
            />
          </div>

          <InternshipHighlights
            batch={selectedBatch.batch}
            highlights={selectedBatch.highlights}
          />
        </div>
      </div>
    </section>
  );
}