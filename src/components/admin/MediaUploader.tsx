"use client";

import { CheckCircle2, Link2, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

type MediaUploaderProps = {
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  label?: string;
  maxSizeMB?: number;
};

const DEFAULT_ACCEPT = "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime";

export default function MediaUploader({
  value,
  onChange,
  accept = DEFAULT_ACCEPT,
  label = "Media",
  maxSizeMB = 100,
}: MediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"url" | "upload">("upload");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploaded, setUploaded] = useState(false);

  function handleModeChange(nextMode: "url" | "upload") {
    setMode(nextMode);
    setError("");
    setUploaded(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleUrlChange(nextValue: string) {
    setUploaded(false);
    setError("");
    onChange(nextValue);
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setUploaded(false);

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size cannot exceed ${maxSizeMB}MB.`);
      event.target.value = "";
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to upload file.");
      }

      // The returned value is a local path, e.g. /uploads/images/<filename>.jpg.
      // Existing form save APIs continue persisting this string in MySQL as before.
      onChange(data.url);
      setUploaded(true);
    } catch (uploadError) {
      console.error("Local media upload error:", uploadError);
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload file.");
    } finally {
      setUploading(false);
    }
  }

  function clearMedia() {
    onChange("");
    setUploaded(false);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-[#061a3a]">{label}</label>

      <div className="flex border border-[#dbe3ee] bg-[#f8fafc]">
        <button
          type="button"
          onClick={() => handleModeChange("upload")}
          className={`flex-1 px-4 py-3 text-sm font-semibold transition ${mode === "upload" ? "bg-[#061a3a] text-white" : "text-slate-600 hover:bg-slate-100"}`}
        >
          Upload to Website
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("url")}
          className={`flex-1 px-4 py-3 text-sm font-semibold transition ${mode === "url" ? "bg-[#061a3a] text-white" : "text-slate-600 hover:bg-slate-100"}`}
        >
          Use Existing URL
        </button>
      </div>

      {mode === "url" && (
        <div className="mt-4">
          <div className="relative">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={value}
              onChange={(event) => handleUrlChange(event.target.value)}
              placeholder="/uploads/images/photo.webp or https://..."
              className="w-full border border-[#dbe3ee] bg-white py-3 pl-10 pr-4 text-sm text-[#061a3a] outline-none transition focus:border-[#061a3a]"
            />
          </div>
          <p className="mt-2 text-sm text-slate-500">Use a local public path or an existing external URL. Existing Cloudinary URLs remain supported.</p>
        </div>
      )}

      {mode === "upload" && (
        <div className="mt-4">
          <div className="flex items-center gap-3 border border-[#061a3a] bg-[#061a3a] px-4 py-4 text-white">
            <Upload className="h-5 w-5" />
            <div>
              <p className="text-sm font-semibold">Website storage</p>
              <p className="mt-1 text-sm text-slate-300">Files are saved under public/uploads and served from your website domain.</p>
            </div>
          </div>

          <div className="mt-4 border border-dashed border-[#cbd5e1] bg-white p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
              id="admin-media-upload"
            />
            <label
              htmlFor="admin-media-upload"
              className={`mx-auto flex max-w-sm flex-col items-center justify-center ${uploading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
            >
              {uploading ? <Loader2 className="h-8 w-8 animate-spin text-[#061a3a]" /> : <Upload className="h-8 w-8 text-[#061a3a]" />}
              <p className="mt-3 text-sm font-semibold text-[#061a3a]">{uploading ? "Saving to website..." : "Choose a file"}</p>
              <p className="mt-1 text-sm text-slate-400">JPG, PNG, WebP, GIF, MP4, WebM, MOV · Maximum {maxSizeMB}MB</p>
            </label>
          </div>
        </div>
      )}

      {uploaded && (
        <div className="mt-4 flex items-center justify-between border border-emerald-200 bg-emerald-50 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            File saved to public/uploads successfully.
          </div>
          <button type="button" onClick={clearMedia} className="text-emerald-700 hover:text-red-600" aria-label="Remove selected media">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {value && (
        <div className="mt-4 border border-[#dbe3ee] bg-[#f8fafc] p-3">
          <p className="break-all text-sm text-slate-500">{value}</p>
        </div>
      )}

      {error && <div className="mt-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
    </div>
  );
}
