import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PlacementCTA() {
  return (
    <section className="bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-white px-6 py-12 text-center shadow-[0_12px_40px_rgba(6,26,58,0.08)] sm:px-10 sm:py-14">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#061a3a 1px, transparent 1px), linear-gradient(90deg, #061a3a 1px, transparent 1px)",
              backgroundSize: "38px 38px",
            }}
          />

          <div className="relative">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              FOSTIIMA Business School
            </span>

            <h2 className="mt-4 text-3xl font-bold text-[#061a3a] sm:text-4xl">
              Build Your Management Career
            </h2>

            <div className="mx-auto mt-5 h-1 w-14 bg-[#e5b83f]" />

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Explore the academic and industry-oriented
              environment at FOSTIIMA Business School.
            </p>

            <Link
              href="/how-to-apply"
              className="mt-7 inline-flex items-center gap-2 bg-[#c31e3b] px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#a91731]"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}