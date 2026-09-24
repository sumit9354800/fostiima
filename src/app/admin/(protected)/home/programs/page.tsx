"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Check,
  Edit3,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

type Program = {
  id: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  href: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  href: string;
  sortOrder: string;
  isActive: boolean;
};

const EMPTY_FORM: FormState = {
  title: "",
  category: "",
  duration: "",
  imageUrl: "",
  href: "",
  sortOrder: "0",
  isActive: true,
};

export default function ProgramsAdminPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>(
    EMPTY_FORM,
  );

  const [preview, setPreview] = useState("");

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const loadPrograms = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/home/programs",
        {
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to load programs.",
        );
      }

      setPrograms(data.programs ?? []);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to load programs.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPrograms();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPreview("");
    setModalOpen(true);
  };

  const openEditModal = (program: Program) => {
    setEditingId(program.id);

    setForm({
      title: program.title,
      category: program.category,
      duration: program.duration,
      imageUrl: program.imageUrl,
      href: program.href,
      sortOrder: String(program.sortOrder),
      isActive: program.isActive,
    });

    setPreview(program.imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving || uploading) return;

    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPreview("");
  };

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const uploadImage = async (
    file: File,
  ) => {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "destination",
        "cloudinary",
      );

      const response = await fetch(
        "/api/admin/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to upload image.",
        );
      }

      if (!data.url) {
        throw new Error(
          "Upload completed but no image URL was returned.",
        );
      }

      updateField("imageUrl", data.url);
      setPreview(data.url);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to upload image.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    uploadImage(file);

    event.target.value = "";
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (saving || uploading) return;

    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }

    if (!form.category.trim()) {
      alert("Category is required.");
      return;
    }

    if (!form.duration.trim()) {
      alert("Duration is required.");
      return;
    }

    if (!form.imageUrl.trim()) {
      alert("Please upload an image.");
      return;
    }

    if (!form.href.trim()) {
      alert("Program link is required.");
      return;
    }

    const sortOrder = Number(
      form.sortOrder,
    );

    if (!Number.isInteger(sortOrder)) {
      alert(
        "Sort order must be a whole number.",
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: form.title.trim(),
        category: form.category.trim(),
        duration: form.duration.trim(),
        imageUrl: form.imageUrl.trim(),
        href: form.href.trim(),
        sortOrder,
        isActive: form.isActive,
      };

      const url = editingId
        ? `/api/admin/home/programs/${editingId}`
        : "/api/admin/home/programs";

      const response = await fetch(url, {
        method: editingId
          ? "PATCH"
          : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to save program.",
        );
      }

      closeModal();
      await loadPrograms();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to save program.",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (
    program: Program,
  ) => {
    try {
      const response = await fetch(
        `/api/admin/home/programs/${program.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            isActive: !program.isActive,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to update status.",
        );
      }

      await loadPrograms();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update status.",
      );
    }
  };

  const deleteProgram = async (
    program: Program,
  ) => {
    const confirmed = window.confirm(
      `Delete "${program.title}"?`,
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/admin/home/programs/${program.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to delete program.",
        );
      }

      await loadPrograms();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete program.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c31e3b]">
              Home CMS
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#123b79]">
              Programs
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage programs displayed on the
              homepage.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#123b79] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0e2f62]"
          >
            <Plus size={18} />
            Add Program
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <Loader2
                className="animate-spin text-[#123b79]"
                size={28}
              />
            </div>
          ) : programs.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <ImagePlus
                  size={22}
                  className="text-slate-400"
                />
              </div>

              <h2 className="text-base font-semibold text-slate-800">
                No programs yet
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add your first program to show it
                on the homepage.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Program
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Category
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Duration
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Order
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {programs.map((program) => (
                    <tr
                      key={program.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={program.imageUrl}
                            alt={program.title}
                            className="h-12 w-16 rounded-lg object-cover"
                          />

                          <div>
                            <p className="font-semibold text-slate-800">
                              {program.title}
                            </p>

                            <p className="mt-0.5 max-w-[280px] truncate text-xs text-slate-400">
                              {program.href}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {program.category}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {program.duration}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-600">
                        {program.sortOrder}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            toggleActive(
                              program,
                            )
                          }
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            program.isActive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <Check size={13} />

                          {program.isActive
                            ? "Active"
                            : "Inactive"}
                        </button>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                program,
                              )
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-[#123b79] hover:text-[#123b79]"
                            aria-label={`Edit ${program.title}`}
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteProgram(
                                program,
                              )
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            aria-label={`Delete ${program.title}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#123b79]">
                  {editingId
                    ? "Edit Program"
                    : "Add Program"}
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Fill in the program details
                  below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={
                  saving || uploading
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Title
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) =>
                      updateField(
                        "title",
                        event.target.value,
                      )
                    }
                    placeholder="MBA"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Category
                  </label>

                  <input
                    type="text"
                    value={form.category}
                    onChange={(event) =>
                      updateField(
                        "category",
                        event.target.value,
                      )
                    }
                    placeholder="Postgraduate"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Duration
                  </label>

                  <input
                    type="text"
                    value={form.duration}
                    onChange={(event) =>
                      updateField(
                        "duration",
                        event.target.value,
                      )
                    }
                    placeholder="2 Years"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Sort Order
                  </label>

                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(event) =>
                      updateField(
                        "sortOrder",
                        event.target.value,
                      )
                    }
                    min={0}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Program Link
                </label>

                <input
                  type="text"
                  value={form.href}
                  onChange={(event) =>
                    updateField(
                      "href",
                      event.target.value,
                    )
                  }
                  placeholder="/programs/mba"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Example: /programs/mba
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Program Image
                </label>

                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  {preview ? (
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={preview}
                        alt="Program preview"
                        className="h-48 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setPreview("");
                          updateField(
                            "imageUrl",
                            "",
                          );
                        }}
                        disabled={uploading}
                        className="absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-white backdrop-blur transition hover:bg-black/80 disabled:opacity-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      disabled={uploading}
                      className="flex w-full flex-col items-center justify-center py-8 text-center"
                    >
                      {uploading ? (
                        <Loader2
                          size={28}
                          className="animate-spin text-[#123b79]"
                        />
                      ) : (
                        <Upload
                          size={28}
                          className="text-slate-400"
                        />
                      )}

                      <span className="mt-2 text-sm font-semibold text-slate-700">
                        {uploading
                          ? "Uploading..."
                          : "Upload Image"}
                      </span>

                      <span className="mt-1 text-xs text-slate-400">
                        PNG, JPG, WEBP or SVG
                      </span>
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={
                      handleFileChange
                    }
                    className="hidden"
                  />

                  {preview && (
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      disabled={uploading}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#123b79] hover:text-[#123b79] disabled:opacity-50"
                    >
                      <Upload size={14} />
                      Replace Image
                    </button>
                  )}
                </div>
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Show on Homepage
                  </p>

                  <p className="text-xs text-slate-400">
                    Inactive programs will not appear
                    on the homepage.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    updateField(
                      "isActive",
                      event.target.checked,
                    )
                  }
                  className="h-4 w-4 accent-[#123b79]"
                />
              </label>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={
                    saving || uploading
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving || uploading
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-[#123b79] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0e2f62] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  )}

                  {editingId
                    ? "Update Program"
                    : "Add Program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}