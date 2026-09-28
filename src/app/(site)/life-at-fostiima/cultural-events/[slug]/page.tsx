import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Images } from "lucide-react";
import { notFound } from "next/navigation";

import { lifeAtFostiimaSections } from "@/data/life-at-fostiima";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Find the Cultural Events section.
 */
function getCulturalEventsSection() {
  return lifeAtFostiimaSections.find(
    (section) => section.slug === "cultural-events",
  );
}

/**
 * Find one specific cultural event by slug.
 */
function getCulturalEventBySlug(slug: string) {
  const section = getCulturalEventsSection();

  if (!section) {
    return undefined;
  }

  return section.content.find((item) => item.slug === slug);
}

/**
 * Generate static pages for all cultural events.
 */
export function generateStaticParams() {
  const section = getCulturalEventsSection();

  if (!section) {
    return [];
  }

  return section.content
    .filter((item) => item.slug)
    .map((item) => ({
      slug: item.slug as string,
    }));
}

/**
 * SEO metadata.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const event = getCulturalEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | FOSTIIMA Business School",
    };
  }

  return {
    title: `${event.title} | Cultural Events | FOSTIIMA Business School`,
    description:
      event.description ?? `${event.title} at FOSTIIMA Business School.`,
  };
}

export default async function CulturalEventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const event = getCulturalEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const images = event.images ?? [];

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* =====================================================
          HERO
      ===================================================== */}
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

        {/* Red Glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-40
            top-0
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#c31e3b]/10
            blur-[120px]
          "
        />

        {/* Blue Glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-48
            left-1/3
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#183f78]/20
            blur-[100px]
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-5
            py-12
            sm:px-6
            sm:py-16
            lg:px-8
            lg:py-20
          "
        >
          {/* Back */}
          <Link
            href="/life-at-fostiima/cultural-events"
            className="
              mb-8
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[#b8c5d8]
              transition-colors
              hover:text-white
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cultural Events
          </Link>

          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />

            <span
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#e5b83f]
              "
            >
              Life at FOSTIIMA
            </span>
          </div>

          {/* Title */}
          <h1
            className="
              max-w-4xl
              text-3xl
              font-extrabold
              leading-tight
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            {event.title}
          </h1>

          {/* Description */}
          {event.description && (
            <p
              className="
                mt-6
                max-w-3xl
                text-base
                leading-8
                text-[#b8c5d8]
                sm:text-lg
              "
            >
              {event.description}
            </p>
          )}

          {/* Image Count */}
          {images.length > 0 && (
            <div
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-sm
                font-medium
                text-white
                backdrop-blur-sm
              "
            >
              <Images className="h-4 w-4 text-[#e5b83f]" />
              {images.length} {images.length === 1 ? "Photo" : "Photos"}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          GALLERY
      ===================================================== */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="mb-10">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#c31e3b]" />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-[#c31e3b]
                "
              >
                Event Gallery
              </span>
            </div>

            <h2
              className="
                text-2xl
                font-extrabold
                tracking-tight
                text-[#061a3a]
                sm:text-3xl
              "
            >
              {event.title}
            </h2>
          </div>

          {/* Images */}
          {images.length > 0 ? (
            <div
              className="
                grid
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {images.map((image, index) => (
                <div
                  key={`${slug}-image-${index}`}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#dbe3ee]
                    bg-[#eef2f7]
                    shadow-sm
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_16px_35px_rgba(6,26,58,0.10)]
                  "
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        33vw
                      "
                      className="
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* Image Number */}
                  <div
                    className="
                      absolute
                      left-4
                      top-4
                      rounded-full
                      bg-[#061a3a]/80
                      px-3
                      py-1
                      text-xs
                      font-bold
                      text-white
                      backdrop-blur-sm
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-[#cbd5e1]
                bg-white
                px-6
                py-16
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#c31e3b]/10
                "
              >
                <Images className="h-6 w-6 text-[#c31e3b]" />
              </div>

              <h3
                className="
                  mt-5
                  text-lg
                  font-bold
                  text-[#061a3a]
                "
              >
                Event photos coming soon
              </h3>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                  text-[#64748b]
                "
              >
                Photos for this event will be added here soon.
              </p>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-12">
            <Link
              href="/life-at-fostiima/cultural-events"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#061a3a]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#0b2b58]
              "
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cultural Events
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
