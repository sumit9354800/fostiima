"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  HeartHandshake,
  Landmark,
  Megaphone,
  Users,
  Trophy,
} from "lucide-react";

type AlumniSection = {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon: React.ElementType;
};

const alumniSections: AlumniSection[] = [
  {
    id: "finance-committee",
    title: "Finance Committee",
    description:
      "The Finance Committee bridges academic learning with industry practice through four key pillars: Knowledge Enhancement, Industry Engagement, Skill Development, and Research. Beyond organizing large-scale events, members manage digital platforms and conduct deep financial research, cultivating leadership, critical thinking, teamwork, and digital marketing skills. Moving forward, the committee aims to elevate campus-wide financial literacy and scale operations up to inter-college events—enhancing institutional prestige while empowering student career readiness.",
    image: "/alumni/finance-committee.jpeg",
    icon: BarChart3,
  },

  {
    id: "hr",
    title: "HR",
    description:
      "The HR Committee at FOSTIIMA Business School wants to be the most trusted and industry-connected student group on campus. Our aim is to prepare students to become HR professionals who can look ahead and prepare for change, not just react to it. We want to get students ready for the HR jobs of the future — jobs that will involve AI, hybrid and gig workers, ESG-linked people strategies, and new rules that keep changing.",
    image: "/alumni/hr.jpeg",
    icon: Users,
  },

  {
    id: "marketing",
    title: "Marketing",
    description:
      "The Marketing Club at FOSTIIMA Business School is a vibrant, student-driven forum dedicated to fostering creativity, strategic thinking, and professional excellence. We bridge classroom learning with real-world practice, equipping students to navigate the evolving landscapes of branding, digital strategy, consumer behavior, analytics, and entrepreneurship. Through industry engagements, experiential learning, and interactive events, the Club instills a customer-centric, innovative mindset across the entire campus community—serving as a catalyst for future marketing leaders, decision-makers, and ethical entrepreneurs.",
    image: "/alumni/marketing.jpeg",
    icon: Megaphone,
  },

  {
    id: "placement",
    title: "Placement",
    description:
      "We partner with leading organizations to build enduring talent pipelines through final placements, summer internships, and interactive guest lectures. Our placement committee drives targeted digital outreach, strategic database management, and active employer engagement to connect top recruiters with our students. By conducting comprehensive CV reviews, optimizing professional profiles, and incorporating structured feedback from recruitment drives, we ensure our candidates consistently meet industry standards and excel in on-campus recruitment processes.",
    image: "/alumni/placement.jpeg",
    icon: BriefcaseBusiness,
  },

  {
    id: "smart-campus",
    title: "Smart Campus",
    description:
      "The Smart Campus Infrastructure Committee is dedicated to maintaining a clean, safe, hygienic, and student-friendly environment through the continuous monitoring and timely enhancement of campus facilities. Its scope encompasses rigorous daily housekeeping and washroom sanitation, routine maintenance of classroom furniture and climate control systems, and strict oversight of campus safety protocols, including electrical infrastructure, fire emergency preparedness, and purified drinking water systems. By establishing streamlined complaint-resolution workflows and actively integrating feedback from students, faculty, and staff, the committee ensures high operational standards and a seamlessly functioning academic environment.",
    image: "/alumni/smart-campus.jpeg",
    icon: Landmark,
  },

  {
    id: "student-interface",
    title: "Student Interface",
    description:
      "The Student Interface Committee acts as the vital bridge between the student body and campus administration, ensuring transparent communication, constructive engagement, and continuous improvement in student life. The committee’s agenda focuses on gathering structured feedback regarding academic services, campus amenities, and administrative support to address student concerns promptly. By facilitating regular dialogue, town halls, and open forums, the committee fosters a collaborative environment where student voices actively inform institutional decisions. Additionally, it streamlines grievance redressal mechanisms, promotes peer mentorship, and coordinates key campus initiatives to enhance overall student satisfaction. Through proactive leadership and structured communication channels, the committee remains dedicated to cultivating an inclusive, responsive, and student-centric campus ecosystem.",
    image: "/alumni/student-interface.jpeg",
    icon: HeartHandshake,
  },

  {
    id: "events-sports",
    title: "Events & Sports",
    description:
      'Driven by the motto "Together we lead, Together we achieve," the Events & Sports Committee is dedicated to building an active, inclusive, and vibrant campus life where every student feels empowered to discover their talents, participate in competitive sports, and gain meaningful experiences. The committee focuses on organizing fair, seamlessly executed cultural, athletic, and institutional events that cultivate essential life skills beyond academics. By fostering dynamic opportunities for student engagement, the committee systematically develops leadership, teamwork, event execution, creative problem-solving, and sportsmanship, while instilling time management, effective communication, and social responsibility across the student body.',
    image: "/alumni/events-sports.jpeg",
    icon: Trophy,
  },

  {
    id: "literary",
    title: "Literary",
    description:
      "The Literary Committee fosters an active intellectual and creative ecosystem by encouraging self-expression, critical thinking, and effective communication across campus. Its agenda focuses on organizing diverse literary engagements, including debates, creative writing workshops, book discussions, poetry slams, and panel talks with guest authors. The committee manages the publication of the annual college magazine and campus newsletters, offering students a structured platform to showcase their written work and editorial skills. Additionally, it oversees literary competitions, coordinates inter-college festival participation, and builds inclusive forums where students can refine their public speaking, analytical reasoning, and creative expression.",
    image: "/alumni/literary.jpeg",
    icon: CalendarDays,
  },
];

function ImageFallback({
  image,
  title,
}: {
  image?: string;
  title: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Grid fallback */}
      <div
        className="
          absolute inset-0
          bg-[#071a38]
          bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]
          bg-[size:28px_28px]
        "
      />

      {image && (
        <img
          src={image}
          alt={title}
          className="relative z-10 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#071a38]/70 via-transparent to-transparent" />
    </div>
  );
}

export default function AlumniSections() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#dbeafe]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-[45%] h-80 w-80 rounded-full bg-[#fee2e2]/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-[#c31e3b]">
            Alumni Relations
          </span>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#102a56] sm:text-4xl lg:text-5xl">
            Building Excellence Through Our{" "}
            <span className="text-[#c31e3b]">Alumni</span>
          </h1>

          <div className="mx-auto mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              At FOSTIIMA Business School, we believe an institution’s
              reputation is defined by the achievements of its alumni. While
              exceptional faculty and infrastructure lay the foundation, it is
              the performance, leadership, and global impact of our graduates
              that elevate our standing alongside top-tier institutions.
            </p>

            <p>
              We cultivate lifelong, mutually beneficial relationships with our
              alumni network. FOSTIIMA supports graduates through strategic
              professional networking, continuous access to campus expertise,
              and exclusive partner benefits. In return, our alumni serve as
              trusted brand ambassadors, driving our growth, mentorship
              programs, and institutional prestige.
            </p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {alumniSections.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="
                rounded-lg
                border border-slate-200
                bg-white
                px-3 py-3
                text-center
                text-xs font-semibold
                text-[#102a56]
                shadow-sm
                transition-all
                hover:-translate-y-0.5
                hover:border-[#c31e3b]
                hover:bg-[#c31e3b]
                hover:text-white
              "
            >
              {item.title}
            </a>
          ))}
        </div>

        {/* Committee Sections */}
        <div className="space-y-16 lg:space-y-24">
          {alumniSections.map((item, index) => {
            const Icon = item.icon;
            const reversed = index % 2 !== 0;

            return (
              <article
                key={item.id}
                id={item.id}
                className="scroll-mt-28"
              >
                <div
                  className={`
                    grid
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    lg:grid-cols-2
                  `}
                >
                  {/* Image */}
                  <div
                    className={`
                      relative
                      min-h-[280px]
                      overflow-hidden
                      lg:min-h-[430px]
                      ${reversed ? "lg:order-2" : "lg:order-1"}
                    `}
                  >
                    <ImageFallback
                      image={item.image}
                      title={item.title}
                    />

                    {/* Icon */}
                    <div className="absolute left-6 top-6 z-30 flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 text-[#c31e3b] shadow-lg backdrop-blur-sm">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    {/* Number */}
                    <div className="absolute bottom-5 right-6 z-30 text-5xl font-black text-white/20">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`
                      flex
                      flex-col
                      justify-center
                      p-7
                      sm:p-9
                      lg:p-12
                      ${reversed ? "lg:order-1" : "lg:order-2"}
                    `}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#c31e3b]">
                      Committee
                    </span>

                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#102a56] sm:text-3xl">
                      {item.title}
                    </h2>

                    <div className="mt-4 h-0.5 w-12 bg-[#eab308]" />

                    <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}