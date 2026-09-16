export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#061a3a] px-6 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#c31e3b]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#e5b83f]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#e5b83f]">
          Get In Touch
        </p>

        <div className="mt-4 h-1 w-14 bg-[#c31e3b]" />

        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          Contact Us
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-[#b8c5d8] sm:text-lg">
          Connect with FOSTIIMA Business School for admissions and programme
          enquiries.
        </p>
      </div>
    </section>
  );
}
