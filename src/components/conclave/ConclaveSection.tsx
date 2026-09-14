import Link from "next/link";
import { ArrowRight } from "lucide-react";

import EventCard from "@/components/conclave/EventCard";
import { getPublishedConclaveEvents } from "@/data/conclave";

const HOMEPAGE_EVENT_LIMIT = 6;

export default function ConclaveSection() {
  const events = getPublishedConclaveEvents().slice(
    0,
    HOMEPAGE_EVENT_LIMIT,
  );

  return (
    <section className="relative overflow-hidden bg-[#f8faff] py-14 sm:py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#dbeafe]/60 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#fee2e2]/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-[#c31e3b]">
              Conclave / Conference
            </span>

            <h2 className="text-2xl font-bold tracking-tight text-[#102a56] sm:text-3xl lg:text-4xl">
              Ideas That{" "}
              <span className="text-[#c31e3b]">Shape Tomorrow</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Discover conferences, summits and industry conversations that
              bring together ideas, leadership and perspectives for the future.
            </p>
          </div>

          {/* Desktop View All */}
          <Link
            href="/conclave-conference"
            className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-[#c31e3b] transition-colors hover:text-[#102a56] sm:inline-flex"
          >
            View All Events
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Events */}
        {events.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              No conferences or events are currently available.
            </p>
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-7 flex justify-center sm:hidden">
          <Link
            href="/conclave-conference"
            className="group inline-flex items-center gap-2 rounded-full bg-[#102a56] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c31e3b]"
          >
            View All Events
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}