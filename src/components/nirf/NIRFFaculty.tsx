"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { nirfFaculty } from "@/data/nirf";

export default function NIRFFaculty() {
  const [search, setSearch] = useState("");

  const filteredFaculty = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return nirfFaculty;
    }

    return nirfFaculty.filter((faculty) =>
      [
        faculty.name,
        faculty.designation,
        faculty.gender,
        faculty.qualification,
        faculty.associationType,
      ].some((value) =>
        String(value).toLowerCase().includes(query),
      ),
    );
  }, [search]);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <span className="text-md font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
          Faculty Details
        </span>

        <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
          Faculty Details
        </h2>

        <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />

        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
          Faculty information submitted as part of the NIRF
          2026 data.
        </p>

        <div className="relative mt-8 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search faculty..."
            className="h-11 w-full border border-[#dbe3ee] bg-white pl-10 pr-4 text-sm text-[#061a3a] outline-none transition focus:border-[#c31e3b]"
          />
        </div>

        <div className="mt-8 overflow-hidden border border-[#dbe3ee]">
          <div className="overflow-x-auto">
            <table className="min-w-[1250px] w-full text-left text-sm">
              <thead className="bg-[#061a3a] text-white">
                <tr>
                  <th className="px-4 py-4">#</th>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Designation</th>
                  <th className="px-4 py-4">Gender</th>
                  <th className="px-4 py-4">Qualification</th>
                  <th className="px-4 py-4">
                    Experience (Months)
                  </th>
                  <th className="px-4 py-4">
                    Currently Working
                  </th>
                  <th className="px-4 py-4">
                    Joining Date
                  </th>
                  <th className="px-4 py-4">
                    Leaving Date
                  </th>
                  <th className="px-4 py-4">
                    Association
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredFaculty.map((faculty) => (
                  <tr
                    key={faculty.srNo}
                    className="border-t border-[#dbe3ee] transition-colors hover:bg-[#f8fafc]"
                  >
                    <td className="px-4 py-4 font-semibold text-[#c31e3b]">
                      {faculty.srNo}
                    </td>

                    <td className="px-4 py-4 font-semibold text-[#061a3a]">
                      {faculty.name}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {faculty.designation}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {faculty.gender}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {faculty.qualification}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {faculty.experience}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {faculty.currentlyWorking}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {faculty.joiningDate}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {faculty.leavingDate}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {faculty.associationType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-md text-slate-500">
          Showing {filteredFaculty.length} of{" "}
          {nirfFaculty.length} faculty records.
        </p>
      </div>
    </section>
  );
}