import { CalendarDays, FileCheck2 } from "lucide-react";

import {
  leaveOverview,
  recallAndAbsence,
} from "@/data/hr-policy";

export default function LeaveOverview() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          icon={CalendarDays}
          eyebrow="Leave Policy"
          title="Leave Policy for FOSTIIMA Employees"
        />

        <div className="mt-10 space-y-4">
          {leaveOverview.map((point, index) => (
            <PolicyPoint
              key={point}
              number={index + 1}
              text={point}
            />
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {recallAndAbsence.map((section) => (
            <article
              key={section.title}
              className="border border-[#dbe3ee] bg-[#f8fafc] p-6 sm:p-8"
            >
              <div className="flex h-11 w-11 items-center justify-center bg-[#061a3a] text-[#e5b83f]">
                <FileCheck2 className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#061a3a]">
                {section.title}
              </h3>

              <div className="mt-5 space-y-4">
                {section.points.map((point) => (
                  <PolicyPoint
                    key={point}
                    text={point}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PolicyPoint({
  number,
  text,
}: {
  number?: number;
  text: string;
}) {
  return (
    <div className="flex gap-4 border border-[#dbe3ee] bg-[#f8fafc] p-5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#c31e3b] text-md font-bold text-white">
        {number ?? "•"}
      </div>

      <p className="text-sm leading-7 text-slate-700">
        {text}
      </p>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: typeof CalendarDays;
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-[#c31e3b]" />

        <span className="text-md font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
          {eyebrow}
        </span>
      </div>

      <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
        {title}
      </h2>

      <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />
    </div>
  );
}