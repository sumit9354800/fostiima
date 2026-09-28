
import { cloudinaryAsset } from "@/lib/cloudinary";
import { ArrowRight } from "lucide-react";

export const lifeAtFostiimaHero = {
  eyebrow: "Life at FOSTIIMA",
  description:
    "Discover a vibrant campus experience where academic learning, student activities, collaboration and personal growth come together.",
  backgroundImage: cloudinaryAsset(
    "/banner/life-at-fostiima-banner.webp",
  ),
};

export function LifeAtFostiimaHero() {
  const hasBackgroundImage = Boolean(lifeAtFostiimaHero.backgroundImage);

  return (
    <section className="relative isolate overflow-hidden bg-[#061a3a]">
      {/* Background Image */}
      {hasBackgroundImage && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${lifeAtFostiimaHero.backgroundImage}")`,
            }}
          />

          {/* Dark Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#061a3a]/65"
          />
        </>
      )}

      {/* Subtle Grid Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* Red Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#c31e3b]/10 blur-3xl"
      />

      {/* Gold Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#e5b83f]/10 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />

            <span className="text-md font-bold uppercase tracking-[0.22em] text-[#e5b83f]">
              {lifeAtFostiimaHero.eyebrow}
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Life at
            <span className="text-[#c31e3b]"> FOSTIIMA</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#b8c5d8] sm:text-lg">
            {lifeAtFostiimaHero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#campus-gallery"
              className="inline-flex items-center gap-2 rounded-lg bg-[#c31e3b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a91832]"
            >
              Explore Campus Life
              <ArrowRight size={17} />
            </a>

            <a
              href="#activities"
              className="inline-flex items-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Student Activities
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
