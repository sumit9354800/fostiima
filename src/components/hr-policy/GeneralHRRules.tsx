import { ClipboardCheck } from "lucide-react";

import { generalRules } from "@/data/hr-policy";

export default function GeneralHRRules() {
  return (
    <section className="bg-[#061a3a] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[#e5b83f] text-[#061a3a]">
            <ClipboardCheck className="h-5 w-5" />
          </div>

          <span className="mt-6 block text-xs font-bold uppercase tracking-[0.2em] text-[#e5b83f]">
            General Rules
          </span>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            General Rules
          </h2>

          <div className="mx-auto mt-5 h-1 w-14 bg-[#c31e3b]" />
        </div>

        <div className="mt-10">
          {generalRules.map((rule) => (
            <div
              key={rule}
              className="border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm leading-7 text-[#b8c5d8] sm:text-base">
                {rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}