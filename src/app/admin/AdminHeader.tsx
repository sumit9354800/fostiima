"use client";

import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();

    router.replace("/admin/login");
    router.refresh();
  }

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

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2 border border-[#dbe3ee] px-3 py-2 text-md font-semibold text-slate-600 transition hover:border-[#c31e3b] hover:text-[#c31e3b]"
      >
        <LogOut className="h-4 w-4" />

        <span className="hidden sm:inline">
          Logout
        </span>
      </button>
    </header>
  );
}