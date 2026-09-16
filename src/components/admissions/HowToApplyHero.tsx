import { ArrowDown, ClipboardCheck } from "lucide-react";

export default function HowToApplyHero() {
  return (
    <section className="relative overflow-hidden bg-[#061a3a]">
      {/* Subtle Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.75) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.75) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#c31e3b]/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-[#183f78]/20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />

            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[#e5b83f] sm:text-sm">
              <ClipboardCheck className="h-4 w-4" />
              Admissions Process
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            How to <span className="text-[#c31e3b]">Apply</span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#b8c5d8] sm:text-lg">
            Everything you need to know about applying to the FOSTIIMA
            Business School PGDM programme.
          </p>

          {/* CTA */}
          <a
            href="#application-requirements"
            className="
              mt-9
              inline-flex
              items-center
              gap-2
              border
              border-[#c31e3b]
              bg-[#c31e3b]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#a91731]
              hover:border-[#a91731]
            "
          >
            Application Requirements
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>

          {/* Accent Line */}
          <div className="mt-10 h-px w-full max-w-3xl bg-[#1d3559]" />
        </div>
      </div>
    </section>
  );
}