/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  Users,
  UserRoundCheck,
  GraduationCap,
  CheckCircle2,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  X,
  LoaderCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

type Enquiry = {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  state: string;
  city: string;
  course: string;
  remarks: string | null;
  source: string;
  status: string;
  emailSent: boolean;
  emailError: string | null;
  createdAt: string;
};

type StatusFilter =
  | "ALL"
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "CONVERTED"
  | "CLOSED";

type ApiResponse = {
  success?: boolean;
  error?: string;
  enquiries?: Enquiry[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  counts?: Record<string, number>;
};

const statuses: { value: StatusFilter; label: string }[] = [
  { value: "ALL", label: "All enquiries" },
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "CONVERTED", label: "Converted" },
  { value: "CLOSED", label: "Closed" },
];

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 ring-blue-200",
  CONTACTED: "bg-amber-50 text-amber-700 ring-amber-200",
  QUALIFIED: "bg-violet-50 text-violet-700 ring-violet-200",
  CONVERTED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  CLOSED: "bg-slate-100 text-slate-600 ring-slate-200",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function AdmissionEnquiriesTable() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const loadEnquiries = useCallback(
    async (showRefresh = false) => {
      setError("");

      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const params = new URLSearchParams({
          search,
          status,
          page: String(page),
        });

        const response = await fetch(
          `/api/admin/admission-enquiries?${params.toString()}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const result = (await response.json()) as ApiResponse;

        if (!response.ok) {
          throw new Error(
            result.error || "Unable to load admission enquiries.",
          );
        }

        setEnquiries(result.enquiries ?? []);
        setCounts(result.counts ?? {});
        setTotal(result.pagination?.total ?? 0);
        setTotalPages(result.pagination?.totalPages ?? 0);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page, search, status],
  );

  useEffect(() => {
    void loadEnquiries();
  }, [loadEnquiries]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPage(1);
      setSearch(searchInput.trim());
    }, 350);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  async function updateStatus(
    enquiry: Enquiry,
    nextStatus: StatusFilter,
  ) {
    if (nextStatus === "ALL" || nextStatus === enquiry.status) {
      return;
    }

    setUpdatingId(enquiry.id);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `/api/admin/admission-enquiries/${encodeURIComponent(enquiry.id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: nextStatus }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to update status.");
      }

      setNotice(`Status updated to ${nextStatus}.`);

      await loadEnquiries(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update the enquiry.",
      );
    } finally {
      setUpdatingId("");
    }
  }

  const stats = [
    {
      label: "Total enquiries",
      value: counts.ALL ?? 0,
      icon: Users,
      iconClass: "bg-blue-50 text-blue-700",
    },
    {
      label: "New leads",
      value: counts.NEW ?? 0,
      icon: GraduationCap,
      iconClass: "bg-rose-50 text-[#C31E3B]",
    },
    {
      label: "Qualified",
      value: counts.QUALIFIED ?? 0,
      icon: UserRoundCheck,
      iconClass: "bg-violet-50 text-violet-700",
    },
    {
      label: "Converted",
      value: counts.CONVERTED ?? 0,
      icon: CheckCircle2,
      iconClass: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C31E3B]">
            Admissions management
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#061A3A] sm:text-3xl">
            Admission Enquiries
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage prospective students and track admission leads.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadEnquiries(true)}
          disabled={refreshing || loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {notice && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          <CheckCircle2 size={17} />
          {notice}
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
            className="ml-auto rounded p-1 hover:bg-emerald-100"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconClass}`}
                >
                  <Icon size={19} />
                </span>
              </div>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-[#061A3A]">
                {item.value.toLocaleString("en-IN")}
              </p>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="space-y-4 border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-bold text-[#061A3A]">
                Student enquiries
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {total.toLocaleString("en-IN")} matching records
              </p>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search name, email, mobile or city"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#123B79] focus:ring-2 focus:ring-[#123B79]/10"
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {statuses.map((item) => {
              const active = status === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setPage(1);
                    setStatus(item.value);
                  }}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    active
                      ? "border-[#061A3A] bg-[#061A3A] text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {counts[item.value] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-slate-500">
            <LoaderCircle size={20} className="animate-spin" />
            Loading admission enquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <GraduationCap size={26} />
            </span>
            <h3 className="mt-4 font-bold text-[#061A3A]">
              No enquiries found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Try another search or status filter. New website submissions
              will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4">Student</th>
                    <th className="px-5 py-4">Contact</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4">Submitted</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Lead status</th>
                    <th className="px-5 py-4">Details</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {enquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="transition hover:bg-slate-50/80"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#061A3A]">
                          {enquiry.fullName}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {enquiry.course}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="block max-w-[220px] truncate text-sm text-slate-700 hover:text-[#C31E3B]"
                        >
                          {enquiry.email}
                        </a>
                        <a
                          href={`tel:${enquiry.mobile}`}
                          className="mt-1 block text-xs text-slate-500 hover:text-[#123B79]"
                        >
                          {enquiry.mobile}
                        </a>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700">
                          {enquiry.city}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {enquiry.state}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                        {formatDate(enquiry.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        {enquiry.emailSent ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 size={15} />
                            Sent
                          </span>
                        ) : (
                          <span
                            title={
                              enquiry.emailError ||
                              "Email not confirmed as sent"
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700"
                          >
                            <Clock3 size={15} />
                            Not sent
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <select
                          aria-label={`Status for ${enquiry.fullName}`}
                          value={enquiry.status}
                          disabled={updatingId === enquiry.id}
                          onChange={(event) =>
                            void updateStatus(
                              enquiry,
                              event.target.value as StatusFilter,
                            )
                          }
                          className={`max-w-[145px] rounded-lg px-2.5 py-2 text-xs font-semibold ring-1 ring-inset outline-none transition focus:ring-2 disabled:opacity-60 ${
                            statusStyles[enquiry.status] ??
                            statusStyles.NEW
                          }`}
                        >
                          {statuses
                            .filter((item) => item.value !== "ALL")
                            .map((item) => (
                              <option
                                key={item.value}
                                value={item.value}
                              >
                                {item.label}
                              </option>
                            ))}
                        </select>
                        {updatingId === enquiry.id && (
                          <LoaderCircle
                            size={14}
                            className="mt-1 animate-spin text-slate-400"
                          />
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSelected(enquiry)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#123B79] hover:bg-blue-50 hover:text-[#123B79]"
                        >
                          View
                          <ExternalLink size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-xs text-slate-500">
                Showing{" "}
                {total === 0 ? 0 : (page - 1) * 20 + 1}– 
                {Math.min(page * 20, total)} of {total}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={15} />
                  Previous
                </button>
                <span className="min-w-20 text-center text-xs font-semibold text-slate-600">
                  Page {page} of {Math.max(1, totalPages)}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="admission-detail-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 sm:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#C31E3B]">
                  Admission lead
                </p>
                <h2
                  id="admission-detail-title"
                  className="mt-2 text-xl font-extrabold text-[#061A3A]"
                >
                  {selected.fullName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selected.course}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <Mail size={17} className="text-slate-400" />
                  <p className="mt-3 text-xs text-slate-500">Email</p>
                  <a
                    href={`mailto:${selected.email}`}
                    className="mt-1 block break-all text-sm font-semibold text-[#123B79] hover:underline"
                  >
                    {selected.email}
                  </a>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <Phone size={17} className="text-slate-400" />
                  <p className="mt-3 text-xs text-slate-500">Mobile</p>
                  <a
                    href={`tel:${selected.mobile}`}
                    className="mt-1 block text-sm font-semibold text-[#123B79] hover:underline"
                  >
                    {selected.mobile}
                  </a>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <MapPin size={17} className="text-slate-400" />
                  <p className="mt-3 text-xs text-slate-500">Location</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selected.city}, {selected.state}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <GraduationCap size={17} className="text-slate-400" />
                  <p className="mt-3 text-xs text-slate-500">Submitted</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {formatDate(selected.createdAt)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Remarks
                </p>
                <p className="mt-2 whitespace-pre-wrap break-words rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-700">
                  {selected.remarks || "No remarks provided."}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500">Source</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selected.source}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                    statusStyles[selected.status] ?? statusStyles.NEW
                  }`}
                >
                  {selected.status}
                </span>
              </div>

              {!selected.emailSent && selected.emailError && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-amber-900">
                    Email delivery issue
                  </p>
                  <p className="mt-1 break-words text-xs leading-5 text-amber-800">
                    {selected.emailError}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-slate-200 p-5">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl bg-[#061A3A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123B79]"
              >
                Close details
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
