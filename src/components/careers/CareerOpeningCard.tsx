import type { CareerOpening } from "@/data/careers";
import { Mail, GraduationCap, Clock3, UserRound } from "lucide-react";

type CareerOpeningCardProps = {
  opening: CareerOpening;
};

export default function CareerOpeningCard({
  opening,
}: CareerOpeningCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
      <div className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold text-[#c31e3b]">
          {opening.title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
          {opening.description}
        </p>
      </div>

      {opening.eligibility && opening.eligibility.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Eligibility Criteria
          </h3>

          <ul className="mt-4 space-y-3">
            {opening.eligibility.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-6 text-slate-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c31e3b]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(opening.experience ||
        opening.preferred ||
        opening.education) && (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {opening.experience && (
            <div className="rounded-xl bg-slate-50 p-4">
              <Clock3 className="h-5 w-5 text-blue-700" />
              <p className="mt-2 text-xs font-medium text-slate-500">
                Experience
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {opening.experience}
              </p>
            </div>
          )}

          {opening.preferred && (
            <div className="rounded-xl bg-slate-50 p-4">
              <UserRound className="h-5 w-5 text-blue-700" />
              <p className="mt-2 text-xs font-medium text-slate-500">
                Preferred
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {opening.preferred}
              </p>
            </div>
          )}

          {opening.education && (
            <div className="rounded-xl bg-slate-50 p-4">
              <GraduationCap className="h-5 w-5 text-blue-700" />
              <p className="mt-2 text-xs font-medium text-slate-500">
                Education
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {opening.education}
              </p>
            </div>
          )}
        </div>
      )}

      {opening.responsibilities &&
        opening.responsibilities.length > 0 && (
          <div className="mt-7">
            <h3 className="text-lg font-semibold text-slate-900">
              Roles and Responsibilities
            </h3>

            <ul className="mt-4 space-y-3">
              {opening.responsibilities.map((responsibility) => (
                <li
                  key={responsibility}
                  className="flex items-start gap-3 text-sm leading-7 text-slate-700"
                >
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c31e3b]" />
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      {opening.applicationNote && (
        <p className="mt-7 text-sm leading-7 text-slate-600">
          {opening.applicationNote}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
        <Mail className="h-4 w-4 text-blue-700" />

        <span className="text-sm text-slate-600">
          Apply via email:
        </span>

        <a
          href={`mailto:${opening.email}`}
          className="text-sm font-semibold text-blue-700 transition-colors hover:text-[#c31e3b]"
        >
          {opening.email}
        </a>
      </div>
    </article>
  );
}