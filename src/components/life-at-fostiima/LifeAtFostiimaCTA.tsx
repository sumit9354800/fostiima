import { ArrowRight } from "lucide-react";

export function LifeAtFostiimaCTA() {
  return (
    <section className="bg-[#f8fafc] px-5 pb-16 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-[#061a3a] px-6 py-12 sm:px-10 lg:px-14 lg:py-14">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#e5b83f]/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5b83f]">
                Start Your Journey
              </p>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Ready to experience FOSTIIMA?
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#b8c5d8] sm:text-base">
                Explore the academic experience and discover what your journey
                at FOSTIIMA can look like.
              </p>
            </div>

            <a
              href="/contact-us"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#c31e3b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a91832]"
            >
              Apply Now
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}