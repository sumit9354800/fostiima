/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  CirclePlus,
  Edit3,
  HelpCircle,
  LoaderCircle,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const categories = [
  "Admissions",
  "Academics",
  "Placements",
  "Campus Life",
  "Student Life",
  "General",
];

const emptyForm = {
  question: "",
  answer: "",
  category: "General",
  sortOrder: 0,
  isActive: true,
};

export default function FAQsAdminPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const loadFAQs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/faqs", {
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load FAQs.");
      }

      setFaqs(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load FAQs."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFAQs();
  }, [loadFAQs]);

  function openCreateForm() {
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: faqs.length });
    setShowForm(true);
    setError("");
  }

  function openEditForm(faq: FAQ) {
    setEditingId(faq.id);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      sortOrder: faq.sortOrder,
      isActive: faq.isActive,
    });
    setShowForm(true);
    setError("");
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = editingId
        ? `/api/admin/faqs/${editingId}`
        : "/api/admin/faqs";

      const response = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save FAQ.");
      }

      closeForm();
      await loadFAQs();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save FAQ."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(faq: FAQ) {
    setError("");

    try {
      const response = await fetch(`/api/admin/faqs/${faq.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !faq.isActive }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update FAQ status.");
      }

      await loadFAQs();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update FAQ status."
      );
    }
  }

  async function deleteFAQ(faq: FAQ) {
    const confirmed = window.confirm(
      `Are you sure you want to delete this FAQ?\n\n${faq.question}`
    );

    if (!confirmed) return;

    setError("");

    try {
      const response = await fetch(`/api/admin/faqs/${faq.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete FAQ.");
      }

      await loadFAQs();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete FAQ."
      );
    }
  }

  async function changeOrder(faq: FAQ, direction: -1 | 1) {
    const ordered = [...faqs].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
    const index = ordered.findIndex((item) => item.id === faq.id);
    const target = ordered[index + direction];

    if (!target) return;

    setError("");

    try {
      const firstResponse = await fetch(`/api/admin/faqs/${faq.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: target.sortOrder }),
      });

      if (!firstResponse.ok) {
        const result = await firstResponse.json();
        throw new Error(result.message || "Failed to change FAQ order.");
      }

      const secondResponse = await fetch(`/api/admin/faqs/${target.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: faq.sortOrder }),
      });

      if (!secondResponse.ok) {
        const result = await secondResponse.json();
        throw new Error(result.message || "Failed to change FAQ order.");
      }

      await loadFAQs();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to change FAQ order."
      );
    }
  }

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()) ||
      faq.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && faq.isActive) ||
      (filter === "inactive" && !faq.isActive);

    return matchesSearch && matchesFilter;
  });

  const activeCount = faqs.filter((faq) => faq.isActive).length;
  const inactiveCount = faqs.length - activeCount;

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="border border-[#dbe3ee] bg-white">
        <div className="flex flex-col gap-5 border-b border-[#dbe3ee] px-6 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#061a3a] text-[#e5b83f]">
              <HelpCircle className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
                Homepage Content
              </p>
              <h1 className="mt-1 text-2xl font-bold text-[#061a3a]">
                FAQ Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage frequently asked questions displayed on your website.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 bg-[#061a3a] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c31e3b]"
          >
            <CirclePlus className="h-4 w-4" />
            Add New FAQ
          </button>
        </div>

        <div className="grid gap-4 border-b border-[#dbe3ee] bg-slate-50/70 p-6 sm:grid-cols-3 sm:p-8">
          <div className="border border-[#dbe3ee] bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Total FAQs</p>
            <p className="mt-2 text-3xl font-bold text-[#061a3a]">
              {faqs.length}
            </p>
          </div>
          <div className="border border-[#dbe3ee] bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Active FAQs</p>
            <p className="mt-2 text-3xl font-bold text-emerald-700">
              {activeCount}
            </p>
          </div>
          <div className="border border-[#dbe3ee] bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Inactive FAQs</p>
            <p className="mt-2 text-3xl font-bold text-[#c31e3b]">
              {inactiveCount}
            </p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mx-6 mt-6 flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:mx-8"
          >
            <span className="font-bold">Error:</span>
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto shrink-0"
              aria-label="Dismiss error"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {showForm && (
          <div className="border-b border-[#dbe3ee] bg-slate-50 p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#061a3a]">
                  {editingId ? "Edit FAQ" : "Create New FAQ"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the question and its answer below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-9 w-9 items-center justify-center border border-[#dbe3ee] bg-white text-slate-600 hover:text-[#c31e3b]"
                aria-label="Close FAQ form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="faq-question"
                  className="mb-2 block text-sm font-semibold text-[#061a3a]"
                >
                  Question <span className="text-[#c31e3b]">*</span>
                </label>
                <textarea
                  id="faq-question"
                  required
                  maxLength={2000}
                  rows={2}
                  value={form.question}
                  onChange={(event) =>
                    setForm({ ...form, question: event.target.value })
                  }
                  placeholder="Enter the frequently asked question"
                  className="w-full border border-[#dbe3ee] bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#061a3a] focus:ring-2 focus:ring-[#061a3a]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="faq-answer"
                  className="mb-2 block text-sm font-semibold text-[#061a3a]"
                >
                  Answer <span className="text-[#c31e3b]">*</span>
                </label>
                <textarea
                  id="faq-answer"
                  required
                  maxLength={20000}
                  rows={5}
                  value={form.answer}
                  onChange={(event) =>
                    setForm({ ...form, answer: event.target.value })
                  }
                  placeholder="Write a clear and helpful answer"
                  className="w-full border border-[#dbe3ee] bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-[#061a3a] focus:ring-2 focus:ring-[#061a3a]/10"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label
                    htmlFor="faq-category"
                    className="mb-2 block text-sm font-semibold text-[#061a3a]"
                  >
                    Category
                  </label>
                  <select
                    id="faq-category"
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value })
                    }
                    className="w-full border border-[#dbe3ee] bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#061a3a]"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    {!categories.includes(form.category) && (
                      <option value={form.category}>{form.category}</option>
                    )}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="faq-order"
                    className="mb-2 block text-sm font-semibold text-[#061a3a]"
                  >
                    Display Order
                  </label>
                  <input
                    id="faq-order"
                    type="number"
                    min={0}
                    step={1}
                    required
                    value={form.sortOrder}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        sortOrder: Number(event.target.value),
                      })
                    }
                    className="w-full border border-[#dbe3ee] bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#061a3a]"
                  />
                </div>

                <div className="flex items-end pb-3">
                  <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#061a3a]">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(event) =>
                        setForm({ ...form, isActive: event.target.checked })
                      }
                      className="h-4 w-4 accent-[#061a3a]"
                    />
                    Show on public website
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-[#dbe3ee] pt-5">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-[#061a3a] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c31e3b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saving ? "Saving..." : editingId ? "Update FAQ" : "Save FAQ"}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="border border-[#dbe3ee] bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex flex-col gap-4 border-b border-[#dbe3ee] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search questions, answers or categories..."
              className="w-full border border-[#dbe3ee] bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none focus:border-[#061a3a]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`border px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === item.value
                    ? "border-[#061a3a] bg-[#061a3a] text-white"
                    : "border-[#dbe3ee] bg-white text-slate-600 hover:border-[#061a3a] hover:text-[#061a3a]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {loading ? (
            <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-slate-500">
              <LoaderCircle className="h-5 w-5 animate-spin" />
              Loading FAQs...
            </div>
          ) : filteredFAQs.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center border border-dashed border-[#dbe3ee] px-5 text-center">
              <HelpCircle className="h-9 w-9 text-slate-300" />
              <h3 className="mt-4 font-bold text-[#061a3a]">
                {faqs.length === 0 ? "No FAQs yet" : "No matching FAQs"}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {faqs.length === 0
                  ? "Create your first FAQ, or import your existing FAQ content into the database."
                  : "Try another search term or change the active status filter."}
              </p>
              {faqs.length === 0 && (
                <button
                  type="button"
                  onClick={openCreateForm}
                  className="mt-4 bg-[#061a3a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#c31e3b]"
                >
                  Add Your First FAQ
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => {
                const position = faqs
                  .slice()
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .findIndex((item) => item.id === faq.id);

                return (
                  <article
                    key={faq.id}
                    className="border border-[#dbe3ee] bg-white transition-colors hover:border-slate-300"
                  >
                    <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-start">
                      <div className="flex min-w-0 flex-1 gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-100 text-[#061a3a]">
                          <HelpCircle className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="border border-[#dbe3ee] bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                              {faq.category}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold ${
                                faq.isActive
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-red-50 text-[#c31e3b]"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  faq.isActive ? "bg-emerald-500" : "bg-red-500"
                                }`}
                              />
                              {faq.isActive ? "Active" : "Inactive"}
                            </span>
                            <span className="text-xs text-slate-400">
                              Order: {faq.sortOrder}
                            </span>
                          </div>

                          <h3 className="font-bold leading-6 text-[#061a3a]">
                            {faq.question}
                          </h3>
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                            {faq.answer}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0">
                        <button
                          type="button"
                          onClick={() => void changeOrder(faq, -1)}
                          disabled={position <= 0}
                          title="Move up"
                          aria-label="Move FAQ up"
                          className="flex h-9 w-9 items-center justify-center border border-[#dbe3ee] text-slate-600 hover:border-[#061a3a] hover:text-[#061a3a] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => void changeOrder(faq, 1)}
                          disabled={position === faqs.length - 1}
                          title="Move down"
                          aria-label="Move FAQ down"
                          className="flex h-9 w-9 items-center justify-center border border-[#dbe3ee] text-slate-600 hover:border-[#061a3a] hover:text-[#061a3a] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => void toggleStatus(faq)}
                          title={faq.isActive ? "Deactivate FAQ" : "Activate FAQ"}
                          aria-label={faq.isActive ? "Deactivate FAQ" : "Activate FAQ"}
                          className={`flex h-9 w-9 items-center justify-center border ${
                            faq.isActive
                              ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                              : "border-slate-200 text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditForm(faq)}
                          title="Edit FAQ"
                          aria-label="Edit FAQ"
                          className="flex h-9 w-9 items-center justify-center border border-[#dbe3ee] text-[#061a3a] hover:border-[#061a3a] hover:bg-slate-50"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => void deleteFAQ(faq)}
                          title="Delete FAQ"
                          aria-label="Delete FAQ"
                          className="flex h-9 w-9 items-center justify-center border border-red-200 text-[#c31e3b] hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
