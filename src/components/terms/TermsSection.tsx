import type { TermsSection as TermsSectionType } from "@/data/terms-and-conditions";
import { ShieldCheck } from "lucide-react";

type TermsSectionProps = {
  section: TermsSectionType;
};

export default function TermsSection({
  section,
}: TermsSectionProps) {
  return (
    <section
      id={section.id}
      className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-9"
    >
      <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <h2 className="pt-1 text-xl font-bold text-[#c31e3b] sm:text-2xl">
          {section.title}
        </h2>
      </div>

      {section.paragraphs && section.paragraphs.length > 0 && (
        <div className="mt-6 space-y-5">
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm leading-7 text-slate-700 sm:text-[15px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {section.points && section.points.length > 0 && (
        <ul className="mt-6 space-y-4">
          {section.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm leading-7 text-slate-700 sm:text-[15px]"
            >
              <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#c31e3b]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}