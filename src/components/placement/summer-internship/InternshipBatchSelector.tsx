"use client";

import { ChevronDown } from "lucide-react";
import type { InternshipBatch } from "@/data/placement/summer-internship";

type InternshipBatchSelectorProps = {
  batches: InternshipBatch[];
  selectedBatchId: string;
  onBatchChange: (batchId: string) => void;
};

export default function InternshipBatchSelector({
  batches,
  selectedBatchId,
  onBatchChange,
}: InternshipBatchSelectorProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
            Select Batch
          </p>

          <p className="mt-1 text-sm text-slate-500">
            View summer internship profile-wise data by batch.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <select
            value={selectedBatchId}
            onChange={(event) => onBatchChange(event.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm font-semibold text-[#102a56] outline-none transition focus:border-[#c31e3b] focus:ring-2 focus:ring-[#c31e3b]/10"
            aria-label="Select summer internship batch"
          >
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                SIP {batch.batch}
              </option>
            ))}
          </select>

          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#102a56]"
          />
        </div>
      </div>
    </div>
  );
}