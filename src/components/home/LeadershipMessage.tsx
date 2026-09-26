import Image from "next/image";

export default function LeadershipMessage() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-[#dbe3ee] bg-[#eef5fb]">
          <div className="grid items-center lg:grid-cols-[320px_1fr]">
            
            {/* Chairman Image */}
            <div className="relative h-[250px] overflow-hidden sm:h-[300px] lg:h-[320px]">
              <Image
                src="/home/chairman-message.webp"
                alt="FOSTIIMA Business School Leadership"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            </div>

            {/* Content */}
            <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
                Leadership
              </span>

              <h2 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-[#061a3a] sm:text-3xl lg:text-4xl">
                Guiding the vision and values that shape future leaders
                at FOSTIIMA Business School.
              </h2>

              <div className="mt-6 h-px w-16 bg-[#e5b83f]" />

              <blockquote className="mt-6 max-w-3xl text-lg font-medium leading-8 text-[#061a3a] sm:text-xl lg:text-2xl">
                “Leadership is about creating impact and inspiring change.”
              </blockquote>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                FOSTIIMA Business School
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}