import type { PrivacyPolicySection as PrivacyPolicySectionType } from "@/data/privacy-policy";
import { ShieldCheck } from "lucide-react";

type PolicySectionProps = {
  section: PrivacyPolicySectionType;
};

export default function PolicySection({ section }: PolicySectionProps) {
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
        <div className="mt-5 space-y-3">
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
        <ul className="mt-4 space-y-3">
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

      {section.contactDetails && section.contactDetails.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {section.contactDetails.map((detail) => (
            <div
              key={detail.label}
              className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4"
            >
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                {detail.label}
              </span>
              {detail.href ? (
                <a
                  href={detail.href}
                  className="mt-1 block text-sm font-medium text-[#c31e3b] hover:underline"
                  {...(detail.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {detail.value}
                </a>
              ) : (
                <span className="mt-1 block text-sm font-medium text-slate-800">
                  {detail.value}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {section.footerParagraphs && section.footerParagraphs.length > 0 && (
        <div className="mt-5 space-y-3">
          {section.footerParagraphs.map((para) => (
            <p
              key={para}
              className="text-sm leading-7 text-slate-700 sm:text-[15px]"
            >
              {para}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
