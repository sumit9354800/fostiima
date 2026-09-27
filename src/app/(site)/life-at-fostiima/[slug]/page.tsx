import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { lifeAtFostiimaSections } from "@/data/life-at-fostiima";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return lifeAtFostiimaSections.map((section) => ({
    slug: section.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const section = lifeAtFostiimaSections.find((item) => item.slug === slug);

  if (!section) {
    return {
      title: "Page Not Found | FOSTIIMA Business School",
    };
  }

  return {
    title: `${section.title} | FOSTIIMA Business School`,
    description: section.description,
  };
}

export default async function LifeAtFostiimaDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const section = lifeAtFostiimaSections.find((item) => item.slug === slug);

  if (!section) {
    notFound();
  }

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

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Back */}
          <Link
            href="/life-at-fostiima"
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
            Back to Life at FOSTIIMA
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
            {section.title.split("FOSTIIMA").map((part, index, arr) => (
              <span key={index}>
                {part}
                {index < arr.length - 1 && (
                  <span className="text-[#c31e3b]">FOSTIIMA</span>
                )}
              </span>
            ))}
          </h1>
          {/* Description */}
          <p
            className="
              mt-5
              max-w-3xl
              text-base
              leading-7
              text-[#b8c5d8]
            "
          >
            {section.description}
          </p>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* =================================================
              TOP GALLERY
          ================================================= */}

          {section.images?.length > 0 && (
            <div className="mb-16">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.images.map((image, index) => (
                  <div
                    key={`${section.slug}-main-image-${index}`}
                    className="
                      group
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#dbe3ee]
                      bg-white
                      shadow-sm
                    "
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#eef2f7]">
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================
              SECTION TITLE
          ================================================= */}

          {section.content?.length > 0 && (
            <>
              <div className="mb-10">
                <p
                  className="
                    mb-3
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#c31e3b]
                  "
                >
                  Academic Experience
                </p>

                <h2
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-[#061a3a]
                    sm:text-4xl
                  "
                >
                  Six pillars of academic excellence
                </h2>
              </div>

              {/* =================================================
                  CONTENT CARDS
              ================================================= */}

              <div className="grid gap-6 lg:grid-cols-2">
                {section.content.map((item, index) => (
                  <article
                    key={`${section.slug}-content-${index}`}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#dbe3ee]
                      bg-white
                      p-6
                      shadow-sm
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-[0_16px_35px_rgba(6,26,58,0.09)]
                      sm:p-8
                    "
                  >
                    {/* Decorative Circle */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-48
                        w-48
                        rounded-full
                        bg-[#eef4ff]
                      "
                    />

                    {/* Number */}
                    <div
                      className="
                        absolute
                        right-8
                        top-8
                        text-sm
                        font-bold
                        tracking-widest
                        text-[#e5b83f]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon Box */}
                      <div
                        className="
                          mb-7
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#c31e3b]/10
                        "
                      >
                        <div className="h-5 w-5 rounded border-2 border-[#c31e3b]" />
                      </div>

                      {/* Title */}
                      <h3
                        className="
                          max-w-xl
                          text-xl
                          font-bold
                          leading-tight
                          text-[#061a3a]
                          sm:text-2xl
                        "
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="
                          mt-6
                          text-sm
                          leading-7
                          text-[#64748b]
                          sm:text-base
                        "
                      >
                        {item.description}
                      </p>

                      {/* =================================================
                          CARD IMAGES
                      ================================================= */}

                      {item.images?.length > 0 && (
                        <div className="mt-7">
                          <div
                            className="
                              grid
                              gap-3
                              sm:grid-cols-2
                            "
                          >
                            {item.images.map((image, imageIndex) => (
                              <div
                                key={`${section.slug}-${index}-image-${imageIndex}`}
                                className="
                                  group/image
                                  relative
                                  overflow-hidden
                                  rounded-xl
                                  border
                                  border-[#dbe3ee]
                                  bg-[#eef2f7]
                                "
                              >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                  <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="
                                      (max-width: 640px) 100vw,
                                      50vw
                                    "
                                    className="
                                      object-cover
                                      transition
                                      duration-500
                                      group-hover/image:scale-105
                                    "
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* =================================================
              BACK BUTTON
          ================================================= */}

          <div className="mt-12">
            <Link
              href="/life-at-fostiima"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                text-[#c31e3b]
                transition-colors
                hover:text-[#061a3a]
              "
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Life at FOSTIIMA
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
