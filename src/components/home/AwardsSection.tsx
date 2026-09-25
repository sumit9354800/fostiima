"use client";

import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  ShieldCheck,
  Star,
} from "lucide-react";

const awards = [
  {
    title: "AICTE APPROVAL 2021-22",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2021-22",
    icon: ShieldCheck,
    accent: "blue",
  },
  {
    title: "AICTE APPROVAL 2022-23",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2021-22",
    icon: Star,
    accent: "blue",
  },
  {
    title: "AICTE APPROVAL 2023-24",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2021-22",
    icon: Star,
    accent: "yellow",
  },
  {
    title: "AICTE APPROVAL 2024-25",
    description:
      "Online application of the Institution submitted for Extension of Approval for the Academic Year 2021-22",
    icon: Award,
    accent: "red",
  },
];

export default function AwardsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const amount = sliderRef.current.clientWidth * 0.8;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#f8faff] py-14 sm:py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#dbeafe]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#fee2e2]/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-[#c31e3b]">
              Awards & Accreditation
            </span>

            <h2 className="text-2xl font-bold tracking-tight text-[#102a56] sm:text-3xl lg:text-4xl">
              Recognised for Excellence
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Our academic standards, industry engagement and management
              education ecosystem reflect {`FOSTIIMA's`} commitment to
              excellence.
            </p>
          </div>

          {/* Arrows */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous awards"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#102a56] shadow-sm transition-all hover:border-[#c31e3b] hover:bg-[#c31e3b] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next awards"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#102a56] shadow-sm transition-all hover:border-[#c31e3b] hover:bg-[#c31e3b] hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal carousel */}
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 scrollbar-hide"
        >
          {awards.map((award) => {
            const Icon = award.icon;

            const accent =
              award.accent === "red"
                ? {
                    icon: "bg-[#c31e3b]/10 text-[#c31e3b]",
                    line: "bg-[#c31e3b]",
                  }
                : award.accent === "yellow"
                  ? {
                      icon: "bg-[#fef3c7] text-[#b77900]",
                      line: "bg-[#eab308]",
                    }
                  : {
                      icon: "bg-[#dbeafe] text-[#1555a5]",
                      line: "bg-[#1555a5]",
                    };

            return (
              <article
                key={award.title}
                className="group relative min-w-[85%] snap-start overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-[calc(50%-10px)] lg:min-w-[calc(33.333%-14px)]"
              >
                {/* Top accent */}
                <div
                  className={`absolute left-0 top-0 h-1 w-full ${accent.line}`}
                />

                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.icon}`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c31e3b]" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#102a56]">
                  {award.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                  {award.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Bottom link */}
        <div className="mt-6 flex justify-end">
          <a
            href="/awards-accreditation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#c31e3b] transition-colors hover:text-[#102a56]"
          >
            View More
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
