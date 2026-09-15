import { BookOpen, Globe2, Laptop, Users } from "lucide-react";

type FeeInclusionsProps = {
  inclusions: string[];
};

const inclusionIcons = [Laptop, Users, Globe2];

export default function FeeInclusions({
  inclusions,
}: FeeInclusionsProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            What&apos;s Included
          </span>

          <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
            Fee Inclusions & Educational Trips
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {inclusions.map((item, index) => {
            const Icon = inclusionIcons[index] ?? BookOpen;

            return (
              <article
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/20 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dbeafe] text-[#102a56]">
                  <Icon className="h-5 w-5" />
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {item}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}