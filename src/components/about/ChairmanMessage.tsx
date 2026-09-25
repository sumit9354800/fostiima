import Image from "next/image";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";

const chairmanHighlights = [
  {
    icon: GraduationCap,
    title: "IIT Bombay",
    description: "Chemical Engineering graduate",
  },
  {
    icon: Award,
    title: "IIM Ahmedabad",
    description: "PGDBA, 1973",
  },
  {
    icon: BriefcaseBusiness,
    title: "Industry Experience",
    description: "Business & corporate leadership",
  },
];

export default function ChairmanMessage() {
  return (
    <section
      id="message-from-chairman"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#123b79]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#c31e3b]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-[#c31e3b]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-md">
              Message From Chairman
            </p>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-[#172f59] sm:text-4xl lg:text-[42px]">
            Leadership Rooted in Education, Experience &amp; Vision
          </h2>

          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600">
            The vision of FOSTIIMA is closely connected with the experience,
            educational foundation and leadership of its founder trustees.
          </p>
        </div>

        {/* Chairman Content */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          {/* Image / Identity */}
          <div className="relative overflow-hidden rounded-2xl bg-[#071a38]">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#c31e3b]/20 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#123b79]/60 blur-3xl"
            />

            <div className="relative flex h-full min-h-[430px] flex-col">
              {/* Chairman Image */}
              <div className="relative flex flex-1 items-end justify-center overflow-hidden px-8 pt-10">
                <Image
                  src="https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_41.jpg"
                  alt="Anil Somani - Founder and Executive Chairman of FOSTIIMA Business School"
                  width={281}
                  height={281}
                  className="h-[300px] w-[300px] object-contain object-bottom sm:h-[340px] sm:w-[340px]"
                  unoptimized
                />
              </div>

              {/* Identity */}
              <div className="relative border-t border-white/10 p-6 sm:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4c542]">
                  Founder &amp; Executive Chairman
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Anil Somani
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  Founder and Executive Chairman of FOSTIIMA Business School.
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 sm:p-9">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123b79] text-white">
                <BriefcaseBusiness size={20} aria-hidden="true" />
              </div>

              <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
                A Founder&apos;s Perspective
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight text-[#172f59] sm:text-3xl">
                Building an Institution Around Academic Excellence
              </h3>

              <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
                <p>
                  Anil Somani is a Chemical Engineer from IIT Bombay and
                  completed his PGDBA from IIM Ahmedabad in 1973. His academic
                  journey combines two of India&apos;s leading institutions
                  and forms an important part of the foundation behind his
                  approach to management education.
                </p>

                <p>
                  Following a stint in the corporate world, he went on to
                  promote and expand his family business and also promoted a
                  pharmaceutical company. His professional journey included
                  leadership responsibilities across business, industry and
                  institutional initiatives.
                </p>

                <p>
                  He has also served as Vice-President of the MP Chambers of
                  Commerce &amp; Industries and participated in several trade
                  delegations on critical economic issues. From 1992 to 2001,
                  he served on the Board of Governors of the Indian Institute
                  of Tourism and Travel Management.
                </p>
              </div>
            </div>

            {/* Quote-style Statement */}
            <div className="mt-8 border-l-4 border-[#c31e3b] bg-white px-5 py-5 shadow-sm">
              <p className="text-sm font-medium leading-7 text-[#172f59]">
                FOSTIIMA&apos;s institutional vision places strong emphasis on
                quality management education, experienced leadership and
                preparing students for the challenges of the professional
                world.
              </p>
            </div>
          </div>
        </div>

        {/* Academic & Professional Highlights */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {chairmanHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#123b79]/20 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#123b79]/10 text-[#123b79] transition-colors duration-300 group-hover:bg-[#123b79] group-hover:text-white">
                    <Icon size={19} aria-hidden="true" />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#172f59]">
                      {item.title}
                    </h4>

                    <p className="mt-1 text-md leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Profile Link */}
        <div className="mt-7 flex justify-end">
          <a
            href="https://www.fostiima.org/aboutus/founder-trustees/anil-somani.php"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#123b79] transition-colors hover:text-[#c31e3b]"
          >
            View Chairman Profile

            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}