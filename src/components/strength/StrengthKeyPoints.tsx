import { CheckCircle2 } from "lucide-react";

import { strengthData } from "@/data/strength";

export default function StrengthKeyPoints() {
  return (
    <section
      id="key-strengths"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#c31e3b]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-[#c31e3b]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-md">
              Key Strengths
            </p>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-[#172f59] sm:text-4xl lg:text-[42px]">
            What Makes FOSTIIMA Stand Out
          </h2>

          <p className="mt-5 text-[15px] leading-7 text-slate-600">
            A combination of academic quality, industry relevance,
            infrastructure, research-driven learning and experienced faculty
            forms the foundation of the FOSTIIMA experience.
          </p>
        </div>

        {/* Strength Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strengthData.keyStrengths.map((strength, index) => (
            <article
              key={strength.id}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#c31e3b]/25
                hover:shadow-[0_14px_35px_rgba(21,45,88,0.10)]
              "
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold tracking-[0.14em] text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <CheckCircle2
                  size={19}
                  className="text-[#c31e3b]"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-6 text-base font-bold leading-6 text-[#172f59]">
                {strength.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {strength.description}
              </p>

              <div
                aria-hidden="true"
                className="absolute -bottom-8 -right-8 h-20 w-20 rounded-full bg-[#123b79]/5 transition-transform duration-500 group-hover:scale-150"
              />
            </article>
          ))}
        </div>

        {/* Placement Highlight */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-[#071a38]">
          <div className="flex flex-col gap-6 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4c542]">
                Placement Highlight
              </p>

              <p className="mt-3 text-xl font-bold text-white sm:text-2xl">
                PGDM Batch 2023 - 25
              </p>

              <p className="mt-2 text-sm text-white/60">
                Average placements above ₹11.15 lakhs per annum.
              </p>
            </div>

            <div className="shrink-0">
              <div className="border border-white/10 bg-white/5 px-6 py-4 text-center">
                <p className="text-2xl font-bold text-[#f4c542]">
                  ₹11.15 LPA+
                </p>

                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">
                  Average Placement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}