import React from "react";
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
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#061a3a]">
        {/* Background Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.75) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* Subtle Red Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#c31e3b]/10 blur-[120px]"
        />

        {/* Subtle Blue Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-[#183f78]/20 blur-[100px]"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#e5b83f]" />

              <span className="text-md font-bold uppercase tracking-[0.28em] text-[#e5b83f] sm:text-sm">
                Academics
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Core <span className="text-[#c31e3b]">Faculties</span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-3xl text-base leading-8 text-[#b8c5d8] sm:text-lg">
              Meet the experienced academicians and industry professionals who
              contribute to the FOSTIIMA learning experience.
            </p>

            {/* Accent Line */}
            <div className="mt-10 h-px w-full max-w-3xl bg-[#1d3559]" />
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          {/* Section Heading */}
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#e5b83f]" />

              <span className="text-md font-bold uppercase tracking-[0.22em] text-[#e5b83f]">
                Our Faculty
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#c31e3b] sm:text-4xl">
              Experienced Academicians &amp; Professionals
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore the faculty members contributing their academic and
              industry experience to the FOSTIIMA learning environment.
            </p>
          </div>

          {/* Faculty Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facultyData.map((faculty) => (
              <Link
                key={faculty.slug}
                href={`/faculties/${faculty.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-[#dbe3ee] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/30 hover:shadow-[0_18px_45px_rgba(6,26,58,0.10)]"
              >
                {/* Faculty Image */}
                <div className="relative h-[300px] overflow-hidden bg-[#061a3a]">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061a3a]/90 via-[#061a3a]/10 to-transparent" />

                  {/* Arrow */}
                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-white text-[#061a3a] opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </div>

                  {/* Faculty Name */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="mb-2 h-px w-7 bg-[#e5b83f]" />

                    <h2 className="text-lg font-bold leading-snug text-white">
                      {faculty.name}
                    </h2>
                  </div>
                </div>

                {/* Faculty Information */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-md font-bold uppercase tracking-[0.12em] text-[#c31e3b]">
                    {faculty.experience} Industry Experience
                  </p>

                  <div className="mt-3 h-px w-10 bg-[#e5b83f]" />

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {faculty.domain}
                  </p>

                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-2 text-md font-bold uppercase tracking-[0.1em] text-[#061a3a] transition-colors group-hover:text-[#c31e3b]">
                      View Profile
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}