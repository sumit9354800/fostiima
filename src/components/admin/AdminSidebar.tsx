"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";

import { adminNavigation } from "@/data/admin";

type AdminSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function AdminSidebar({
  isOpen = true,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close admin sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#061a3a]/50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col
          border-r border-[#dbe3ee] bg-white
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex h-20 items-center justify-between border-b border-[#dbe3ee] px-5">
          <Link
            href="/admin"
            className="flex items-center gap-3"
            onClick={onClose}
          >
            <div className="flex h-10 w-10 items-center justify-center bg-[#061a3a] text-sm font-bold text-[#e5b83f]">
              FB
            </div>

            <div>
              <p className="text-sm font-bold text-[#061a3a]">
                FOSTIIMA
              </p>

              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                Admin Panel
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Administration
          </p>

          <nav className="space-y-1">
            {adminNavigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 rounded-lg px-3 py-2.5
                    text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-[#061a3a] text-white"
                        : "text-slate-600 hover:bg-[#f1f5f9] hover:text-[#061a3a]"
                    }
                  `}
                >
                  <Icon
                    className={`
                      h-[18px] w-[18px]
                      ${
                        isActive
                          ? "text-[#e5b83f]"
                          : "text-slate-400"
                      }
                    `}
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-[#dbe3ee] p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#061a3a]"
          >
            <LogOut className="h-[18px] w-[18px]" />

            <span>Back to Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}