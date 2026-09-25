import { BookOpenCheck, GraduationCap } from "lucide-react";

type PgdmOverviewProps = {
  title: string;
  paragraphs: string[];
};

export default function PgdmOverview({
  title,
  paragraphs,
}: PgdmOverviewProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fee2e2] text-[#c31e3b]">
              <GraduationCap className="h-5 w-5" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
                Programme
              </span>

              <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
                {title}
              </h2>
            </div>
          </div>

          <div className="mt-7 space-y-4 border-t border-slate-100 pt-6">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-7 text-slate-600 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-5 text-md font-semibold text-[#102a56]">
            <BookOpenCheck className="h-4 w-4 text-[#c31e3b]" />
            Two-year full-time PGDM programme
          </div>
        </div>
      </div>
    </section>
  );
}