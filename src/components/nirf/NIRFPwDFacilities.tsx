import { Accessibility, CheckCircle2 } from "lucide-react";

import { nirfPwDFacilities } from "@/data/nirf";

export default function NIRFPwDFacilities() {
  return (
    <section className="bg-[#061a3a] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Accessibility className="h-5 w-5 text-[#e5b83f]" />

          <span className="text-md font-bold uppercase tracking-[0.2em] text-[#e5b83f]">
            Accessibility
          </span>
        </div>

        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Facilities for Physically Challenged Students
        </h2>

        <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

        <div className="mt-10 grid gap-4">
          {nirfPwDFacilities.map((item) => (
            <article
              key={item.question}
              className="flex gap-4 border border-white/10 bg-white/[0.04] p-5"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#e5b83f]" />

              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {item.question}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#b8c5d8]">
                  {item.answer}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}