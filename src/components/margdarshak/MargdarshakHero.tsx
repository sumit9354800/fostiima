export default function MargdarshakHero() {
  return (
    <section className="relative overflow-hidden bg-[#102a56]">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#c31e3b]/20 blur-3xl" />

      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-200">
          FOSTIIMA Business School
        </p>

        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Margdarshak
        </h1>

        <div className="mt-5 h-1 w-20 rounded-full bg-[#c31e3b]" />

        <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
          Guiding You Towards Academic &amp; Professional Excellence
        </p>
      </div>
    </section>
  );
}