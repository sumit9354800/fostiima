import {
  nirfCapitalExpenditure,
  nirfOperationalExpenditure,
} from "@/data/nirf";

export default function NIRFFinancialResources() {
  return (
    <section className="bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Financial Resources"
          title="Utilised Expenditure"
        />

        <div className="mt-10">
          <h3 className="text-xl font-bold text-[#061a3a]">
            Capital Expenditure
          </h3>

          <div className="mt-5 overflow-hidden border border-[#dbe3ee] bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[800px] w-full text-left text-sm">
                <thead className="bg-[#061a3a] text-white">
                  <tr>
                    <th className="px-5 py-4">Academic Year</th>
                    <th className="px-5 py-4">Library</th>
                    <th className="px-5 py-4">Laboratory</th>
                    <th className="px-5 py-4">
                      Other Capital Assets
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {nirfCapitalExpenditure.map((row) => (
                    <tr
                      key={row.year}
                      className="border-t border-[#dbe3ee]"
                    >
                      <td className="px-5 py-4 font-semibold text-[#c31e3b]">
                        {row.year}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {row.library}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {row.laboratory}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {row.otherCapitalAssets}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-[#061a3a]">
            Operational Expenditure
          </h3>

          <div className="mt-5 overflow-hidden border border-[#dbe3ee] bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[800px] w-full text-left text-sm">
                <thead className="bg-[#061a3a] text-white">
                  <tr>
                    <th className="px-5 py-4">Academic Year</th>
                    <th className="px-5 py-4">
                      Salaries
                    </th>
                    <th className="px-5 py-4">
                      Infrastructure / Running Expenditure
                    </th>
                    <th className="px-5 py-4">
                      Seminars / Conferences / Workshops
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {nirfOperationalExpenditure.map((row) => (
                    <tr
                      key={row.year}
                      className="border-t border-[#dbe3ee]"
                    >
                      <td className="px-5 py-4 font-semibold text-[#c31e3b]">
                        {row.year}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {row.salaries}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {row.infrastructure}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {row.seminars}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
      <span className="text-md font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
        {eyebrow}
      </span>

      <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
        {title}
      </h2>

      <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />
    </div>
  );
}