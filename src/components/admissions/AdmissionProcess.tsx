import { CheckCircle2, GraduationCap, Users, BarChart3 } from "lucide-react";

type AdmissionProcessProps = {
  title: string;
  intro: string;
  factors: string[];
  cutoff: string;
};

const factorIcons = [GraduationCap, BarChart3, Users];

export default function AdmissionProcess({
  title,
  intro,
  factors,
  cutoff,
}: AdmissionProcessProps) {
  return (
    <section className="bg-[#f8faff] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Selection
          </span>

          <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
            {title}
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            {intro}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {factors.map((factor, index) => {
            const Icon = factorIcons[index] ?? CheckCircle2;

            return (
              <article
                key={factor}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dbeafe] text-[#102a56]">
                  <Icon className="h-5 w-5" />
                </div>

                <span className="mt-5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#c31e3b]">
                  Factor {String(index + 1).padStart(2, "0")}
                </span>

                <p className="mt-2 text-sm font-semibold leading-6 text-[#102a56]">
                  {factor}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-[#eab308]/30 bg-[#fffbeb] p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c31e3b]" />

            <p className="text-sm leading-7 text-slate-700">
              {cutoff}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}