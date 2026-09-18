import { Mail, MessageSquare } from "lucide-react";

import {
  facultyStaffFeedback,
  studentAlumniFeedback,
} from "@/data/grievance";

function EmailList({
  emails,
}: {
  emails: readonly string[];
}) {
  return (
    <div className="mt-5 space-y-3">
      {emails.map((email) => (
        <a
          key={email}
          href={`mailto:${email}`}
          className="flex items-center gap-3 text-sm font-medium text-[#061a3a] transition-colors hover:text-[#c31e3b]"
        >
          <Mail className="h-4 w-4 shrink-0 text-[#c31e3b]" />
          <span className="break-all">{email}</span>
        </a>
      ))}
    </div>
  );
}

export default function GrievanceFeedback() {
  return (
    <section className="bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-[#c31e3b]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              Feedback &amp; Suggestions
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
            Share Your Feedback or Suggestions
          </h2>

          <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="border border-[#dbe3ee] bg-white p-6 sm:p-8">
            <div className="inline-flex h-11 w-11 items-center justify-center bg-[#061a3a] text-[#e5b83f]">
              <MessageSquare className="h-5 w-5" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#061a3a]">
              Students or Alumni
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Students or Alumni please write to
            </p>

            <EmailList emails={studentAlumniFeedback} />
          </article>

          <article className="border border-[#dbe3ee] bg-white p-6 sm:p-8">
            <div className="inline-flex h-11 w-11 items-center justify-center bg-[#c31e3b] text-white">
              <MessageSquare className="h-5 w-5" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#061a3a]">
              Faculty or Staff
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Faculty or Staff write to
            </p>

            <EmailList emails={facultyStaffFeedback} />
          </article>
        </div>
      </div>
    </section>
  );
}