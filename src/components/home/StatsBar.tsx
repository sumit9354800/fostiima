import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  Medal,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export type HomeStat = {
  id: string;
  value: string;
  label: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
};

const iconMap = {
  TrendingUp,
  Medal,
  GraduationCap,
  Landmark,
  Users,
  BriefcaseBusiness,
  Target,
  Award,
} as const;

function getStatIcon(icon: string) {
  return iconMap[icon as keyof typeof iconMap] ?? TrendingUp;
}

type StatsBarProps = {
  stats: HomeStat[];
};

export default function StatsBar({
  stats,
}: StatsBarProps) {
  return (
    <section
      aria-label="FOSTIIMA highlights"
      className="bg-[#0d2d59] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {stats.map((stat) => {
            const Icon = getStatIcon(stat.icon);

            return (
              <div
                key={stat.id}
                className="flex min-h-[92px] items-center gap-3 px-4 py-5 sm:min-h-[100px] sm:px-5 lg:px-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d6a900]/50 text-[#f4c400]">
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

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