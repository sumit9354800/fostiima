import { ArrowRight, BookOpen, RefreshCw, Target } from "lucide-react";

import { strengthData } from "@/data/strength";

export default function StrengthCurriculum() {
  const curriculumSection = strengthData.sections.find(
    (section) => section.id === "curriculum",
  );

  if (!curriculumSection) {
    return null;
  }

  const Icon = curriculumSection.icon;

  return (
    <section
      id="curriculum"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#c31e3b]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#c31e3b]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-md">
                {curriculumSection.eyebrow}
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-[#172f59] sm:text-4xl lg:text-[42px]">
              {curriculumSection.title}
            </h2>

            <div className="mt-7 flex h-14 w-14 items-center justify-center rounded-xl bg-[#c31e3b] text-white">
              <Icon size={25} aria-hidden="true" />
            </div>
          </div>

          <div>
            <div className="space-y-5 text-[15px] leading-7 text-slate-600">
              {curriculumSection.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-[#f7f9fc] p-5">
                <BookOpen
                  size={20}
                  className="text-[#123b79]"
                  aria-hidden="true"
                />

                <p className="mt-4 text-sm font-bold text-[#172f59]">
                  Business Concepts
                </p>

                <p className="mt-1 text-md leading-5 text-slate-500">
                  Strong focus on understanding key business concepts.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#f7f9fc] p-5">
                <Target
                  size={20}
                  className="text-[#c31e3b]"
                  aria-hidden="true"
                />

                <p className="mt-4 text-sm font-bold text-[#172f59]">
                  Analytical Skills
                </p>

                <p className="mt-1 text-md leading-5 text-slate-500">
                  Learning designed to develop analytical capabilities.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#f7f9fc] p-5">
                <RefreshCw
                  size={20}
                  className="text-[#9a7400]"
                  aria-hidden="true"
                />

                <p className="mt-4 text-sm font-bold text-[#172f59]">
                  Periodic Review
                </p>

                <p className="mt-1 text-md leading-5 text-slate-500">
                  Curriculum reviewed to maintain relevance to industry.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <a
            href="#corporate-linkages"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#123b79] transition-colors hover:text-[#c31e3b]"
          >
            Explore Corporate Linkages

            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}