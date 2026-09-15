import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { facultyData } from "@/data/faculty";

export const metadata: Metadata = {
  title: "Core Faculties | FOSTIIMA Business School",
  description:
    "Meet the experienced core faculty members of FOSTIIMA Business School.",
};

export default function FacultiesPage() {
  return (
    <main className="bg-[#f8faff]">
      {/* Header */}
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

        {/* Background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c31e3b]/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#eab308]">
            Academics
          </span>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Core Faculties
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Meet the experienced academicians and industry professionals who
            contribute to the FOSTIIMA learning experience.
          </p>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {facultyData.map((faculty) => (
              <Link
                key={faculty.slug}
                href={`/faculties/${faculty.slug}`}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-[300px] overflow-hidden">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a38]/90 via-transparent to-transparent" />

                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#102a56] opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h2 className="text-lg font-bold text-white">
                      {faculty.name}
                    </h2>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#c31e3b]">
                    {faculty.experience} Industry Experience
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {faculty.domain}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}