import { Phone, ShieldAlert } from "lucide-react";

import { womanHelpline } from "@/data/grievance";

export default function WomanHelpline() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-[#c31e3b]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              24X7 Support
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
            24X7 Woman Helpline
          </h2>

          <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Feel free to contact any of the following direct
            nos. and share your problem.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {womanHelpline.map((contact) => (
            <a
              key={contact.phone}
              href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              className="group border border-[#dbe3ee] bg-[#f8fafc] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/30 hover:shadow-[0_12px_30px_rgba(6,26,58,0.08)]"
            >
              <div className="flex h-12 w-12 items-center justify-center bg-[#c31e3b] text-white">
                <Phone className="h-5 w-5" />
              </div>

              <p className="mt-6 text-xl font-bold text-[#061a3a] group-hover:text-[#c31e3b]">
                {contact.phone}
              </p>

              <p className="mt-2 text-sm text-slate-600">
                {contact.role}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}