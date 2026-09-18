import { HeartHandshake, Phone } from "lucide-react";

import { psychologicalCounselling } from "@/data/grievance";

export default function PsychologicalCounselling() {
  return (
    <section className="bg-[#061a3a] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <HeartHandshake className="h-5 w-5 text-[#e5b83f]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5b83f]">
              Student Guidance
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Guidance w.r.t. Psychological Counselling
          </h2>

          <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

          <p className="mt-5 text-sm leading-7 text-[#b8c5d8] sm:text-base">
            Feel free to contact any of the following direct
            nos.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {psychologicalCounselling.map((contact) => (
            <a
              key={contact.phone}
              href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              className="group border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:border-[#e5b83f]/40 hover:bg-white/[0.07]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#e5b83f] text-[#061a3a]">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    {contact.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#b8c5d8]">
                    {contact.phone}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}