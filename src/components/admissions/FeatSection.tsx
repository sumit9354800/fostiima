import { BrainCircuit, UsersRound } from "lucide-react";

type FeatSectionProps = {
  title: string;
  paragraphs: string[];
};

export default function FeatSection({
  title,
  paragraphs,
}: FeatSectionProps) {
  return (
    <section className="bg-[#f8faff] py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fee2e2] text-[#c31e3b]">
              <BrainCircuit className="h-5 w-5" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
                FEAT
              </span>

              <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
                {title}
              </h2>
            </div>
          </div>

          <div className="mt-7 space-y-4 border-t border-slate-100 pt-6">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-7 text-slate-600 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-7 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl bg-[#f8faff] p-4">
              <BrainCircuit className="h-5 w-5 text-[#c31e3b]" />
              <span className="text-sm font-semibold text-[#102a56]">
                Written Aptitude Test
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-[#f8faff] p-4">
              <UsersRound className="h-5 w-5 text-[#c31e3b]" />
              <span className="text-sm font-semibold text-[#102a56]">
                Group Discussion & Personal Interview
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}