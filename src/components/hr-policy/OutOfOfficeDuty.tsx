import { MapPinCheck } from "lucide-react";

import { outOfOfficeDuty } from "@/data/hr-policy";

export default function OutOfOfficeDuty() {
  return (
    <section className="bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <article className="border border-[#dbe3ee] bg-white p-7 sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center bg-[#061a3a] text-[#e5b83f]">
            <MapPinCheck className="h-5 w-5" />
          </div>

          <span className="mt-6 block text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Duty Rules
          </span>

          <h2 className="mt-3 text-2xl font-bold text-[#061a3a] sm:text-3xl">
            Out-of-Office Duty Rules
          </h2>

          <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

          <div className="mt-7 space-y-4">
            {outOfOfficeDuty.map((point) => (
              <p
                key={point}
                className="text-sm leading-7 text-slate-700"
              >
                {point}
              </p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}