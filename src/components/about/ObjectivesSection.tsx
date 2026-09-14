import {
  Activity,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Handshake,
  MessageCircle,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const objectives = [
  {
    number: "01",
    title: "Encourage Contact Between Students and Faculty",
    icon: MessageCircle,
    description:
      "Frequent student-faculty contact in and out of classes is the most important factor in student motivation and involvement. Faculty must help students deal with high stress and keep on working to achieve results. Knowing a few faculty members well enhances students’ intellectual commitment and encourages them to think about their own values and future plans and develop mutual trust. This is what mentoring is all about.",
  },
  {
    number: "02",
    title: "Develop Reciprocity and Co-operation Among Students",
    icon: Handshake,
    description:
      "Learning is enhanced when it becomes team effort rather than a solo race. Good learning, like good work, is collaborative and social, not competitive and isolated. Working with others increases involvement in learning. Sharing one’s own ideas and responding to others’ reactions sharpens thinking and deepens understanding.",
  },
  {
    number: "03",
    title: "Encourage Active Learning",
    icon: Activity,
    description:
      "Learning is not a spectator sport. Students do not learn by sitting in classrooms listening to teachers, memorizing pre-packaged assignments, and regurgitating answers. They must cogitate over what they are learning, write about it, relate it to past experiences and apply it to their daily lives. They must make what they learn part of themselves.",
  },
  {
    number: "04",
    title: "Give Prompt Feedback",
    icon: CheckCircle2,
    description:
      "Knowing what you know and realizing what you don’t know focuses the mind on learning. Students need appropriate feedback on performance to benefit from courses. At various points during the program and towards the end, students need chances to reflect upon what they have learnt, what they still need to know, and how to assess themselves.",
  },
  {
    number: "05",
    title: "Emphasize Time on Task",
    icon: Clock3,
    description:
      "Time plus energy equals learning. There is no substitute for time on task. Learning to use one’s time well is critical for students and professionals alike. Allocating realistic amounts of time means effective learning for students and effective teaching for faculty. How an institution defines time expectations for students, faculty, administrators, and other professional staff can establish the basis of high performance for all.",
  },
  {
    number: "06",
    title: "Communicate High Expectations",
    icon: Target,
    description:
      "Expect more and you will get more. High expectations are important for everyone – for the poorly prepared, for those unwilling to exert themselves, and for the bright and well-motivated. Expecting students to perform well becomes a self-fulfilling prophecy when teachers and institutions hold high expectations for them and make extra efforts.",
  },
  {
    number: "07",
    title: "Respect Diverse Talents and Ways of Learning",
    icon: Users,
    description:
      "There are many roads to learning. People bring different talents and styles of learning to college. Brilliant students in the seminar room may be all thumbs in the lab or in an art studio. Students rich in hands-on experience may not do so well with theory and exams. Students need the opportunity to display their talents and learn in ways that work for them.",
  },
  {
    number: "08",
    title: "No Compromises",
    icon: Sparkles,
    description:
      "Students have to be prepared for very vigorous course work. Great managers are forged and at FOSTIIMA we don’t believe in any shortcuts. Smart work and hard study is the surest path to a rewarding career and enhancing self-worth.",
  },
];

export default function ObjectivesSection() {
  return (
    <section
      id="our-objectives"
      className="relative overflow-hidden bg-[#f5f8fc] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#123b79]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#c31e3b]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-[#c31e3b]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-xs">
              Our Objectives
            </p>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-[#172f59] sm:text-4xl lg:text-[42px]">
            Principles That Shape the FOSTIIMA Learning Experience
          </h2>

          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600">
            Our objectives are centred on meaningful student engagement,
            collaborative learning, active participation, continuous
            feedback, discipline and high expectations.
          </p>
        </div>

        {/* Objective Grid */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            const isLast = index === objectives.length - 1;

            return (
              <article
                key={objective.number}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#123b79]/20 hover:shadow-lg sm:p-7 ${
                  isLast ? "lg:col-span-2" : ""
                }`}
              >
                {/* Card Accent */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-1 bg-[#123b79] transition-colors duration-300 group-hover:bg-[#c31e3b]"
                />

                {/* Background Number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-8 text-[110px] font-black leading-none text-[#123b79]/[0.035]"
                >
                  {objective.number}
                </span>

                <div className="relative flex gap-5">
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#123b79] text-white transition-all duration-300 group-hover:bg-[#c31e3b]">
                    <Icon size={21} aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c31e3b]">
                          Objective {objective.number}
                        </p>

                        <h3 className="mt-2 text-lg font-bold leading-6 text-[#172f59] sm:text-xl">
                          {objective.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {objective.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* No Compromise Highlight */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-[#071a38] text-white">
          <div className="relative p-7 sm:p-9 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c31e3b]/20 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#123b79]/50 blur-3xl"
            />

            <div className="relative grid gap-7 lg:grid-cols-[auto_1fr] lg:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f4c542] text-[#071a38]">
                <GraduationCap size={26} aria-hidden="true" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4c542]">
                  Our Commitment
                </p>

                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                  No Compromises in Preparing Future Managers
                </h3>

                <p className="mt-4 max-w-5xl text-sm leading-7 text-white/65">
                  Students have to be prepared for very vigorous course work.
                  Great managers are forged and at FOSTIIMA we don’t believe
                  in any shortcuts. Smart work and hard study is the surest
                  path to a rewarding career and enhancing self-worth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            These principles form an important part of the student experience
            at FOSTIIMA, from classroom interaction and mentoring to active
            learning, feedback and professional preparation.
          </p>

          <div className="flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#123b79]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c31e3b]" />
            8 Core Objectives
          </div>
        </div>
      </div>
    </section>
  );
}