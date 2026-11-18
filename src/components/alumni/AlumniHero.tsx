import { Users } from "lucide-react";

// Inner-page hero in the PlacementHero / NIRFHero style (navy, grid, red and
// gold glows, gold eyebrow, red rule). No background image: the alumni photo
// already opens the first section below. Holds the page's only <h1>.
export default function AlumniHero() {
  return (
    <section
      aria-labelledby="alumni-hero-title"
      className="relative isolate overflow-hidden bg-[#061a3a]"
    >
      {/* Background Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* Red Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#c31e3b]/10 blur-3xl"
      />

      {/* Gold Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#e5b83f]/10 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <Users aria-hidden="true" className="h-5 w-5 text-[#e5b83f]" />

            <span className="text-md font-bold uppercase tracking-[0.22em] text-[#e5b83f]">
              Lifelong Connections
            </span>
          </div>

          {/* Accent */}
          <div className="mt-5 h-px w-14 bg-[#c31e3b]" />

          {/* Heading */}
          <h1
            id="alumni-hero-title"
            className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Alumni
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#b8c5d8] sm:text-lg">
            FOSTIIMA Business School builds lifelong relationships with its
            graduates through professional networking, mentorship and
            continued engagement with the campus community.
          </p>
        </div>
      </div>
    </section>
  );
}
