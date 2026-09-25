import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071a38] text-white">
      {/* Background Effects */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#c31e3b]/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-40 left-[20%] h-[360px] w-[360px] rounded-full bg-[#123b79]/50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute right-[15%] top-1/2 h-40 w-40 rounded-full bg-[#f4c542]/5 blur-3xl"
      />

      {/* Decorative Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
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
            Shaping Leaders Through
            <span className="block text-[#c31e3b]">
              IIM-Inspired Management Education
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-3xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            FOSTIIMA Business School was founded by IIM Ahmedabad alumni with
            a vision to create a distinctive management education experience
            built around academic rigour, practical learning, experienced
            professionals and leadership development.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#about-fostiima"
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
              Discover FOSTIIMA

              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#our-vision"
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
              Our Vision
            </Link>
          </div>
        </div>

        {/* Bottom Information */}
        <div className="mt-16 border-t border-white/10 pt-6 sm:mt-20 sm:pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-md text-white/50">
              <span>
                <strong className="font-semibold text-white/80">
                  Founded
                </strong>{" "}
                2007
              </span>

              <span className="hidden h-3 w-px bg-white/15 sm:block" />

              <span>
                <strong className="font-semibold text-white/80">
                  Founded by
                </strong>{" "}
                IIM Ahmedabad Alumni
              </span>

              <span className="hidden h-3 w-px bg-white/15 sm:block" />

              <span>
                <strong className="font-semibold text-white/80">
                  Campus
                </strong>{" "}
                Dwarka, New Delhi
              </span>
            </div>

            <a
              href="#about-fostiima"
              className="group inline-flex items-center gap-2 text-md font-semibold uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-white"
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