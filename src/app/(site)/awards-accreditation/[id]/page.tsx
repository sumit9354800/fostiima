import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
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
    title: `${item.title} | FOSTIIMA Business School`,
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
    <main className="min-h-screen bg-[#f8fafc]">
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
            AICTE APPROVAL {item.year}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-[#b8c5d8]">
            {item.description}
          </p>
        </div>
      </section>

      {/* PDF */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#c31e3b]" />

            <h2 className="text-xl font-bold text-[#061a3a] sm:text-2xl">
              Approval Document
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#dbe3ee] bg-white shadow-sm">
            <iframe
              src={item.pdf}
              title={`AICTE Approval ${item.year}`}
              className="h-[75vh] min-h-[600px] w-full"
            />
          </div>

          <div className="mt-8">
            <Link
              href="/awards-accreditation"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#c31e3b] transition-colors hover:text-[#061a3a]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Approvals
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}