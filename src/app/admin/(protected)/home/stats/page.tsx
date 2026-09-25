"use client";

import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  Medal,
  Pencil,
  Plus,
  Save,
  Target,
  Trash2,
  TrendingUp,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type Stat = {
  id: string;
  value: string;
  label: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
};

type StatForm = {
  value: string;
  label: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
};

const ICONS = [
  { name: "TrendingUp", component: TrendingUp },
  { name: "Medal", component: Medal },
  { name: "GraduationCap", component: GraduationCap },
  { name: "Landmark", component: Landmark },
  { name: "Users", component: Users },
  { name: "BriefcaseBusiness", component: BriefcaseBusiness },
  { name: "Target", component: Target },
  { name: "Award", component: Award },
  { name: "Trophy", component: Trophy },
] as const;

const EMPTY_FORM: StatForm = {
  value: "",
  label: "",
  icon: "TrendingUp",
  sortOrder: 0,
  isActive: true,
};

function getIconComponent(iconName: string) {
  return (
    ICONS.find((item) => item.name === iconName)?.component ??
    TrendingUp
  );
}

export default function StatsAdminPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<StatForm>(EMPTY_FORM);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadStats = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/home/stats", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to load stats.");
      }

      setStats(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load stats.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadStats();
  }, []);

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      ...EMPTY_FORM,
      sortOrder: stats.length,
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const openEditModal = (stat: Stat) => {
    setEditingId(stat.id);

    setForm({
      value: stat.value,
      label: stat.label,
      icon: stat.icon,
      sortOrder: stat.sortOrder,
      isActive: stat.isActive,
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        value: form.value.trim(),
        label: form.label.trim(),
        icon: form.icon,
        sortOrder: Number(form.sortOrder),
        isActive: form.isActive,
      };

      const response = await fetch(
        editingId
          ? `/api/admin/home/stats/${editingId}`
          : "/api/admin/home/stats",
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Unable to save stat.",
        );
      }

      setSuccess(
        editingId
          ? "Stat updated successfully."
          : "Stat created successfully.",
      );

      await loadStats();

      setModalOpen(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save stat.",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (stat: Stat) => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/home/stats/${stat.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: stat.value,
            label: stat.label,
            icon: stat.icon,
            sortOrder: stat.sortOrder,
            isActive: !stat.isActive,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Unable to update status.",
        );
      }

      setStats((current) =>
        current.map((item) =>
          item.id === stat.id
            ? {
                ...item,
                isActive: !item.isActive,
              }
            : item,
        ),
      );

      setSuccess(
        `Stat ${
          !stat.isActive ? "activated" : "hidden"
        } successfully.`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update status.",
      );
    }
  };

  const deleteStat = async (stat: Stat) => {
    const confirmed = window.confirm(
      `Delete "${stat.label}" permanently?`,
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/home/stats/${stat.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Unable to delete stat.",
        );
      }

      setStats((current) =>
        current.filter((item) => item.id !== stat.id),
      );

      setSuccess("Stat deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete stat.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-md font-semibold uppercase tracking-[0.16em] text-[#64748b]">
              Home Management
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl">
              Stats
            </h1>

            <p className="mt-1 text-sm text-[#64748b]">
              Manage the statistics displayed on the homepage.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d2d59] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123a70]"
          >
            <Plus size={18} />
            Add Stat
          </button>
        </div>

        {/* ALERTS */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* CONTENT */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#0d2d59]" />
            </div>
          ) : stats.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <TrendingUp
                  size={26}
                  className="text-slate-500"
                />
              </div>

              <h2 className="text-base font-semibold text-slate-900">
                No stats found
              </h2>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Add your first homepage statistic to get
                started.
              </p>

              <button
                type="button"
                onClick={openAddModal}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0d2d59] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Plus size={17} />
                Add Stat
              </button>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[760px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="w-20 px-5 py-3 text-left text-md font-semibold uppercase tracking-wide text-slate-500">
                        Order
                      </th>

                      <th className="px-5 py-3 text-left text-md font-semibold uppercase tracking-wide text-slate-500">
                        Stat
                      </th>

                      <th className="px-5 py-3 text-left text-md font-semibold uppercase tracking-wide text-slate-500">
                        Icon
                      </th>

                      <th className="px-5 py-3 text-left text-md font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="w-32 px-5 py-3 text-right text-md font-semibold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {stats.map((stat) => {
                      const Icon = getIconComponent(
                        stat.icon,
                      );

                      return (
                        <tr
                          key={stat.id}
                          className="transition hover:bg-slate-50/70"
                        >
                          <td className="px-5 py-4">
                            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-slate-100 px-2 text-sm font-semibold text-slate-700">
                              {stat.sortOrder}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <div>
                              <p className="text-lg font-bold text-[#0f172a]">
                                {stat.value}
                              </p>

                              <p className="mt-0.5 text-sm text-slate-500">
                                {stat.label}
                              </p>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d6a900]/30 bg-[#fffaf0] text-[#b88600]">
                              <Icon size={19} />
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <button
                              type="button"
                              onClick={() =>
                                toggleActive(stat)
                              }
                              className="inline-flex items-center gap-2"
                              aria-label={`${
                                stat.isActive
                                  ? "Hide"
                                  : "Show"
                              } ${stat.label}`}
                            >
                              <span
                                className={`relative h-6 w-11 rounded-full transition ${
                                  stat.isActive
                                    ? "bg-emerald-500"
                                    : "bg-slate-300"
                                }`}
                              >
                                <span
                                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                                    stat.isActive
                                      ? "left-6"
                                      : "left-1"
                                  }`}
                                />
                              </span>

                              <span
                                className={`text-md font-medium ${
                                  stat.isActive
                                    ? "text-emerald-600"
                                    : "text-slate-500"
                                }`}
                              >
                                {stat.isActive
                                  ? "Active"
                                  : "Hidden"}
                              </span>
                            </button>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  openEditModal(stat)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-[#0d2d59] hover:bg-slate-50 hover:text-[#0d2d59]"
                                aria-label={`Edit ${stat.label}`}
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  deleteStat(stat)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
                                aria-label={`Delete ${stat.label}`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS */}
              <div className="divide-y divide-slate-100 md:hidden">
                {stats.map((stat) => {
                  const Icon = getIconComponent(
                    stat.icon,
                  );

                  return (
                    <div
                      key={stat.id}
                      className="p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d6a900]/30 bg-[#fffaf0] text-[#b88600]">
                          <Icon size={20} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-lg font-bold text-slate-900">
                                {stat.value}
                              </p>

                              <p className="text-sm text-slate-500">
                                {stat.label}
                              </p>
                            </div>

                            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-slate-100 px-2 text-md font-semibold text-slate-600">
                              #{stat.sortOrder}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() =>
                                toggleActive(stat)
                              }
                              className="inline-flex items-center gap-2"
                            >
                              <span
                                className={`relative h-6 w-11 rounded-full transition ${
                                  stat.isActive
                                    ? "bg-emerald-500"
                                    : "bg-slate-300"
                                }`}
                              >
                                <span
                                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                                    stat.isActive
                                      ? "left-6"
                                      : "left-1"
                                  }`}
                                />
                              </span>

                              <span className="text-md font-medium text-slate-500">
                                {stat.isActive
                                  ? "Active"
                                  : "Hidden"}
                              </span>
                            </button>

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  openEditModal(stat)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600"
                                aria-label="Edit"
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  deleteStat(stat)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500"
                                aria-label="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingId ? "Edit Stat" : "Add Stat"}
                </h2>

                <p className="mt-0.5 text-md text-slate-500">
                  {editingId
                    ? "Update this homepage statistic."
                    : "Create a new homepage statistic."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >
              {/* VALUE */}
              <div>
                <label
                  htmlFor="stat-value"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Value
                </label>

                <input
                  id="stat-value"
                  type="text"
                  value={form.value}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      value: event.target.value,
                    }))
                  }
                  placeholder="₹30 LPA"
                  maxLength={50}
                  required
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0d2d59] focus:ring-2 focus:ring-[#0d2d59]/10"
                />
              </div>

              {/* LABEL */}
              <div>
                <label
                  htmlFor="stat-label"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Label
                </label>

                <input
                  id="stat-label"
                  type="text"
                  value={form.label}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      label: event.target.value,
                    }))
                  }
                  placeholder="Highest Package"
                  maxLength={100}
                  required
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0d2d59] focus:ring-2 focus:ring-[#0d2d59]/10"
                />
              </div>

              {/* ICON */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Icon
                </label>

                <div className="grid grid-cols-5 gap-2">
                  {ICONS.map((item) => {
                    const Icon = item.component;
                    const selected =
                      form.icon === item.name;

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            icon: item.name,
                          }))
                        }
                        title={item.name}
                        className={`flex h-11 items-center justify-center rounded-xl border transition ${
                          selected
                            ? "border-[#0d2d59] bg-[#0d2d59] text-white"
                            : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Icon size={19} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ORDER + STATUS */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="stat-order"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Sort Order
                  </label>

                  <input
                    id="stat-order"
                    type="number"
                    min={0}
                    max={999}
                    value={form.sortOrder}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        sortOrder: Number(
                          event.target.value,
                        ),
                      }))
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-[#0d2d59] focus:ring-2 focus:ring-[#0d2d59]/10"
                  />
                </div>

                <div>
                  <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Visibility
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        isActive: !current.isActive,
                      }))
                    }
                    className="flex h-[42px] w-full items-center gap-2 rounded-xl border border-slate-200 px-3.5 text-sm"
                  >
                    <span
                      className={`relative h-6 w-11 rounded-full transition ${
                        form.isActive
                          ? "bg-emerald-500"
                          : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                          form.isActive
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </span>

                    <span className="font-medium text-slate-600">
                      {form.isActive
                        ? "Visible"
                        : "Hidden"}
                    </span>
                  </button>
                </div>
              </div>

              {/* FORM ACTIONS */}
              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d2d59] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123a70] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingId ? (
                        <Save size={17} />
                      ) : (
                        <Plus size={17} />
                      )}

                      {editingId
                        ? "Save Changes"
                        : "Create Stat"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}