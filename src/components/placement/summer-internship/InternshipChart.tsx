import type { InternshipProfile } from "@/data/placement/summer-internship";

type InternshipChartProps = {
  profiles: InternshipProfile[];
};

const chartColors = [
  "#102a56",
  "#c31e3b",
  "#eab308",
  "#2563eb",
  "#64748b",
  "#0f766e",
  "#7c3aed",
];

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);

  const end = polarToCartesian(centerX, centerY, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${centerX} ${centerY}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export default function InternshipChart({ profiles }: InternshipChartProps) {
  const total = profiles.reduce((sum, profile) => sum + profile.percentage, 0);

  const slices = profiles.map((profile, index) => {
    const previousPercentage = profiles
      .slice(0, index)
      .reduce((sum, previousProfile) => sum + previousProfile.percentage, 0);

    const startAngle = (previousPercentage / total) * 360;

    const angle = (profile.percentage / total) * 360;

    const endAngle = startAngle + angle;

    return {
      ...profile,
      startAngle,
      endAngle,
      color: chartColors[index % chartColors.length],
    };
  });
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
          Visual Representation
        </p>

        <h2 className="mt-1 text-xl font-bold text-[#102a56]">
          Summer Internship Profile Distribution
        </h2>

        {total !== 100 && (
          <p className="mt-2 text-xs leading-5 text-slate-500">
            The chart represents the supplied profile percentages
            proportionally.
          </p>
        )}
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-[minmax(280px,360px)_1fr]">
        <div className="mx-auto w-full max-w-[340px]">
          <svg
            viewBox="0 0 240 240"
            className="h-auto w-full"
            role="img"
            aria-label="Summer internship specialization distribution chart"
          >
            {slices.map((slice) => (
              <path
                key={slice.id}
                d={describeArc(120, 120, 92, slice.startAngle, slice.endAngle)}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
              />
            ))}

            <circle cx="120" cy="120" r="50" fill="white" />

            <text
              x="120"
              y="114"
              textAnchor="middle"
              className="fill-[#102a56] text-[13px] font-bold"
            >
              {total}%
            </text>

            <text
              x="120"
              y="132"
              textAnchor="middle"
              className="fill-slate-400 text-[8px] font-medium"
            >
              supplied data
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          {slices.map((slice) => (
            <div
              key={slice.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />

                <span className="text-sm font-medium leading-5 text-[#102a56]">
                  {slice.specialization}
                </span>
              </div>

              <span className="shrink-0 text-sm font-bold text-[#c31e3b]">
                {slice.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
