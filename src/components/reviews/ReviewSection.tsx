"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ReviewCard from "@/components/reviews/ReviewCard";
import { reviews } from "@/data/reviews";

const HOMEPAGE_REVIEW_LIMIT = 6;
const CAROUSEL_THRESHOLD = 3;

export default function ReviewSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const visibleReviews = reviews.slice(0, HOMEPAGE_REVIEW_LIMIT);
  const hasCarousel = visibleReviews.length > CAROUSEL_THRESHOLD;

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current || !hasCarousel) return;

    const amount = sliderRef.current.clientWidth * 0.8;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#f8faff] py-14 sm:py-16">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#dbeafe]/60 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#fee2e2]/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-[#c31e3b]">
              Reviews & Feedback
            </span>

            <h2 className="text-2xl font-bold tracking-tight text-[#102a56] sm:text-3xl lg:text-4xl">
              What Our <span className="text-[#c31e3b]">Students Say</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Hear directly from students about their learning experience,
              campus life and journey at FOSTIIMA.
            </p>
          </div>

          {/* Arrows only when 4+ */}
          {hasCarousel && (
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous reviews"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#102a56] shadow-sm transition-all hover:border-[#c31e3b] hover:bg-[#c31e3b] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next reviews"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#102a56] shadow-sm transition-all hover:border-[#c31e3b] hover:bg-[#c31e3b] hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Reviews */}
        {visibleReviews.length > 0 ? (
          <div
            ref={sliderRef}
            className="
      flex
      gap-5
      overflow-x-auto
      snap-x
      snap-mandatory
      scroll-smooth
      pb-3
      scrollbar-hide
    "
          >
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="
          w-[88%]
          shrink-0
          snap-start
          sm:w-[calc(50%-10px)]
          lg:w-[calc(33.333%-14px)]
        "
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              No reviews are currently available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
