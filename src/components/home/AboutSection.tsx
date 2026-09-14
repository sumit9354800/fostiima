import {
  Award,
  Building2,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  ShieldCheck,
} from "lucide-react";

const highlights = [
  {
    title: "Founded by IIM-A Alumni",
    description:
      'Conceived and managed by the 1973 batch of IIM Ahmedabad — "Friends Of The Stars of IIM-A" — bringing premier pedagogy to management aspirants.',
    icon: Landmark,
    iconClass: "bg-[#fff7c7] text-[#d89a00] border-[#f4df75]",
  },
  {
    title: "AICTE Approved & AIU Equivalent",
    description:
      "2-Year Full-Time PGDM recognized by Association of Indian Universities (AIU) as equivalent to an MBA degree from premier Indian universities.",
    icon: ShieldCheck,
    iconClass: "bg-[#e4f5ff] text-[#1556a8] border-[#bde5fb]",
  },
  {
    title: "Harvard Case Pedagogy",
    description:
      "Immersive corporate problem-solving with Harvard & IIM case studies, simulation labs, Bloomberg terminals, and 2-month summer internships.",
    icon: Award,
    iconClass: "bg-[#fff0f1] text-[#c31e3b] border-[#ffd0d5]",
  },
  {
    title: "50+ IIM Mentors & Faculty",
    description:
      "Distinguished cohort of 50+ IIM alumni faculty with 30–40 years of corporate and academic leadership, maintaining a strong student-faculty ratio.",
    icon: GraduationCap,
    iconClass: "bg-[#fff7c7] text-[#d89a00] border-[#f4df75]",
  },
  {
    title: "Consistent 100% Placements",
    description:
      "Top corporate conglomerates hire from campus every year with packages reaching up to ₹30 LPA across Marketing, BFSI, Consulting, Analytics & Tech.",
    icon: BriefcaseBusiness,
    iconClass: "bg-[#e4f5ff] text-[#1556a8] border-[#bde5fb]",
  },
  {
    title: "Strategic Delhi NCR Campus",
    description:
      "Modern, fully air-conditioned smart campus in Dwarka Institutional Area, Sector 9, New Delhi with digital library and partner hostel facilities.",
    icon: Building2,
    iconClass: "bg-[#fff0f1] text-[#c31e3b] border-[#ffd0d5]",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-16">
          {/* Left Content */}
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b] sm:text-sm">
              About FOSTIIMA
            </p>

            <h2 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#123b79] sm:text-5xl lg:text-[30px]">
              FOSTIIMA Business School{" "}
              <span className="text-[#c31e3b]">Among the Best MBA Colleges in Delhi NCR</span>
            </h2>

            <div className="mt-7 space-y-5 text-[15px] text-justify leading-7 text-slate-600 sm:text-base">
              <p>
               Selecting the <b>best MBA Colleges in Delhi</b> from a list of numerous institutes which may make claims of being the best can be challenging. Our difference isn&apos;t just in the marketing, its in the DNA, our faculty and how our curriculum has been designed at FOSTIIMA Business School. Educating through a highly interactive platform and an experiential environment, FOSTIIMA is one of <b>the Best MBA Colleges in Delhi NCR</b> that provides a conducive learning environment with an emphasis on teamwork, vision, creativity and discipline.
              </p>

              <p>
               We have designed our <b>MBA Course and PGDM Course</b> in such a way that it helps the students understand the theory of the business and then apply it into the practical aspects of the business, a gap which many <b>PGDM Colleges in Delhi</b> are not able to bridge. What makes FOSTIIMA unique is that students are not only learning the concepts of management, but they are also in the presence of industry veterans who have experience in multiple cross-functional and cross-industry areas and bring their experience into every session.

              </p>
            </div>
          </div>

          {/* Right Highlights */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-xl border border-slate-200 bg-[#fbfcff] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d9e2f0] hover:shadow-[0_10px_25px_rgba(18,59,121,0.07)]"
                >
                  <div className="flex flex-col gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border ${item.iconClass}`}
                    >
                      <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                    </div>

                    <div>
                      <h3 className="text-[15px] font-bold leading-5 text-[#123b79]">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-[12px] leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
