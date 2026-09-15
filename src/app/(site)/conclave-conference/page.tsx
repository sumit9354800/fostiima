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
    <main className="bg-[#f8faff]">
      {/* Hero */}
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#102a56] py-16 sm:py-20">
  {/* Background Grid */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 opacity-[0.07]"
    style={{
      backgroundImage: `
        linear-gradient(
          to right,
          rgba(255,255,255,0.35) 1px,
          transparent 1px
        ),
        linear-gradient(
          to bottom,
          rgba(255,255,255,0.35) 1px,
          transparent 1px
        )
      `,
      backgroundSize: "42px 42px",
    }}
  />

  {/* Decorations */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#1555a5]/30 blur-3xl"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#c31e3b]/25 blur-3xl"
  />

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#eab308]">
      <CalendarDays className="h-4 w-4" />
      Conclave / Conference
    </span>

    <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
      Ideas That <span className="text-[#eab308]">Shape Tomorrow</span>
    </h1>

    <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
      Explore our conferences, summits and industry conversations that
      bring together leaders, experts and ideas shaping the future.
    </p>
  </div>
</section>Ï

      {/* Events */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              Events & Initiatives
            </span>

            <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
              All Conferences & Events
            </h2>
          </div>

          {events.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
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
