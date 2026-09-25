import Link from "next/link";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

export default function StrengthHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071a38] text-white">
      {/* Background Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#c31e3b]/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-[15%] h-[380px] w-[380px] rounded-full bg-[#123b79]/50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[25%] top-1/2 h-40 w-40 rounded-full bg-[#f4c542]/5 blur-3xl"
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#f4c542]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f4c542] sm:text-md">
              FOSTIIMA Business School
            </p>
          </div>

          {/* Heading */}
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl xl:text-7xl">
            The
            <span className="text-[#c31e3b]"> FOSTIIMA </span>
            Difference
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            A distinctive management education experience built around
            teamwork, vision, creativity, discipline, experiential learning
            and meaningful interaction with experienced industry
            professionals.
          </p>

          {/* Strength Highlights */}
          <div className="mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
            <div className="border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Sparkles
                  size={15}
                  className="text-[#f4c542]"
                  aria-hidden="true"
                />

                <span className="text-md font-semibold text-white/85">
                  IIM Faculty
                </span>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Sparkles
                  size={15}
                  className="text-[#f4c542]"
                  aria-hidden="true"
                />

                <span className="text-md font-semibold text-white/85">
                  Experiential Learning
                </span>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Sparkles
                  size={15}
                  className="text-[#f4c542]"
                  aria-hidden="true"
                />

                <span className="text-md font-semibold text-white/85">
                  Corporate Linkages
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#the-fostiima-difference"
              className="
                group
                inline-flex
                h-12
                items-center
                justify-center
                gap-2
                bg-[#c31e3b]
                px-6
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#a81731]
                focus:outline-none
                focus:ring-2
                focus:ring-[#c31e3b]
                focus:ring-offset-2
                focus:ring-offset-[#071a38]
              "
            >
              Explore Our Strengths

              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#key-strengths"
              className="
                inline-flex
                h-12
                items-center
                justify-center
                gap-2
                border
                border-white/20
                bg-white/5
                px-6
                text-sm
                font-semibold
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:border-white/40
                hover:bg-white/10
                focus:outline-none
                focus:ring-2
                focus:ring-white/40
                focus:ring-offset-2
                focus:ring-offset-[#071a38]
              "
            >
              Key Strengths
            </Link>
          </div>
        </div>

        {/* Bottom Meta */}
        <div className="mt-16 border-t border-white/10 pt-6 sm:mt-20 sm:pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-md leading-5 text-white/45">
              Academic rigour, practical exposure and industry interaction
              come together to create a distinctive FOSTIIMA learning
              experience.
            </p>

            <a
              href="#the-fostiima-difference"
              className="group inline-flex shrink-0 items-center gap-2 text-md font-semibold uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-white"
            >
              Explore

              <ArrowDown
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}