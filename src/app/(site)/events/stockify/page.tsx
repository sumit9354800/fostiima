import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  Cpu,
  BarChart2,
  ShieldCheck,
  Zap,
  Target,
  Users,
  CheckCircle2,
} from "lucide-react";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "StockiFy: Annual Stock Market Simulation | FOSTIIMA Business School",
  description:
    "StockiFy is the Finance Committee's premier trading symposium at FOSTIIMA Business School, delivering hands-on practical exposure to dynamic financial markets through open-outcry ring trading and custom-built simulation software.",
  alternates: {
    canonical: getCanonicalUrl("/events/stockify"),
  },
  openGraph: {
    type: "website",
    url: getCanonicalUrl("/events/stockify"),
    title: "StockiFy: Annual Stock Market Simulation | FOSTIIMA Business School",
    description:
      "StockiFy is the Finance Committee's premier trading symposium at FOSTIIMA Business School, delivering hands-on practical exposure to dynamic financial markets through open-outcry ring trading and custom-built simulation software.",
    siteName: "FOSTIIMA Business School",
    images: [
      {
        url: "/events/stockify/stockify_image_1.webp",
        width: 844,
        height: 558,
        alt: "StockiFy Annual Stock Market Simulation at FOSTIIMA Business School",
      },
    ],
  },
};

const competencies = [
  {
    title: "Real-Time Decision-Making",
    description:
      "Executing high-pressure investment and trading choices under rapid market movements and live order flow.",
    icon: Zap,
  },
  {
    title: "Quantitative Risk Management",
    description:
      "Assessing risk-reward profiles, position sizing, and volatility tolerance to protect portfolio capital.",
    icon: ShieldCheck,
  },
  {
    title: "Tactical Capital Allocation",
    description:
      "Deploying capital strategically across dynamic financial instruments in response to emerging trends.",
    icon: Target,
  },
  {
    title: "Portfolio Balance Strategy",
    description:
      "Maintaining diversification and liquidity discipline across fluctuating equity market cycles.",
    icon: BarChart2,
  },
];

const galleryImages = [
  {
    src: "/events/stockify/stockify_image_1.webp",
    alt: "FOSTIIMA students analyzing live market trends during the StockiFy simulation",
    caption: "Live Trading Analysis & Market Execution",
  },
  {
    src: "/events/stockify/stockify_image_2.webp",
    alt: "Participants experiencing the open-outcry Ring Trading floor environment at StockiFy",
    caption: "Open-Outcry Ring Trading Floor",
  },
  {
    src: "/events/stockify/stockify_image_3.webp",
    alt: "Student trading delegation managing portfolios using FOSTIIMA in-house simulation software",
    caption: "Proprietary Simulation Software in Action",
  },
  {
    src: "/events/stockify/stockify_image_4.webp",
    alt: "Active order matching and strategic negotiations between trading teams at StockiFy",
    caption: "Order Matching & Floor Negotiations",
  },
  {
    src: "/events/stockify/stockify_image_5.webp",
    alt: "Finance Committee members and student participants during the StockiFy symposium",
    caption: "Finance Committee & Participant Symposium",
  },
];

export default function StockifyEventPage() {
  return (
    <article className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#061a3a] text-white">
        {/* Decorative Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Ambient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#c31e3b]/15 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-[#183f78]/25 blur-[90px]"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/life-at-fostiima/cultural-events"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#b8c5d8] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Campus Life & Events
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5b83f] sm:text-sm">
              Finance Committee Flagship Event
            </span>
          </div>

          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            StockiFy: Annual Stock Market Simulation
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#cbd5e1] sm:text-lg">
            StockiFy is the Finance Committee’s premier trading symposium,
            engineered to deliver practical exposure to dynamic financial
            markets. Hosted every January, this annual flagship event offers
            students an immersive platform to apply their knowledge of financial
            markets, instruments, and macro business developments in an exciting,
            competitive atmosphere.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[#e5b83f] backdrop-blur-sm">
              <TrendingUp className="h-4 w-4" />
              Annual Simulation Symposium
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-white/90 backdrop-blur-sm">
              <Cpu className="h-4 w-4 text-[#c31e3b]" />
              In-House Trading Software
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-white/90 backdrop-blur-sm">
              <Users className="h-4 w-4 text-[#e5b83f]" />
              Open-Outcry Ring Trading
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Sections: Alternating Media-Text Layout */}
      <section className="py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {/* Feature 1: Ring Trading Experience */}
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="order-2 lg:order-1">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-8 bg-[#c31e3b]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
                    Trading Floor Atmosphere
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-[#061a3a] sm:text-3xl">
                  Ring Trading Experience
                </h2>
                <p className="mt-4 text-base leading-7 text-[#475569] sm:text-lg">
                  Recreates the high-stakes, fast-paced environment of classic
                  open-outcry trading floors. Participants must navigate rapid
                  order exchanges, test emotional composure, and hone market
                  reflexes under live, fluctuating conditions.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[#334155] sm:text-base">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c31e3b]" />
                    <span>Real-time price discovery and competitive bidding dynamics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c31e3b]" />
                    <span>High-velocity verbal execution and counterparty negotiations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c31e3b]" />
                    <span>Experiential bridge between textbook theory and practical market psychology</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#dbe3ee] bg-slate-100 shadow-lg">
                  <Image
                    src="/events/stockify/stockify_image_2.webp"
                    alt="Participants experiencing open-outcry ring trading at StockiFy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Feature 2: Proprietary Technology */}
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="order-1">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#dbe3ee] bg-slate-100 shadow-lg">
                  <Image
                    src="/events/stockify/stockify_image_3.webp"
                    alt="FOSTIIMA students running proprietary stock simulation software"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              <div className="order-2">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-8 bg-[#c31e3b]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
                    Student Innovation
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-[#061a3a] sm:text-3xl">
                  Proprietary Technology
                </h2>
                <p className="mt-4 text-base leading-7 text-[#475569] sm:text-lg">
                  Powered by custom-built, in-house trading software developed by
                  FOSTIIMA’s own students. The platform simulates realistic
                  brokerage environments with high-frequency order matching,
                  portfolio valuation, and real-time liquidity adjustments.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[#334155] sm:text-base">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c31e3b]" />
                    <span>Instantaneous simulated order matching and position tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c31e3b]" />
                    <span>Real-time Buy, Sell, or Hold decision architecture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c31e3b]" />
                    <span>Dynamic corporate actions, news flashes, and liquidity shocks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies Section */}
      <section className="bg-white py-16 sm:py-20 lg:py-24 border-y border-[#e2e8f0]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c31e3b]">
              Learning Outcomes
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#061a3a] sm:text-4xl">
              Core Competencies Promoted
            </h2>
            <p className="mt-3 text-base text-[#64748b]">
              StockiFy transforms abstract economic concepts into actionable,
              battle-tested skills required in investment banking, equity research,
              and wealth management.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {competencies.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#dbe3ee] bg-[#f8fafc] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/30 hover:bg-white hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#c31e3b]/10 text-[#c31e3b]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#061a3a]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#64748b]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Complete Event Gallery */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c31e3b]">
                Event Gallery
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#061a3a] sm:text-3xl">
                StockiFy in Action
              </h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className="group overflow-hidden rounded-2xl border border-[#dbe3ee] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[#061a3a]/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-[#061a3a]">
                    {image.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/life-at-fostiima/cultural-events"
              className="inline-flex items-center gap-2 rounded-xl bg-[#061a3a] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0b2b58]"
            >
              <ArrowLeft className="h-4 w-4" />
              Explore All FOSTIIMA Events
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

