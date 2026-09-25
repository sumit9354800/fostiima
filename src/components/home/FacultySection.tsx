import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { facultyData } from "@/data/faculty";

const homepageFaculty = facultyData.slice(0, 4);

function truncateWords(text: string, limit = 30) {
  const words = text.trim().split(/\s+/);

  if (words.length <= limit) {
    return text;
  }

  return `${words.slice(0, limit).join(" ")}...`;
}

export default function FacultySection() {
  return (
    <section className="relative overflow-hidden bg-[#f8faff] py-14 sm:py-16">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#dbeafe]/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-[#c31e3b]">
              Faculty
            </span>

            <h2 className="text-2xl font-bold tracking-tight text-[#102a56] sm:text-3xl lg:text-4xl">
              Learn From Experienced{" "}
              <span className="text-[#c31e3b]">Industry Leaders</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Learn from experienced academicians and industry professionals
              bringing practical knowledge and deep domain expertise into the
              classroom.
            </p>
          </div>

          <Link
            href="/faculties"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#c31e3b]"
          >
            View All Faculties
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Faculty cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homepageFaculty.map((faculty) => (
            <Link
              key={faculty.slug}
              href={`/faculties/${faculty.slug}`}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-[300px] overflow-hidden">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071a38]/90 via-transparent to-transparent" />

                {/* Open icon */}
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#102a56] opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                {/* Name */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-bold text-white">
                    {faculty.name}
                  </h3>

                  <div className="mt-2 h-0.5 w-8 bg-[#eab308] transition-all duration-300 group-hover:w-12" />
                </div>
              </div>

              {/* Short information */}
              <div className="p-5">
                <p className="text-md font-semibold uppercase tracking-wide text-[#c31e3b]">
                  {faculty.experience} Industry Experience
                </p>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                  {truncateWords(
                    `${faculty.qualification}. Industry Domain/Fields: ${faculty.domain}`,
                  )}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#102a56]">
                  View Profile
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile / bottom CTA */}
        <div className="mt-7 flex justify-center lg:hidden">
          <Link
            href="/faculties"
            className="inline-flex items-center gap-2 rounded-full bg-[#102a56] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c31e3b]"
          >
            View All Faculties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}