import { ShieldCheck } from "lucide-react";

export default function PolicyHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,64,175,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(30,64,175,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-800 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Institute Policy
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#c31e3b] sm:text-4xl lg:text-5xl">
            FOSTIIMA Policy
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Leave policy and guidelines applicable to FOSTIIMA employees.
          </p>
        </div>
      </div>
    </section>
  );
}