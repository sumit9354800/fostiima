"use client";

import { useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#f8fafc]">
      <div className="flex h-full">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Right Side */}
        <div className="flex min-w-0 min-h-0 flex-1 flex-col">
          {/* Header */}
          <AdminHeader
            onMenuClick={() => setSidebarOpen(true)}
          />

          {/* Scrollable Content */}
          <main className="min-h-0 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}