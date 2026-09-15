import { policyData } from "@/data/policy";
import PolicySection from "./PolicySection";

export default function LeavePolicy() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-7">
          {policyData.sections.map((section) => (
            <PolicySection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}