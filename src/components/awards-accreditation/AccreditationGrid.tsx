import Image from "next/image";

import { accreditations } from "@/data/awards-accreditation";

export default function AccreditationGrid() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            AICTE Approvals
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
            Approval Records
          </h2>

          <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {accreditations.map((item) => (
            <article
              key={item.id}
              className="group flex min-h-[350px] flex-col rounded-xl border border-[#9aaed0] bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/40 hover:shadow-[0_14px_35px_rgba(6,26,58,0.10)] sm:p-7"
            >
              <div className="flex justify-center">
                <div className="relative flex h-[118px] w-[118px] items-center justify-center overflow-hidden rounded-full border border-[#d8a0b0] bg-white">
                  <Image
                    src={item.image}
                    alt={`AICTE approval ${item.year}`}
                    width={108}
                    height={108}
                    className="h-[108px] w-[108px] object-contain"
                  />
                </div>
              </div>

              <h3 className="mt-7 text-xl font-bold leading-tight text-[#061a3a]">
                <span>AICTE </span>
                <span className="text-[#c31e3b]">
                  APPROVAL {item.year}
                </span>
              </h3>

              <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-slate-600">
                {item.description}
              </p>

              <div className="mt-auto pt-6">
                <div className="mx-auto h-px w-10 bg-[#e5b83f] transition-all duration-300 group-hover:w-16" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}