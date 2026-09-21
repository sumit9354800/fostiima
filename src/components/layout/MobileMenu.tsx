"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
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

  /*
   * ============================================================
   * SIMPLE LINK
   * ============================================================
   */
  if (!hasChildren) {
    return (
      <Link
        href={item.href ?? "#"}
        onClick={onNavigate}
        className={`
          flex
          min-h-12
          items-center
          justify-between
          border-b
          border-slate-100
          px-5
          text-sm
          font-medium
          text-slate-800
          transition-colors
          hover:bg-slate-50
          hover:text-[#c31e3b]
          ${
            level > 0
              ? "pl-9"
              : ""
          }
        `}
      >
        <span>{item.label}</span>

        <ChevronRight
          size={15}
          className="shrink-0 text-slate-400"
          aria-hidden="true"
        />
      </Link>
    );
  }

  /*
   * ============================================================
   * DROPDOWN LINK
   * ============================================================
   */
  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`
          flex
          min-h-12
          w-full
          items-center
          justify-between
          px-5
          text-left
          text-sm
          font-semibold
          text-slate-800
          transition-colors
          hover:bg-slate-50
          hover:text-[#c31e3b]
          ${
            level > 0
              ? "pl-9"
              : ""
          }
        `}
        aria-expanded={isOpen}
      >
        <span>{item.label}</span>

        <ChevronDown
          size={16}
          className={`
            shrink-0
            transition-transform
            duration-200
            ${
              isOpen
                ? "rotate-180 text-[#c31e3b]"
                : "text-slate-400"
            }
          `}
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
      {/* ========================================================
          MOBILE / TABLET NAVBAR
      ========================================================= */}
      <div
        className="
          flex
          h-[68px]
          w-full
          items-center
          justify-between
          border-b
          border-slate-200
          bg-white
          px-5
          shadow-[0_2px_10px_rgba(15,23,42,0.06)]
          xl:hidden
        "
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 flex-col leading-none"
          aria-label="FOSTIIMA Business School Home"
        >
          <span
            className="
              text-[21px]
              font-extrabold
              tracking-[-0.04em]
              text-[#123b79]
            "
          >
            FOSTIIMA
          </span>

          <span
            className="
              mt-1
              text-[7px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#c31e3b]
            "
          >
            Business School
          </span>
        </Link>

        {/* Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            border
            border-slate-200
            text-[#123b79]
            transition-colors
            hover:border-[#c31e3b]
            hover:text-[#c31e3b]
            focus:outline-none
            focus:ring-2
            focus:ring-[#c31e3b]/20
          "
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
        >
          <Menu
            size={21}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* ========================================================
          OVERLAY
      ========================================================= */}
      {isOpen && (
        <button
          type="button"
          className="
            fixed
            inset-0
            z-[100]
            cursor-default
            bg-black/35
            xl:hidden
          "
          onClick={closeMenu}
          aria-label="Close navigation menu"
        />
      )}

      {/* ========================================================
          DRAWER
      ========================================================= */}
      <aside
        className={`
          fixed
          right-0
          top-0
          z-[110]
          flex
          h-dvh
          w-[min(88vw,390px)]
          flex-col
          overflow-hidden
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          xl:hidden
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
        aria-hidden={!isOpen}
      >
        {/* ======================================================
            DRAWER HEADER
        ======================================================= */}
        <div
          className="
            flex
            h-[68px]
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200
            bg-white
            px-5
          "
        >
          <div className="flex flex-col leading-none">
            <span
              className="
                text-xl
                font-extrabold
                tracking-[-0.04em]
                text-[#123b79]
              "
            >
              FOSTIIMA
            </span>

            <span
              className="
                mt-1
                text-[7px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#c31e3b]
              "
            >
              Business School
            </span>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              border
              border-slate-200
              text-slate-700
              transition-colors
              hover:border-[#c31e3b]
              hover:text-[#c31e3b]
              focus:outline-none
              focus:ring-2
              focus:ring-[#c31e3b]/20
            "
            aria-label="Close navigation menu"
          >
            <X
              size={20}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* ======================================================
            SCROLLABLE CONTENT
            Only this area scrolls.
        ======================================================= */}
        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overscroll-contain
          "
        >
          {/* ====================================================
              CONTACT
          ===================================================== */}
          <div
            className="
              border-b
              border-slate-200
              bg-white
              px-5
              py-4
            "
          >
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-400
              "
            >
              Contact
            </p>

            <div className="mt-3 space-y-2">
              <a
                href="mailto:no-reply@fostiima.org"
                onClick={closeMenu}
                className="
                  block
                  text-xs
                  font-medium
                  text-slate-700
                  transition-colors
                  hover:text-[#c31e3b]
                "
              >
                no-reply@fostiima.org
              </a>

              <a
                href="tel:+917678389436"
                onClick={closeMenu}
                className="
                  block
                  text-xs
                  font-medium
                  text-slate-700
                  transition-colors
                  hover:text-[#c31e3b]
                "
              >
                +91-7678389436
              </a>

              <p className="text-xs font-medium text-slate-700">
                Dwarka Sector 9
              </p>
            </div>
          </div>

          {/* ====================================================
              NAVIGATION
          ===================================================== */}
          <nav
            aria-label="Mobile navigation"
            className="bg-white"
          >
            {navigationItems.map((item) => (
              <MobileMenuItem
                key={item.label}
                item={item}
                onNavigate={closeMenu}
              />
            ))}
          </nav>
        </div>

        {/* ======================================================
            PAY FEES
            Always visible at bottom.
        ======================================================= */}
        <div
          className="
            relative
            z-[120]
            shrink-0
            border-t
            border-slate-200
            bg-white
            p-4
            shadow-[0_-4px_14px_rgba(15,23,42,0.06)]
          "
        >
          <Link
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="
              group
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              bg-[#c31e3b]
              px-4
              text-xs
              font-bold
              uppercase
              tracking-[0.12em]
              text-white
              transition-all
              duration-200
              hover:bg-[#a81731]
              focus:outline-none
              focus:ring-2
              focus:ring-[#c31e3b]/30
              focus:ring-offset-2
            "
          >
            <span>Pay Fees</span>

            <ArrowUpRight
              size={15}
              strokeWidth={2}
              className="
                transition-transform
                duration-200
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </aside>
    </>
  );
}