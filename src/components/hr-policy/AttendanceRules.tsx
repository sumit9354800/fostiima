import {
  Clock3,
  Fingerprint,
} from "lucide-react";

import {
  attendanceRules,
  departmentTimings,
  officialDutyHours,
} from "@/data/hr-policy";

export default function AttendanceRules() {
  return (
    <section className="bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Clock3 className="h-5 w-5 text-[#c31e3b]" />

          <span className="text-md font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Attendance
          </span>
        </div>

        <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
          Attendance Rules for FOSTIIMA Employees
        </h2>

        <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="border border-[#dbe3ee] bg-white p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center bg-[#061a3a] text-[#e5b83f]">
              <Clock3 className="h-5 w-5" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#061a3a]">
              Official Duty Hours
            </h3>

            <div className="mt-6 space-y-4">
              {officialDutyHours.map((item) => (
                <p
                  key={item}
                  className="text-sm leading-7 text-slate-700"
                >
                  {item}
                </p>
              ))}
            </div>
          </article>

          <article className="border border-[#dbe3ee] bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold text-[#061a3a]">
              Department Timings
            </h3>

            <div className="mt-6 overflow-hidden border border-[#dbe3ee]">
              <div className="overflow-x-auto">
                <table className="min-w-[700px] w-full text-left text-sm">
                  <thead className="bg-[#061a3a] text-white">
                    <tr>
                      <th className="px-5 py-4">
                        Timing
                      </th>

                      <th className="px-5 py-4">
                        Department / Staff
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {departmentTimings.map((item) => (
                      <tr
                        key={`${item.time}-${item.departments}`}
                        className="border-t border-[#dbe3ee]"
                      >
                        <td className="px-5 py-4 font-semibold text-[#c31e3b]">
                          {item.time}
                        </td>

                        <td className="px-5 py-4 leading-6 text-slate-600">
                          {item.departments}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3">
            <Fingerprint className="h-5 w-5 text-[#c31e3b]" />

            <h3 className="text-xl font-bold text-[#061a3a]">
              Marking of Attendance &amp; Late Coming Rules
            </h3>
          </div>

          <div className="mt-6 space-y-4">
            {attendanceRules.map((rule, index) => (
              <div
                key={rule}
                className="flex gap-4 border border-[#dbe3ee] bg-white p-5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#c31e3b] text-md font-bold text-white">
                  {index + 1}
                </span>

                <p className="text-sm leading-7 text-slate-700">
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}