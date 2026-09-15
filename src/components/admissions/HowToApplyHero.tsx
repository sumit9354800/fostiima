import { ArrowDown, ClipboardCheck } from "lucide-react";

export default function HowToApplyHero() {
  return (
    <section className="relative overflow-hidden bg-[#102a56] py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.35) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "42px 42px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#1555a5]/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#c31e3b]/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#eab308]">
            <ClipboardCheck className="h-4 w-4" />
            Admissions Process
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Apply
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Everything you need to know about applying to the FOSTIIMA
            Business School PGDM programme.
          </p>

          <a
            href="#application-requirements"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c31e3b] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#102a56]"
          >
            Application Requirements
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}