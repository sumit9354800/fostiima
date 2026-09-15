import type { PolicyData } from "@/data/policy";
import { CheckCircle2 } from "lucide-react";

type PolicySectionProps = {
  section: PolicyData["sections"][number];
};

export default function PolicySection({
  section,
}: PolicySectionProps) {
  return (
    <section
      id={section.id}
      className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-9"
    >
      <div className="mb-7 flex items-start gap-4 border-b border-slate-100 pb-5">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#c31e3b] sm:text-2xl">
            {section.title}
          </h2>
        </div>
      </div>

      <ul className="space-y-5">
        {section.points.map((point) => (
          <li
            key={point.id}
            className="flex items-start gap-3 text-sm leading-7 text-slate-700 sm:text-[15px]"
          >
            <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#c31e3b]" />
            <span>{point.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}