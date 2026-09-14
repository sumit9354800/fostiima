"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import {
  navigationItems,
  paymentUrl,
  type NavigationItem,
} from "@/config/navigation";

type MobileMenuItemProps = {
  item: NavigationItem;
  level?: number;
  onNavigate: () => void;
};

function MobileMenuItem({
  item,
  level = 0,
  onNavigate,
}: MobileMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = Boolean(item.children?.length);

  if (!hasChildren) {
    return (
      <Link
        href={item.href ?? "#"}
        onClick={onNavigate}
        className={`flex min-h-12 items-center justify-between border-b border-slate-100 px-5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 hover:text-[#c31e3b] ${
          level > 0 ? "pl-9" : ""
        }`}
      >
        <span>{item.label}</span>

        <ChevronRight
          size={15}
          className="text-slate-400"
          aria-hidden="true"
        />
      </Link>
    );
  }

  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`flex min-h-12 w-full items-center justify-between px-5 text-left text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-[#c31e3b] ${
          level > 0 ? "pl-9" : ""
        }`}
        aria-expanded={isOpen}
      >
        <span>{item.label}</span>

        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen
              ? "rotate-180 text-[#c31e3b]"
              : "text-slate-400"
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="bg-slate-50">
          {item.children?.map((child) => (
            <MobileMenuItem
              key={`${item.label}-${child.label}`}
              item={child}
              level={level + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile / Tablet Header */}
      <div className="flex h-[68px] w-full items-center justify-between border-b border-slate-200 bg-white px-5 shadow-[0_2px_10px_rgba(15,23,42,0.06)] xl:hidden">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 flex-col leading-none"
          aria-label="FOSTIIMA Business School Home"
        >
          <span className="text-[21px] font-extrabold tracking-[-0.04em] text-[#123b79]">
            FOSTIIMA
          </span>

          <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.22em] text-[#c31e3b]">
            Business School
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-slate-200 text-[#123b79] transition-colors hover:border-[#c31e3b] hover:text-[#c31e3b]"
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
        >
          <Menu size={21} aria-hidden="true" />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/30 xl:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[110] flex h-dvh w-[min(88vw,390px)] flex-col bg-white shadow-2xl transition-transform duration-300 xl:hidden ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Drawer Header */}
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-[-0.04em] text-[#123b79]">
              FOSTIIMA
            </span>

            <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.22em] text-[#c31e3b]">
              Business School
            </span>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-700 transition-colors hover:border-[#c31e3b] hover:text-[#c31e3b]"
            aria-label="Close navigation menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Contact */}
          <div className="border-b border-slate-200 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Contact
            </p>

            <div className="mt-3 space-y-2">
              <a
                href="mailto:admissions@fostiima.org"
                onClick={closeMenu}
                className="block text-xs font-medium text-slate-700"
              >
                admissions@fostiima.org
              </a>

              <a
                href="tel:+917678389436"
                onClick={closeMenu}
                className="block text-xs font-medium text-slate-700"
              >
                +91-7678389436
              </a>

              <p className="text-xs font-medium text-slate-700">
                Dwarka Sector 9
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Mobile navigation">
            {navigationItems.map((item) => (
              <MobileMenuItem
                key={item.label}
                item={item}
                onNavigate={closeMenu}
              />
            ))}
          </nav>
        </div>

        {/* Pay Fees */}
        <div className="shrink-0 border-t border-slate-200 bg-white p-4">
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex h-12 items-center justify-center bg-[#c31e3b] text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#a81731]"
          >
            Pay Fees
          </a>
        </div>
      </aside>
    </>
  );
}