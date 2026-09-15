import type { PlacementProfile } from "@/data/placement/final-placements";

type PlacementChartProps = {
  title: string;
  data: PlacementProfile[];
};

const chartColors = [
  "#102a56",
  "#c31e3b",
  "#eab308",
  "#2563eb",
  "#64748b",
  "#0f766e",
  "#7c3aed",
  "#be123c",
  "#0891b2",
];

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians =
    ((angleInDegrees - 90) * Math.PI) / 180;

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
  const start = polarToCartesian(
    centerX,
    centerY,
    radius,
    endAngle,
  );

  const end = polarToCartesian(
    centerX,
    centerY,
    radius,
    startAngle,
  );

  const largeArcFlag =
    endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${centerX} ${centerY}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export default function PlacementChart({
  title,
  data,
}: PlacementChartProps) {
  if (data.length === 0) {
    return null;
  }

  const total = data.reduce(
    (sum, item) => sum + item.percentage,
    0,
  );

  const slices = data.map((item, index) => {
    const previousPercentage = data
      .slice(0, index)
      .reduce(
        (sum, previousItem) =>
          sum + previousItem.percentage,
        0,
      );

    const startAngle =
      (previousPercentage / total) * 360;

    const endAngle =
      ((previousPercentage + item.percentage) / total) *
      360;

    return {
      ...item,
      startAngle,
      endAngle,
      color:
        chartColors[index % chartColors.length],
    };
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="mb-5 text-center text-lg font-bold text-[#102a56]">
        {title}
      </h3>

      <div className="grid items-center gap-6 md:grid-cols-[260px_1fr]">
        <div className="mx-auto w-full max-w-[260px]">
          <svg
            viewBox="0 0 240 240"
            className="h-auto w-full"
            role="img"
            aria-label={`${title} placement chart`}
          >
            {slices.map((slice) => (
              <path
                key={slice.id}
                d={describeArc(
                  120,
                  120,
                  88,
                  slice.startAngle,
                  slice.endAngle,
                )}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
              />
            ))}

            <circle
              cx="120"
              cy="120"
              r="45"
              fill="white"
            />

            <text
              x="120"
              y="116"
              textAnchor="middle"
              className="fill-[#102a56] text-[15px] font-bold"
            >
              {total}%
            </text>

            <text
              x="120"
              y="132"
              textAnchor="middle"
              className="fill-slate-400 text-[8px]"
            >
              Students
            </text>
          </svg>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {slices.map((slice) => (
            <div
              key={slice.id}
              className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: slice.color,
                  }}
                />

                <span className="truncate text-xs font-medium text-[#102a56]">
                  {slice.category}
                </span>
              </div>

              <span className="shrink-0 text-xs font-bold text-[#c31e3b]">
                {slice.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}