"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

import { navigationItems, type NavigationItem } from "@/config/navigation";

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
        ? pathname === item.href || pathname.startsWith(`${item.href}/`)
        : false;

  if (!hasChildren) {
    return (
      <Link
        href={item.href ?? "#"}
        className={`relative flex h-full items-center whitespace-nowrap px-3 text-[12px] font-semibold uppercase tracking-[0.035em] transition-colors duration-200 xl:px-3.5 ${
          isActive
            ? "text-[#c31e3b]"
            : "text-[#172033] hover:text-[#c31e3b]"
        }`}
      >
        {item.label}

        {isActive && (
          <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#c31e3b] xl:left-3.5 xl:right-3.5" />
        )}
      </Link>
    );
  }

  return (
    <div className="group relative flex h-full items-center">
      <button
        type="button"
        className={`relative flex h-full items-center gap-1 whitespace-nowrap px-3 text-[12px] font-semibold uppercase tracking-[0.035em] transition-colors duration-200 xl:px-3.5 ${
          isActive
            ? "text-[#c31e3b]"
            : "text-[#172033] hover:text-[#c31e3b]"
        }`}
        aria-haspopup="menu"
      >
        {item.label}

        <ChevronDown
          size={13}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:rotate-180"
        />

        {isActive && (
          <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#c31e3b] xl:left-3.5 xl:right-3.5" />
        )}
      </button>

      <div className="pointer-events-none absolute left-0 top-full z-50 min-w-[245px] translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
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
    ? pathname === item.href || pathname.startsWith(`${item.href}/`)
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
          className="-rotate-90 transition-transform duration-200 group-hover/sub:-rotate-90"
        />
      </div>

      <div className="pointer-events-none absolute left-full top-0 ml-1 min-w-[245px] translate-x-2 opacity-0 transition-all duration-200 group-hover/sub:pointer-events-auto group-hover/sub:translate-x-0 group-hover/sub:opacity-100">
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
    <nav className="hidden h-[76px] bg-white lg:block">
      <div className="mx-auto flex h-full max-w-[1440px] items-center px-6 xl:px-8">
        <Link
          href="/"
          className="mr-auto flex shrink-0 items-center"
          aria-label="FOSTIIMA Business School Home"
        >
          <div className="flex flex-col leading-none">
            <span className="text-[24px] font-extrabold tracking-[-0.04em] text-[#123b79]">
              FOSTIIMA
            </span>

            <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.25em] text-[#c31e3b]">
              Business School
            </span>
          </div>
        </Link>

        <div className="flex h-full items-center">
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