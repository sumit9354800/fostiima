"use client";

import {
  ArrowLeft,
  CheckCircle2,
  Save,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Highlight = {
  id: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
};

type AboutData = {
  id: string;
  eyebrow: string;
  title: string;
  description1: string;
  description2: string | null;
  isActive: boolean;
  highlights: Highlight[];
};

const EMPTY_DATA: AboutData = {
  id: "",
  eyebrow: "",
  title: "",
  description1: "",
  description2: "",
  isActive: true,
  highlights: [],
};

const ICON_OPTIONS = [
  "Landmark",
  "ShieldCheck",
  "Award",
  "GraduationCap",
  "BriefcaseBusiness",
  "Building2",
];

export default function AboutAdminPage() {
  const [data, setData] = useState<AboutData>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadAbout() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/home/about", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ?? "Unable to load About section.",
        );
      }

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load About section.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadAbout();
  }, []);

  function updateField<K extends keyof AboutData>(
    field: K,
    value: AboutData[K],
  ) {
    setData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateHighlight(
    id: string,
    field: keyof Highlight,
    value: string | number | boolean,
  ) {
    setData((current) => ({
      ...current,
      highlights: current.highlights.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  }

  function addHighlight() {
    setData((current) => ({
      ...current,
      highlights: [
        ...current.highlights,
        {
          id: `new-${Date.now()}`,
          title: "",
          description: "",
          icon: "Building2",
          sortOrder: current.highlights.length,
          isActive: true,
        },
      ],
    }));
  }

  function removeHighlight(id: string) {
    setData((current) => ({
      ...current,
      highlights: current.highlights
        .filter((item) => item.id !== id)
        .map((item, index) => ({
          ...item,
          sortOrder: index,
        })),
    }));
  }

  async function saveAbout() {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await fetch("/api/admin/home/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eyebrow: data.eyebrow,
          title: data.title,
          description1: data.description1,
          description2: data.description2 ?? "",
          isActive: data.isActive,
          highlights: data.highlights.map((item, index) => ({
            title: item.title,
            description: item.description,
            icon: item.icon,
            sortOrder: index,
            isActive: item.isActive,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ?? "Unable to save About section.",
        );
      }

      setData(result);
      setMessage("About section updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save About section.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        <p className="text-sm text-slate-500">
          Loading About section...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        href="/admin/home"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#061a3a]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home Management
      </Link>

      <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-md font-bold uppercase tracking-[0.18em] text-slate-500">
            Home Management
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#061a3a]">
            About
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage About FOSTIIMA content and homepage highlights.
          </p>
        </div>

        <button
          type="button"
          onClick={saveAbout}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#061a3a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b2854] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && (
        <div className="mt-6 flex items-center gap-2 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          {message}
        </div>
      )}

      {error && (
        <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 space-y-6">
        <section className="border border-[#dbe3ee] bg-white p-6">
          <h2 className="text-lg font-bold text-[#061a3a]">
            Main Content
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Eyebrow
              </label>

              <input
                value={data.eyebrow}
                onChange={(event) =>
                  updateField("eyebrow", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#061a3a]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Title
              </label>

              <input
                value={data.title}
                onChange={(event) =>
                  updateField("title", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#061a3a]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Description 1
              </label>

              <textarea
                value={data.description1}
                onChange={(event) =>
                  updateField("description1", event.target.value)
                }
                rows={7}
                className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-[#061a3a]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Description 2
              </label>

              <textarea
                value={data.description2 ?? ""}
                onChange={(event) =>
                  updateField("description2", event.target.value)
                }
                rows={7}
                className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-[#061a3a]"
              />
            </div>

            <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={data.isActive}
                onChange={(event) =>
                  updateField("isActive", event.target.checked)
                }
                className="h-4 w-4"
              />
              Show About section on homepage
            </label>
          </div>
        </section>

        <section className="border border-[#dbe3ee] bg-white p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-[#061a3a]">
                Highlights
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage the six information cards displayed beside the
                About content.
              </p>
            </div>

            <button
              type="button"
              onClick={addHighlight}
              className="rounded-lg border border-[#061a3a] px-4 py-2 text-sm font-semibold text-[#061a3a] hover:bg-slate-50"
            >
              + Add Highlight
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {data.highlights.map((item, index) => (
              <div
                key={item.id}
                className="border border-slate-200 p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#061a3a]">
                    Highlight {index + 1}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeHighlight(item.id)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Title
                    </label>

                    <input
                      value={item.title}
                      onChange={(event) =>
                        updateHighlight(
                          item.id,
                          "title",
                          event.target.value,
                        )
                      }
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#061a3a]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Icon
                    </label>

                    <select
                      value={item.icon}
                      onChange={(event) =>
                        updateHighlight(
                          item.id,
                          "icon",
                          event.target.value,
                        )
                      }
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#061a3a]"
                    >
                      {ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <textarea
                      value={item.description}
                      onChange={(event) =>
                        updateHighlight(
                          item.id,
                          "description",
                          event.target.value,
                        )
                      }
                      rows={4}
                      className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-[#061a3a]"
                    />
                  </div>

                  <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={item.isActive}
                      onChange={(event) =>
                        updateHighlight(
                          item.id,
                          "isActive",
                          event.target.checked,
                        )
                      }
                      className="h-4 w-4"
                    />
                    Active
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}