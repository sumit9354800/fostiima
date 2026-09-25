import {
  CheckCircle2,
  GraduationCap,
  Network,
} from "lucide-react";

import {
  placementDomains,
  placementHighlights,
} from "@/data/placement";

export default function PlacementCorporate() {
  return (
    <section className="bg-[#061a3a] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Corporate Linkages */}

          <div>
            <div className="flex items-center gap-3">
              <Network className="h-5 w-5 text-[#e5b83f]" />

              <span className="text-md font-bold uppercase tracking-[0.2em] text-[#e5b83f]">
                Corporate Linkages
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Connecting Learning
              <span className="block text-[#c31e3b]">
                With Industry
              </span>
            </h2>

            <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

            <p className="mt-6 text-sm leading-7 text-[#b8c5d8] sm:text-base">
              FOSTIIMA has a wide Pan IIT-IIM alumni network,
              with alumni in leadership positions. The placement
              cell is headed by IIMA alumni and supports campus
              placement opportunities.
            </p>

            <div className="mt-7 space-y-3">
              {placementHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#e5b83f]" />

                  <span className="text-sm leading-6 text-[#d6deea]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Domains */}

          <div>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-[#e5b83f]" />

              <span className="text-md font-bold uppercase tracking-[0.2em] text-[#e5b83f]">
                Career Domains
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Diverse
              <span className="block text-[#c31e3b]">
                Functional Areas
              </span>
            </h2>

            <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

            <p className="mt-6 text-sm leading-7 text-[#b8c5d8] sm:text-base">
              The placement-related information across
              FOSTIIMA covers multiple business functions,
              reflecting the breadth of opportunities available
              across different domains.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {placementDomains.map((domain) => (
                <div
                  key={domain}
                  className="border border-white/10 bg-white/[0.04] px-3 py-4 text-center text-sm font-medium text-white transition-colors duration-200 hover:border-[#e5b83f] hover:text-[#e5b83f]"
                >
                  {domain}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}