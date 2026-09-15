import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  MapPin,
} from "lucide-react";

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

  return (
    <main className="bg-[#f8faff]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#102a56]">
        {/* Grid */}
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
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#1555a5]/30 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#c31e3b]/25 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <Link
            href="/conclave-conference"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Events
          </Link>

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
      </section>

      {/* Event Information */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              Event Information
            </span>

            <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
              {event.title}
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              {event.excerpt}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
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

            {/* Original Event */}
            {event.href && (
              <div className="mt-8 border-t border-slate-100 pt-8">
                <a
                  href={event.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#c31e3b] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a91831]"
                >
                  View Original Event
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>

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
    </main>
  );
}