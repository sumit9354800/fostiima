"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ExternalLink,
  Pencil,
  Play,
  Plus,
  Trash2,
  Video,
  X,
} from "lucide-react";

type PlacementVideo = {
  id: string;
  youtubeId: string;
  title: string;
  batch: string;
  sortOrder: number;
  isActive: boolean;
};

type FormData = {
  youtubeId: string;
  title: string;
  batch: string;
  sortOrder: number;
  isActive: boolean;
};

const INITIAL_FORM: FormData = {
  youtubeId: "",
  title: "",
  batch: "",
  sortOrder: 1,
  isActive: true,
};

function extractYouTubeId(value: string) {
  const input = value.trim();

  if (!input) return "";

  // Direct YouTube ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  try {
    const url = new URL(input);

    // youtube.com/watch?v=...
    const queryId = url.searchParams.get("v");

    if (queryId && /^[a-zA-Z0-9_-]{11}$/.test(queryId)) {
      return queryId;
    }

    // youtu.be/...
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0];

      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
        return id;
      }
    }

    // youtube.com/embed/...
    const parts = url.pathname.split("/").filter(Boolean);
    const embedIndex = parts.indexOf("embed");

    if (embedIndex !== -1 && parts[embedIndex + 1]) {
      const id = parts[embedIndex + 1];

      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) {
        return id;
      }
    }

    // youtube.com/shorts/...
    const shortsIndex = parts.indexOf("shorts");

    if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
      const id = parts[shortsIndex + 1];

      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) {
        return id;
      }
    }
  } catch {
    return "";
  }

  return "";
}

export default function PlacementVideosAdminPage() {
  const [videos, setVideos] = useState<PlacementVideo[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>(INITIAL_FORM);

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/home/placement-videos",
        {
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to fetch placement videos.",
        );
      }

      setVideos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("[ADMIN_PLACEMENT_VIDEOS_FETCH]", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to fetch placement videos.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchVideos();
  }, []);

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      ...INITIAL_FORM,
      sortOrder: videos.length + 1,
    });

    setIsModalOpen(true);
  };

  const openEditModal = (video: PlacementVideo) => {
    setEditingId(video.id);

    setForm({
      youtubeId: video.youtubeId,
      title: video.title,
      batch: video.batch,
      sortOrder: video.sortOrder,
      isActive: video.isActive,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setIsModalOpen(false);
    setEditingId(null);
    setForm(INITIAL_FORM);
  };

  const handleChange = (
    field: keyof FormData,
    value: string | number | boolean,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const youtubeId = extractYouTubeId(form.youtubeId);

    if (!youtubeId) {
      alert(
        "Please enter a valid YouTube video URL or 11-character YouTube video ID.",
      );
      return;
    }

    if (!form.title.trim()) {
      alert("Please enter video title.");
      return;
    }

    if (!form.batch.trim()) {
      alert("Please enter batch.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        youtubeId,
        title: form.title.trim(),
        batch: form.batch.trim(),
        sortOrder: Number(form.sortOrder),
        isActive: form.isActive,
      };

      const url = editingId
        ? `/api/admin/home/placement-videos/${editingId}`
        : "/api/admin/home/placement-videos";

      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Failed to save placement video.",
        );
      }

      closeModal();

      await fetchVideos();
    } catch (error) {
      console.error("[ADMIN_PLACEMENT_VIDEO_SAVE]", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to save placement video.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (
    id: string,
    currentStatus: boolean,
  ) => {
    try {
      const response = await fetch(
        `/api/admin/home/placement-videos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: !currentStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to update video status.",
        );
      }

      await fetchVideos();
    } catch (error) {
      console.error("[ADMIN_PLACEMENT_VIDEO_TOGGLE]", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update video status.",
      );
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this placement video?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/admin/home/placement-videos/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to delete placement video.",
        );
      }

      await fetchVideos();
    } catch (error) {
      console.error("[ADMIN_PLACEMENT_VIDEO_DELETE]", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete placement video.",
      );
    }
  };

  return (
    <div className="min-h-full bg-[#f8fafc] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-1 text-md font-bold uppercase tracking-[0.18em] text-[#64748b]">
              Home Management
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-[#0b2145]">
              Placement Videos
            </h1>

            <p className="mt-1 text-sm text-[#64748b]">
              Manage placement experience videos displayed on
              the homepage.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b2a55] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123b79]"
          >
            <Plus size={18} />
            Add Video
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[70px_1.7fr_1.3fr_100px_150px_110px] items-center border-b border-slate-200 bg-[#fbfcff] px-5 py-4 text-md font-bold uppercase tracking-wide text-slate-500 md:grid">
            <div>Order</div>
            <div>Video</div>
            <div>Batch</div>
            <div>Status</div>
            <div>Actions</div>
            <div />
          </div>

          {loading ? (
            <div className="px-6 py-14 text-center text-sm text-slate-500">
              Loading placement videos...
            </div>
          ) : videos.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <Video
                size={38}
                className="mx-auto mb-3 text-slate-300"
              />

              <p className="font-semibold text-slate-700">
                No placement videos found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Add your first placement video.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="grid gap-4 px-5 py-5 md:grid-cols-[70px_1.7fr_1.3fr_100px_150px_110px] md:items-center"
                >
                  {/* ORDER */}
                  <div className="text-sm font-semibold text-slate-600">
                    #{video.sortOrder}
                  </div>

                  {/* VIDEO */}
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <img
                        src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#0b2a55] shadow">
                          <Play
                            size={14}
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#123b79]">
                        {video.title}
                      </p>

                      <p className="mt-1 truncate text-md text-slate-400">
                        {video.youtubeId}
                      </p>
                    </div>
                  </div>

                  {/* BATCH */}
                  <div className="text-sm text-slate-600">
                    {video.batch}
                  </div>

                  {/* STATUS */}
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(
                          video.id,
                          video.isActive,
                        )
                      }
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-md font-semibold ${
                        video.isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {video.isActive && <Check size={13} />}
                      {video.isActive
                        ? "Active"
                        : "Inactive"}
                    </button>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(video)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-md font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                      aria-label="Open YouTube video"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>

                  {/* DELETE */}
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(video.id)
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
                      aria-label="Delete video"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-md font-bold uppercase tracking-[0.16em] text-[#64748b]">
                  Home Management
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#0b2145]">
                  {editingId
                    ? "Edit Placement Video"
                    : "Add Placement Video"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {/* YOUTUBE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  YouTube Video URL / ID
                </label>

                <input
                  type="text"
                  value={form.youtubeId}
                  onChange={(event) =>
                    handleChange(
                      "youtubeId",
                      event.target.value,
                    )
                  }
                  placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
                />

                <p className="mt-1.5 text-md text-slate-400">
                  You can paste the complete YouTube URL or
                  the 11-character video ID.
                </p>

                {extractYouTubeId(form.youtubeId) && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <img
                      src={`https://i.ytimg.com/vi/${extractYouTubeId(
                        form.youtubeId,
                      )}/hqdefault.jpg`}
                      alt="YouTube preview"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* TITLE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Video Title
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    handleChange(
                      "title",
                      event.target.value,
                    )
                  }
                  placeholder="Student Placement Experience"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
                />
              </div>

              {/* BATCH */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Batch
                </label>

                <input
                  type="text"
                  value={form.batch}
                  onChange={(event) =>
                    handleChange(
                      "batch",
                      event.target.value,
                    )
                  }
                  placeholder="PGDM Placement Batch 2023 - 2025"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
                />
              </div>

              {/* ORDER + STATUS */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Sort Order
                  </label>

                  <input
                    type="number"
                    min={0}
                    value={form.sortOrder}
                    onChange={(event) =>
                      handleChange(
                        "sortOrder",
                        Number(event.target.value),
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Status
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      handleChange(
                        "isActive",
                        !form.isActive,
                      )
                    }
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      form.isActive
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-50 text-slate-500"
                    }`}
                  >
                    <span>
                      {form.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                    <span
                      className={`h-5 w-9 rounded-full p-0.5 transition ${
                        form.isActive
                          ? "bg-emerald-500"
                          : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`block h-4 w-4 rounded-full bg-white shadow transition ${
                          form.isActive
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      />
                    </span>
                  </button>
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0b2a55] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123b79] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    "Saving..."
                  ) : editingId ? (
                    <>
                      <Check size={17} />
                      Update Video
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Add Video
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