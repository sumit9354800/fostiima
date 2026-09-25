import {
  Award,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Landmark,
  ShieldCheck,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

const ICONS = {
  Award,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Landmark,
  ShieldCheck,
} as const;

const ICON_COLORS = [
  {
    border: "border-[#f4df75]",
    background: "bg-[#fff7c7]",
    text: "text-[#d89a00]",
  },
  {
    border: "border-[#a9d8ff]",
    background: "bg-[#e8f6ff]",
    text: "text-[#1477c9]",
  },
  {
    border: "border-[#ffc5cf]",
    background: "bg-[#fff0f3]",
    text: "text-[#df3654]",
  },
] as const;

export default async function AboutSection() {
  const about = await prisma.homeAbout.findFirst({
    where: {
      isActive: true,
    },
    include: {
      highlights: {
        where: {
          isActive: true,
        },
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
      },
    },
  });

  if (!about) {
    return null;
  }

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-16">
          <div className="max-w-xl">
            <p className="mb-4 text-md font-bold uppercase tracking-[0.18em] text-[#c31e3b] sm:text-sm">
              {about.eyebrow}
            </p>

            <h2 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#123b79] sm:text-5xl lg:text-[30px]">
              {(() => {
                const words = about.title.split(" ");
                const highlightStart = Math.max(words.length - 7, 0);

                return (
                  <>
                    {words.slice(0, highlightStart).join(" ")}{" "}
                    <span className="text-[#c31e3b]">
                      {words.slice(highlightStart).join(" ")}
                    </span>
                  </>
                );
              })()}
            </h2>

            <div className="mt-7 space-y-5 text-[15px] text-justify leading-7 text-slate-600 sm:text-base">
              <p>{about.description1}</p>

              {about.description2 && <p>{about.description2}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {about.highlights.map((item, index) => {
              const Icon =
                ICONS[item.icon as keyof typeof ICONS] ?? Building2;

              // 0 = Yellow, 1 = Blue, 2 = Red, then repeat
              const color = ICON_COLORS[index % ICON_COLORS.length];

              return (
                <article
                  key={item.id}
                  className="group rounded-xl border border-slate-200 bg-[#fbfcff] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d9e2f0] hover:shadow-[0_10px_25px_rgba(18,59,121,0.07)]"
                >
                  <div className="flex flex-col gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border ${color.border} ${color.background} ${color.text}`}
                    >
                      <Icon
                        size={19}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <h3 className="text-[15px] font-bold leading-5 text-[#123b79]">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-[12px] leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}