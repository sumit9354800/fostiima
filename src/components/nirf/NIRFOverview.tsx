import { Building2, FileText, Landmark } from "lucide-react";

import { nirfInstitute } from "@/data/nirf";

export default function NIRFOverview() {
  const items = [
    {
      icon: Landmark,
      label: "Framework",
      value: nirfInstitute.framework,
    },
    {
      icon: Building2,
      label: "Institute",
      value: nirfInstitute.name,
    },
    {
      icon: FileText,
      label: "Institute ID",
      value: nirfInstitute.code,
    },
  ];

  return (
    <section className="bg-[#f8fafc] py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="border border-[#dbe3ee] bg-white p-6 shadow-[0_8px_25px_rgba(6,26,58,0.05)]"
              >
                <div className="flex h-11 w-11 items-center justify-center bg-[#061a3a] text-[#e5b83f]">
                  <Icon className="h-5 w-5" />
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-[#c31e3b]">
                  {item.label}
                </p>

                <p className="mt-2 text-sm font-semibold leading-6 text-[#061a3a]">
                  {item.value}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}