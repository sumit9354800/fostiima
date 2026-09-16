import { aboutMargdarshak } from "@/data/margdarshak";

export default function AboutMargdarshak() {
  return (
    <section
      id="about-margdarshak"
      className="bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
              FOSTIIMA
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102a56] sm:text-4xl">
              About Margdarshak
            </h2>

            <div className="mt-5 h-1 w-16 rounded-full bg-[#c31e3b]" />
          </div>

          <div className="space-y-5">
            {aboutMargdarshak.paragraphs.map(
              (paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 24)}`}
                  className="text-sm leading-7 text-slate-600 sm:text-base"
                >
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}