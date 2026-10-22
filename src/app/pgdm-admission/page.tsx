
"use client";

import { useState } from "react";
import AdmissionEnquiryForm from "@/components/forms/AdmissionEnquiryForm";
import {
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";

const highlights = [
  "2 Year Full-Time PGDM Program",
  "AICTE Approved",
  "Industry-Aligned Curriculum",
  "Practical & Experiential Learning",
  "Strong Industry Exposure",
  "Leadership & Professional Development",
];

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about-us" },
  { label: "PGDM Program", href: "#programs" },
  { label: "Why FOSTIIMA", href: "#why-fostiima" },
];

export default function PGDMAdmissionPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-white text-[#071a38]">
      {/* STICKY LANDING PAGE NAVBAR */}
      <header className="sticky top-0 z-[100] border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* BRAND LOGO */}
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            aria-label="Go to landing page home"
            className="flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c31e3b]"
          >
            <img
              src="/logo.jpeg"
              alt="FOSTIIMA Business School"
              className="h-10 w-auto object-contain sm:h-12"
            />
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 lg:flex xl:gap-7"
          >
            {navigation.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() =>
                  scrollToSection(item.href.replace("#", ""))
                }
                className="whitespace-nowrap text-sm font-semibold text-[#071a38] transition-colors hover:text-[#c31e3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c31e3b]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <button
            type="button"
            onClick={() => scrollToSection("application-form")}
            className="hidden shrink-0 items-center gap-2 rounded-full bg-[#c31e3b] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#c31e3b]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#a91731] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c31e3b] focus-visible:ring-offset-2 lg:inline-flex"
          >
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* MOBILE CTA + MENU */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => scrollToSection("application-form")}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#c31e3b] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#a91731] sm:text-sm"
            >
              Apply Now
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="pgdm-mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#071a38] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c31e3b]"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {mobileMenuOpen && (
          <nav
            id="pgdm-mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() =>
                    scrollToSection(item.href.replace("#", ""))
                  }
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-semibold text-[#071a38] transition hover:bg-red-50 hover:text-[#c31e3b]"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4" />
                </button>
              ))}

              <button
                type="button"
                onClick={() => scrollToSection("application-form")}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c31e3b] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#a91731]"
              >
                Start Your Application
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="scroll-mt-24 relative overflow-hidden bg-[#071a38]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#071a38] via-[#0b2d5d] to-[#123b79]" />

        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#c31e3b]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          {/* HERO CONTENT */}
          <div className="text-white">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f4c542] sm:text-sm">
              <GraduationCap className="h-4 w-4" />
              FOSTIIMA Business School
            </p>

            <h1 className="max-w-3xl font-serif text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              PGDM Admissions
              <span className="mt-2 block text-[#e62b4d]">
                Build Your Future
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Join FOSTIIMA Business School&apos;s industry-aligned two-year
              full-time PGDM program designed to develop business knowledge,
              practical skills, analytical thinking and leadership capabilities.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection("application-form")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c31e3b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#a91731]"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("programs")}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore PGDM
              </button>
            </div>

            {/* QUICK STATS */}
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-5 sm:grid-cols-4">
              <div className="border-l border-white/20 pl-3">
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-white/60">Years</p>
              </div>

              <div className="border-l border-white/20 pl-3">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-white/60">Industry Focus</p>
              </div>

              <div className="border-l border-white/20 pl-3">
                <p className="text-2xl font-bold">AICTE</p>
                <p className="text-xs text-white/60">Approved</p>
              </div>

              <div className="border-l border-white/20 pl-3">
                <p className="text-2xl font-bold">PGDM</p>
                <p className="text-xs text-white/60">Full-Time</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80">
                Industry-Aligned Learning
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80">
                Leadership Development
              </span>
            </div>
          </div>

          {/* ADMISSION FORM */}
          <div
            id="application-form"
            className="scroll-mt-28 rounded-2xl"
          >
            <AdmissionEnquiryForm />
          </div>
        </div>
      </section>

      {/* WHY FOSTIIMA */}
      <section
        id="why-fostiima"
        className="scroll-mt-24 bg-[#f8faff] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              Why FOSTIIMA
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-[#123b79] sm:text-4xl">
              Learn. Lead. Transform.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Develop the knowledge, skills and mindset required to succeed in a
              rapidly changing business environment.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c31e3b]/10 text-sm font-bold text-[#c31e3b]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-5 text-base font-bold text-[#123b79]">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / PROGRAM OVERVIEW */}
      <section
        id="about-us"
        className="scroll-mt-24 bg-white py-16 sm:py-20"
      >
        <div
          id="programs"
          className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:px-8"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              PGDM Program
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#123b79] sm:text-4xl">
              A Management Program Designed for Tomorrow&apos;s Business
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              FOSTIIMA&apos;s PGDM Program combines management fundamentals,
              analytical capabilities, practical exposure and professional
              development to prepare students for modern business challenges.
            </p>

            <button
              type="button"
              onClick={() => scrollToSection("application-form")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c31e3b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a91731]"
            >
              Start Your Application
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#071a38] p-6 text-white">
              <BookOpen className="mb-4 h-6 w-6 text-white/70" />
              <p className="text-3xl font-bold">2</p>
              <p className="mt-2 text-sm text-white/65">
                Year Full-Time Program
              </p>
            </div>

            <div className="rounded-2xl bg-[#c31e3b] p-6 text-white">
              <ShieldCheck className="mb-4 h-6 w-6 text-white/80" />
              <p className="text-3xl font-bold">AICTE</p>
              <p className="mt-2 text-sm text-white/75">Approved Program</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#f8faff] p-6">
              <GraduationCap className="mb-4 h-6 w-6 text-[#123b79]" />
              <p className="text-3xl font-bold text-[#123b79]">360°</p>
              <p className="mt-2 text-sm text-slate-500">
                Professional Development
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#f8faff] p-6">
              <BriefcaseBusiness className="mb-4 h-6 w-6 text-[#123b79]" />
              <p className="text-3xl font-bold text-[#123b79]">PGDM</p>
              <p className="mt-2 text-sm text-slate-500">
                Industry-Aligned Learning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#071a38] py-14">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4c542]">
            Your Next Chapter Starts Here
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            Ready to Begin Your Management Journey?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
            Take the next step towards building your career with the FOSTIIMA
            PGDM Program.
          </p>

          <button
            type="button"
            onClick={() => scrollToSection("application-form")}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c31e3b] px-8 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#a91731]"
          >
            Apply for PGDM
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#041126] py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} FOSTIIMA Business School. All Rights
        Reserved.
      </footer>
    </main>
  );
}
