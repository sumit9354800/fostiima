"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Phone,
  Users,
  Trophy,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";
import Link from "next/link";

export default function AGLandingPage() {
  const [source, setSource] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSource(params.get("source") || "");
  }, []);

  const scrollToForm = () => {
    document
      .getElementById("application-form")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* =========================================
          TOP BAR
      ========================================== */}
      <div className="bg-[#071d3b] px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        Admissions Open — PGDM Programme
      </div>

      {/* =========================================
          NAVBAR
      ========================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <div className="text-xl font-black tracking-tight text-[#123b79]">
              FOSTIIMA
            </div>

            <div className="ml-2 hidden border-l border-slate-300 pl-2 text-[10px] font-semibold leading-tight text-slate-500 sm:block">
              BUSINESS
              <br />
              SCHOOL
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#about"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#c31e3b]"
            >
              About
            </a>

            <a
              href="#programme"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#c31e3b]"
            >
              Programme
            </a>

            <a
              href="#placements"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#c31e3b]"
            >
              Placements
            </a>

            <a
              href="#why-fostiima"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#c31e3b]"
            >
              Why FOSTIIMA
            </a>
          </nav>

          <button
            type="button"
            onClick={scrollToForm}
            className="rounded-lg bg-[#c31e3b] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#a91731] sm:px-5"
          >
            Apply Now
          </button>
        </div>
      </header>

      {/* =========================================
          HERO
      ========================================== */}
      <section className="relative overflow-hidden bg-[#071d3b]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(195,30,59,0.25),transparent_35%)]" />

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          {/* LEFT */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white">
              <GraduationCap size={15} />
              Admissions Open
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build Your Future with
              <span className="block text-[#e9c94b]">
                FOSTIIMA Business School
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Develop business knowledge, leadership capabilities and
              industry-ready skills through a career-focused management
              education experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c31e3b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a91731]"
              >
                Apply Now
                <ArrowRight size={17} />
              </button>

              <a
                href="#programme"
                className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore Programme
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
              <HeroStat
                icon={GraduationCap}
                text="Industry Focused"
              />

              <HeroStat
                icon={Users}
                text="Expert Faculty"
              />

              <HeroStat
                icon={Trophy}
                text="Career Driven"
              />

              <HeroStat
                icon={BriefcaseBusiness}
                text="Placement Focus"
              />
            </div>
          </div>

          {/* =========================================
              APPLICATION FORM
          ========================================== */}
          <div
            id="application-form"
            className="scroll-mt-24 rounded-2xl bg-white p-5 shadow-[0_25px_70px_rgba(0,0,0,0.25)] sm:p-7"
          >
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c31e3b]">
                Enquire Now
              </p>

              <h2 className="mt-1 text-2xl font-black text-[#123b79]">
                Start Your Application
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill in your details and our admissions team will get in touch
                with you.
              </p>
            </div>

            <ApplyFormWidget />
          </div>
        </div>
      </section>

      {/* =========================================
          ABOUT
      ========================================== */}
      <section
        id="about"
        className="bg-white py-16 sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
              About FOSTIIMA
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#123b79] sm:text-4xl">
              Transforming Management Education for Tomorrow&apos;s Leaders
            </h2>
          </div>

          <div className="space-y-5 text-[15px] leading-7 text-slate-600">
            <p>
              FOSTIIMA Business School focuses on developing management
              professionals with strong business fundamentals, practical
              exposure and the ability to adapt to changing industry
              requirements.
            </p>

            <p>
              The learning experience combines academic understanding,
              practical business perspectives, professional development and
              opportunities to engage with the corporate world.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          WHY FOSTIIMA
      ========================================== */}
      <section
        id="why-fostiima"
        className="bg-slate-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
              Why FOSTIIMA
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#123b79] sm:text-4xl">
              A Business Education Built Around Your Career
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={GraduationCap}
              title="Industry-Oriented Learning"
              description="Learn management concepts through practical and business-focused learning experiences."
            />

            <FeatureCard
              icon={Users}
              title="Experienced Faculty"
              description="Learn from faculty members bringing academic and professional perspectives into the classroom."
            />

            <FeatureCard
              icon={BriefcaseBusiness}
              title="Corporate Exposure"
              description="Build an understanding of real-world business environments and professional expectations."
            />

            <FeatureCard
              icon={Trophy}
              title="Career Development"
              description="Develop communication, leadership and professional skills alongside academic knowledge."
            />

            <FeatureCard
              icon={Building2}
              title="Business Environment"
              description="Experience a learning environment designed around management and professional development."
            />

            <FeatureCard
              icon={CheckCircle2}
              title="Holistic Development"
              description="Focus on knowledge, skills, confidence and professional readiness."
            />
          </div>
        </div>
      </section>

      {/* =========================================
          PROGRAMME
      ========================================== */}
      <section
        id="programme"
        className="bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
                Programme
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#123b79] sm:text-4xl">
                PGDM at FOSTIIMA
              </h2>

              <p className="mt-5 text-[15px] leading-7 text-slate-600">
                A comprehensive management programme designed to develop
                business understanding, analytical thinking, leadership
                capabilities and professional skills.
              </p>

              <button
                type="button"
                onClick={scrollToForm}
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#123b79] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0b2b5d]"
              >
                Enquire About PGDM
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Business Fundamentals",
                "Leadership Development",
                "Analytical & Decision-Making Skills",
                "Marketing & Finance Knowledge",
                "Human Resource Management",
                "Professional Communication",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#fbfcff] p-5"
                >
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#c31e3b]"
                    size={19}
                  />

                  <span className="text-sm font-semibold leading-6 text-[#123b79]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PLACEMENTS
      ========================================== */}
      <section
        id="placements"
        className="bg-[#071d3b] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 text-white sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e9c94b]">
                Career & Placements
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Prepare for the Corporate World
              </h2>

              <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-300">
                Build the professional skills and business understanding needed
                to navigate today&apos;s competitive corporate environment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DarkStat
                title="Corporate"
                subtitle="Exposure"
              />

              <DarkStat
                title="Career"
                subtitle="Development"
              />

              <DarkStat
                title="Industry"
                subtitle="Interaction"
              />

              <DarkStat
                title="Professional"
                subtitle="Skills"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================== */}
      <section className="bg-[#c31e3b] py-14">
        <div className="mx-auto max-w-4xl px-4 text-center text-white sm:px-6">
          <h2 className="text-3xl font-black sm:text-4xl">
            Take the Next Step Towards Your Management Career
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
            Connect with FOSTIIMA Business School and explore your
            opportunities in management education.
          </p>

          <button
            type="button"
            onClick={scrollToForm}
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-black text-[#123b79] transition hover:bg-slate-100"
          >
            Apply Now
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* =========================================
          FOOTER
      ========================================== */}
      <footer className="bg-[#04152d] py-8 text-center text-sm text-slate-400">
        <div className="mx-auto max-w-7xl px-4">
          <p className="font-bold text-white">
            FOSTIIMA Business School
          </p>

          <p className="mt-2">
            © {new Date().getFullYear()} FOSTIIMA Business School. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* =========================================
          MOBILE CALL BUTTON
      ========================================== */}
      <a
        href="tel:+917678389436"
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#c31e3b] text-white shadow-xl md:hidden"
        aria-label="Call FOSTIIMA"
      >
        <Phone size={20} />
      </a>
    </main>
  );
}

/* =========================================
   EXTRAaEDGE FORM WIDGET
========================================= */

function ApplyFormWidget() {
  useEffect(() => {
    const WIDGET_SCRIPT =
      "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-7/widget.js";

    const initializeWidget = () => {
      window.dispatchEvent(new Event("DOMContentLoaded"));
    };

    const existingScript = document.querySelector(
      `script[src="${WIDGET_SCRIPT}"]`,
    );

    if (existingScript) {
      initializeWidget();
      return;
    }

    const script = document.createElement("script");

    script.src = WIDGET_SCRIPT;
    script.type = "text/javascript";
    script.async = true;

    script.onload = initializeWidget;

    script.onerror = () => {
      console.error(
        "Failed to load FOSTIIMA application form widget.",
      );
    };

    document.body.appendChild(script);

    return () => {
      // Keep the widget script loaded.
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /*
         * ========================================
         * EXTRAaEDGE - CLEAN / NORMAL FORM
         * ========================================
         */

        #ee-form-7 {
          width: 100% !important;
          min-height: 0 !important;
          height: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          background: transparent !important;
        }

        /*
         * Remove yellow widget container
         */
        #ee-form-7 > div {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          background: #ffffff !important;
          overflow: hidden !important;
        }

        /*
         * Nested widget containers
         */
        #ee-form-7 div {
          background-color: transparent;
        }

        /*
         * Main form backgrounds should stay white
         */
        #ee-form-7 form {
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
          border: 0 !important;
          box-shadow: none !important;
        }

        /*
         * Inputs
         */
        #ee-form-7 input,
        #ee-form-7 select,
        #ee-form-7 textarea {
          box-sizing: border-box !important;
          width: 100% !important;
          background: #ffffff !important;
        }

        /*
         * Captcha
         */
        #ee-form-7 img {
          max-width: 100% !important;
        }

        /*
         * Remove unnecessary iframe styling if widget uses iframe
         */
        #ee-form-7 iframe {
          display: block !important;
          width: 100% !important;
          border: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
        }
      `}</style>

      <div
        id="ee-form-7"
        className="w-full"
      />
    </>
  );
}

/* =========================================
   HERO STAT
========================================= */

function HeroStat({
  icon: Icon,
  text,
}: {
  icon: typeof GraduationCap;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
      <Icon
        size={17}
        className="text-[#e9c94b]"
      />

      <span>{text}</span>
    </div>
  );
}

/* =========================================
   FEATURE CARD
========================================= */

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof GraduationCap;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(18,59,121,0.08)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fff0f3] text-[#c31e3b]">
        <Icon size={20} />
      </div>

      <h3 className="mt-5 text-base font-bold text-[#123b79]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </article>
  );
}

/* =========================================
   DARK STAT
========================================= */

function DarkStat({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <p className="text-xl font-black text-[#e9c94b]">
        {title}
      </p>

      <p className="mt-1 text-sm text-slate-300">
        {subtitle}
      </p>
    </div>
  );
}