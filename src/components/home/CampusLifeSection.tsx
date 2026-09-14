"use client";

import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Dumbbell,
  Landmark,
  Users,
} from "lucide-react";

const campusLifeItems = [
  {
    title: "Student Community",
    description:
      "Build meaningful connections, collaborate with peers and create lifelong friendships beyond the classroom.",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Intellectual Life",
    description:
      "Engage in discussions, debates, workshops and activities that encourage curiosity and new perspectives.",
    icon: BookOpen,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Sports & Recreation",
    description:
      "Balance academic life with sports, recreation and activities that encourage teamwork and sportsmanship.",
    icon: Dumbbell,
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Events & Experiences",
    description:
      "Experience cultural activities, celebrations, industry interactions and memorable campus experiences.",
    icon: Landmark,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function CampusLifeSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const hasCarousel = campusLifeItems.length > 4;

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current || !hasCarousel) return;

    const amount = sliderRef.current.clientWidth * 0.8;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#dbeafe]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#fee2e2]/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-[#c31e3b]">
              Campus Life
            </span>

            <h2 className="text-2xl font-bold tracking-tight text-[#102a56] sm:text-3xl lg:text-4xl">
              Beyond Classrooms,{" "}
              <span className="text-[#c31e3b]">Beyond Boundaries</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Immerse yourself in an ecosystem of cultural dynamism,
              intellectual debate, sportsmanship, and lifelong camaraderie.
            </p>
          </div>

          {/* Arrows ONLY when cards > 4 */}
          {hasCarousel && (
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous campus life cards"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#102a56] shadow-sm transition-all hover:border-[#c31e3b] hover:bg-[#c31e3b] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next campus life cards"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#102a56] shadow-sm transition-all hover:border-[#c31e3b] hover:bg-[#c31e3b] hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Cards */}
        <div
          ref={sliderRef}
          className={[
            "flex gap-5",
            hasCarousel
              ? "overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 scrollbar-hide"
              : "overflow-hidden",
          ].join(" ")}
        >
          {campusLifeItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={[
                  "group relative shrink-0 overflow-hidden rounded-xl",
                  "border border-slate-200 bg-white shadow-sm",
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                  hasCarousel
                    ? "w-[85%] snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                    : "w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]",
                ].join(" ")}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden sm:h-72 lg:h-[300px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Default subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a38]/35 via-transparent to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a38]/90 via-[#071a38]/35 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="absolute left-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-lg bg-white/95 text-[#c31e3b] opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  {/* Heading — ONLY visible on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                      {item.title}
                    </h3>

                    <div className="mt-3 h-0.5 w-10 bg-[#eab308]" />
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-5 right-5 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-[#c31e3b] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
