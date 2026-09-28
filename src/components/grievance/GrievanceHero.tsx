"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { cloudinaryAsset } from "@/lib/cloudinary";

const heroImage = cloudinaryAsset("/banner/grievance-banner.webp");

export default function GrievanceHero() {
  const [imageError, setImageError] = useState(false);

  const showImage = Boolean(heroImage) && !imageError;

  return (
    <section className="relative overflow-hidden bg-[#061a3a]">
      {/* Background Image */}
      {showImage && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <img
            src={heroImage}
            alt="FOSTIIMA Business School Grievance and Helpline"
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {/* Dark Overlay */}
      {showImage && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#061a3a]/70"
        />
      )}

      {/* Fallback Grid */}
      {!showImage && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.75) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      )}

      {/* Fallback Red Glow */}
      {!showImage && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#c31e3b]/10 blur-[120px]"
        />
      )}

      {/* Fallback Blue Glow */}
      {!showImage && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-[#183f78]/20 blur-[100px]"
        />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[#e5b83f]" />

            <span className="text-md font-bold uppercase tracking-[0.22em] text-[#e5b83f]">
              Student Support
            </span>
          </div>

          <div className="mt-5 h-px w-14 bg-[#c31e3b]" />

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Grievance
            <span className="text-[#c31e3b]"> &amp; Helpline</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#b8c5d8] sm:text-lg">
            Information and contact details for grievance redressal, feedback,
            suggestions and student support.
          </p>
        </div>
      </div>
    </section>
  );
}