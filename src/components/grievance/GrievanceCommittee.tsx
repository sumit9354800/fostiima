import { Mail, ShieldCheck } from "lucide-react";

import { grievanceCommittee } from "@/data/grievance";

export default function GrievanceCommittee() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Grievance Redressal
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
            Online Grievance Redressal Committee
          </h2>

          <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {grievanceCommittee.map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="group flex items-center gap-4 border border-[#dbe3ee] bg-[#f8fafc] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/30 hover:shadow-[0_12px_30px_rgba(6,26,58,0.08)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#061a3a] text-[#e5b83f]">
                <Mail className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="break-all text-sm font-semibold text-[#061a3a] transition-colors group-hover:text-[#c31e3b]">
                  {email}
                </p>
              </div>

              <ShieldCheck className="ml-auto h-5 w-5 shrink-0 text-[#c31e3b]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}