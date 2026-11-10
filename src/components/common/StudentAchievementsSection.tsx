"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Trophy,
  TrendingUp,
  FileSpreadsheet,
  X,
  Maximize2,
  CheckCircle2,
  Users,
} from "lucide-react";
import {
  studentAchievementsData,
  type StudentAchievementImage,
} from "@/data/student-achievements";

type StudentAchievementsSectionProps = {
  useFallbackTitle?: boolean;
};

const highlightIcons = [Trophy, TrendingUp, FileSpreadsheet];

export default function StudentAchievementsSection({
  useFallbackTitle = false,
}: StudentAchievementsSectionProps) {
  const [activeImage, setActiveImage] = useState<StudentAchievementImage | null>(
    null
  );

  const handleCloseModal = useCallback(() => {
    setActiveImage(null);
  }, []);

  // Keyboard navigation for accessibility: Escape closes lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    if (activeImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage, handleCloseModal]);

  const title = useFallbackTitle
    ? studentAchievementsData.fallbackTitle
    : studentAchievementsData.preferredTitle;

  return (
    <section
      id="student-achievements"
      aria-labelledby="student-achievements-title"
      className="bg-white py-16 sm:py-20 lg:py-24 border-t border-[#e2e8f0]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="h-px w-8 bg-[#c31e3b]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c31e3b] sm:text-sm">
              {studentAchievementsData.eyebrow}
            </span>
            <span className="h-px w-8 bg-[#c31e3b]" />
          </div>

          <h2
            id="student-achievements-title"
            className="text-3xl font-extrabold tracking-tight text-[#061a3a] sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#c31e3b]" />

          <p className="mt-6 text-base leading-8 text-[#475569] sm:text-lg">
            {studentAchievementsData.leadParagraph}
          </p>

          {/* Student Delegation Team Tag */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#dbe3ee] bg-[#f8fafc] px-4 py-2 text-xs font-semibold text-[#061a3a] shadow-xs">
            <Users className="h-4 w-4 text-[#c31e3b]" />
            <span>Team FinSights:</span>
            <span className="text-[#64748b]">
              {studentAchievementsData.studentTeam.join(" • ")}
            </span>
          </div>
        </div>

        {/* 3 Metric Highlights */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {studentAchievementsData.highlights.map((item, index) => {
            const Icon = highlightIcons[index % highlightIcons.length];
            return (
              <div
                key={item.label}
                className="flex flex-col justify-between rounded-2xl border border-[#dbe3ee] bg-[#f8fafc] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/30 hover:bg-white hover:shadow-lg"
              >
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#c31e3b]/10 text-[#c31e3b]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c31e3b]">
                    {item.label}
                  </span>
                  <h3 className="mt-1 text-xl font-extrabold text-[#061a3a]">
                    {item.value}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#64748b]">
                    {item.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-2 pt-4 border-t border-[#e2e8f0] text-xs font-semibold text-[#061a3a]">
                  <CheckCircle2 className="h-4 w-4 text-[#c31e3b]" />
                  <span>National Competitive Milestone</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsive Image Gallery: Balanced 3-Column Desktop Layout */}
        <div className="mt-14 sm:mt-16">
          <div className="mb-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
                Competition Gallery
              </span>
              <h3 className="text-xl font-bold text-[#061a3a] sm:text-2xl">
                Team FinSights at IIM Indore Finopoly
              </h3>
            </div>
            <p className="text-xs font-medium text-[#64748b]">
              Click any photo to enlarge in lightbox
            </p>
          </div>

          {/* Balanced 3-Column Grid for exactly 3 original images */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studentAchievementsData.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(image)}
                className="group relative block overflow-hidden rounded-2xl border border-[#dbe3ee] bg-slate-100 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#c31e3b] focus:ring-offset-2"
                aria-label={`Enlarge photo: ${image.caption}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#061a3a]/0 transition-colors duration-300 group-hover:bg-[#061a3a]/30" />
                  <span className="absolute bottom-3 right-3 rounded-full bg-[#061a3a]/80 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                  <span className="absolute left-3 top-3 rounded-md bg-[#061a3a]/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-4 bg-white border-t border-[#f1f5f9]">
                  <p className="text-sm font-semibold text-[#061a3a] line-clamp-1">
                    {image.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.caption}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-[#061a3a] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-[#c31e3b] focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] w-[85vw] max-w-3xl overflow-hidden sm:w-[75vw]">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="(max-width: 1024px) 85vw, 1200px"
                className="object-contain"
                priority
              />
            </div>

            {/* Caption */}
            <div className="bg-[#071a38] px-6 py-4 text-white">
              <p className="text-sm font-semibold sm:text-base">
                {activeImage.caption}
              </p>
              <p className="mt-1 text-xs text-[#94a3b8]">
                {activeImage.alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
