import {
  Activity,
  BarChart3,
  Brain,
  Code2,
  Database,
  LineChart,
  Megaphone,
  Monitor,
  Search,
  Sparkles,
} from "lucide-react";

type CuttingEdgeCoursesProps = {
  courses: string[];
};

const courseIcons = [
  LineChart,
  Search,
  Megaphone,
  BarChart3,
  Database,
  Brain,
  Code2,
  Monitor,
  Activity,
  Sparkles,
];

export default function CuttingEdgeCourses({
  courses,
}: CuttingEdgeCoursesProps) {
  return (
    <section className="bg-[#f8faff] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Additional Learning
          </span>

          <h2 className="mt-2 text-2xl font-bold text-[#102a56] sm:text-3xl">
            FOSTIIMA&apos;s Cutting Edge Courses
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {courses.map((course, index) => {
            const Icon = courseIcons[index] ?? Sparkles;

            return (
              <div
                key={course}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/20 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fee2e2] text-[#c31e3b] transition-colors group-hover:bg-[#c31e3b] group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="text-sm font-semibold leading-5 text-[#102a56]">
                    {course}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}