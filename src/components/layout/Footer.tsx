import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import {
  importantLinks,
  otherLinks,
  quickLinks,
} from "@/config/footer";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterLinkListProps = {
  title: string;
  links: FooterLink[];
};

const socialIcons = {
  Facebook: {
    icon: FaFacebookF,
    color: "#1877F2",
  },
  X: {
    icon: FaXTwitter,
    color: "#000000",
  },
  Instagram: {
    icon: FaInstagram,
    color: "#E4405F",
  },
  LinkedIn: {
    icon: FaLinkedinIn,
    color: "#0A66C2",
  },
  YouTube: {
    icon: FaYoutube,
    color: "#FF0000",
  },
  Pinterest: {
    icon: FaPinterestP,
    color: "#E60023",
  },
  WhatsApp: {
    icon: FaWhatsapp,
    color: "#25D366",
  },
};

function FooterLinkList({
  title,
  links,
}: FooterLinkListProps) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white">
        {title}
      </h3>

      <div className="mt-5 space-y-2.5">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group flex items-start gap-1 text-sm leading-5 text-white/65 transition-colors hover:text-white"
          >
            <span>{link.label}</span>

            <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#071a38] text-white">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-[#102a56] via-[#c31e3b] to-[#eab308]" />

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#1555a5]/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#c31e3b]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[1.25fr_1fr_1fr_1fr] lg:gap-8">

          {/* ===================================================
              BRAND + CONTACT
          ==================================================== */}
          <div>
            {/* Logo */}
            <div className="inline-flex rounded-lg bg-white px-4 py-3">
              <img
                src="https://fostiima.org/assets/designer/themes/default/images/fostiima-business-school-logo2.jpg"
                alt="FOSTIIMA Business School"
                className="h-auto w-[190px]"
              />
            </div>

            <h3 className="mt-6 text-base font-bold text-white">
              FOSTIIMA Business School
            </h3>

            {/* Contact */}
            <div className="mt-4 space-y-4">

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#eab308]" />

                <p className="text-sm leading-6 text-white/65">
                  Plot No. HAF-1, Dwarka Sector 9,
                  <br />
                  New Delhi, 110077
                </p>
              </div>

              {/* Phone */}
              <a
                href="tel:+917678389436"
                className="flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-[#eab308]" />

                <span>
                  +91-7678389436
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:no-reply@fostiima.org"
                className="flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-[#eab308]" />

                <span>
                  no-reply@fostiima.org
                </span>
              </a>

              {/* Office Hours */}
              <div className="flex items-center gap-3 text-sm text-white/65">
                <Clock3 className="h-4 w-4 text-[#eab308]" />

                <span>
                  09:00am to 06:00pm
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================
              QUICK LINKS
          ==================================================== */}
          <FooterLinkList
            title="Quick Links"
            links={quickLinks}
          />

          {/* ===================================================
              IMPORTANT LINKS
          ==================================================== */}
          <FooterLinkList
            title="Important Links"
            links={importantLinks}
          />

          {/* ===================================================
              OTHER LINKS
          ==================================================== */}
          <FooterLinkList
            title="Others Links"
            links={otherLinks}
          />
        </div>

        {/* =====================================================
            SOCIAL MEDIA
        ====================================================== */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

            {/* Social heading */}
            <div>
              <p className="text-sm font-bold text-white">
                Connect With FOSTIIMA
              </p>

              <p className="mt-1 text-xs text-white/45">
                Follow us for campus updates, events and opportunities.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {Object.entries(socialIcons).map(
                ([name, social]) => {
                  const Icon = social.icon;

                  const socialLink =
                    name === "WhatsApp"
                      ? "https://wa.me/917678389436"
                      : "#";

                  return (
                    <a
                      key={name}
                      href={socialLink}
                      target={
                        name === "WhatsApp"
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        name === "WhatsApp"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      aria-label={name}
                      style={
                        {
                          "--brand-color":
                            social.color,
                        } as React.CSSProperties
                      }
                      className="
                        group
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-white/10
                        bg-white/5
                        text-white/55
                        transition-all
                        duration-300
                        hover:border-[var(--brand-color)]
                        hover:bg-[var(--brand-color)]
                        hover:text-white
                        hover:shadow-lg
                      "
                    >
                      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                },
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            COPYRIGHT
        ====================================================== */}
        <div className="border-t border-white/10 py-5">
          <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">

            <p className="text-xs text-white/45">
              Copyright © {currentYear}, FOSTIIMA Business School.
              All rights reserved.
            </p>

            <p className="text-xs text-white/35">
              FOSTIIMA Business School
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
}