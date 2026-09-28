
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { accreditations } from "@/data/awards-accreditation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return accreditations.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const item = accreditations.find(
    (accreditation) => accreditation.id === id
  );

  if (!item) {
    return {
      title: "Approval Not Found | FOSTIIMA Business School",
    };
  }

  return {
    title: `${item.title} ${item.year} | FOSTIIMA Business School`,
    description: item.description,
  };
}

export default async function AccreditationDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const item = accreditations.find(
    (accreditation) => accreditation.id === id
  );

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#061a3a]">
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
          <Link
            href="/awards-accreditation"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#b8c5d8] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Awards & Accreditations
          </Link>

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />

            <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#e5b83f]">
              AICTE Approval
            </span>
          </div>

          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {item.title} {item.year}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-[#b8c5d8]">
            {item.description}
          </p>
        </div>
      </section>

      {/* Approval Images */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {item.image.length > 0 ? (
            <div
              className="
                flex
                gap-6
                overflow-x-auto
                snap-x
                snap-mandatory
                pb-4
                scrollbar-hide
              "
            >
              {item.image.map((image, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="
                    min-w-full
                    snap-start
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#dbe3ee]
                    bg-[#f8fafc]
                    shadow-sm
                    lg:min-w-[calc(50%-12px)]
                  "
                >
                  <img
                    src={image}
                    alt={`${item.title} ${item.year} - Document ${
                      index + 1
                    }`}
                    className="
                      block
                      h-auto
                      min-h-[600px]
                      w-full
                      object-contain
                    "
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-sm text-slate-500">
                No approval images available.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Back */}
      <div className="flex justify-center px-6 pb-12">
        <Link
          href="/awards-accreditation"
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
          Back to All Approvals
        </Link>
      </div>
    </main>
  );
}
