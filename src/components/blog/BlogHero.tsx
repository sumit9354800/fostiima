export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-[#061a3a]">
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

      {/* Very Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#c31e3b]/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-[#183f78]/20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />

            <p className="text-md font-bold uppercase tracking-[0.28em] text-[#e5b83f] sm:text-sm">
              FOSTIIMA BUSINESS SCHOOL
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
            FOSTIIMA <span className="text-[#c31e3b]">Blog</span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#b8c5d8] sm:text-lg">
            Explore articles, insights and perspectives covering management
            education, MBA, PGDM and related topics.
          </p>

          {/* Accent Line */}
          <div className="mt-10 h-px w-full max-w-3xl bg-[#1d3559]" />
        </div>
      </div>
    </section>
  );
}