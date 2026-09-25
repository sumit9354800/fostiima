"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
} from "lucide-react";

const infrastructureImages = [
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_infra_img11.jpg",
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_infra_img2.jpg",
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_infra_img3.jpg",
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_infra_img4.jpg",
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_infra_img5.jpg",
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_infra1.jpg",
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_infra4.jpg",
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_infra5.jpg",
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_infra6.jpg",
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_life-at-fbs2.jpg",
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_life-at-fbs3.jpg",
  "https://fostiima.org/uploaded_files/thumb_cache/thumb_300_200_life-at-fbs4-1.jpg",
];

export default function InfrastructureSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const showPreviousImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return (
        (currentIndex - 1 + infrastructureImages.length) %
        infrastructureImages.length
      );
    });
  };

  const showNextImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return (currentIndex + 1) % infrastructureImages.length;
    });
  };

  /* Keyboard Controls */
  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeImage();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  /* Prevent Background Scroll */
  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex]);

  return (
    <>
      <section
        id="infrastructures"
        className="relative overflow-hidden bg-[#f5f8fc] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
      >
        {/* Background Decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#123b79]/5 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#c31e3b]/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#c31e3b]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-md">
                  Infrastructures
                </p>
              </div>

              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-[#172f59] sm:text-4xl lg:text-[42px]">
                Our Campus &amp; Infrastructure
              </h2>
            </div>

            {/* Carousel Controls */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => scrollSlider("left")}
                aria-label="Previous infrastructure images"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#123b79] shadow-sm transition-all duration-300 hover:border-[#123b79] hover:bg-[#123b79] hover:text-white"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollSlider("right")}
                aria-label="Next infrastructure images"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#123b79] shadow-sm transition-all duration-300 hover:border-[#123b79] hover:bg-[#123b79] hover:text-white"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative mt-10">
            <div
              ref={sliderRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
            >
              {infrastructureImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => openImage(index)}
                  aria-label={`View infrastructure image ${index + 1}`}
                  className="
                    group
                    relative
                    aspect-[3/2]
                    w-[88%]
                    min-w-[88%]
                    snap-start
                    overflow-hidden
                    rounded-2xl
                    bg-slate-100
                    text-left
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    sm:w-[calc(50%-8px)]
                    sm:min-w-[calc(50%-8px)]
                    lg:w-[calc(25%-12px)]
                    lg:min-w-[calc(25%-12px)]
                  "
                >
                  <Image
                    src={image}
                    alt={`FOSTIIMA infrastructure ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#071a38]/0 transition-all duration-300 group-hover:bg-[#071a38]/25" />

                  {/* Expand Icon */}
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#123b79] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                    <Maximize2 size={17} aria-hidden="true" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-5">
            <p className="text-md text-slate-400">
              {infrastructureImages.length} Images
            </p>

            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Click any image to view
            </p>
          </div>
        </div>
      </section>

      {/* Fullscreen Image Popup */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020817]/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Infrastructure image preview"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeImage();
            }
          }}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeImage}
            aria-label="Close image preview"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:right-7 sm:top-7"
          >
            <X size={22} aria-hidden="true" />
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={showPreviousImage}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:left-7 sm:h-12 sm:w-12"
          >
            <ArrowLeft size={21} aria-hidden="true" />
          </button>

          {/* Image */}
          <div className="relative h-[75vh] w-full max-w-6xl sm:h-[82vh]">
            <Image
              src={infrastructureImages[selectedIndex]}
              alt={`FOSTIIMA infrastructure ${selectedIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
              unoptimized
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={showNextImage}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:right-7 sm:h-12 sm:w-12"
          >
            <ArrowRight size={21} aria-hidden="true" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-md font-semibold text-white backdrop-blur-md">
            {selectedIndex + 1} / {infrastructureImages.length}
          </div>
        </div>
      )}
    </>
  );
}