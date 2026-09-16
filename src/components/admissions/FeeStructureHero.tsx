import { IndianRupee } from "lucide-react";

type FeeStructureHeroProps = {
  title: string;
  program: string;
  totalFee: string;
};

export default function FeeStructureHero({
  title,
  program,
  totalFee,
}: FeeStructureHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#061a3a]">
      {/* Subtle Background Grid */}
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

            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#e5b83f] sm:text-sm">
              Admissions Process
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Program */}
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#b8c5d8] sm:text-lg">
            {program}
          </p>

          {/* Fee Highlight */}
          <div className="mt-9 inline-flex items-center gap-4 border border-[#1d3559] bg-[#0b2348] px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#c31e3b] text-white">
              <IndianRupee className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b8c5d8]">
                Fees for 2 Years including Registration Fee
              </p>

              <p className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                {totalFee}
              </p>
            </div>
          </div>

          {/* Accent Line */}
          <div className="mt-10 h-px w-full max-w-3xl bg-[#1d3559]" />
        </div>
      </div>
    </section>
  );
}