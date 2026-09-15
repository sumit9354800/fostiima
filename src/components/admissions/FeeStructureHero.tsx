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
    <section className="relative overflow-hidden bg-[#102a56] py-16 sm:py-20">
      {/* Background Grid */}
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

      {/* Decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#1555a5]/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#c31e3b]/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#eab308]">
          Admissions Process
        </span>

        <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
          {program}
        </p>

        <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c31e3b] text-white">
            <IndianRupee className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
              Fees for 2 Years including Registration Fee
            </p>
            <p className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
              {totalFee}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}