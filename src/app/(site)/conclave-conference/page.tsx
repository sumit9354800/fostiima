import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";

import EventCard from "@/components/conclave/EventCard";
import { getPublishedConclaveEvents } from "@/data/conclave";

export const metadata: Metadata = {
  title: "Conclave & Conference | FOSTIIMA Business School",
  description:
    "Explore conferences, summits, conclaves and industry events at FOSTIIMA Business School.",
};

export default function ConclaveConferencePage() {
  const events = getPublishedConclaveEvents();

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

        {/* Subtle Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#c31e3b]/10 blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-[#183f78]/20 blur-[100px]"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#e5b83f]" />

              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[#e5b83f] sm:text-sm">
                <CalendarDays className="h-4 w-4" />
                Conclave / Conference
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ideas That{" "}
              <span className="text-[#c31e3b]">Shape Tomorrow</span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-3xl text-base leading-8 text-[#b8c5d8] sm:text-lg">
              Explore our conferences, summits and industry conversations that
              bring together leaders, experts and ideas shaping the future.
            </p>

            {/* Accent Line */}
            <div className="mt-10 h-px w-full max-w-3xl bg-[#1d3559]" />
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          {/* Section Heading */}
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#e5b83f]" />

              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#e5b83f]">
                Events &amp; Initiatives
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#c31e3b] sm:text-4xl">
              All Conferences &amp; Events
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Discover conferences, summits and industry-led initiatives at
              FOSTIIMA Business School.
            </p>
          </div>

          {/* Events Grid */}
          {events.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
              <p className="text-sm text-slate-500">
                No conferences or events are currently available.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}