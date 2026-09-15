import { careerOpenings } from "@/data/careers";
import CareerApplicationForm from "./CareerApplicationForm";
import CareerOpeningCard from "./CareerOpeningCard";

export default function CareersContent() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-7">
          {careerOpenings.map((opening) => (
            <CareerOpeningCard
              key={opening.id}
              opening={opening}
            />
          ))}
        </div>

        <div className="mt-10">
          <CareerApplicationForm />
        </div>
      </div>
    </section>
  );
}