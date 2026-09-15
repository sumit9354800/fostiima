import Image from "next/image";
import type { PlacementStudent } from "@/data/placement/final-placements";

type PlacementStudentsProps = {
  students: PlacementStudent[];
  batch: string;
};

export default function PlacementStudents({
  students,
  batch,
}: PlacementStudentsProps) {
  return (
    <section>
      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
          Student Outcomes
        </p>

        <h2 className="mt-1 text-2xl font-bold text-[#102a56]">
          Glimpse of FOSTIIMA Placements {batch} Batch
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Glimpse of FOSTIIMA ongoing placements
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {students.map((student) => (
          <article
            key={student.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/20 hover:shadow-xl"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <Image
                src={student.image}
                alt={student.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="p-5">
              <h3 className="font-bold text-[#102a56] transition-colors group-hover:text-[#c31e3b]">
                {student.name}
              </h3>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                {student.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}