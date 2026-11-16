/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Archive, Check, ChevronDown, Mail, MailOpen, MessageSquareText,
  RefreshCw, Search, Trash2, Users,
} from "lucide-react";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  emailSent: boolean;
  emailError: string | null;
  createdAt: string;
};

type Stats = { total: number; unread: number; replied: number; archived: number };
type ApiResponse = { success?: boolean; message?: string; enquiries?: Enquiry[]; stats?: Stats };

const statusOptions = [
  { value: "NEW", label: "New" },
  { value: "READ", label: "Read" },
  { value: "REPLIED", label: "Replied" },
  { value: "ARCHIVED", label: "Archived" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ContactMessagesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0, replied: 0, archived: 0 });
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/contact-enquiries", { cache: "no-store" });
      const data = (await response.json()) as ApiResponse;
      if (!response.ok || !data.success) throw new Error(data.message || "Could not load messages.");
      setEnquiries(data.enquiries || []);
      setStats(data.stats || { total: 0, unread: 0, replied: 0, archived: 0 });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enquiries.filter((item) => {
      const matchesFilter = filter === "ALL" || item.status === filter;
      const matchesQuery = !q || [item.name, item.email, item.phone, item.subject, item.message]
        .some((value) => value.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [enquiries, filter, query]);

  async function updateStatus(item: Enquiry, status: string) {
    setBusyId(item.id);
    setError("");
    try {
      const response = await fetch(`/api/admin/contact-enquiries/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Could not update status.");
      if (selected?.id === item.id) setSelected({ ...item, status });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update status.");
    } finally {
      setBusyId(null);
    }
  }

  async function deleteEnquiry(item: Enquiry) {
    if (!window.confirm(`Delete the enquiry from ${item.name}? This cannot be undone.`)) return;
    setBusyId(item.id);
    setError("");
    try {
      const response = await fetch(`/api/admin/contact-enquiries/${item.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Could not delete enquiry.");
      if (selected?.id === item.id) setSelected(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete enquiry.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">Administration</p>
            <h1 className="mt-2 text-2xl font-bold text-[#061a3a] sm:text-3xl">Contact Messages</h1>
            <p className="mt-1 text-sm text-slate-500">Website contact form enquiries and email notification status.</p>
          </div>
          <button onClick={() => void load()} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#061a3a] hover:bg-slate-50">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Total enquiries", value: stats.total, icon: Users },
            { label: "New / unread", value: stats.unread, icon: Mail },
            { label: "Replied", value: stats.replied, icon: Check },
            { label: "Archived", value: stats.archived, icon: Archive },
          ].map((card) => {
            const Icon = card.icon;
            return <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 text-sm text-slate-500"><span>{card.label}</span><Icon className="h-4 w-4 text-[#c31e3b]" /></div>
              <p className="mt-3 text-2xl font-bold text-[#061a3a]">{card.value}</p>
            </div>;
          })}
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row">
            <label className="relative block flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, phone, subject..." className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#061a3a]" />
            </label>
            <label className="relative">
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 outline-none focus:border-[#061a3a]">
                <option value="ALL">All statuses</option>
                {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </label>
          </div>

          {loading ? <div className="p-12 text-center text-sm text-slate-500">Loading contact messages…</div>
          : visible.length === 0 ? <div className="p-12 text-center">
              <MessageSquareText className="mx-auto h-9 w-9 text-slate-300" />
              <p className="mt-3 font-semibold text-[#061a3a]">No contact messages found</p>
              <p className="mt-1 text-sm text-slate-500">{enquiries.length ? "Try another search or status filter." : "New website contact form submissions will appear here."}</p>
            </div>
          : <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr><th className="px-5 py-3">Contact</th><th className="px-5 py-3">Subject / message</th><th className="px-5 py-3">Received</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Email</th><th className="px-5 py-3">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visible.map((item) => <tr key={item.id} className={`align-top hover:bg-slate-50 ${item.status === "NEW" ? "bg-blue-50/30" : ""}`}>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#061a3a]">{item.name}</p>
                      <a className="mt-1 block text-xs text-blue-700 hover:underline" href={`mailto:${item.email}`}>{item.email}</a>
                      <a className="mt-1 block text-xs text-slate-500 hover:underline" href={`tel:${item.phone}`}>{item.phone}</a>
                    </td>
                    <td className="max-w-sm px-5 py-4">
                      <button className="text-left font-semibold text-[#061a3a] hover:underline" onClick={() => { setSelected(item); if (item.status === "NEW") void updateStatus(item, "READ"); }}>{item.subject}</button>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.message}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">{formatDate(item.createdAt)}</td>
                    <td className="px-5 py-4">
                      <select aria-label={`Status for ${item.name}`} disabled={busyId === item.id} value={item.status} onChange={(e) => void updateStatus(item, e.target.value)} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs">
                        {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      {item.emailSent ? <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700"><MailOpen className="h-3.5 w-3.5" /> Sent</span> : <span className="text-xs text-amber-700" title={item.emailError || "Notification not sent"}>Not sent</span>}
                    </td>
                    <td className="px-5 py-4">
                      <button disabled={busyId === item.id} title="Archive" onClick={() => void updateStatus(item, "ARCHIVED")} className="mr-2 rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-[#061a3a] disabled:opacity-50"><Archive className="h-4 w-4" /></button>
                      <button disabled={busyId === item.id} title="Delete" onClick={() => void deleteEnquiry(item)} className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>}
          <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">Showing up to 500 latest enquiries.</div>
        </section>

        {selected && <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#061a3a]/50 p-0 sm:items-center sm:p-6" onClick={() => setSelected(null)}>
          <section role="dialog" aria-modal="true" aria-labelledby="contact-detail-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-widest text-[#c31e3b]">Contact enquiry</p><h2 id="contact-detail-title" className="mt-2 text-xl font-bold text-[#061a3a]">{selected.subject}</h2><p className="mt-1 text-xs text-slate-500">{formatDate(selected.createdAt)}</p></div>
              <button onClick={() => setSelected(null)} aria-label="Close details" className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100">Close</button>
            </div>
            <div className="mt-6 grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
              <div><p className="text-xs text-slate-500">Name</p><p className="mt-1 font-semibold text-[#061a3a]">{selected.name}</p></div>
              <div><p className="text-xs text-slate-500">Phone</p><a className="mt-1 block font-semibold text-blue-700" href={`tel:${selected.phone}`}>{selected.phone}</a></div>
              <div className="sm:col-span-2"><p className="text-xs text-slate-500">Email</p><a className="mt-1 block font-semibold text-blue-700" href={`mailto:${selected.email}`}>{selected.email}</a></div>
            </div>
            <h3 className="mt-6 text-sm font-bold text-[#061a3a]">Message</h3>
            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">{selected.message}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`} className="inline-flex items-center gap-2 rounded-lg bg-[#061a3a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#102b50]"><Mail className="h-4 w-4" /> Reply by email</a>
              <button onClick={() => void updateStatus(selected, "REPLIED")} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#061a3a] hover:bg-slate-50"><Check className="h-4 w-4" /> Mark replied</button>
            </div>
          </section>
        </div>}
      </div>
    </main>
  );
}
