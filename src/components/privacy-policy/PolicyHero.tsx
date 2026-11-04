export default function PolicyHero() {
  return (
    <section className="relative overflow-hidden bg-[#061a3a]">
      {/* Dark Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#061a3a]/70"
      />

      {/* Subtle Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.75) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#c31e3b]/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-[#183f78]/20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-4xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />

            <p className="text-md font-bold uppercase tracking-[0.28em] text-[#e5b83f] sm:text-sm">
              FOSTIIMA BUSINESS SCHOOL
            </p>
          </div>

          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Privacy <span className="text-[#c31e3b]">Policy</span>
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#b8c5d8] sm:text-base">
            This Privacy Policy explains how Fostiima Business School (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;) collects, uses, shares and protects personal data when you use https://www.fostiima.org/.
          </p>

          <p className="mt-4 inline-block rounded-md bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#e5b83f] sm:text-sm">
            Last updated: 4 November 2026
          </p>
        </div>
      </div>
    </section>
  );
}
