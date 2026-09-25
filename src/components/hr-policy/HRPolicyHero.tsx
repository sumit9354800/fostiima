import { BriefcaseBusiness } from "lucide-react";

export default function HRPolicyHero() {
  return (
    <section className="relative overflow-hidden bg-[#061a3a]">
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#c31e3b]/10 blur-3xl" />

      <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#e5b83f]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness className="h-5 w-5 text-[#e5b83f]" />

            <span className="text-md font-bold uppercase tracking-[0.22em] text-[#e5b83f]">
              HR Policy 2024-25
            </span>
          </div>

          <div className="mt-5 h-px w-14 bg-[#c31e3b]" />

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            HR
            <span className="text-[#c31e3b]"> Policy</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#b8c5d8] sm:text-lg">
            Leave, attendance, duty hours and employee-related
            policies for FOSTIIMA employees.
          </p>
        </div>
      </div>
    </section>
  );
}