"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Newspaper } from "lucide-react";

import { mediaPresenceData } from "@/data/mediaPresence";

export default function MediaPresenceSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const hasCarousel = mediaPresenceData.length > 3;

  const scrollSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;

    if (!slider) return;

    const scrollAmount = slider.clientWidth * 0.88;

    slider.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden bg-[#f6f9ff] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#c31e3b]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#c31e3b]">
                Media Presence
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#152d58] sm:text-4xl lg:text-[42px]">
              FOSTIIMA in the <span className="text-[#c31e3b]">News</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Discover stories, insights and highlights featuring FOSTIIMA
              Business School across leading media platforms.
            </p>
          </div>

          {/* Arrows */}
          {hasCarousel && (
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => scrollSlider("left")}
                aria-label="Previous media stories"
                className="
                  flex h-10 w-10 items-center justify-center rounded-full
                  border border-[#c31e3b]/20 bg-white text-[#152d58]
                  shadow-sm transition-all duration-300
                  hover:border-[#c31e3b] hover:bg-[#c31e3b] hover:text-white
                "
              >
                <ArrowLeft size={17} strokeWidth={1.8} />
              </button>

              <button
                type="button"
                onClick={() => scrollSlider("right")}
                aria-label="Next media stories"
                className="
                  flex h-10 w-10 items-center justify-center rounded-full
                  border border-[#c31e3b]/20 bg-white text-[#152d58]
                  shadow-sm transition-all duration-300
                  hover:border-[#c31e3b] hover:bg-[#c31e3b] hover:text-white
                "
              >
                <ArrowRight size={17} strokeWidth={1.8} />
              </button>
            </div>
          )}
        </div>

        {/* Media Slider */}
        <div
          ref={sliderRef}
          className="
            flex
            w-full
            gap-5
            overflow-x-auto
            snap-x
            snap-mandatory
            scroll-smooth
            pb-4
            scrollbar-hide
          "
        >
          {mediaPresenceData.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                block
                w-[88%]
                min-w-[88%]
                snap-start
                sm:w-[calc(50%-10px)]
                sm:min-w-[calc(50%-10px)]
                lg:w-[calc(33.333%-14px)]
                lg:min-w-[calc(33.333%-14px)]
              "
            >
              <article
                className="
                  relative flex h-full min-h-[370px] flex-col
                  overflow-hidden rounded-2xl
                  border border-[#dbe4f2]
                  bg-white
                  shadow-[0_8px_30px_rgba(21,45,88,0.06)]
                  transition-all duration-500
                  group-hover:-translate-y-1
                  group-hover:border-[#c31e3b]/30
                  group-hover:shadow-[0_18px_45px_rgba(21,45,88,0.12)]
                "
              >
                {/* Top Accent */}
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#152d58] via-[#c31e3b] to-[#e6b93f]" />

                {/* Logo Area */}
                <div className="relative flex h-40 items-center justify-center border-b border-slate-100 bg-[#fbfcff] px-8">
                  <div
                    className="
                      absolute left-5 top-5 flex h-8 w-8 items-center
                      justify-center rounded-lg bg-[#eef4ff]
                      text-[#152d58]
                    "
                  >
                    <Newspaper size={15} strokeWidth={1.8} />
                  </div>

                  <span
                    className="
                            absolute right-5 top-5 z-20
                            rounded-full
                            bg-[#fff1f3]
                            px-3 py-1
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.14em]
                            text-[#c31e3b]
                            shadow-sm
                                    "
                  >
                    Media Coverage
                  </span>

                  <img
                    src={item.logo}
                    alt={`${item.publication} logo`}
                    className="
                      max-h-24
                      max-w-[82%]
                      object-contain
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#71809a]">
                    {item.publication}
                  </p>

                  <h3
                    className="
                      line-clamp-3
                      text-lg
                      font-bold
                      leading-7
                      text-[#172f59]
                      transition-colors
                      duration-300
                      group-hover:text-[#c31e3b]
                    "
                  >
                    {item.title}
                  </h3>

                  {/* Bottom Link */}
                  <div className="mt-auto flex items-center justify-between pt-7">
                    <span className="text-sm font-semibold text-[#c31e3b]">
                      Read Article
                    </span>

                    <span
                      className="
                        flex h-9 w-9 items-center justify-center
                        rounded-full
                        border border-[#dce4f0]
                        text-[#152d58]
                        transition-all duration-300
                        group-hover:border-[#c31e3b]
                        group-hover:bg-[#c31e3b]
                        group-hover:text-white
                      "
                    >
                      <ExternalLink size={15} strokeWidth={1.8} />
                    </span>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:hidden">
          <ArrowLeft size={12} />
          <span>Swipe to explore</span>
          <ArrowRight size={12} />
        </div>
      </div>
    </section>
  );
}
