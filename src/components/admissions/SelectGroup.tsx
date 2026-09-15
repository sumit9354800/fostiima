import { Award, CheckCircle2 } from "lucide-react";

type SelectGroupProps = {
  totalFee: string;
  placement: string;
  eligibility: string[];
};

export default function SelectGroup({
  totalFee,
  placement,
  eligibility,
}: SelectGroupProps) {
  return (
    <section className="bg-[#f8faff] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="rounded-2xl bg-[#102a56] p-6 text-white shadow-lg sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c31e3b]">
              <Award className="h-6 w-6" />
            </div>

            <span className="mt-6 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#eab308]">
              Select Group Fee Structure
            </span>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Fees for 2 Years
            </h2>

            <p className="mt-2 text-sm text-white/60">
              Including Registration Fee
            </p>

            <p className="mt-7 text-3xl font-extrabold text-[#eab308] sm:text-4xl">
              {totalFee}
            </p>

            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-sm leading-6 text-white/70">
                {placement}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              Eligibility Criteria
            </span>

            <h3 className="mt-2 text-2xl font-bold text-[#102a56]">
              Select Group Eligibility
            </h3>

            <div className="mt-7 space-y-4">
              {eligibility.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#f8faff] p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c31e3b]" />

                  <p className="text-sm leading-6 text-slate-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}