import { Camera, GraduationCap, Sparkles, Users } from "lucide-react";
import { beyondAcademics } from "@/data/life-at-fostiima";

const icons = [Camera, Sparkles, GraduationCap, Users];

export function BeyondAcademicsSection() {
  return (
    <section className="bg-[#061a3a] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />

            <span className="text-md font-bold uppercase tracking-[0.2em] text-[#e5b83f]">
              Beyond Academics
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Learn. Connect. Participate. Grow.
          </h2>

          <p className="mt-5 text-base leading-7 text-[#b8c5d8]">
            Every student journey is shaped by more than academic sessions.
            The people you meet, activities you participate in and challenges
            you take on become part of your experience.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {beyondAcademics.map((item, index) => {
            const Icon = icons[index];

            return (
              <article
                key={item.title}
                className="flex min-h-40 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:min-h-48 sm:p-6"
              >
                <Icon
                  size={22}
                  className="text-[#e5b83f]"
                  aria-hidden="true"
                />

                <div>
                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-[#94a9c4]">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}