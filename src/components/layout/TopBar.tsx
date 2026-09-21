import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import { paymentUrl } from "@/config/navigation";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "no-reply@fostiima.org",
    href: "mailto:no-reply@fostiima.org",
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
    <div
      className="
        hidden
        h-[44px]
        w-full
        border-b
        border-slate-200
        bg-white
        lg:block
      "
    >
      <div
        className="
          mx-auto
          flex
          h-full
          w-full
          max-w-[1440px]
          items-center
          justify-between
          px-6
          xl:px-8
        "
      >
        {/* =====================================================
            CONTACT DETAILS
        ====================================================== */}
        <div className="flex h-full min-w-0 items-center">
          {contactDetails.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex h-full shrink-0 items-center"
              >
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="mx-5 h-4 w-px shrink-0 bg-slate-200"
                  />
                )}

                <Link
                  href={item.href}
                  target={
                    item.href.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    whitespace-nowrap
                    text-[11px]
                    font-medium
                    text-slate-600
                    transition-colors
                    duration-200
                    hover:text-[#c31e3b]
                  "
                >
                  <Icon
                    size={13}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#c31e3b]"
                    aria-hidden="true"
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

        {/* =====================================================
            PAY FEES
        ====================================================== */}
        <Link
          href={paymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            ml-6
            inline-flex
            h-full
            shrink-0
            items-center
            gap-2
            bg-[#c31e3b]
            px-5
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-white
            transition-colors
            duration-200
            hover:bg-[#a81731]
          "
        >
          <span>Pay Fees</span>

          <ArrowUpRight
            size={13}
            strokeWidth={2}
            aria-hidden="true"
            className="
              transition-transform
              duration-200
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </div>
    </div>
  );
}