"use client";

import { Menu } from "lucide-react";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#dbe3ee] bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open admin menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <p className="text-sm font-bold text-[#061a3a]">
            FOSTIIMA Admin
          </p>

          <p className="hidden text-md text-slate-500 sm:block">
            Website Content Management
          </p>
        </div>
      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#061a3a] text-md font-bold text-[#e5b83f]">
        A
      </div>
    </header>
  );
}