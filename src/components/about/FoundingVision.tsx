"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Landmark,
} from "lucide-react";

import { founderTrustees } from "@/data/about";

export default function FoundingVision() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const amount = slider.clientWidth * 0.8;

    slider.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="trustees-founder"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#123b79]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#c31e3b]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#c31e3b]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-xs">
                Trustees &amp; Founders
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-[#172f59] sm:text-4xl lg:text-[42px]">
              The People Behind the FOSTIIMA Vision
            </h2>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600">
              FOSTIIMA&apos;s foundation is supported by experienced
              professionals and alumni who have contributed to the
              institution&apos;s vision, management education and long-term
              direction.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollSlider("left")}
              aria-label="Previous founder trustees"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#123b79] shadow-sm transition-all duration-300 hover:border-[#123b79] hover:bg-[#123b79] hover:text-white"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => scrollSlider("right")}
              aria-label="Next founder trustees"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#123b79] shadow-sm transition-all duration-300 hover:border-[#123b79] hover:bg-[#123b79] hover:text-white"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Founder Intro */}
        <div className="mt-10 flex items-start gap-4 rounded-2xl border border-[#123b79]/10 bg-[#f5f8fc] p-5 sm:p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#123b79] text-white">
            <Landmark size={20} aria-hidden="true" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#172f59] sm:text-base">
              Founder Trustees
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              Explore the founder trustees who have played an important role
              in shaping the institution&apos;s vision and educational
              philosophy.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-8">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
          >
            {founderTrustees.map((trustee) => (
              <div
                key={trustee.name}
                rel="noopener noreferrer"
                className="
                  group
                  w-[86%]
                  min-w-[86%]
                  snap-start
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#123b79]/20
                  hover:shadow-lg
                  sm:w-[calc(50%-8px)]
                  sm:min-w-[calc(50%-8px)]
                  lg:w-[calc(25%-12px)]
                  lg:min-w-[calc(25%-12px)]
                  xl:w-[calc(14.285%-14px)]
                  xl:min-w-[calc(14.285%-14px)]
                "
              >
                {/* Image */}
                <div className="relative aspect-[4/4.2] overflow-hidden bg-[#f5f8fc]">
                  <Image
                    src={trustee.image}
                    alt={`${trustee.name} - Founder Trustee`}
                    fill
                    sizes="(max-width: 640px) 86vw, (max-width: 1024px) 50vw, 14vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a38]/75 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />


                  {/* Number */}
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold tracking-[0.15em] text-white/60">
                    FOUNDER
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-[#172f59]">
                    {trustee.name}
                  </h3>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#c31e3b]">
                      {trustee.role}
                    </p>

                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 text-[#123b79] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
          <p className="text-xs text-slate-400">
            {founderTrustees.length} Founder Trustees
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Swipe to explore
          </p>
        </div>
      </div>
    </section>
  );
}