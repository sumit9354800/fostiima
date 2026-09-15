import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Users,
} from "lucide-react";

import { strengthData } from "@/data/strength";

export default function StrengthFaculty() {
  const facultySection = strengthData.sections.find(
    (section) => section.id === "faculty",
  );

  if (!facultySection) {
    return null;
  }

  const Icon = facultySection.icon;

  return (
    <section
      id="faculty"
      className="relative overflow-hidden bg-[#f5f8fc] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-[#123b79]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#c31e3b]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Section Intro */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#c31e3b]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-xs">
                {facultySection.eyebrow}
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-[#172f59] sm:text-4xl lg:text-[42px]">
              {facultySection.title}
            </h2>

            <div className="mt-7 flex h-14 w-14 items-center justify-center rounded-xl bg-[#123b79] text-white">
              <Icon size={25} aria-hidden="true" />
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
              Learn from professionals who bring years of corporate experience
              and practical business knowledge into the classroom.
            </p>
          </div>

          {/* Faculty Content */}
          <div>
            <div className="space-y-5 text-[15px] leading-7 text-slate-600">
              {facultySection.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Faculty Highlights */}
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#123b79]/8 text-[#123b79]">
                  <GraduationCap size={19} aria-hidden="true" />
                </div>

                <p className="mt-4 text-sm font-bold text-[#172f59]">
                  IIM Graduates
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Core, adjunct and guest faculty with IIM backgrounds.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c31e3b]/8 text-[#c31e3b]">
                  <BriefcaseBusiness size={19} aria-hidden="true" />
                </div>

                <p className="mt-4 text-sm font-bold text-[#172f59]">
                  Corporate Experience
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Experience across diverse portfolios and responsibilities.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f4c542]/15 text-[#9a7400]">
                  <Users size={19} aria-hidden="true" />
                </div>

                <p className="mt-4 text-sm font-bold text-[#172f59]">
                  Experiential Learning
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Theory connected with practical business experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="mt-8 rounded-2xl bg-[#071a38] p-7 sm:p-8 lg:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4c542]">
                Learning Methodology
              </p>

              <p className="mt-3 text-base font-semibold leading-7 text-white sm:text-lg">
                A unique mixture of theory and experiential learning.
              </p>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Practical experiences and professional perspectives help
                students connect management concepts with real business
                situations.
              </p>
            </div>

            <a
              href="#curriculum"
              className="group inline-flex shrink-0 items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-[#f4c542]"
            >
              Explore Curriculum

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-[#f4c542] group-hover:bg-[#f4c542] group-hover:text-[#071a38]">
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}