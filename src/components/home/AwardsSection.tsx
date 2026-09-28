"use client";

import Image from "next/image";
import { Award, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { accreditations } from "@/data/awards-accreditation";

const icons = [Award, Star, ShieldCheck];

export default function AwardsSection() {
  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 sm:mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c31e3b] sm:text-xs">
            AICTE APPROVALS
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102a56] sm:text-4xl">
            Approval Records
          </h2>

          <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />
        </div>

        {/* Cards */}
        <div
          className="
            flex
            gap-5
            overflow-x-auto
            pb-3
            snap-x
            snap-mandatory
            scrollbar-hide
            sm:gap-5
            lg:grid
            lg:grid-cols-3
            lg:overflow-visible
          "
        >
          {accreditations.map((accreditation, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Link
                key={accreditation.id}
                href={`/awards-accreditation/${accreditation.id}`}
                className="
                  group
                  block
                  min-w-[88%]
                  snap-start
                  sm:min-w-[48%]
                  lg:min-w-0
                "
              >
                <article
                  className="
                    relative
                    flex
                    min-h-[370px]
                    flex-col
                    items-center
                    rounded-xl
                    border
                    border-[#a9bee0]
                    bg-white
                    px-6
                    py-7
                    text-center
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#c31e3b]/40
                    hover:shadow-[0_15px_40px_rgba(6,26,58,0.10)]
                  "
                >
                  {/* Logo */}
                  <div
                    className="
                      relative
                      flex
                      h-[122px]
                      w-[122px]
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      border
                      border-[#e8a5b4]
                      bg-white
                    "
                  >
                    {accreditation.logo ? (
                      <Image
                        src={accreditation.logo}
                        alt={`${accreditation.title} ${accreditation.year}`}
                        fill
                        sizes="122px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <Icon
                        className="h-12 w-12 text-[#c31e3b]"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Title + Year */}
                  <h3 className="mt-7 text-lg font-bold leading-tight text-[#102a56]">
                    {accreditation.title}{" "}
                    <span className="text-[#c31e3b]">
                      {accreditation.year}
                    </span>
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-5
                      max-w-[340px]
                      text-sm
                      leading-7
                      text-[#526582]
                    "
                  >
                    {accreditation.description}
                  </p>

                  {/* Bottom gold line */}
                  <div className="mt-auto pt-7">
                    <div
                      className="
                        h-px
                        w-11
                        bg-[#e5b83f]
                        transition-all
                        duration-300
                        group-hover:w-16
                      "
                    />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
