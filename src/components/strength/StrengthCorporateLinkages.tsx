import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Network,
  Users,
} from "lucide-react";

import { strengthData } from "@/data/strength";

export default function StrengthCorporateLinkages() {
  const corporateSection = strengthData.sections.find(
    (section) => section.id === "corporate-linkages",
  );

  if (!corporateSection) {
    return null;
  }

  const Icon = corporateSection.icon;

  return (
    <section
      id="corporate-linkages"
      className="relative overflow-hidden bg-[#f5f8fc] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#123b79]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          {/* Content */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#c31e3b]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-xs">
                {corporateSection.eyebrow}
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-[#172f59] sm:text-4xl lg:text-[42px]">
              {corporateSection.title}
            </h2>

            <div className="mt-7 space-y-5 text-[15px] leading-7 text-slate-600">
              {corporateSection.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Network Visual */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-[#071a38] p-7 text-white sm:p-8">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#f4c542]">
                  <Icon size={23} aria-hidden="true" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                  Network
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-bold">
                Pan IIT-IIM Alumni Network
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/60">
                Connections with alumni occupying leadership positions across
                prominent Indian and transnational corporations.
              </p>

              <div className="mt-7 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <Network
                    size={18}
                    className="shrink-0 text-[#f4c542]"
                    aria-hidden="true"
                  />

                  <span className="text-sm font-medium text-white/75">
                    Alumni & Industry Network
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <Building2
                    size={18}
                    className="shrink-0 text-[#f4c542]"
                    aria-hidden="true"
                  />

                  <span className="text-sm font-medium text-white/75">
                    Corporate Relationships
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <BriefcaseBusiness
                    size={18}
                    className="shrink-0 text-[#f4c542]"
                    aria-hidden="true"
                  />

                  <span className="text-sm font-medium text-white/75">
                    Campus Placement Support
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <Users
                    size={18}
                    className="shrink-0 text-[#f4c542]"
                    aria-hidden="true"
                  />

                  <span className="text-sm font-medium text-white/75">
                    Industry Interaction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <a
            href="#key-strengths"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#123b79] transition-colors hover:text-[#c31e3b]"
          >
            View Key Strengths

            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}