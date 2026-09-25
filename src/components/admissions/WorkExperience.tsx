import { BriefcaseBusiness, Sparkles } from "lucide-react";

type WorkExperienceProps = {
  title: string;
  paragraphs: string[];
};

export default function WorkExperience({
  title,
  paragraphs,
}: WorkExperienceProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-[#102a56] p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#eab308]">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#eab308]">
                  Admission Criteria
                </span>

                <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  {title}
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-6 sm:p-8">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-7 text-slate-600 sm:text-base"
              >
                {paragraph}
              </p>
            ))}

            <div className="flex items-center gap-2 border-t border-slate-100 pt-5 text-md font-semibold text-[#102a56]">
              <Sparkles className="h-4 w-4 text-[#c31e3b]" />
              Leadership potential, academic abilities and personal
              characteristics are carefully evaluated.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}