import { Quote } from "lucide-react";

type InternshipHighlightsProps = {
  batch: string;
  highlights: string;
};

export default function InternshipHighlights({
  batch,
  highlights,
}: InternshipHighlightsProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#102a56] px-5 py-8 sm:px-8 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#c31e3b]/20 blur-3xl"
      />

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <Quote className="h-5 w-5 text-[#eab308]" />
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#eab308]">
              Key Highlights
            </p>

            <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
              Key Highlights of SIP {batch.replace(" - ", "-")}
            </h2>
          </div>
        </div>

        <p className="mt-6 max-w-4xl text-sm leading-7 text-white/75 sm:text-base">
          {highlights}
        </p>
      </div>
    </section>
  );
}