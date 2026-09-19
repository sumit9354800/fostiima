import { ClipboardList } from "lucide-react";

import {
  casualLeave,
  medicalLeave,
  leaveTypes,
} from "@/data/hr-policy";

export default function LeaveTypes() {
  return (
    <section className="bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-5 w-5 text-[#c31e3b]" />

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Types of Leave
          </span>
        </div>

        <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
          Types of Leave
        </h2>

        <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

        <div className="mt-8 flex flex-wrap gap-3">
          {leaveTypes.map((type) => (
            <span
              key={type}
              className="border border-[#dbe3ee] bg-white px-4 py-2 text-sm font-medium text-[#061a3a]"
            >
              {type}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <LeaveCard
            title="Casual Leave (CL)"
            points={casualLeave}
          />

          <LeaveCard
            title="Medical Leave (ML)"
            points={medicalLeave}
          />
        </div>
      </div>
    </section>
  );
}

function LeaveCard({
  title,
  points,
}: {
  title: string;
  points: readonly string[];
}) {
  return (
    <article className="border border-[#dbe3ee] bg-white p-6 sm:p-8">
      <h3 className="text-xl font-bold text-[#c31e3b]">
        {title}
      </h3>

      <div className="mt-6 space-y-4">
        {points.map((point) => (
          <div key={point} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e5b83f]" />

            <p className="text-sm leading-7 text-slate-700">
              {point}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}