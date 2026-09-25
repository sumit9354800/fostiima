import {
  BookOpen,
  Brain,
  Globe2,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

import { academicsData } from "@/data/academics";

const iconMap: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  brain: Brain,
  globe: Globe2,
  "refresh-cw": RefreshCw,
};

export default function AcademicOverview() {
  return (
    <section
      id="academic-overview"
      aria-labelledby="academic-overview-title"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-md font-semibold uppercase tracking-[0.2em] text-[#c31e3b]">
            Academic Approach
          </span>

          <h2
            id="academic-overview-title"
            className="mt-3 text-3xl font-bold tracking-tight text-[#071a38] sm:text-4xl"
          >
            Management Education With Industry Relevance
          </h2>

          <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#c31e3b]" />
        </div>

        {/* Main Content */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          {/* Description */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:p-10">
            <p className="text-base leading-8 text-slate-600 sm:text-lg">
              {academicsData.intro}
            </p>
          </div>

          {/* Academic Focus */}
          <div className="grid gap-4 sm:grid-cols-2">
            {academicsData.focus.map((item) => {
              const Icon = iconMap[item.icon] ?? BookOpen;

              return (
                <article
                  key={item.id}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(7,26,56,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(7,26,56,0.09)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#071a38] text-white transition-colors duration-300 group-hover:bg-[#c31e3b]">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-[#071a38]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}