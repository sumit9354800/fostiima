import { nirfPlacement } from "@/data/nirf";

export default function NIRFPlacement() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Placement & Higher Studies"
          title="Previous Three Years"
        />

        <div className="mt-10 overflow-hidden border border-[#dbe3ee]">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-left text-sm">
              <thead className="bg-[#061a3a] text-white">
                <tr>
                  <th className="px-5 py-4">Academic Year</th>
                  <th className="px-5 py-4">
                    First Year Intake
                  </th>
                  <th className="px-5 py-4">
                    First Year Admitted
                  </th>
                  <th className="px-5 py-4">
                    Graduating Year
                  </th>
                  <th className="px-5 py-4">
                    Graduating Students
                  </th>
                  <th className="px-5 py-4">
                    Students Placed
                  </th>
                  <th className="px-5 py-4">
                    Median Salary
                  </th>
                  <th className="px-5 py-4">
                    Higher Studies
                  </th>
                </tr>
              </thead>

              <tbody>
                {nirfPlacement.map((row) => (
                  <tr
                    key={row.intakeYear}
                    className="border-t border-[#dbe3ee]"
                  >
                    <td className="px-5 py-4 font-semibold text-[#c31e3b]">
                      {row.intakeYear}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {row.firstYearIntake}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {row.firstYearAdmitted}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {row.graduatingYear}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {row.graduatingStudents}
                    </td>

                    <td className="px-5 py-4 font-semibold text-[#c31e3b]">
                      {row.placedStudents}
                    </td>

                    <td className="px-5 py-4 font-semibold text-[#061a3a]">
                      {row.medianSalary}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {row.higherStudies}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
        {eyebrow}
      </span>

      <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
        {title}
      </h2>

      <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />
    </div>
  );
}