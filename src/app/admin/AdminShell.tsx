"use client";

import { useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Second safeguard only: tracking is not loaded on Admin routes at all
    // (see src/lib/tracking-scope.ts). If a session-recording
    // script were ever present, this tells Clarity to mask all Admin text.
    <div className="h-screen overflow-hidden bg-[#f8fafc]" data-clarity-mask="true">
      <div className="flex h-full">
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <AdminHeader
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="min-h-0 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}