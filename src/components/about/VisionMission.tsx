import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Network,
  Target,
  Users,
} from "lucide-react";

const visionPoints = [
  "To deliver broad, inclusive, contemporary and futuristic educational services.",
  "To aspire for the successful careers of all our students.",
  "To provide FOSTIIMA quality management education.",
  "To transform our students into future leaders & visionaries.",
];

const philosophyPoints = [
  {
    title: "Teamwork",
    description:
      "Developing the spirit of teamwork and collaboration among students.",
    icon: Users,
  },
  {
    title: "Work Culture",
    description:
      "Enriching work culture and preparing students for professional environments.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Personality Development",
    description:
      "Enhancing personality, confidence and overall professional development.",
    icon: GraduationCap,
  },
  {
    title: "Interpersonal Communication",
    description:
      "Building effective communication and interpersonal skills.",
    icon: Network,
  },
];

const peoPoints = [
  {
    number: "01",
    title: "Student Success",
    description:
      "The success of our students is critical to our founder trustees and remains central to the educational approach at FOSTIIMA.",
  },
  {
    number: "02",
    title: "Creative & Experiential Learning",
    description:
      "Creative and experiential management education is essential for developing the capabilities required to gain market share, expand into new markets and master core competencies.",
  },
  {
    number: "03",
    title: "IIM–IIT Network",
    description:
      "The founders and core faculty focus on future challenges and leverage the IIM–IIT network to obtain the very best faculty and guest speakers.",
  },
  {
    number: "04",
    title: "Corporate Alliance",
    description:
      "Educational institutions and corporates can work in synergistic alliance to discover and nurture young talent for the changing professional environment.",
  },
];

export default function VisionMission() {
  return (
    <section
      id="our-vision"
      className="relative overflow-hidden bg-[#f5f8fc] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#123b79]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-[42%] h-96 w-96 rounded-full bg-[#c31e3b]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#f4c542]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-[#c31e3b]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-md">
              Vision, Mission &amp; PEOs
            </p>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-[#172f59] sm:text-4xl lg:text-[42px]">
            Building Future Leaders Through Meaningful Management Education
          </h2>

          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600">
            FOSTIIMA&apos;s educational philosophy focuses on contemporary
            management education, student success, professional development
            and preparing young managers for the challenges of an
            international platform.
          </p>
        </div>

        {/* Vision + Mission */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* Vision */}
          <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#123b79]/5 blur-2xl"
            />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#123b79] text-white">
                  <Lightbulb size={22} aria-hidden="true" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">
                  01
                </span>
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
                Our Vision
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[#172f59]">
                Future-focused Management Education
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                Our vision is centred on delivering broad, inclusive,
                contemporary and futuristic educational services while
                aspiring for the successful careers of all our students.
              </p>

              <div className="mt-7 space-y-4">
                {visionPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[#c31e3b]"
                      aria-hidden="true"
                    />

                    <p className="text-sm leading-6 text-slate-600">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Mission */}
          <article className="relative overflow-hidden rounded-2xl bg-[#071a38] p-7 text-white shadow-sm sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#c31e3b]/20 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#123b79]/50 blur-3xl"
            />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#f4c542]">
                  <Target size={22} aria-hidden="true" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/25">
                  02
                </span>
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4c542]">
                Our Mission
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Preparing Managers for a Global Platform
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/70">
                Our mission is to prepare young managers to face the
                challenges on an international platform by maintaining
                excellent standards of education, ethics, integrity and
                discipline.
              </p>

              <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4c542]">
                  IIM–IIT Network
                </p>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  Our core faculty and founders focus on future challenges and
                  on the IIM–IIT network to obtain the very best faculty and
                  guest speakers.
                </p>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-8 bg-[#f4c542]" />

                <p className="text-md font-semibold text-white/60">
                  Education • Ethics • Integrity • Discipline
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Educational Philosophy */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f4c542]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
                Educational Philosophy
              </p>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-[#172f59] sm:text-3xl">
              Developing More Than Management Skills
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              This vision includes inculcating among students the spirit of
              teamwork, work culture enrichment, enhanced personality
              development and effective interpersonal communication.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {philosophyPoints.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-slate-200 bg-[#f8fafc] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#123b79]/20 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#123b79]/10 text-[#123b79] transition-colors duration-300 group-hover:bg-[#123b79] group-hover:text-white">
                    <Icon size={19} aria-hidden="true" />
                  </div>

                  <h4 className="mt-4 text-sm font-bold text-[#172f59]">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-md leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* PEO Section */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-[#123b79] text-white">
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#f4c542]/10 blur-3xl"
            />

            <div className="relative">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                {/* Intro */}
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#f4c542]" />

                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4c542]">
                      PEOs
                    </p>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
                    Preparing Students for the Changing Business World
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/65">
                    Success of our students is critical to our founder
                    trustees. FOSTIIMA&apos;s approach connects management
                    education with changing markets, core competencies,
                    corporate requirements and the development of young
                    talent.
                  </p>
                </div>

                {/* PEO Cards */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {peoPoints.map((item) => (
                    <div
                      key={item.number}
                      className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:bg-white/10"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                          <BookOpen
                            size={17}
                            className="text-[#f4c542]"
                            aria-hidden="true"
                          />
                        </div>

                        <span className="text-[10px] font-bold tracking-[0.15em] text-white/25">
                          {item.number}
                        </span>
                      </div>

                      <h4 className="mt-4 text-sm font-bold text-white">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-md leading-5 text-white/55">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closing Content */}
              <div className="mt-8 border-t border-white/10 pt-7">
                <p className="max-w-5xl text-sm leading-7 text-white/65">
                  In order to gain market share within existing markets, to
                  expand into new markets, to set up attainable long-term
                  objectives, to excel and to master core competencies,
                  creative &amp; experiential management education has become
                  imperative. The onus for discovering and nurturing young
                  talent lies with today&apos;s educational institutions in
                  synergistic alliance with the corporates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership CTA */}
        <div className="mt-6 rounded-2xl border border-[#c31e3b]/10 bg-white p-6 sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
                From Vision to Leadership
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                FOSTIIMA&apos;s vision and mission are supported by its
                founders, faculty and educational ecosystem with a focus on
                developing capable, confident and future-ready managers.
              </p>
            </div>

            <a
              href="#message-from-chairman"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#123b79] transition-colors hover:text-[#c31e3b]"
            >
              Meet Our Leadership

              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}