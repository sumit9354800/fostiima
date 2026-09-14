import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { facultyData } from "@/data/faculty";

type FacultyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return facultyData.map((faculty) => ({
    slug: faculty.slug,
  }));
}

export async function generateMetadata({
  params,
}: FacultyPageProps): Promise<Metadata> {
  const { slug } = await params;

  const faculty = facultyData.find((item) => item.slug === slug);

  if (!faculty) {
    return {
      title: "Faculty | FOSTIIMA Business School",
    };
  }

  return {
    title: `${faculty.name} | FOSTIIMA Business School`,
    description: `${faculty.name} - ${faculty.qualification}, ${faculty.experience} industry experience.`,
  };
}

export default async function FacultyDetailPage({
  params,
}: FacultyPageProps) {
  const { slug } = await params;

  const faculty = facultyData.find((item) => item.slug === slug);

  if (!faculty) {
    notFound();
  }

  return (
    <main className="bg-[#f8faff]">
      {/* Hero */}
      <section className="bg-[#102a56] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/faculties"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Faculties
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr]">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl">
              <img
                src={faculty.image}
                alt={faculty.name}
                className="h-[360px] w-full object-cover object-top"
              />
            </div>

            {/* Intro */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#eab308]">
                Core Faculty
              </span>

              <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {faculty.name}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
                {faculty.qualification}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dbeafe] text-[#1555a5]">
                <GraduationCap className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-lg font-bold text-[#102a56]">
                Qualification
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {faculty.qualification}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fee2e2] text-[#c31e3b]">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-lg font-bold text-[#102a56]">
                Industry Experience
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {faculty.experience}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
              Industry Domain / Fields
            </span>

            <h2 className="mt-2 text-2xl font-bold text-[#102a56]">
              Areas of Expertise
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {faculty.domain}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}