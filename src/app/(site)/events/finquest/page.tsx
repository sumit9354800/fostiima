import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  HelpCircle,
  Clock,
  Globe2,
  Users,
  Compass,
  Sparkles,
  Award,
} from "lucide-react";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FinQuest: Annual Finance Quiz | FOSTIIMA Business School",
  description:
    "FinQuest serves as the benchmark intellectual assessment for finance enthusiasts at FOSTIIMA Business School, testing theoretical foundations, market intelligence, macroeconomic acumen, and corporate awareness.",
  alternates: {
    canonical: getCanonicalUrl("/events/finquest"),
  },
  openGraph: {
    type: "website",
    url: getCanonicalUrl("/events/finquest"),
    title: "FinQuest: Annual Finance Quiz | FOSTIIMA Business School",
    description:
      "FinQuest serves as the benchmark intellectual assessment for finance enthusiasts at FOSTIIMA Business School, testing theoretical foundations, market intelligence, macroeconomic acumen, and corporate awareness.",
    siteName: "FOSTIIMA Business School",
    images: [
      {
        url: "/events/finquest/finquest_image_1.webp",
        width: 877,
        height: 561,
        alt: "FinQuest Annual Finance Quiz at FOSTIIMA Business School",
      },
    ],
  },
};

const stages = [
  {
    step: "Stage 01",
    title: "Preliminary Screening",
    subtitle: "Objective Aptitude & Domain Assessment",
    description:
      "A rigorous written aptitude and domain evaluation testing conceptual knowledge of macroeconomics, financial accounting, and capital markets to filter the top-performing teams for the live grand finale.",
    icon: HelpCircle,
    color: "from-blue-600 to-indigo-700",
  },
  {
    step: "Stage 02 — Segment A",
    title: "Voice & Image Identification",
    subtitle: "Visual & Auditory Market Recognition",
    description:
      "Uncovering market icons, central bankers, institutional titans, corporate landmarks, and historic financial events from audio snippets and visual clues.",
    icon: Sparkles,
    color: "from-amber-500 to-yellow-600",
  },
  {
    step: "Stage 02 — Segment B",
    title: "Business & Economic Trivia",
    subtitle: "In-Depth Policy & Corporate Intelligence",
    description:
      "Deep dives into fiscal policy, market history, cross-border M&A transactions, central bank interventions, and regulatory frameworks shaping modern business.",
    icon: Globe2,
    color: "from-rose-600 to-red-700",
  },
  {
    step: "Stage 02 — Segment C",
    title: "Rapid-Fire Round",
    subtitle: "High-Velocity Recall Under Pressure",
    description:
      "A high-velocity testing round emphasizing lightning-fast recall and precision under strict time limits, testing speed-accuracy trade-offs to decide the champion.",
    icon: Clock,
    color: "from-purple-600 to-indigo-800",
  },
];

const competencies = [
  {
    title: "Macroeconomic Acumen",
    description:
      "Understanding monetary policies, inflation indicators, interest rate cycles, and global trade dynamics.",
    icon: Globe2,
  },
  {
    title: "Speed-Accuracy Trade-Off",
    description:
      "Balancing rapid cognitive processing with disciplined precision under tight countdown constraints.",
    icon: Clock,
  },
  {
    title: "Collective Team Problem-Solving",
    description:
      "Synergizing diverse student skill sets to dissect multifaceted business riddles cooperatively.",
    icon: Users,
  },
  {
    title: "Continuous Market Awareness",
    description:
      "Staying continually updated on international financial headlines, regulatory shifts, and valuation trends.",
    icon: Compass,
  },
];

const finquestImages = [
  {
    src: "/events/finquest/finquest_image_1.webp",
    alt: "FinQuest participants answering questions during the objective-based preliminary screening",
    title: "Preliminary Screening Round",
    tag: "Aptitude & Domain Testing",
  },
  {
    src: "/events/finquest/finquest_image_2.webp",
    alt: "Finalist student teams competing on stage in the multi-stage FinQuest grand finale",
    title: "Live Finale Showdown",
    tag: "Stage Competition",
  },
  {
    src: "/events/finquest/finquest_image_3.webp",
    alt: "Audience and contestants actively engaged in the Voice and Image Identification round",
    title: "Visual & Audio Identification",
    tag: "Market Icons & Landmarks",
  },
  {
    src: "/events/finquest/finquest_image_4.webp",
    alt: "Rapid-Fire round testing accuracy and speed during the FinQuest annual finance quiz",
    title: "Rapid-Fire Round",
    tag: "Speed & Accuracy Challenge",
  },
];

export default function FinquestEventPage() {
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
              Finance Committee Annual Competition
            </span>
          </div>

          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            FinQuest: Annual Finance Quiz
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#cbd5e1] sm:text-lg">
            FinQuest serves as the benchmark intellectual assessment for finance
            enthusiasts, testing theoretical foundations, current market
            intelligence, and executive awareness. Organized every year by the
            Finance Committee of FOSTIIMA Business School, it creates an energetic,
            competitive learning environment where students showcase mastery
            across corporate finance, macroeconomics, and world business history.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[#e5b83f] backdrop-blur-sm">
              <Brain className="h-4 w-4" />
              Intellectual Benchmark
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-white/90 backdrop-blur-sm">
              <Clock className="h-4 w-4 text-[#c31e3b]" />
              Multi-Stage Live Showdown
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-white/90 backdrop-blur-sm">
              <Award className="h-4 w-4 text-[#e5b83f]" />
              Executive Market Awareness
            </span>
          </div>
        </div>
      </section>

      {/* Structure & Stages Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#c31e3b]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
                Competition Format
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#061a3a] sm:text-4xl">
              Structure & Stages
            </h2>
            <p className="mt-3 text-base text-[#64748b]">
              FinQuest is engineered across progressive elimination phases to
              challenge every dimension of financial acumen.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.title}
                  className="flex flex-col justify-between rounded-2xl border border-[#dbe3ee] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    <span className="inline-block rounded-md bg-[#061a3a] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                      {stage.step}
                    </span>
                    <div className="mt-4 mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#c31e3b]/10 text-[#c31e3b]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#061a3a]">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#c31e3b]">
                      {stage.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#64748b]">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Required 2x2 Image Grid Section */}
      <section className="bg-white py-16 sm:py-20 lg:py-24 border-t border-[#e2e8f0]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c31e3b]">
                Stage Highlights
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#061a3a] sm:text-3xl">
                FinQuest Event Gallery
              </h2>
            </div>
          </div>

          {/* 2x2 Responsive Grid as strictly required */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {finquestImages.map((image, index) => (
              <div
                key={image.src}
                className="group overflow-hidden rounded-2xl border border-[#dbe3ee] bg-[#f8fafc] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[#061a3a]/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-bold text-[#061a3a] backdrop-blur-sm shadow-sm">
                    {image.tag}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-bold text-[#061a3a]">
                    {image.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#64748b]">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Competencies Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-t border-[#e2e8f0]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c31e3b]">
              Academic Impact
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#061a3a] sm:text-4xl">
              Core Competencies Promoted
            </h2>
            <p className="mt-3 text-base text-[#64748b]">
              FinQuest encourages competitive learning, teamwork, and quick
              decision-making while making finance education collaborative and
              dynamic.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {competencies.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#dbe3ee] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/30 hover:shadow-lg"
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

          <div className="mt-14 text-center">
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

