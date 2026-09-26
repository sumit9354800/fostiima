import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { campusLifeItems } from "@/data/campus-life";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return campusLifeItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const item = campusLifeItems.find(
    (item) => item.slug === slug
  );

  if (!item) {
    return {
      title: "Campus Life | FOSTIIMA Business School",
    };
  }

  return {
    title: `${item.title} | FOSTIIMA Business School`,
    description: item.description,
  };
}

export default async function CampusLifeDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const item = campusLifeItems.find(
    (item) => item.slug === slug
  );

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#061a3a]">
        <div className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#061a3a]/75" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#b8c5d8] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />

            <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#e5b83f]">
              Campus Life
            </span>
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {item.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#d1d9e6] sm:text-lg">
            {item.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#f8faff] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_15px_40px_rgba(6,26,58,0.10)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-sm">
                {item.title}
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#061b3a] sm:text-4xl">
                Experience Life Beyond the Classroom
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                {item.description}
              </p>

              <div className="mt-8 space-y-4">
                {item.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <span className="mt-1 text-[#c31e3b]">
                      ➤
                    </span>

                    <p className="text-sm leading-7 text-slate-700 sm:text-base">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#c31e3b] transition-colors hover:text-[#061a3a]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          {/* CTA */}
          <div className="relative mt-20 overflow-hidden bg-[#061b3a] p-8 text-center sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5b82e]">
                Campus Life
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
                Discover More About{" "}
                <span className="text-[#d61f3c]">
                  FOSTIIMA
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                Explore more experiences and discover what makes campus life
                at FOSTIIMA Business School unique.
              </p>

              <Link
                href="/"
                className="mt-8 inline-flex items-center bg-[#d61f3c] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#b91934]"
              >
                Explore Campus Life
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}