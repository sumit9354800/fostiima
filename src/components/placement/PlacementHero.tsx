"use client";

import { useState } from "react";
import { BriefcaseBusiness } from "lucide-react";
import { cloudinaryAsset } from "@/lib/cloudinary";

const heroImage = cloudinaryAsset("/banner/placement-banner.webp");

export default function PlacementHero() {
  const [imageError, setImageError] = useState(false);

  const showImage = Boolean(heroImage) && !imageError;

  return (
    <section className="relative isolate overflow-hidden bg-[#061a3a]">
      {/* Background Image */}
      {showImage && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Placement opportunities and corporate engagement at FOSTIIMA Business School"
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {/* Image Overlay */}
      {showImage && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#061a3a]/70"
        />
      )}

      {/* Background Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* Red Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#c31e3b]/10 blur-3xl"
      />

      {/* Gold Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#e5b83f]/10 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <BriefcaseBusiness
              aria-hidden="true"
              className="h-5 w-5 text-[#e5b83f]"
            />

            <span className="text-md font-bold uppercase tracking-[0.22em] text-[#e5b83f]">
              Career &amp; Industry
            </span>
          </div>

          {/* Accent */}
          <div className="mt-5 h-px w-14 bg-[#c31e3b]" />

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Placement
            <span className="block text-[#c31e3b]">
              Opportunities
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#b8c5d8] sm:text-lg">
            FOSTIIMA Business School provides students with opportunities to
            connect with industry through corporate linkages, industry
            interaction and placement support.
          </p>
        </div>
      </div>
    </section>
  );
}