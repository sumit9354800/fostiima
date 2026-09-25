import { nirfEdp } from "@/data/nirf";

export default function NIRFEDP() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Executive Development"
          title="Management Development Programs"
        />

        <div className="mt-10 overflow-hidden border border-[#dbe3ee]">
          <div className="overflow-x-auto">
            <table className="min-w-[750px] w-full text-left text-sm">
              <thead className="bg-[#061a3a] text-white">
                <tr>
                  <th className="px-5 py-4">Financial Year</th>
                  <th className="px-5 py-4">
                    Programs
                  </th>
                  <th className="px-5 py-4">
                    Participants
                  </th>
                  <th className="px-5 py-4">
                    Annual Earnings
                  </th>
                </tr>
              </thead>

              <tbody>
                {nirfEdp.map((item) => (
                  <tr
                    key={item.year}
                    className="border-t border-[#dbe3ee]"
                  >
                    <td className="px-5 py-4 font-semibold text-[#c31e3b]">
                      {item.year}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {item.programs}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {item.participants}
                    </td>

                    <td className="px-5 py-4 font-semibold text-[#061a3a]">
                      {item.earnings}
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