import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Network,
  Users,
} from "lucide-react";

const advantages = [
  {
    number: "01",
    title: "Founders Educated at IIM Ahmedabad",
    description:
      "FOSTIIMA&apos;s founding team comes from IIM Ahmedabad, bringing its educational experience, institutional philosophy and quality standards into the foundation of the school.",
    icon: GraduationCap,
  },
  {
    number: "02",
    title: "Managed by IIMA Graduates",
    description:
      "IIMA graduates contribute to the leadership and management of FOSTIIMA, helping shape curriculum, faculty, industry relationships and student development.",
    icon: Users,
  },
  {
    number: "03",
    title: "Curriculum Benchmarked to IIM Standards",
    description:
      "The MBA and PGDM curriculum is designed with an emphasis on academic rigour, practical relevance and benchmarking against leading management education standards.",
    icon: Award,
  },
  {
    number: "04",
    title: "IIM-Educated Faculty With Corporate Experience",
    description:
      "Students learn from experienced professionals who bring corporate knowledge, case studies, decision-making frameworks and practical business perspectives into the classroom.",
    icon: BriefcaseBusiness,
  },
  {
    number: "05",
    title: "Placement Through the Pan IIT-IIM Global Network",
    description:
      "FOSTIIMA connects students with a broader professional ecosystem through its Pan IIT-IIM network and industry relationships.",
    icon: Network,
  },
];

export default function AboutFostiima() {
  return (
    <section
      id="about-fostiima"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#123b79]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#c31e3b]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Intro */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Section Label */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#c31e3b]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-xs">
                About FOSTIIMA
              </p>
            </div>

            <h2 className="mt-5 max-w-md text-3xl font-bold leading-tight tracking-[-0.025em] text-[#172f59] sm:text-4xl lg:text-[42px]">
              Among the Best MBA Colleges in Delhi NCR
            </h2>

            <div className="mt-7 hidden lg:block">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#071a38] text-[#f4c542]">
                <GraduationCap size={25} aria-hidden="true" />
              </div>

              <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
                An education ecosystem built around academic knowledge,
                practical exposure and experienced management professionals.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-[15px] leading-7 text-slate-600">
            <p>
              FOSTIIMA is one of the Best MBA Colleges in Delhi and the reason
              behind this is its advantage. Selecting the{" "}
              <strong className="font-semibold text-[#172f59]">
                best MBA Colleges in Delhi
              </strong>{" "}
              from a list of numerous institutes can be challenging. Our
              difference isn&apos;t just in the marketing, it&apos;s in the
              DNA, our faculty and how our curriculum has been designed at
              FOSTIIMA Business School.
            </p>

            <p className="mt-5">
              Through a highly interactive platform and an experiential
              environment, FOSTIIMA provides a conducive learning environment
              with an emphasis on teamwork, vision, creativity and discipline.
            </p>

            <p className="mt-5">
              We have designed our{" "}
              <strong className="font-semibold text-[#172f59]">
                MBA Course and PGDM Course
              </strong>{" "}
              in such a way that students understand the theory of business
              and then apply it to practical aspects of business. This
              practical connection is an important part of the learning
              experience at FOSTIIMA.
            </p>

            <p className="mt-5">
              What makes FOSTIIMA unique is that students are not only learning
              management concepts, but are also exposed to industry veterans
              with experience across multiple cross-functional and
              cross-industry areas who bring their experience into classroom
              sessions.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-14 h-px bg-slate-200 lg:my-20" />

        {/* Why FOSTIIMA */}
        <div>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-xs">
                The FOSTIIMA Advantage
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight text-[#172f59] sm:text-3xl">
                What Makes FOSTIIMA One of the Best PGDM Colleges in Delhi?
              </h3>
            </div>

            <div className="hidden shrink-0 sm:block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                5 Key Advantages
              </span>
            </div>
          </div>

          {/* Advantage Cards */}
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;

              return (
                <article
                  key={advantage.number}
                  className={`
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
                    hover:shadow-[0_14px_35px_rgba(21,45,88,0.10)]
                    ${
                      index === 0
                        ? "lg:col-span-2 lg:bg-[#f7f9fc]"
                        : ""
                    }
                  `}
                >
                  {/* Number */}
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-bold tracking-[0.12em] text-[#c31e3b]">
                      {advantage.number}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123b79]/8 text-[#123b79] transition-colors duration-300 group-hover:bg-[#c31e3b] group-hover:text-white">
                      <Icon size={19} aria-hidden="true" />
                    </div>
                  </div>

                  <h4 className="mt-6 max-w-md text-lg font-bold leading-6 text-[#172f59]">
                    {advantage.title}
                  </h4>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                    {advantage.description}
                  </p>

                  {/* Decorative Arrow */}
                  <div className="mt-6 flex items-center text-[#c31e3b]">
                    <ArrowUpRight
                      size={17}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-[#c31e3b]/5 transition-transform duration-500 group-hover:scale-150"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}