import { Coffee } from "lucide-react";

import { lunchPolicy } from "@/data/hr-policy";

export default function LunchPolicy() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <Coffee className="h-5 w-5 text-[#c31e3b]" />

            <span className="text-md font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              Workplace Policy
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
            Lunch Policy
          </h2>

          <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {lunchPolicy.map((point, index) => (
            <article
              key={point}
              className="border border-[#dbe3ee] bg-[#f8fafc] p-6"
            >
              <span className="text-sm font-bold text-[#c31e3b]">
                0{index + 1}
              </span>

              <p className="mt-5 text-sm leading-7 text-slate-700">
                {point}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}