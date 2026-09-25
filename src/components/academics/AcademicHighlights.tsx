import {
  Award,
  BookOpen,
  Brain,
  Building2,
  Check,
  GraduationCap,
  LineChart,
  type LucideIcon,
} from "lucide-react";

import { academicsData } from "@/data/academics";

const iconMap: Record<string, LucideIcon> = {
  award: Award,
  "book-open": BookOpen,
  brain: Brain,
  "building-2": Building2,
  "graduation-cap": GraduationCap,
  "line-chart": LineChart,
};

export default function AcademicHighlights() {
  return (
    <section
      id="key-strengths"
      aria-labelledby="academic-highlights-title"
      className="bg-[#f8fafc] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-md font-semibold uppercase tracking-[0.2em] text-[#c31e3b]">
            Key Strength
          </span>

          <h2
            id="academic-highlights-title"
            className="mt-3 text-3xl font-bold tracking-tight text-[#071a38] sm:text-4xl"
          >
            What Strengthens the FOSTIIMA Academic Experience
          </h2>

          <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#c31e3b]" />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {academicsData.highlights.map((highlight, index) => {
            const Icon = iconMap[highlight.icon] ?? Award;

            return (
              <article
                key={highlight.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(7,26,56,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/20 hover:shadow-[0_16px_40px_rgba(7,26,56,0.1)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-5 top-4 text-4xl font-bold text-slate-100 transition-colors duration-300 group-hover:text-[#c31e3b]/10"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-[#071a38] text-white transition-colors duration-300 group-hover:bg-[#c31e3b]">
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </div>

                <h3 className="mt-5 text-base font-bold leading-6 text-[#071a38]">
                  {highlight.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {highlight.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-md font-semibold text-[#c31e3b]">
                  <Check
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  <span>FOSTIIMA Advantage</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}