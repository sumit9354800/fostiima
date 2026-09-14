import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

import { paymentUrl } from "@/config/navigation";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "admissions@fostiima.org",
    href: "mailto:admissions@fostiima.org",
  },
  {
    icon: Phone,
    label: "Call",
    value: "+91-7678389436",
    href: "tel:+917678389436",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dwarka Sector 9",
    href: "https://maps.app.goo.gl/kd8KVPNQYUw56hfW9",
  },
] as const;

export default function TopBar() {
  return (
    <div className="hidden border-b border-slate-200 bg-white lg:block">
      <div className="mx-auto flex min-h-10 max-w-[1440px] items-center justify-between px-6 xl:px-8">
        <div className="flex items-center">
          {contactDetails.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex items-center">
                {index > 0 && (
                  <span className="mx-5 h-4 w-px bg-slate-200" />
                )}

                <Link
                  href={item.href}
                  className="group flex items-center gap-2 text-[11px] font-medium text-slate-600 transition-colors hover:text-[#c31e3b]"
                >
                  <Icon
                    size={13}
                    strokeWidth={1.8}
                    className="text-[#c31e3b]"
                  />

                  <span>
                    <span className="mr-1 text-slate-400">
                      {item.label}:
                    </span>

                    {item.value}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        <Link
          href={paymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 bg-[#c31e3b] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:bg-[#a81731]"
        >
          Pay Fees

          <ArrowUpRight
            size={13}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}