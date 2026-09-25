import { ChevronRight } from "lucide-react";
import { campusActivities } from "@/data/life-at-fostiima";

export function CampusActivitiesSection() {
  return (
    <section
      id="activities"
      className="bg-white px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-3 text-md font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Campus &amp; Community
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#061a3a] sm:text-4xl">
            Make your campus experience count.
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748b]">
            Explore experiences that complement academics and encourage
            students to participate, collaborate and express themselves.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campusActivities.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-[#dbe3ee] bg-[#f8fafc] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(6,26,58,0.09)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#061a3a]">
                    <Icon
                      size={20}
                      className="text-[#e5b83f]"
                      aria-hidden="true"
                    />
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-[#94a3b8] transition group-hover:translate-x-1 group-hover:text-[#c31e3b]"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#061a3a]">
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