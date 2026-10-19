
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";

import { facultyData } from "@/data/faculty";

type Faculty = (typeof facultyData)[number];

type FacultyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getFacultyBySlug(slug: string): Faculty | undefined {
  return facultyData.find((faculty) => faculty.slug === slug);
}

/**
 * Generate faculty profile routes from static faculty data.
 * Example: /faculties/faculty-slug
 */
export function generateStaticParams() {
  return facultyData.map((faculty) => ({
    slug: faculty.slug,
  }));
}

/**
 * Allow only the slugs generated from facultyData.
 * Unknown slugs will return a 404 page.
 */
export const dynamicParams = false;

/**
 * Generate SEO metadata for each faculty profile.
 */
export async function generateMetadata({
  params,
}: FacultyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const faculty = getFacultyBySlug(slug);

  if (!faculty) {
    return {
      title: "Faculty Not Found | FOSTIIMA Business School",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${faculty.name} | Core Faculty | FOSTIIMA Business School`,
    description: `${faculty.name} - ${faculty.qualification}, ${faculty.experience} industry experience. Explore faculty expertise at FOSTIIMA Business School.`,
    alternates: {
      canonical: `/faculties/${faculty.slug}`,
    },
    openGraph: {
      title: `${faculty.name} | FOSTIIMA Business School`,
      description: `${faculty.name} - ${faculty.qualification}, ${faculty.experience} industry experience.`,
      type: "profile",
      images: faculty.image
        ? [
            {
              url: faculty.image,
              alt: faculty.name,
            },
          ]
        : undefined,
    },
  };
}

export default async function FacultyDetailPage({
  params,
}: FacultyPageProps) {
  const { slug } = await params;
  const faculty = getFacultyBySlug(slug);

  if (!faculty) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8faff]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#102a56] py-14 sm:py-20">
        {/* Background Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />

        {/* Decorative Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c31e3b]/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/faculties"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to Faculties
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr]">
            {/* Faculty Image */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl">
              <img
                src={faculty.image}
                alt={faculty.name}
                className="h-[360px] w-full object-cover object-top"
                fetchPriority="high"
              />
            </div>

            {/* Faculty Introduction */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#eab308]" />

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#eab308]">
                  Core Faculty
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {faculty.name}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
                {faculty.qualification}
              </p>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                {faculty.domain}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-medium text-white/80">
                <span className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2">
                  <BriefcaseBusiness
                    aria-hidden="true"
                    className="h-4 w-4 text-[#eab308]"
                  />
                  {faculty.experience} Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Details */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Detail Cards */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Qualification */}
            <article className="border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dbeafe] text-[#1555a5]">
                <GraduationCap
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#102a56]">
                Qualification
              </h2>

              <div className="mt-3 h-px w-10 bg-[#eab308]" />

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {faculty.qualification}
              </p>
            </article>

            {/* Experience */}
            <article className="border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fee2e2] text-[#c31e3b]">
                <BriefcaseBusiness
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#102a56]">
                Industry Experience
              </h2>

              <div className="mt-3 h-px w-10 bg-[#eab308]" />

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {faculty.experience}
              </p>
            </article>
          </div>

          {/* Expertise */}
          <article className="mt-5 border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#eab308]" />

              <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
                Industry Domain / Fields
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold text-[#102a56] sm:text-3xl">
              Areas of Expertise
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
              {faculty.domain}
            </p>
          </article>

          {/* Back to Faculty Listing */}
          <div className="mt-10">
            <Link
              href="/faculties"
              className="group inline-flex items-center gap-2 bg-[#102a56] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c31e3b]"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              />
              Explore All Faculty
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
