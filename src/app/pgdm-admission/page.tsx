import Script from "next/script";
import Link from "next/link";
import ApplyForm from "@/components/admissions/ApplyForm";

const highlights = [
  "2 Year Full-Time PGDM Program",
  "AICTE Approved",
  "Industry-Aligned Curriculum",
  "Practical & Experiential Learning",
  "Strong Industry Exposure",
  "Leadership & Professional Development",
];

export default function PGDMAdmissionPage() {
  return (
    <main className="min-h-screen bg-white text-[#071a38]">
      {/* =====================================================
          EXTRAaEDGE FORM SCRIPT
      ====================================================== */}

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header className="sticky top-0 z-[100] border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.jpeg"
              alt="FOSTIIMA Business School"
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-[#071a38] transition hover:text-[#c31e3b]"
            >
              Home
            </Link>

            <Link
              href="/about-us"
              className="text-sm font-semibold text-[#071a38] transition hover:text-[#c31e3b]"
            >
              About Us
            </Link>

            <Link
              href="/programs?program=pgdm"
              className="text-sm font-semibold text-[#071a38] transition hover:text-[#c31e3b]"
            >
              PGDM
            </Link>

            <Link
              href="/contact-us"
              className="text-sm font-semibold text-[#071a38] transition hover:text-[#c31e3b]"
            >
              Admissions
            </Link>

            <a
              href="#application-form"
              className="rounded-full bg-[#c31e3b] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#a91731]"
            >
              Apply Now
            </a>
          </nav>

          {/* Mobile CTA */}
          <a
            href="#application-form"
            className="rounded-full bg-[#c31e3b] px-4 py-2 text-xs font-bold text-white md:hidden"
          >
            Apply Now
          </a>
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#071a38]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#071a38] via-[#0b2d5d] to-[#123b79]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          {/* Hero Content */}
          <div className="text-white">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#f4c542] sm:text-sm">
              FOSTIIMA Business School
            </p>

            <h1 className="max-w-3xl font-serif text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              PGDM Admissions
              <span className="block text-[#e62b4d]">Build Your Future</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Join FOSTIIMA Business School&apos;s industry-aligned two-year
              full-time PGDM program designed to develop business knowledge,
              practical skills, analytical thinking and leadership capabilities.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#application-form"
                className="inline-flex items-center justify-center rounded-full bg-[#c31e3b] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#a91731]"
              >
                Apply Now
              </a>

              <Link
                href="/programs?program=pgdm"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore PGDM
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
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
          </div>

          {/* Form Card */}
          <div
            id="application-form"
            className="scroll-mt-28 rounded-2xl bg-white p-5 shadow-[0_25px_80px_rgba(0,0,0,0.25)] sm:p-7"
          >
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
                Admissions Open
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#071a38] sm:text-3xl">
                Apply for PGDM
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill in your details and our admissions team will get in touch
                with you.
              </p>
            </div>

            <ApplyForm />
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY FOSTIIMA
      ====================================================== */}

      <section className="bg-[#f8faff] py-16 sm:py-20">
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
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
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

      {/* =====================================================
          PROGRAM OVERVIEW
      ====================================================== */}

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              PGDM Programme
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#123b79] sm:text-4xl">
              A Management Programme Designed for Tomorrow&apos;s Business
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              FOSTIIMA&apos;s PGDM programme combines management fundamentals,
              analytical capabilities, practical exposure and professional
              development to prepare students for modern business challenges.
            </p>

            <a
              href="#application-form"
              className="mt-7 inline-flex rounded-full bg-[#c31e3b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a91731]"
            >
              Start Your Application
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#071a38] p-6 text-white">
              <p className="text-3xl font-bold">2</p>
              <p className="mt-2 text-sm text-white/65">
                Year Full-Time Programme
              </p>
            </div>

            <div className="rounded-2xl bg-[#c31e3b] p-6 text-white">
              <p className="text-3xl font-bold">AICTE</p>
              <p className="mt-2 text-sm text-white/75">Approved Programme</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#f8faff] p-6">
              <p className="text-3xl font-bold text-[#123b79]">360°</p>
              <p className="mt-2 text-sm text-slate-500">
                Professional Development
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#f8faff] p-6">
              <p className="text-3xl font-bold text-[#123b79]">PGDM</p>
              <p className="mt-2 text-sm text-slate-500">
                Industry-Aligned Learning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-[#071a38] py-14">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Ready to Begin Your Management Journey?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
            Take the next step towards building your career with the FOSTIIMA
            PGDM programme.
          </p>

          <a
            href="#application-form"
            className="mt-7 inline-flex rounded-full bg-[#c31e3b] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#a91731]"
          >
            Apply for PGDM
          </a>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#041126] py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} FOSTIIMA Business School. All Rights
        Reserved.
      </footer>
    </main>
  );
}
