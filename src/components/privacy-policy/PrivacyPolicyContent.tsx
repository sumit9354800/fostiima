import { privacyPolicyData } from "@/data/privacy-policy";
import PolicySection from "./PolicySection";
import { Info } from "lucide-react";

export default function PrivacyPolicyContent() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Introductory Notice */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 shadow-sm sm:p-7">
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Info className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-800">
                  Policy Scope &amp; Applicability
                </p>
                <p className="text-sm leading-7 text-slate-700 sm:text-[15px]">
                  {privacyPolicyData.introduction}
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          {privacyPolicyData.sections.map((section) => (
            <PolicySection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}

