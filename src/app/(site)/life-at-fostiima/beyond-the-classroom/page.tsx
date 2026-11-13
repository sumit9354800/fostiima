import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCanonicalUrl } from "@/lib/seo";
import StudentAchievementsSection from "@/components/common/StudentAchievementsSection";
import { studentAchievementsData } from "@/data/student-achievements";

export const metadata: Metadata = {
  title: "Beyond the Classroom: Student Achievements",
  description:
    "Explore student achievements beyond the classroom at FOSTIIMA Business School. Discover Team FinSights' national standing, portfolio performance, and equity research excellence at IIM Indore's Finopoly.",
  alternates: {
    canonical: getCanonicalUrl("/life-at-fostiima/beyond-the-classroom"),
  },
  openGraph: {
    type: "website",
    url: getCanonicalUrl("/life-at-fostiima/beyond-the-classroom"),
    title: "Beyond the Classroom: Student Achievements | FOSTIIMA Business School",
    description:
      "Explore student achievements beyond the classroom at FOSTIIMA Business School. Discover Team FinSights' national standing, portfolio performance, and equity research excellence at IIM Indore's Finopoly.",
    siteName: "FOSTIIMA Business School",
    images: [
      {
        url: "/student-achievements/finsights_image_1.webp",
        width: 1200,
        height: 800,
        alt: "Beyond the Classroom - Team FinSights at FOSTIIMA Business School",
      },
    ],
  },
};

export default function BeyondTheClassroomPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#061a3a]">
        {/* Background Grid Pattern */}
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
          {/* Back link */}
          <Link
            href="/life-at-fostiima"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#b8c5d8] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Life at FOSTIIMA
          </Link>

          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />
            <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#e5b83f]">
              Life at FOSTIIMA
            </span>
          </div>

          {/* Page Heading */}
          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Beyond the Classroom: Our Students in Action
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#b8c5d8] sm:text-lg">
            {studentAchievementsData.leadParagraph}
          </p>
        </div>
      </section>

      {/* =====================================================
          STUDENT ACHIEVEMENTS SECTION (METRICS & GALLERY)
      ===================================================== */}
      <StudentAchievementsSection />

      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Link
            href="/life-at-fostiima"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#c31e3b] transition-colors hover:text-[#061a3a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Life at FOSTIIMA
          </Link>
        </div>
      </section>
    </main>
  );
}

