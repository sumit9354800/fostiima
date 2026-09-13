import {
  GraduationCap,
  Landmark,
  Medal,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    value: "₹30 LPA",
    label: "Highest Package",
    icon: TrendingUp,
  },
  {
    value: "₹11.8 LPA",
    label: "Average Package",
    icon: Medal,
  },
  {
    value: "100%",
    label: "Placement Assistance",
    icon: Medal,
  },
  {
    value: "50+",
    label: "IIM Alumni Faculty",
    icon: GraduationCap,
  },
  {
    value: "1973",
    label: "IIM-A Alumni Founded",
    icon: Landmark,
  },
];

export default function StatsBar() {
  return (
    <section
      aria-label="FOSTIIMA highlights"
      className="bg-[#0d2d59] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex min-h-[92px] items-center gap-3 px-4 py-5 sm:min-h-[100px] sm:px-5 lg:px-6"
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d6a900]/50 text-[#f4c400]">
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <p className="text-xl font-bold leading-none tracking-tight sm:text-2xl">
                    {stat.value}
                  </p>

                  <p className="mt-1.5 text-[10px] font-medium uppercase leading-4 tracking-[0.08em] text-white/70 sm:text-[11px]">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}