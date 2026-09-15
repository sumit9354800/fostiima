import { termsAndConditionsData } from "@/data/terms-and-conditions";
import TermsSection from "./TermsSection";

export default function TermsContent() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {termsAndConditionsData.map((section) => (
            <TermsSection
              key={section.id}
              section={section}
            />
          ))}
        </div>
      </div>
    </section>
  );
}