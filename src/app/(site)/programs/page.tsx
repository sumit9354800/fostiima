import type { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { getHomePrograms, getPrograms, type ProgramKey } from "@/data/programs";
import { buildPageMetadata } from "@/lib/seo";

type ProgramsPageProps = {
  searchParams: Promise<{ program?: string | string[] }>;
};

export const metadata: Metadata = buildPageMetadata({
  title: "PGDM Programmes & Specialisations",
  description:
    "Compare FOSTIIMA Business School's PGDM programmes in Delhi: Marketing, Finance, HR, Business Analytics, International Business and AI & Analytics.",
  path: "/programs",
});

export default async function ProgramsPage({
  searchParams,
}: ProgramsPageProps) {
  // The old site served each programme at /programs?program=<key>. Send those
  // URLs to the programme's own page so they stop duplicating this one.
  const { program: programParam } = await searchParams;
  const key = Array.isArray(programParam) ? programParam[0] : programParam;
  const programsByKey = getPrograms();

  if (key && Object.hasOwn(programsByKey, key)) {
    permanentRedirect(`/programs/${programsByKey[key as ProgramKey].slug}`);
  }

  const programs = getHomePrograms();

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="bg-[#061a3a] px-6 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e5b83f]">
            Programmes
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            PGDM Programmes &amp; Specialisations
          </h1>
          <p className="mt-4 max-w-3xl text-base text-white/80 sm:text-lg">
            Choose the programme that fits your goals. Each page covers the
            curriculum, semester structure and specialisation subjects.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-8 lg:py-16">
        <ul className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <li key={program.slug}>
              <Link
                href={`/programs/${program.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_25px_rgba(18,59,121,0.06)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(18,59,121,0.12)]"
              >
                <div className="relative aspect-[1.65/1] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the homepage programme cards */}
                  <img
                    src={program.imageUrl}
                    alt={program.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg font-bold text-[#123b79]">
                    {program.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {program.duration}
                  </p>
                  <p className="mt-3 flex-1 text-sm text-slate-600">
                    {program.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-[0.12em] text-[#c31e3b]">
                    View programme
                    <ArrowRight size={14} className="ml-1.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
