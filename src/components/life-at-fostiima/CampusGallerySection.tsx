"use client";

import Image from "next/image";
import { useState } from "react";
import { campusGallery } from "@/data/life-at-fostiima";

export function CampusGallerySection() {
  return (
    <section
      id="campus-gallery"
      className="bg-[#f8fafc] px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Life at FOSTIIMA
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#061a3a] sm:text-4xl">
            Experience campus life beyond the classroom.
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748b]">
            Explore academic, cultural, sports and industry experiences that
            form an important part of campus life.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {campusGallery.map((item) => {
            const isLarge = item.size === "large";

            return (
              <article
                key={item.title}
                className={[
                  "group overflow-hidden rounded-2xl border border-[#dbe3ee] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(6,26,58,0.10)]",
                  isLarge ? "sm:col-span-2" : "",
                ].join(" ")}
              >
                <GalleryImage
                  src={item.src}
                  alt={item.alt}
                  title={item.title}
                  isLarge={isLarge}
                />

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#061a3a]">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-2 text-sm leading-6 text-[#64748b]">
                      {item.description}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type GalleryImageProps = {
  src: string;
  alt: string;
  title: string;
  isLarge: boolean;
};

function GalleryImage({
  src,
  alt,
  title,
  isLarge,
}: GalleryImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={[
        "relative overflow-hidden bg-[#eef2f7]",
        isLarge ? "h-64 sm:h-80" : "h-52",
      ].join(" ")}
    >
      {hasError ? (
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#eef2f7]"
          role="img"
          aria-label={`${title} image unavailable`}
        >
          <div
            className="absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10 px-6 text-center">
            <div className="mx-auto mb-3 h-px w-10 bg-[#c31e3b]" />

            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#061a3a]">
              {title}
            </p>

            <p className="mt-1 text-xs text-[#64748b]">
              Image unavailable
            </p>
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={
            isLarge
              ? "(max-width: 640px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, 25vw"
          }
          className="object-cover transition duration-500 group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}