import { BriefcaseBusiness, TrendingUp } from "lucide-react";

export default function FinalPlacementsHero() {
  return (
    <section className="relative overflow-hidden bg-[#102a56]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c31e3b]/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            <BriefcaseBusiness className="h-4 w-4 text-[#eab308]" />
            Placement
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Final Placements
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Explore placement highlights and the professional journeys of
            FOSTIIMA students across different batches.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
            <TrendingUp className="h-4 w-4 text-[#eab308]" />
            Batch-wise Placement Information
          </div>
        </div>
      </div>
    </section>
  );
}