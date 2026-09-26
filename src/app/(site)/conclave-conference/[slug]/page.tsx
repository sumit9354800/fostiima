import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Play,
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

  const hasCoverImage = Boolean(event.coverImage?.trim());

  const hasGalleryImages =
    Array.isArray(event.images) && event.images.length > 0;

  const hasVideos =
    Array.isArray(event.video) && event.video.length > 0;

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* =====================================================
          HERO
      ====================================================== */}
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

        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
          {/* Back Link */}
          <Link
            href="/conclave-conference"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#b8c5d8] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Events
          </Link>

          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />

            <span className="text-md font-bold uppercase tracking-[0.28em] text-[#e5b83f] sm:text-sm">
              Conclave / Conference
            </span>
          </div>

          {/* Event Title */}
          <h1 className="max-w-5xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {event.title}
          </h1>

          {/* Event Meta */}
          <div className="mt-8 flex flex-col gap-4 text-sm text-[#b8c5d8] sm:flex-row sm:flex-wrap">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0 text-[#e5b83f]" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#e5b83f]" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Accent Line */}
          <div className="mt-10 h-px w-full max-w-4xl bg-[#1d3559]" />
        </div>
      </section>

      {/* =====================================================
          COVER IMAGE
          Only renders when coverImage exists
      ====================================================== */}
      {hasCoverImage && (
        <section className="bg-[#f8fafc] pt-10 sm:pt-14">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
            <div className="overflow-hidden border border-[#dbe3ee] bg-white shadow-sm">
              <img
                src={event.coverImage}
                alt={event.title}
                className="h-auto max-h-[600px] w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          EVENT INFORMATION
      ====================================================== */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <article className="border border-[#dbe3ee] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            {/* Section Label */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#e5b83f]" />

              <span className="text-md font-bold uppercase tracking-[0.22em] text-[#e5b83f]">
                Event Information
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold leading-tight text-[#c31e3b] sm:text-3xl">
              {event.title}
            </h2>

            {/* Description */}
            <p className="mt-6 text-base leading-8 text-slate-600">
              {event.excerpt}
            </p>

            {/* Event Details */}
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {/* Date */}
              <div className="border border-[#e1e7ef] bg-[#f8fafc] p-5">
                <div className="flex items-center gap-2 text-md font-bold uppercase tracking-[0.12em] text-[#c31e3b]">
                  <CalendarDays className="h-4 w-4" />
                  Date
                </div>

                <p className="mt-3 text-sm font-semibold leading-6 text-[#061a3a]">
                  {event.date}
                </p>
              </div>

              {/* Venue */}
              <div className="border border-[#e1e7ef] bg-[#f8fafc] p-5">
                <div className="flex items-center gap-2 text-md font-bold uppercase tracking-[0.12em] text-[#c31e3b]">
                  <MapPin className="h-4 w-4" />
                  Venue
                </div>

                <p className="mt-3 text-sm font-semibold leading-6 text-[#061a3a]">
                  {event.location}
                </p>
              </div>
            </div>

            {/* =================================================
                VIDEO
                Only renders when video array has items
            ================================================== */}
            {hasVideos && (
              <div className="mt-10 border-t border-[#e5eaf1] pt-10">
                {/* Video Heading */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#e5b83f]" />

                  <span className="flex items-center gap-2 text-md font-bold uppercase tracking-[0.22em] text-[#e5b83f]">
                    <Play className="h-4 w-4" />
                    Event Video
                  </span>
                </div>

                {/* Video Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {event.video!.map((videoUrl, index) => (
                    <div
                      key={`${videoUrl}-${index}`}
                      className="overflow-hidden border border-[#dbe3ee] bg-black shadow-sm"
                    >
                      <div className="relative aspect-video w-full">
                        <iframe
                          src={videoUrl}
                          title={`${event.title} - Event Video ${index + 1}`}
                          className="absolute inset-0 h-full w-full"
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================
                GALLERY
                Only renders when images exist
            ================================================== */}
            {hasGalleryImages && (
              <div className="mt-10 border-t border-[#e5eaf1] pt-10">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#e5b83f]" />

                  <span className="text-md font-bold uppercase tracking-[0.22em] text-[#e5b83f]">
                    Event Gallery
                  </span>
                </div>

                {/* 4 columns on desktop */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {event.images.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="group overflow-hidden border border-[#dbe3ee] bg-[#f8fafc]"
                    >
                      <img
                        src={image}
                        alt={`${event.title} - Image ${index + 1}`}
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Back */}
          <div className="mt-8">
            <Link
              href="/conclave-conference"
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#c31e3b] transition-colors hover:text-[#061a3a]"
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
