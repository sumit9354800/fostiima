import { CalendarDays, CreditCard } from "lucide-react";
import type { FeeInstallment } from "@/data/fee-structure";

type FeeScheduleProps = {
  installments: FeeInstallment[];
};

export default function FeeSchedule({
  installments,
}: FeeScheduleProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Payment Plan
          </span>

          <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
            Fee Schedule
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.2fr_0.8fr_1.5fr] bg-[#102a56] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white md:grid">
            <span>Installment</span>
            <span>Amount</span>
            <span>Due / Notes</span>
          </div>

          <div className="divide-y divide-slate-100">
            {installments.map((installment, index) => {
              const isTotal = installment.id === "total";

              return (
                <div
                  key={installment.id}
                  className={`grid gap-4 px-5 py-5 md:grid-cols-[1.2fr_0.8fr_1.5fr] md:px-6 ${
                    isTotal
                      ? "bg-[#f8faff] font-bold"
                      : "transition-colors hover:bg-[#f8faff]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isTotal
                          ? "bg-[#c31e3b] text-white"
                          : "bg-[#dbeafe] text-[#102a56]"
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 md:hidden">
                        Installment
                      </p>

                      <p
                        className={`text-sm leading-6 ${
                          isTotal
                            ? "text-[#102a56]"
                            : "text-slate-700"
                        }`}
                      >
                        {index + 1}. {installment.name}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 md:hidden">
                      Amount
                    </p>

                    <p
                      className={`text-sm font-bold ${
                        isTotal
                          ? "text-[#c31e3b]"
                          : "text-[#102a56]"
                      }`}
                    >
                      {installment.amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 md:hidden">
                      Due / Notes
                    </p>

                    <div className="flex items-start gap-2">
                      {installment.due && (
                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#c31e3b]" />
                      )}

                      <p className="text-sm leading-6 text-slate-500">
                        {installment.due || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}