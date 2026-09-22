import { studentJourney } from "@/data/life-at-fostiima";

export function StudentJourneySection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Student Journey
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#061a3a] sm:text-4xl">
            Your experience. Your journey.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {studentJourney.map((item) => (
            <article
              key={item.number}
              className="rounded-2xl border border-[#dbe3ee] bg-[#f8fafc] p-7"
            >
              <span className="text-4xl font-black text-[#c31e3b]/15">
                {item.number}
              </span>

              <h3 className="mt-5 text-xl font-bold text-[#061a3a]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748b]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}