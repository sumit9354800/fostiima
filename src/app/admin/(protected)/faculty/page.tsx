/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, Pencil, Trash2, X, Upload, LoaderCircle } from "lucide-react";

type Faculty = {
  id: string;
  name: string;
  slug: string;
  image: string;
  qualification: string;
  experience: string;
  domain: string;
};

type FacultyForm = Omit<Faculty, "id">;

const emptyForm: FacultyForm = {
  name: "",
  slug: "",
  image: "",
  qualification: "",
  experience: "",
  domain: "",
};

const inputClass =
  "mt-2 w-full border border-slate-300 bg-white px-4 py-3 text-sm text-[#061a3a] outline-none focus:border-[#c31e3b]";

export default function AdminFacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [form, setForm] = useState<FacultyForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadFaculty = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/faculty", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Unable to load faculty.");
      setFaculty(data.faculty || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load faculty.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFaculty();
  }, [loadFaculty]);

  function updateField<K extends keyof FacultyForm>(
    field: K,
    value: FacultyForm[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  }

  function editFaculty(item: Faculty) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      slug: item.slug,
      image: item.image,
      qualification: item.qualification,
      experience: item.experience,
      domain: item.domain,
    });
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadImage(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setError("Image size must be 4 MB or less.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Image upload failed.");

      updateField("image", data.url);
      setSuccess("Image uploaded successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function saveFaculty(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = editingId
        ? `/api/admin/faculty/${editingId}`
        : "/api/admin/faculty";

      const response = await fetch(endpoint, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save faculty.");

      setSuccess(editingId ? "Faculty updated successfully." : "Faculty added successfully.");
      resetForm();
      await loadFaculty();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save faculty.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteFaculty(item: Faculty) {
    const confirmed = window.confirm(
      `Delete ${item.name}? This action cannot be undone.`,
    );
    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/admin/faculty/${item.id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Unable to delete faculty.");

      setSuccess(`${item.name} deleted successfully.`);
      if (editingId === item.id) resetForm();
      await loadFaculty();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete faculty.");
    }
  }

  return (
    <main className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#c31e3b]"
          >
            <ArrowLeft size={16} /> Admin Dashboard
          </Link>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
            Content Management
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#061a3a]">Faculty</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage faculty profiles displayed across the website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            document.getElementById("faculty-form")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex h-11 items-center justify-center gap-2 bg-[#c31e3b] px-5 text-sm font-bold text-white transition hover:bg-[#a91832]"
        >
          <Plus size={18} /> Add Faculty
        </button>
      </div>

      {(error || success) && (
        <div
          role="status"
          className={`mb-5 border px-4 py-3 text-sm ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {error || success}
        </div>
      )}

      <section id="faculty-form" className="mb-8 border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#061a3a]">
              {editingId ? "Edit Faculty Member" : "Add Faculty Member"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              All fields are required.
            </p>
          </div>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-slate-500 hover:text-[#c31e3b]" aria-label="Cancel editing">
              <X size={20} />
            </button>
          )}
        </div>

        <form onSubmit={saveFaculty} className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-[#061a3a]">
            Faculty name
            <input className={inputClass} required value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g. Dr. Amit Sharma" />
          </label>

          <label className="text-sm font-semibold text-[#061a3a]">
            URL slug
            <input className={inputClass} required pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} onChange={(e) => updateField("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} placeholder="e.g. amit-sharma" />
            <span className="mt-1 block text-xs font-normal text-slate-500">Profile URL: /faculties/{form.slug || "faculty-slug"}</span>
          </label>

          <label className="text-sm font-semibold text-[#061a3a]">
            Qualification
            <textarea className={inputClass} required rows={3} value={form.qualification} onChange={(e) => updateField("qualification", e.target.value)} placeholder="Degrees and qualifications" />
          </label>

          <label className="text-sm font-semibold text-[#061a3a]">
            Experience
            <input className={inputClass} required value={form.experience} onChange={(e) => updateField("experience", e.target.value)} placeholder="e.g. 15+ years" />
          </label>

          <label className="text-sm font-semibold text-[#061a3a] md:col-span-2">
            Domain / expertise
            <textarea className={inputClass} required rows={3} value={form.domain} onChange={(e) => updateField("domain", e.target.value)} placeholder="Faculty expertise and teaching domains" />
          </label>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-[#061a3a]">
              Faculty photo
              <input
                className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:border-0 file:bg-[#061a3a] file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-[#102b50]"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                disabled={uploading}
                onChange={(e) => {
                  void uploadImage(e.target.files?.[0]);
                  e.currentTarget.value = "";
                }}
              />
            </label>
            {uploading && (
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <LoaderCircle size={16} className="animate-spin" /> Uploading image...
              </p>
            )}
            {form.image && (
              <div className="mt-4 flex items-center gap-4">
                <Image
                  src={form.image}
                  alt="Faculty preview"
                  width={100}
                  height={100}
                  unoptimized
                  className="h-24 w-24 border border-slate-200 object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-green-700">Photo selected</p>
                  <p className="mt-1 break-all text-xs text-slate-500">{form.image}</p>
                  <button type="button" onClick={() => updateField("image", "")} className="mt-2 text-sm font-semibold text-red-600 hover:underline">
                    Remove photo
                  </button>
                </div>
              </div>
            )}
            {!form.image && (
              <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <Upload size={14} /> Upload a photo to Vercel Blob or provide its URL below.
              </p>
            )}
            <input className={inputClass} value={form.image} onChange={(e) => updateField("image", e.target.value)} placeholder="Or paste an image URL" required />
          </div>

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              type="submit"
              disabled={saving || uploading}
              className="inline-flex h-11 items-center justify-center gap-2 bg-[#c31e3b] px-6 text-sm font-bold text-white transition hover:bg-[#a91832] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <LoaderCircle size={17} className="animate-spin" /> : <Plus size={17} />}
              {saving ? "Saving..." : editingId ? "Save Changes" : "Create Faculty"}
            </button>
            <button type="button" onClick={resetForm} className="h-11 border border-slate-300 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Clear Form
            </button>
          </div>
        </form>
      </section>

      <section className="overflow-hidden border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
          <h2 className="font-bold text-[#061a3a]">Faculty Directory</h2>
          <span className="text-sm text-slate-500">{faculty.length} members</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead>
              <tr className="bg-[#061a3a] text-left text-sm text-white">
                <th className="px-5 py-4">Faculty</th>
                <th className="px-5 py-4">Qualification</th>
                <th className="px-5 py-4">Experience</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((item) => (
                <tr key={item.id} className="border-t border-slate-200">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Image src={item.image} alt={item.name} width={56} height={56} unoptimized className="h-14 w-14 shrink-0 border border-slate-200 object-cover" />
                      <div>
                        <p className="font-semibold text-[#061a3a]">{item.name}</p>
                        <p className="mt-1 text-xs text-slate-400">/faculties/{item.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-xs px-5 py-4 text-sm text-slate-600">{item.qualification}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{item.experience}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => editFaculty(item)} className="inline-flex items-center gap-1 text-sm font-bold text-[#c31e3b] hover:underline">
                        <Pencil size={15} /> Edit
                      </button>
                      <button type="button" onClick={() => void deleteFaculty(item)} className="inline-flex items-center gap-1 text-sm font-bold text-red-600 hover:underline">
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && faculty.length === 0 && (
          <div className="px-6 py-14 text-center">
            <p className="font-semibold text-[#061a3a]">No faculty records in the database yet.</p>
            <p className="mt-2 text-sm text-slate-500">Existing hardcoded profiles have not been imported automatically.</p>
          </div>
        )}
        {loading && <p className="px-6 py-10 text-center text-sm text-slate-500">Loading faculty...</p>}
      </section>
    </main>
  );
}
