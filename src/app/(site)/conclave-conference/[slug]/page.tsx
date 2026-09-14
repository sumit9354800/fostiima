import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import EventCard from "@/components/conclave/EventCard";
import {
  getConclaveEventBySlug,
  getPublishedConclaveEvents,
} from "@/data/conclave";

type EventDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublishedConclaveEvents().map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const event = getConclaveEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | FOSTIIMA Business School",
    };
  }

  return {
    title: `${event.title} | FOSTIIMA Business School`,
    description: event.excerpt,
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;

  const event = getConclaveEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = getPublishedConclaveEvents()
    .filter((item) => item.slug !== event.slug)
    .slice(0, 3);

  return (
    <main className="bg-[#f8faff]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#102a56]">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#1555a5]/30 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#c31e3b]/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Back */}
          <Link
            href="/conclave-conference"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Events
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
            {/* Content */}
            <div>
              <span className="inline-flex rounded-full border border-[#eab308]/30 bg-[#eab308]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#eab308]">
                Conclave / Conference
              </span>

              <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>

              <div className="mt-7 flex flex-col gap-4 text-sm text-white/75 sm:flex-row sm:flex-wrap">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#eab308]" />
                  {event.date}
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#eab308]" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            {/* Date Card */}
            <div className="hidden lg:block">
              <div className="ml-auto max-w-[300px] overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur">
                <div className="bg-[#c31e3b] px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Event Date
                </div>

                <div className="px-8 py-8 text-center">
                  <div className="text-6xl font-black leading-none text-white">
                    {event.day}
                  </div>

                  <div className="mt-2 text-sm font-bold tracking-[0.25em] text-[#eab308]">
                    {event.month}
                  </div>

                  <div className="mt-1 text-sm text-white/50">
                    {event.year}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            {/* Intro */}
            <div className="mb-8 border-b border-slate-100 pb-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
                About the Event
              </span>

              <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
                {event.title}
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {event.excerpt}
              </p>
            </div>

            {/* Event content */}
            <div className="prose prose-slate max-w-none">
              <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {event.content}
              </p>
            </div>

            {/* Event details */}
            <div className="mt-10 grid gap-4 border-t border-slate-100 pt-8 sm:grid-cols-2">
              <div className="rounded-xl bg-[#f8faff] p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c31e3b]">
                  <CalendarDays className="h-4 w-4" />
                  Date
                </div>

                <p className="mt-2 text-sm font-semibold text-[#102a56]">
                  {event.date}
                </p>
              </div>

              <div className="rounded-xl bg-[#f8faff] p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c31e3b]">
                  <MapPin className="h-4 w-4" />
                  Venue
                </div>

                <p className="mt-2 text-sm font-semibold leading-6 text-[#102a56]">
                  {event.location}
                </p>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="mt-7">
            <Link
              href="/conclave-conference"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#c31e3b]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
                  Explore More
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
                  Related Events
                </h2>
              </div>

              <Link
                href="/conclave-conference"
                className="group hidden items-center gap-2 text-sm font-semibold text-[#c31e3b] sm:inline-flex"
              >
                View All
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedEvents.map((relatedEvent) => (
                <EventCard
                  key={relatedEvent.id}
                  event={relatedEvent}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}