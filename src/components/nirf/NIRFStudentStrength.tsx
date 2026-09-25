import { Users } from "lucide-react";

import { nirfStudentStrength } from "@/data/nirf";

const studentItems = [
  ["Male Students", nirfStudentStrength.male],
  ["Female Students", nirfStudentStrength.female],
  ["Total Students", nirfStudentStrength.total],
  ["Within State", nirfStudentStrength.withinState],
  ["Outside State", nirfStudentStrength.outsideState],
  ["Outside Country", nirfStudentStrength.outsideCountry],
  [
    "Economically Backward",
    nirfStudentStrength.economicallyBackward,
  ],
  [
    "Socially Challenged (SC+ST+OBC)",
    nirfStudentStrength.sociallyChallenged,
  ],
];

const reimbursementItems = [
  [
    "State & Central Government",
    nirfStudentStrength.stateCentralReimbursement,
  ],
  [
    "Institution Funds",
    nirfStudentStrength.institutionFundsReimbursement,
  ],
  [
    "Private Bodies",
    nirfStudentStrength.privateBodiesReimbursement,
  ],
  [
    "Not Receiving Full Tuition Reimbursement",
    nirfStudentStrength.noFullTuitionReimbursement,
  ],
];

export default function NIRFStudentStrength() {
  return (
    <section className="bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-[#c31e3b]" />

          <span className="text-md font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Student Data
          </span>
        </div>

        <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
          Total Actual Student Strength
        </h2>

        <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

        <p className="mt-4 text-sm text-slate-500">
          {nirfStudentStrength.program}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studentItems.map(([label, value]) => (
            <article
              key={label}
              className="border border-[#dbe3ee] bg-white p-5"
            >
              <p className="text-2xl font-bold text-[#c31e3b]">
                {value}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {label}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-[#061a3a]">
            Tuition Fee Reimbursement
          </h3>

          <div className="mt-6 overflow-hidden border border-[#dbe3ee] bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[700px] w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#061a3a] text-white">
                    <th className="px-5 py-4">
                      Category
                    </th>
                    <th className="px-5 py-4">
                      Students
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {reimbursementItems.map(
                    ([label, value]) => (
                      <tr
                        key={label}
                        className="border-t border-[#dbe3ee]"
                      >
                        <td className="px-5 py-4 text-slate-700">
                          {label}
                        </td>

                        <td className="px-5 py-4 font-semibold text-[#c31e3b]">
                          {value}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}