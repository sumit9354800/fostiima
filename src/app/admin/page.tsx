import { ShieldCheck } from "lucide-react";

import AdminModuleCard from "@/components/admin/AdminModuleCard";
import { adminModules } from "@/data/admin";

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="border border-[#dbe3ee] bg-[#061a3a] p-7 sm:p-9">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#e5b83f]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5b83f]">
                Administration
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              FOSTIIMA Admin Panel
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b8c5d8]">
              Manage website content, faculty, admissions,
              placement, events, blogs and institutional
              information from one place.
            </p>
          </div>

          <div className="hidden h-16 w-16 items-center justify-center bg-[#e5b83f] text-[#061a3a] sm:flex">
            <ShieldCheck className="h-7 w-7" />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Content Management
          </span>

          <h2 className="mt-2 text-2xl font-bold text-[#061a3a]">
            Website Modules
          </h2>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {adminModules.map((module) => (
            <AdminModuleCard
              key={module.href}
              title={module.title}
              description={module.description}
              href={module.href}
              icon={module.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}