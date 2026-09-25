"use client";

import {
  ArrowLeft,
  CheckCircle2,
  PlaySquare,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import MediaUploader from "@/components/admin/MediaUploader";

const DEFAULT_VIDEO = "/videos/fostiima-hero.mp4";

export default function HomeHeroAdminPage() {
  const [videoUrl, setVideoUrl] =
    useState(DEFAULT_VIDEO);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadHero() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/home/hero",
        {
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Unable to load hero.",
        );
      }

      if (data?.videoUrl) {
        setVideoUrl(data.videoUrl);
      }
    } catch (error) {
      console.error("Load hero error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load hero settings.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadHero();
  }, []);

  async function handleSave(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      if (!videoUrl.trim()) {
        setError("Hero video is required.");
        return;
      }

      const response = await fetch(
        "/api/admin/home/hero",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoUrl: videoUrl.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Unable to save hero.",
        );
      }

      setVideoUrl(data.videoUrl);
      setMessage(
        "Hero video updated successfully.",
      );
    } catch (error) {
      console.error("Save hero error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to save hero.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        href="/admin/home"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#061a3a]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home Management
      </Link>

      <div className="mt-6 border border-[#dbe3ee] bg-white">
        <div className="border-b border-[#dbe3ee] px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-[#061a3a] text-[#e5b83f]">
              <PlaySquare className="h-5 w-5" />
            </div>

            <div>
              <p className="text-md font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
                Home Page
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[#061a3a]">
                Hero
              </h1>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Manage the background video used in the
            homepage hero section.
          </p>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500 sm:px-8">
            Loading hero settings...
          </div>
        ) : (
          <form
            onSubmit={handleSave}
            className="space-y-6 p-6 sm:p-8"
          >
            {message && (
              <div className="flex items-center gap-2 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                {message}
              </div>
            )}

            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <MediaUploader
              value={videoUrl}
              onChange={setVideoUrl}
              accept="video/mp4,video/webm,video/quicktime"
              label="Hero Video"
              maxSizeMB={100}
            />

            {videoUrl && (
              <div className="overflow-hidden border border-[#dbe3ee] bg-[#071a35]">
                <video
                  key={videoUrl}
                  src={videoUrl}
                  controls
                  muted
                  playsInline
                  className="aspect-video w-full object-cover"
                />
              </div>
            )}

            <div className="flex justify-end border-t border-[#dbe3ee] pt-6">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#061a3a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2854] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Hero"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}