import type { CareerOpening } from "@/data/careers";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock3,
  Building2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

type CareerOpeningCardProps = {
  opening: CareerOpening;
};

export default function CareerOpeningCard({
  opening,
}: CareerOpeningCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
      {/* Header section */}
      <div className="border-b border-slate-100 pb-6">
        {opening.badge && (
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#c31e3b]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{opening.badge}</span>
          </div>
        )}

        <h2 className="text-2xl font-bold text-[#c31e3b] sm:text-3xl">
          {opening.title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
          {opening.description}
        </p>
      </div>

      {/* Metadata Grid */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {opening.company && (
          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Company
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {opening.company}
              </p>
            </div>
          </div>
        )}

        {opening.location && (
          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Location
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {opening.location}
              </p>
            </div>
          </div>
        )}

        {opening.jobType && (
          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Job Type
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {opening.jobType}
              </p>
            </div>
          </div>
        )}

        {opening.qualification && (
          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Qualification
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {opening.qualification}
              </p>
            </div>
          </div>
        )}

        {opening.experience && (
          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Experience
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {opening.experience}
              </p>
            </div>
          </div>
        )}

        {opening.joining && (
          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Joining
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {opening.joining}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Key Responsibilities */}
      {opening.responsibilities && opening.responsibilities.length > 0 && (
        <div className="mt-7">
          <h3 className="text-lg font-bold text-slate-900">
            Key Responsibilities
          </h3>

          <ul className="mt-4 space-y-2.5">
            {opening.responsibilities.map((responsibility) => (
              <li
                key={responsibility}
                className="flex items-start gap-3 text-sm leading-6 text-slate-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c31e3b]" />
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Requirements (for Student Relationship Executive) */}
      {opening.requirements && opening.requirements.length > 0 && (
        <div className="mt-7">
          <h3 className="text-lg font-bold text-slate-900">
            Requirements
          </h3>

          <ul className="mt-4 space-y-2.5">
            {opening.requirements.map((item) => (
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

      {/* Eligibility (for Admission Counsellor) */}
      {opening.eligibility && opening.eligibility.length > 0 && (
        <div className="mt-7">
          <h3 className="text-lg font-bold text-slate-900">
            Eligibility
          </h3>

          <ul className="mt-4 space-y-2.5">
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

      {/* Skills Required (for Admission Counsellor) */}
      {opening.skillsRequired && opening.skillsRequired.length > 0 && (
        <div className="mt-7">
          <h3 className="text-lg font-bold text-slate-900">
            Skills Required
          </h3>

          <ul className="mt-4 space-y-2.5">
            {opening.skillsRequired.map((skill) => (
              <li
                key={skill}
                className="flex items-start gap-3 text-sm leading-6 text-slate-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c31e3b]" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Application / Contact Section */}
      <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
        {opening.applyNowText && (
          <p className="text-base font-bold text-[#c31e3b]">
            {opening.applyNowText}
          </p>
        )}

        {opening.applicationNote && (
          <p
            className={`text-sm text-slate-700 ${
              opening.applyNowText ? "mt-1.5" : ""
            }`}
          >
            {opening.applicationNote}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3 pt-1">
          {opening.email && (
            <a
              href={`mailto:${opening.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#c31e3b] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#a81832] focus:outline-none focus:ring-2 focus:ring-[#c31e3b] focus:ring-offset-2"
            >
              <Mail className="h-4 w-4" />
              <span>{opening.email}</span>
            </a>
          )}

          {opening.contactNumber && (
            <a
              href={`tel:${opening.contactNumber}`}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Phone className="h-4 w-4 text-blue-700" />
              <span>Contact: {opening.contactNumber}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
