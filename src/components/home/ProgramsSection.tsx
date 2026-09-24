
"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

type Program = {
  id: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  href: string;
  sortOrder: number;
  isActive: boolean;
};

type ProgramsSectionProps = {
  programs: Program[];
};

export default function ProgramsSection({
  programs,
}: ProgramsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) {
      return;
    }

    const scrollAmount = carouselRef.current.clientWidth * 0.82;

    carouselRef.current.scrollBy({
      left:
        direction === "right"
          ? scrollAmount
          : -scrollAmount,
      behavior: "smooth",
    });
  };

  if (!programs.length) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-[#f8faff] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b] sm:text-sm">
            Our Programs
          </p>

          <h2 className="mt-2 font-serif text-4xl font-bold leading-tight text-[#123b79] sm:text-5xl">
            Industry-aligned Programs{" "}
            <span className="text-[#c31e3b]">
              Built for Your Future
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Designed to build skills, knowledge and leadership
            for tomorrow&apos;s challenges.
          </p>
        </div>

        {/* Carousel Header */}
        <div className="mt-9 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            aria-label="Previous programs"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#123b79]/20 bg-white text-[#123b79] shadow-sm transition hover:bg-[#123b79] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#123b79]/30"
          >
            <ChevronLeft
              size={19}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            aria-label="Next programs"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#123b79]/20 bg-white text-[#123b79] shadow-sm transition hover:bg-[#123b79] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#123b79]/30"
          >
            <ChevronRight
              size={19}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Programs */}
        <div
          ref={carouselRef}
          className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {programs.map((program) => (
            <article
              key={program.id}
              className="group min-w-[82%] snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_25px_rgba(18,59,121,0.06)] sm:min-w-[47%] lg:min-w-[calc(25%-12px)]"
            >
              {/* Image */}
              <div className="relative aspect-[1.65/1] overflow-hidden">
                <img
                  src={program.imageUrl}
                  alt={program.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071a35]/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="text-lg font-bold text-[#123b79]">
                  {program.title}
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  {program.category}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {program.duration}
                </p>

                <Link
                  href={program.href || "/programs"}
                  className="mt-4 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#c31e3b] transition-transform duration-300 group-hover:translate-x-1"
                >
                  Know More

                  <ArrowRight
                    size={13}
                    className="ml-1.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
