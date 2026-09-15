import { CheckCircle2, GraduationCap } from "lucide-react";
import type { AdmissionCriterion } from "@/data/how-to-apply";

type AdmissionEligibilityProps = {
  eligibility: AdmissionCriterion[];
};

export default function AdmissionEligibility({
  eligibility,
}: AdmissionEligibilityProps) {
  return (
    <section id="eligibility" className="scroll-mt-24 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Before You Apply
          </span>

          <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
            Admission Eligibility
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {eligibility.map((criterion) => (
            <article
              key={criterion.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/20 hover:shadow-lg sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dbeafe] text-[#102a56] transition-colors duration-300 group-hover:bg-[#c31e3b] group-hover:text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#102a56]">
                    {criterion.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {criterion.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-[#c31e3b]">
                <CheckCircle2 className="h-4 w-4" />
                Eligibility Requirement
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}