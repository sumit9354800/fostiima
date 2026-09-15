import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { academicsData } from "@/data/academics";

export default function AcademicsHero() {
  return (
    <section
      aria-labelledby="academics-hero-title"
      className="relative overflow-hidden bg-[#071a38] py-20 sm:py-24 lg:py-28"
    >
      {/* Background Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c31e3b]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.75fr] lg:gap-16">
          {/* Content */}
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
              <BookOpen
                aria-hidden="true"
                className="h-4 w-4 text-[#f5c542]"
              />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                FOSTIIMA Business School
              </span>
            </div>

            <h1
              id="academics-hero-title"
              className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {academicsData.title}
            </h1>

            <div className="mt-5 h-1 w-16 rounded-full bg-[#c31e3b]" />

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              {academicsData.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/faculties"
                className="inline-flex items-center gap-2 rounded-md bg-[#c31e3b] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#a91832]"
              >
                Meet Our Faculty
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Academic visual */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#c31e3b]/10" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5c542]">
                  Academic Focus
                </p>

                <h2 className="mt-4 text-2xl font-semibold leading-snug text-white sm:text-3xl">
                  Contemporary Management Education
                </h2>

                <div className="mt-6 space-y-4">
                  {[
                    "Key Business Concepts",
                    "Analytical Skills",
                    "Industry-Relevant Curriculum",
                    "Emerging Global Areas",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                    >
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 shrink-0 rounded-full bg-[#c31e3b]"
                      />

                      <span className="text-sm leading-6 text-white/75">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}