import {
  Building2,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { placementStats } from "@/data/placement";

const statIcons = [
  TrendingUp,
  Users,
  Target,
  Building2,
];

export default function PlacementSnapshot() {
  return (
    <section className="bg-[#f8fafc] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Placement Snapshot
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
            Placement at a Glance
          </h2>

          <div className="mx-auto mt-5 h-1 w-14 bg-[#e5b83f]" />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {placementStats.map((stat, index) => {
            const Icon = statIcons[index];

            return (
              <article
                key={stat.label}
                className="group border border-[#dbe3ee] bg-white p-7 text-center shadow-[0_8px_30px_rgba(6,26,58,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(6,26,58,0.12)]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#e5b83f] text-[#c31e3b] transition-colors duration-300 group-hover:bg-[#c31e3b] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <p className="mt-6 text-3xl font-bold text-[#c31e3b] sm:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}