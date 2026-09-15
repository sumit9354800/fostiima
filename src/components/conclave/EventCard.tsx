import { ArrowUpRight, MapPin } from "lucide-react";
import type { ConclaveEvent } from "@/data/conclave";

type EventCardProps = {
  event: ConclaveEvent;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <a
      href={event.href}
      className="group block h-full"
    >
      <article className="relative flex h-full min-h-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/20 hover:shadow-xl">
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#102a56] via-[#c31e3b] to-[#eab308]" />

        {/* Date */}
        <div className="flex w-[88px] shrink-0 flex-col items-center justify-center bg-[#102a56] px-3 py-5 text-center transition-colors duration-300 group-hover:bg-[#c31e3b]">
          <span className="text-2xl font-extrabold leading-none text-white">
            {event.day}
          </span>

          <span className="mt-1 text-[11px] font-bold tracking-[0.16em] text-[#eab308]">
            {event.month}
          </span>

          <span className="mt-1 text-[10px] font-medium text-white/60">
            {event.year}
          </span>
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          {/* Category */}
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
            Conclave / Conference
          </span>

          {/* Title */}
          <h3 className="mt-2 pr-8 text-lg font-bold leading-snug text-[#102a56] transition-colors duration-300 group-hover:text-[#c31e3b]">
            {event.title}
          </h3>

          {/* Location */}
          <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c31e3b]" />

            <span className="line-clamp-2 leading-5">
              {event.location}
            </span>
          </div>

          {/* Read more */}
          <div className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-[#102a56] transition-colors group-hover:text-[#c31e3b]">
            Read More

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Hover decoration */}
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-[#dbeafe]/60 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      </article>
    </a>
  );
}