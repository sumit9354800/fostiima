import { nirfIntake } from "@/data/nirf";

export default function NIRFIntake() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Academic Intake"
          title="Sanctioned (Approved) Intake"
        />

        <div className="mt-10 overflow-hidden border border-[#dbe3ee] bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#061a3a] text-white">
                  <th className="px-5 py-4 font-semibold">
                    Programme
                  </th>

                  {[
                    "2024-25",
                    "2023-24",
                    "2022-23",
                    "2021-22",
                    "2020-21",
                    "2019-20",
                  ].map((year) => (
                    <th
                      key={year}
                      className="px-5 py-4 font-semibold"
                    >
                      {year}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {nirfIntake.map((row) => (
                  <tr
                    key={row.program}
                    className="border-t border-[#dbe3ee]"
                  >
                    <td className="px-5 py-4 font-semibold text-[#c31e3b]">
                      {row.program}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {row["2024-25"]}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {row["2023-24"]}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {row["2022-23"]}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {row["2021-22"]}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {row["2020-21"]}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {row["2019-20"]}
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