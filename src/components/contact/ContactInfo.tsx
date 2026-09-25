import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "admissions@fostiima.org",
    href: "mailto:admissions@fostiima.org",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-7678389436",
    href: "tel:+917678389436",
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
          Contact Information
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#061a3a]">
          Let&apos;s start a conversation
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
          Reach the admissions team using the details below.
        </p>
      </div>

      <div className="grid gap-3">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="
                group
                flex
                items-center
                gap-4
                border
                border-[#dbe3ee]
                bg-white
                p-4
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[#c31e3b]
                hover:shadow-[0_10px_28px_rgba(6,26,58,0.08)]
              "
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#061a3a] text-white transition-colors group-hover:bg-[#c31e3b]">
                <Icon className="h-5 w-5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  {item.label}
                </span>
                <span className="mt-1 block break-words text-sm font-semibold text-[#061a3a]">
                  {item.value}
                </span>
              </span>

              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c31e3b]" />
            </Link>
          );
        })}

        <div className="flex items-start gap-4 border border-[#dbe3ee] bg-white p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#e5b83f] text-[#061a3a]">
            <MapPin className="h-5 w-5" />
          </span>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Location
            </p>
            <p className="mt-1 text-sm font-semibold leading-6 text-[#061a3a]">
              Dwarka Sector 9, Institutional Area, New Delhi
            </p>
          </div>
        </div>
      </div>

      <Link
        href="https://maps.app.goo.gl/kd8KVPNQYUw56hfW9"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#c31e3b] transition hover:text-[#061a3a]"
      >
        Open Location in Maps
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
