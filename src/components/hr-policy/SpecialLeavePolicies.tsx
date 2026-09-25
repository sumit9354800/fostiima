import { BookOpenCheck } from "lucide-react";

import {
  academicLeave,
  compensatoryLeave,
  hospitalLeave,
  leaveWithoutPay,
  maternityLeave,
  privilegeLeave,
  researchLeave,
  sabbaticalApproval,
  sabbaticalEligibility,
  sabbaticalLeave,
} from "@/data/hr-policy";

export default function SpecialLeavePolicies() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <BookOpenCheck className="h-5 w-5 text-[#c31e3b]" />

          <span className="text-md font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Detailed Leave Rules
          </span>
        </div>

        <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
          Leave Categories &amp; Rules
        </h2>

        <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <PolicyCard
            title="Hospital / Critical Illness Leave"
            points={hospitalLeave}
          />

          <PolicyCard
            title="Research Leave (RL)"
            points={researchLeave}
          />

          <PolicyCard
            title="Academic Leave (AL)"
            points={academicLeave}
          />

          <PolicyCard
            title="Compensatory Leave (CPL)"
            points={compensatoryLeave}
          />

          <PolicyCard
            title="Maternity Leave"
            points={maternityLeave}
          />

          <PolicyCard
            title="Privilege Leave (PL)"
            points={privilegeLeave}
          />

          <PolicyCard
            title="Leave Without Pay (LWP)"
            points={leaveWithoutPay}
          />

          <article className="border border-[#dbe3ee] bg-[#f8fafc] p-6 sm:p-8">
            <h3 className="text-xl font-bold text-[#c31e3b]">
              Sabbatical Leave
            </h3>

            <p className="mt-3 text-sm font-medium text-[#061a3a]">
              Sabbatical Leave may be granted to a faculty
              member for one or more of the following reasons:
            </p>

            <BulletList points={sabbaticalLeave} />

            <h4 className="mt-8 text-base font-bold text-[#061a3a]">
              Approval Process
            </h4>

            <BulletList points={sabbaticalApproval} />

            <h4 className="mt-8 text-base font-bold text-[#061a3a]">
              Eligibility &amp; Other Rules
            </h4>

            <BulletList points={sabbaticalEligibility} />
          </article>
        </div>
      </div>
    </section>
  );
}

function PolicyCard({
  title,
  points,
}: {
  title: string;
  points: readonly string[];
}) {
  return (
    <article className="border border-[#dbe3ee] bg-[#f8fafc] p-6 sm:p-8">
      <h3 className="text-xl font-bold text-[#c31e3b]">
        {title}
      </h3>

      <BulletList points={points} />
    </article>
  );
}

function BulletList({
  points,
}: {
  points: readonly string[];
}) {
  return (
    <div className="mt-6 space-y-4">
      {points.map((point) => (
        <div key={point} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e5b83f]" />

          <p className="text-sm leading-7 text-slate-700">
            {point}
          </p>
        </div>
      ))}
    </div>
  );
}