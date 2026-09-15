import type { InternshipProfile } from "@/data/placement/summer-internship";

type InternshipProfileTableProps = {
  profiles: InternshipProfile[];
};

export default function InternshipProfileTable({
  profiles,
}: InternshipProfileTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
          Profile Wise Distribution
        </p>

        <h2 className="mt-1 text-xl font-bold text-[#102a56]">
          Specializations &amp; Percentage of Students
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead>
            <tr className="bg-[#102a56] text-white">
              <th className="w-20 px-5 py-4 text-xs font-bold uppercase tracking-wider sm:px-6">
                S/N
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider sm:px-6">
                Specializations
              </th>

              <th className="w-40 px-5 py-4 text-xs font-bold uppercase tracking-wider sm:px-6">
                % of Students
              </th>
            </tr>
          </thead>

          <tbody>
            {profiles.map((profile, index) => (
              <tr
                key={profile.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-4 text-sm font-semibold text-slate-500 sm:px-6">
                  {index + 1}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-[#102a56] sm:px-6">
                  {profile.specialization}
                </td>

                <td className="px-5 py-4 text-sm font-bold text-[#c31e3b] sm:px-6">
                  {profile.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}