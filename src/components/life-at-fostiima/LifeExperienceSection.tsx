import { lifeExperiences } from "@/data/life-at-fostiima";

export function LifeExperienceSection() {
  return (
    <section className="border-b border-[#dbe3ee] bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div>
          <p className="mb-3 text-md font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            The FOSTIIMA Experience
          </p>

          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[#061a3a] sm:text-4xl">
            Where learning becomes an everyday experience.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#64748b]">
            Student life is not limited to academic sessions. It is also
            about conversations, collaboration, activities, challenges,
            creativity and the people you meet along the way.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {lifeExperiences.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-xl border border-[#dbe3ee] bg-[#f8fafc] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(6,26,58,0.08)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#061a3a]">
                  <Icon
                    size={19}
                    className="text-[#e5b83f]"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-base font-bold text-[#061a3a]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748b]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}