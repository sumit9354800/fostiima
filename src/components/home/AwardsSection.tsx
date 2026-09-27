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
import Link from "next/link";
import { accreditations } from "@/data/awards-accreditation";

const icons = [Award, Star, ShieldCheck];

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
          {accreditations.map((accreditation, index) => {
            const Icon = icons[index % icons.length];

            const accent =
              index % 3 === 0
                ? {
                    icon: "bg-[#c31e3b]/10 text-[#c31e3b]",
                    line: "bg-[#c31e3b]",
                  }
                : index % 3 === 1
                  ? {
                      icon: "bg-[#fef3c7] text-[#b77900]",
                      line: "bg-[#eab308]",
                    }
                  : {
                      icon: "bg-[#dbeafe] text-[#1555a5]",
                      line: "bg-[#1555a5]",
                    };

            return (
              <Link
                key={accreditation.id}
                href={`/awards-accreditation/${accreditation.id}`}
                className="group min-w-[85%] snap-start sm:min-w-[calc(50%-15px)] lg:min-w-[calc(25%-15px)]"
              >
                <article className="relative h-full overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {/* Top accent */}
                  <div
                    className={`absolute left-0 top-0 h-1 w-full ${accent.line}`}
                  />

                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.icon}`}
                    >
                      <Icon
                        className="h-6 w-6"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c31e3b]" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-lg font-bold text-[#102a56]">
                    {accreditation.title}
                  </h3>

                  {/* Year */}
                  {accreditation.year && (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#c31e3b]">
                      {accreditation.year}
                    </p>
                  )}

                  {/* Description */}
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {accreditation.description}
                  </p>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Bottom link */}
        <div className="mt-6 flex justify-end">
          <Link
            href="/awards-accreditation"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#c31e3b] transition-colors hover:text-[#102a56]"
          >
            View More
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
