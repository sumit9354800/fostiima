import { cloudinaryAsset } from "@/lib/cloudinary";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";

type ProgramData = {
  title: string;
  category: string;
  duration: string;
  description: string;

  // Optional hero background image
  heroImage?: string;

  specialization?: {
    title: string;
    subjects: string[];
  };

  semesters: {
    title: string;
    subjects: string[];
  }[];
};

const programs: Record<string, ProgramData> = {
  pgdm: {
    title: "PGDM",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    description:
      "A comprehensive two-year full-time management program designed to build strong business knowledge, analytical capabilities, leadership skills and industry readiness.",
    heroImage: cloudinaryAsset("/programs/pgdm.png"),
    semesters: [
      {
        title: "Semester I",
        subjects: [
          "Accounting For Managers & Financial Reporting",
          "Aptitude Building Course-5",
          "Computer Applications in Management",
          "Contemporary Business Review - I",
          "Decision Science",
          "Effective Business Communication",
          "Legal Aspects of Business",
          "Managing Self, People & Organization - I",
          "Human Capital Management - I",
          "Marketing Management - I",
          "Managerial Economics",
          "Attitude Building & Personality Development - I",
          "Business Statistics",
          "Technology & Operations Management",
          "Written Analysis of Cases",
          "Quantitative & Logical Skills",
          "Basic & Advanced Excel",
          "Digital Marketing-I",
        ],
      },

      {
        title: "Semester II",
        subjects: [
          "Marketing Management - II",
          "Sales & Distribution Management",
          "International Business",
          "Managing Self, People & Organization - II",
          "Human Capital Management - II",
          "Supply Chain Management",
          "Managerial Accounting",
          "Financial Management",
          "Aptitude Building Course - II",
          "Strategic Management",
          "Marketing Research",
          "Attitude Building & Personality Development - II",
          "Financial Services & Insurance",
          "High Impact Soft Skills - I",
          "Contemporary Business Review - II",
          "Tableau and Power BI",
          "Managing E-Business",
          "Digital Marketing - I",
          "Business Analytics",
          "Legal Aspects of Business - II",
        ],
      },

      {
        title: "Semester III",
        subjects: [
          "Perspectives in Banking",
          "Aptitude Building Course-III",
          "Digital Marketing - III",
          "Management Information System",
          "High Impact Soft Skills - II",
          "The Entrepreneur Manager",
          "Contemporary Business Review - III",
          "Business Simulation Models",
          "Transforming Business Through Emerging Technologies",
        ],
      },

      {
        title: "Semester IV",
        subjects: [
          "Management of Technology, Innovation & Change",
          "Strategic Financial Management",
          "Strategic Marketing Management",
          "Strategic International Business",
          "Corporate Social Responsibility & Business Ethics",
          "Strategic Human Capital Management",
          "Strategic Analytics & Operations Management",
        ],
      },
    ],
  },

  marketing: {
    title: "PGDM (Marketing)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    description:
      "A management program focused on developing expertise in marketing, customer understanding, brand management, digital marketing and strategic decision-making.",
    heroImage: cloudinaryAsset("/programs/marketing.png"),

    specialization: {
      title: "Marketing Specialization",
      subjects: [
        "Integrated Marketing Communication",
        "Product & Brand Management",
        "Business Marketing & Sales",
        "Rural Marketing",
        "Customer Relationship Management",
        "Neuroscience & Consumer Behavior",
        "Retail Marketing",
        "Services Marketing",
        "Marketing Analytics",
        "International Marketing",
      ],
    },

    semesters: [],
  },

  finance: {
    title: "PGDM (Finance)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    description:
      "A management program designed to develop financial management, analytical and strategic decision-making capabilities for modern business environments.",
    heroImage: cloudinaryAsset("/programs/Finance.png"),
    specialization: {
      title: "Finance Specialization",
      subjects: [
        "International Financial Management",
        "Project Financing & Management",
        "Security Analysis & Portfolio Management",
        "Future, Options & Derivatives",
        "Mergers, Acquisitions & Corporate Restructuring",
        "Financial Modelling & Analytics",
      ],
    },

    semesters: [],
  },

  hr: {
    title: "PGDM (HR)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    description:
      "A management program focused on human capital, leadership, employee relations, organizational development and modern HR practices.",
    heroImage: cloudinaryAsset("/programs/hr.png"),

    specialization: {
      title: "HR - Specialization",
      subjects: [
        "Talent Acquisition",
        "Learning & Development",
        "Performance Management",
        "Compensation Management",
        "Managerial Interpersonal Skill & Group Dynamics",
        "Leadership Power & Control",
        "HR Analytics",
        "Manpower Development in Technological Change",
        "Diversity & Inclusion",
        "Employee Relations & Organisational Relations",
      ],
    },

    semesters: [],
  },

  businessAnalytics: {
    title: "PGDM (Business Analytics)",
    category: "AICTE Approved",
    duration: "2 Year Full-Time Program",
    description:
      "A management program focused on developing business analytics, data-driven decision-making, analytical thinking and modern business management capabilities.",
    heroImage: cloudinaryAsset("/programs/business-analytics.png"),

    specialization: {
      title: "International Business - Specialization",
      subjects: [
        "Foreign Trade and Policy",
        "Exim Financing, Documentation and Forex Management",
        "International Logistics Management",
        "Perspective in International Business",
        "Global Services and Supply Management",
      ],
    },

    semesters: [],
  },

internationalBusiness: {
  title: "International Business - Specialization",
  category: "Specialization",
  duration: "PGDM Specialization",
  description:
    "A specialized area of study focused on international trade, global business operations, foreign exchange, logistics and international marketing.",
  heroImage: cloudinaryAsset("/programs/international-business.png"),

  specialization: {
    title: "International Business - Specialization",
    subjects: [
      "Exim Financing, Documentation & Forex Management",
      "Foreign Trade & Policy",
      "Global Services & Supply Management",
      "International Logistics Management",
      "International Marketing",
      "Perspectives in International Business",
    ],
  },

  semesters: [],
},

aiAnalyticsOperations: {
  title: "AI, Analytics & Operations - Specialization",
  category: "Specialization",
  duration: "PGDM Specialization",
  description:
    "A specialized area focused on analytics, artificial intelligence, operations management, predictive insights and data-driven business decision-making.",
  heroImage: cloudinaryAsset("/programs/ai-analytics-operations.png"),

  specialization: {
    title: "AI, Analytics & Operations - Specialization",
    subjects: [
      "TQM, Six Sigma & BPR",
      "Predictive Analytics",
      "Big Data Analytics",
      "Enterprise Resource Planning",
      "Logistics Management",
      "Service Operations Management",
      "Introduction to Artificial Intelligence",
      "AI in Business and Decision Making",
      "Ethics and Governance in AI",
      "Lean Manufacturing, Strategic Sourcing and E Business Operations",
    ],
  },

  semesters: [],
},
};

export default async function ProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{
    program?: string;
  }>;
}) {
  const params = await searchParams;

  const programKey = params.program || "pgdm";

  const program = programs[programKey] || programs.pgdm;

  return (
    <main className="min-h-screen bg-white">
      <section
        className="relative overflow-hidden bg-[#061a3a]"
        style={
          program.heroImage
            ? {
                backgroundImage: `url("${program.heroImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {/* Dark overlay — only when image exists */}
        {program.heroImage && (
          <div className="pointer-events-none absolute inset-0 bg-[#061a3a]/70" />
        )}

        {/* Background Grid — only when image does NOT exist */}
        {!program.heroImage && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.75) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />
        )}

        {/* Red Glow — only when image does NOT exist */}
        {!program.heroImage && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#c31e3b]/10 blur-[120px]"
          />
        )}

        {/* Blue Glow — only when image does NOT exist */}
        {!program.heroImage && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-[#183f78]/20 blur-[100px]"
          />
        )}

        {/* =====================================================
      HERO CONTENT — EXISTING TEXTS
  ====================================================== */}
        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          {/* Back Link */}
          <Link
            href="/programs"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#b8c5d8] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Programs
          </Link>

          {/* Eyebrow / Category */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e5b83f]" />

            <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#e5b83f]">
              {program.category}
            </span>
          </div>

          {/* Program Title */}
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {program.title}
          </h1>

          {/* Duration */}
          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#b8c5d8]">
            <CalendarDays className="h-4 w-4 text-[#e5b83f]" />
            <span>{program.duration}</span>
          </div>

          {/* Description */}
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#d1d9e6] sm:text-lg">
            {program.description}
          </p>

          {/* Accent Line */}
          <div className="mt-10 h-px w-full max-w-4xl bg-[#1d3559]" />
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <section className="bg-[#f8faff] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* =================================================
              OVERVIEW
          ================================================= */}
          <div className="max-w-4xl">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#d61f3c]
                sm:text-sm
              "
            >
              Program Overview
            </p>

            <h2
              className="
                mt-3
                font-serif
                text-3xl
                font-bold
                leading-tight
                text-[#061b3a]
                sm:text-4xl
              "
            >
              Build Your Future with{" "}
              <span className="text-[#d61f3c]">{program.title}</span>
            </h2>

            <p
              className="
                mt-5
                text-base
                leading-8
                text-slate-600
                sm:text-lg
              "
            >
              {program.description}
            </p>
          </div>

          {/* =================================================
              SPECIALIZATION
          ================================================= */}
          {program.specialization && (
            <div className="mt-16">
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#d61f3c]
                  sm:text-sm
                "
              >
                Specialization
              </p>

              <h2
                className="
                  mt-3
                  font-serif
                  text-3xl
                  font-bold
                  text-[#061b3a]
                  sm:text-4xl
                "
              >
                {program.specialization.title}
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {program.specialization.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="
                        group
                        border
                        border-slate-200
                        bg-white
                        p-5
                        shadow-[0_8px_25px_rgba(6,27,58,0.05)]
                        transition
                        duration-300
                        hover:-translate-y-1
                        hover:border-[#d61f3c]/30
                        hover:shadow-[0_12px_30px_rgba(6,27,58,0.09)]
                      "
                  >
                    <div className="flex gap-3">
                      <span
                        className="
                            mt-1
                            text-[#d61f3c]
                            transition
                            group-hover:translate-x-1
                          "
                      >
                        ➤
                      </span>

                      <p className="font-medium leading-6 text-slate-700">
                        {subject}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================
              CURRICULUM
          ================================================= */}
          {program.semesters.length > 0 && (
            <div className="mt-20">
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#d61f3c]
                  sm:text-sm
                "
              >
                Curriculum
              </p>

              <h2
                className="
                  mt-3
                  font-serif
                  text-3xl
                  font-bold
                  text-[#061b3a]
                  sm:text-4xl
                "
              >
                Program Curriculum
              </h2>

              <div className="mt-9 grid gap-6 lg:grid-cols-2">
                {program.semesters.map((semester) => (
                  <div
                    key={semester.title}
                    className="
                      border
                      border-slate-200
                      bg-white
                      p-6
                      shadow-[0_8px_25px_rgba(6,27,58,0.05)]
                      sm:p-7
                    "
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-1 bg-[#d61f3c]" />

                      <h3
                        className="
                          font-serif
                          text-2xl
                          font-bold
                          text-[#061b3a]
                        "
                      >
                        {semester.title}
                      </h3>
                    </div>

                    <div className="mt-6 space-y-3">
                      {semester.subjects.map((subject, index) => (
                        <div key={index} className="flex gap-3">
                          <span className="mt-1 text-[#d61f3c]">➤</span>

                          <p
                            className="
                                text-sm
                                leading-6
                                text-slate-600
                                sm:text-base
                              "
                          >
                            {subject}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================
              BOTTOM CTA
          ================================================= */}
          <div
            className="
              relative
              mt-20
              overflow-hidden
              bg-[#061b3a]
              p-8
              text-center
              sm:p-12
              lg:p-16
            "
          >
            {/* Grid */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.06]
                [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
                [background-size:42px_42px]
              "
            />

            <div className="relative">
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#f5b82e]
                "
              >
                Start Your Journey
              </p>

              <h2
                className="
                  mt-3
                  font-serif
                  text-3xl
                  font-bold
                  text-white
                  sm:text-4xl
                "
              >
                Interested in{" "}
                <span className="text-[#d61f3c]">{program.title}</span>?
              </h2>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/65
                  sm:text-base
                "
              >
                Explore the admission process and take the next step towards
                your management education.
              </p>

              <Link
                href="/contact-us"
                className="
                  mt-8
                  inline-flex
                  items-center
                  bg-[#d61f3c]
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                  transition
                  hover:bg-[#b91934]
                "
              >
                Explore Admissions
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
