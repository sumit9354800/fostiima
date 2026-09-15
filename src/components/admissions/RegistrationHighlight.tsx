import { CreditCard, FileCheck2 } from "lucide-react";

type RegistrationHighlightProps = {
  title: string;
  amount: string;
  description: string;
};

export default function RegistrationHighlight({
  title,
  amount,
  description,
}: RegistrationHighlightProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-[#102a56] shadow-xl">
          <div className="grid lg:grid-cols-[1fr_auto]">
            <div className="p-6 sm:p-8 lg:p-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#eab308]">
                Registration
              </span>

              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {title}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                {description}
              </p>
            </div>

            <div className="flex items-center border-t border-white/10 bg-white/5 px-6 py-6 lg:border-l lg:border-t-0 lg:px-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                  Amount
                </p>

                <p className="mt-1 text-3xl font-extrabold text-[#eab308]">
                  {amount}
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                  <CreditCard className="h-4 w-4" />
                  Registration Fee
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 px-6 py-4 text-xs font-medium text-white/60 sm:px-8 lg:px-10">
            <FileCheck2 className="h-4 w-4 shrink-0 text-[#c31e3b]" />
            Payable immediately on receipt of Offer Letter
          </div>
        </div>
      </div>
    </section>
  );
}