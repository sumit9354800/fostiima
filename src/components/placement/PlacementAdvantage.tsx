import { placementAdvantages } from "@/data/placement";

export default function PlacementAdvantage() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <span className="text-md font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              The FOSTIIMA Difference
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#061a3a] sm:text-4xl">
              The Placement
              <span className="block text-[#c31e3b]">
                Advantage
              </span>
            </h2>

            <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
              FOSTIIMA provides an enabling culture of learning
              that values teamwork, vision, creativity and
              discipline. Students also get opportunities to
              interact with industry veterans with
              cross-functional and cross-industry experience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {placementAdvantages.map((item) => (
              <article
                key={item.number}
                className="border border-[#dbe3ee] bg-[#f8fafc] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/30 hover:shadow-[0_12px_30px_rgba(6,26,58,0.08)]"
              >
                <span className="text-md font-bold tracking-[0.16em] text-[#e5b83f]">
                  {item.number}
                </span>

                <h3 className="mt-4 text-lg font-bold text-[#c31e3b]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}