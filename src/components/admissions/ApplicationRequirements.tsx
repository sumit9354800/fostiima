import {
  FileCheck2,
  FileText,
  Image,
  GraduationCap,
} from "lucide-react";

import type { ApplicationRequirement } from "@/data/how-to-apply";

type ApplicationRequirementsProps = {
  requirements: ApplicationRequirement[];
};

const icons = [FileText, GraduationCap, Image, FileCheck2];

export default function ApplicationRequirements({
  requirements,
}: ApplicationRequirementsProps) {
  return (
    <section
      id="application-requirements"
      className="scroll-mt-24 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Application
          </span>

          <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
            Complete Application
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            A complete application needs to include the following documents.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {requirements.map((requirement, index) => {
            const Icon = icons[index] ?? FileText;

            return (
              <article
                key={requirement.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/20 hover:shadow-xl sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#102a56] via-[#c31e3b] to-[#eab308]" />

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#dbeafe] text-[#102a56] transition-all duration-300 group-hover:bg-[#c31e3b] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c31e3b]">
                      Requirement {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-1 text-lg font-bold text-[#102a56]">
                      {requirement.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {requirement.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}