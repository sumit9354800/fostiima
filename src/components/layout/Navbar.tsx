"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  navigationItems,
  type NavigationItem,
} from "@/config/navigation";

type DesktopMenuProps = {
  item: NavigationItem;
};

function DesktopMenuItem({ item }: DesktopMenuProps) {
  const pathname = usePathname();

  const hasChildren = Boolean(item.children?.length);

  const isActive =
    item.href === "/"
      ? pathname === "/"
      : item.href
        ? pathname === item.href ||
          pathname.startsWith(`${item.href}/`)
        : false;

  if (!hasChildren) {
    return (
      <Link
        href={item.href ?? "#"}
        className={`relative flex h-full shrink-0 items-center whitespace-nowrap px-2 text-[10px] font-semibold uppercase tracking-[0.02em] transition-colors duration-200 min-[1350px]:px-2.5 min-[1350px]:text-[11px] min-[1450px]:px-3 min-[1450px]:text-[12px] ${
          isActive
            ? "text-[#c31e3b]"
            : "text-[#172033] hover:text-[#c31e3b]"
        }`}
      >
        {item.label}

        {isActive && (
          <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#c31e3b] min-[1350px]:left-2.5 min-[1350px]:right-2.5 min-[1450px]:left-3 min-[1450px]:right-3" />
        )}
      </Link>
    );
  }

  return (
    <div className="group relative flex h-full shrink-0 items-center">
      <button
        type="button"
        className={`relative flex h-full shrink-0 items-center gap-0.5 whitespace-nowrap px-2 text-[10px] font-semibold uppercase tracking-[0.02em] transition-colors duration-200 min-[1350px]:gap-1 min-[1350px]:px-2.5 min-[1350px]:text-[11px] min-[1450px]:px-3 min-[1450px]:text-[12px] ${
          isActive
            ? "text-[#c31e3b]"
            : "text-[#172033] hover:text-[#c31e3b]"
        }`}
        aria-haspopup="menu"
      >
        {item.label}

        <ChevronDown
          size={11}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:rotate-180 min-[1350px]:size-3 min-[1450px]:size-[13px]"
          aria-hidden="true"
        />

        {isActive && (
          <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#c31e3b] min-[1350px]:left-2.5 min-[1350px]:right-2.5 min-[1450px]:left-3 min-[1450px]:right-3" />
        )}
      </button>

      {/* First-level dropdown */}
      <div className="pointer-events-none absolute left-0 top-full z-[100] min-w-[230px] translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 min-[1450px]:min-w-[245px]">
        <div className="overflow-visible border border-slate-200 bg-white py-2 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
          {item.children?.map((child) => (
            <DesktopSubMenuItem
              key={`${item.label}-${child.label}`}
              item={child}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopSubMenuItem({ item }: DesktopMenuProps) {
  const pathname = usePathname();

  const hasChildren = Boolean(item.children?.length);

  const isActive = item.href
    ? pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
    : false;

  if (!hasChildren) {
    return (
      <Link
        href={item.href ?? "#"}
        className={`group/item flex min-h-10 items-center justify-between gap-4 px-4 py-2.5 text-[12px] font-medium leading-tight transition-colors ${
          isActive
            ? "bg-[#c31e3b]/5 text-[#c31e3b]"
            : "text-slate-700 hover:bg-slate-50 hover:text-[#c31e3b]"
        }`}
      >
        <span>{item.label}</span>

        <span className="h-px w-0 bg-[#c31e3b] transition-all duration-200 group-hover/item:w-3" />
      </Link>
    );
  }

  return (
    <div className="group/sub relative">
      <div
        className={`flex min-h-10 cursor-default items-center justify-between gap-5 px-4 py-2.5 text-[12px] font-medium leading-tight ${
          isActive
            ? "text-[#c31e3b]"
            : "text-slate-700 group-hover/sub:text-[#c31e3b]"
        }`}
      >
        <span>{item.label}</span>

        <ChevronDown
          size={13}
          className="-rotate-90"
          aria-hidden="true"
        />
      </div>

      {/* Second-level dropdown */}
      <div className="pointer-events-none absolute left-full top-0 ml-1 min-w-[230px] translate-x-2 opacity-0 transition-all duration-200 group-hover/sub:pointer-events-auto group-hover/sub:translate-x-0 group-hover/sub:opacity-100 min-[1450px]:min-w-[245px]">
        <div className="border border-slate-200 bg-white py-2 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
          {item.children?.map((child) => (
            <Link
              key={`${item.label}-${child.label}`}
              href={child.href ?? "#"}
              className="flex min-h-10 items-center px-4 py-2.5 text-[12px] font-medium leading-tight text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#c31e3b]"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden h-[76px] w-full bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)] xl:block"
    >
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center px-4 min-[1350px]:px-6 min-[1450px]:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex w-[120px] shrink-0 items-center min-[1350px]:w-[135px] min-[1450px]:w-[150px]"
          aria-label="FOSTIIMA Business School Home"
        >
          <div className="flex flex-col leading-none">
            <span className="text-[22px] font-extrabold tracking-[-0.04em] text-[#123b79] min-[1350px]:text-[23px] min-[1450px]:text-[24px]">
              FOSTIIMA
            </span>

            <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.22em] text-[#c31e3b] min-[1350px]:text-[8px] min-[1450px]:tracking-[0.25em]">
              Business School
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex h-full min-w-0 flex-1 items-center justify-end overflow-visible">
          {navigationItems.map((item) => (
            <DesktopMenuItem
              key={item.label}
              item={item}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}