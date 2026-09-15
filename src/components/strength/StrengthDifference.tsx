import {
  ArrowRight,
  Lightbulb,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const differencePoints = [
  {
    number: "01",
    title: "Teamwork",
    description:
      "A collaborative learning culture that encourages students to work together, exchange ideas and learn through shared experiences.",
    icon: Users,
  },
  {
    number: "02",
    title: "Vision",
    description:
      "An educational environment designed to broaden perspectives and help students develop the vision required for future leadership.",
    icon: Target,
  },
  {
    number: "03",
    title: "Creativity",
    description:
      "Students are encouraged to think beyond conventional approaches and develop creative perspectives towards business challenges.",
    icon: Lightbulb,
  },
  {
    number: "04",
    title: "Discipline",
    description:
      "A disciplined approach to learning helps students build consistency, responsibility and professional readiness.",
    icon: Sparkles,
  },
];

export default function StrengthDifference() {
  return (
    <section
      id="the-fostiima-difference"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#123b79]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#c31e3b]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading + Intro */}
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#c31e3b]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-xs">
                The FOSTIIMA Difference
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-[#172f59] sm:text-4xl lg:text-[42px]">
              An Environment Built Around
              <span className="block text-[#c31e3b]">
                Meaningful Learning
              </span>
            </h2>
          </div>

          <div>
            <p className="text-[15px] leading-7 text-slate-600">
              FOSTIIMA Business School provides an enabling support system and
              culture of learning that values teamwork, vision, creativity and
              discipline. We offer a highly interactive platform and
              experiential environment where students can engage with
              different perspectives and practical business experiences.
            </p>

            <p className="mt-5 text-[15px] leading-7 text-slate-600">
              Through the FOSTIIMA programme, students are enabled to interact
              with industry veterans who bring cross-functional and
              cross-industry experience into the learning environment.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differencePoints.map((point) => {
            const Icon = point.icon;

            return (
              <article
                key={point.number}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#123b79]/20
                  hover:shadow-[0_16px_35px_rgba(21,45,88,0.10)]
                "
              >
                {/* Top Row */}
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123b79]/8 text-[#123b79] transition-all duration-300 group-hover:bg-[#c31e3b] group-hover:text-white">
                    <Icon size={20} aria-hidden="true" />
                  </div>

                  <span className="text-[10px] font-bold tracking-[0.14em] text-slate-300">
                    {point.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#172f59]">
                  {point.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {point.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#c31e3b]">
                  <span className="h-px w-5 bg-[#c31e3b]" />

                  FOSTIIMA
                </div>

                {/* Decorative Circle */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-[#123b79]/5 transition-transform duration-500 group-hover:scale-150"
                />
              </article>
            );
          })}
        </div>

        {/* Experiential Learning Highlight */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-[#071a38]">
          <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="p-7 sm:p-9 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#f4c542]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4c542]">
                  Experiential Environment
                </p>
              </div>

              <h3 className="mt-4 max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl">
                Learning Beyond the Traditional Classroom
              </h3>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">
                Students are not limited to learning management concepts in
                isolation. Interaction with industry veterans allows them to
                connect classroom knowledge with practical experiences from
                different functions and industries.
              </p>
            </div>

            <div className="border-t border-white/10 p-7 lg:border-l lg:border-t-0 lg:p-10">
              <a
                href="#faculty"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-[#f4c542]"
              >
                Meet Our Faculty

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-[#f4c542] group-hover:bg-[#f4c542] group-hover:text-[#071a38]">
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}