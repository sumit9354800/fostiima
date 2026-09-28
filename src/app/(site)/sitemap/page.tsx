import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  LifeBuoy,
  Newspaper,
  ShieldCheck,
  Users,
} from "lucide-react";

type SitemapSection = {
  title: string;
  icon: React.ElementType;
  links: {
    label: string;
    href: string;
  }[];
};

const sitemapSections: SitemapSection[] = [
  {
    title: "Main Pages",
    icon: Building2,
    links: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "About Us",
        href: "/about-us",
      },
      {
        label: "FOSTIIMA Strength",
        href: "/fostiima-strength",
      },
      {
        label: "Life at FOSTIIMA",
        href: "/life-at-fostiima",
      },
      {
        label: "Blog",
        href: "/blog",
      },
      {
        label: "Contact Us",
        href: "/contact-us",
      },
    ],
  },

  {
    title: "Academics",
    icon: BookOpen,
    links: [
      {
        label: "Academics",
        href: "/academics",
      },
      {
        label: "Faculties",
        href: "/faculties",
      },
    ],
  },

  {
    title: "Admissions",
    icon: GraduationCap,
    links: [
      {
        label: "How to Apply",
        href: "/how-to-apply",
      },
      {
        label: "Fee Structure",
        href: "/fee-structure",
      },
    ],
  },

  {
    title: "Placements",
    icon: BriefcaseBusiness,
    links: [
      {
        label: "Placement",
        href: "/placement",
      },
      {
        label: "Summer Internship",
        href: "/placement/summer-internship",
      },
      {
        label: "Final Placements",
        href: "/placement/final-placements",
      },
    ],
  },

  {
    title: "Conclave & Conferences",
    icon: Users,
    links: [
      {
        label: "Conclave / Conference",
        href: "/conclave-conference",
      },
      {
        label: "Margdarshak",
        href: "/margdarshak",
      },
    ],
  },

  {
    title: "Information & Resources",
    icon: Newspaper,
    links: [
      {
        label: "Awards & Accreditations",
        href: "/awards-accreditation",
      },
      {
        label: "Careers",
        href: "/careers",
      },
      {
        label: "NIRF",
        href: "/nirf",
      },
      {
        label: "Grievance & Helpline",
        href: "/grievance-helpline",
      },
      {
        label: "Balance Sheet",
        href: "/balance-sheet",
      },
      {
        label: "HR Policy 2024-25",
        href: "/hr-policy",
      },
    ],
  },

  {
    title: "Policies",
    icon: ShieldCheck,
    links: [
      {
        label: "Refund Policy & Cancellation Policy",
        href: "/refund-policy",
      },
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        label: "Terms & Conditions",
        href: "/terms-and-conditions",
      },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071a38] text-white">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#c31e3b]/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-40 left-[15%] h-[360px] w-[360px] rounded-full bg-[#123b79]/50 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#f4c542]" />

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f4c542]">
              FOSTIIMA Business School
            </p>
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Sitemap
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Explore the complete website structure and quickly navigate to the
            different sections of FOSTIIMA Business School.
          </p>
        </div>
      </section>

      {/* Sitemap */}
      <section className="bg-[#f8fafc] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sitemapSections.map((section) => {
              const Icon = section.icon;

              return (
                <div
                  key={section.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
                >
                  {/* Section heading */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#c31e3b]/10 text-[#c31e3b]">
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    <h2 className="text-lg font-bold text-[#061a3a]">
                      {section.title}
                    </h2>
                  </div>

                  {/* Gold line */}
                  <div className="mt-5 h-1 w-10 bg-[#e5b83f]" />

                  {/* Links */}
                  <div className="mt-5 space-y-1">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-[#f8fafc] hover:text-[#c31e3b]"
                      >
                        <span>{link.label}</span>

                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c31e3b]"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <p className="text-sm leading-6 text-slate-500">
            Looking for something specific? Explore the website or get in touch
            with FOSTIIMA Business School.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 bg-[#c31e3b] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#a81731]"
            >
              Back to Home
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact-us"
              className="inline-flex h-11 items-center justify-center gap-2 border border-[#061a3a]/15 bg-white px-6 text-sm font-semibold text-[#061a3a] transition-colors hover:border-[#c31e3b] hover:text-[#c31e3b]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}