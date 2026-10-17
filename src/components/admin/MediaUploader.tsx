"use client";

import {
  CheckCircle2,
  CloudUpload,
  Loader2,
  Link2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

type MediaUploaderProps = {
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  label?: string;
  maxSizeMB?: number;
};

const MEDIA_UPLOAD_URL = "https://media.fostiima.org/upload.php";

export default function MediaUploader({
  value,
  onChange,
  accept = "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime",
  label = "Media",
  maxSizeMB = 100,
}: MediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploaded, setUploaded] = useState(false);

  function handleModeChange(nextMode: "url" | "upload") {
    setMode(nextMode);
    setError("");
    setUploaded(false);
    if (nextMode === "upload") onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
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

      // This same-origin endpoint verifies the existing admin session and
      // returns a short-lived HMAC token. The long-term secret stays server-side.
      const tokenResponse = await fetch("/api/admin/upload-token", {
        method: "POST",
        credentials: "same-origin",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok || typeof tokenData.token !== "string") {
        throw new Error(tokenData.error ?? "Unable to authorize upload.");
      }

      const formData = new FormData();
      formData.append("file", file);

      // File bytes go directly to Hostinger, not through the Vercel function.
      const uploadResponse = await fetch(MEDIA_UPLOAD_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${tokenData.token}` },
        body: formData,
        mode: "cors",
      });
      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok || typeof uploadData.url !== "string") {
        throw new Error(uploadData.error ?? "Unable to upload file.");
      }

      onChange(uploadData.url);
      setUploaded(true);
    } catch (uploadError) {
      console.error("Media upload error:", uploadError);
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload file.",
      );
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
      <label className="mb-3 block text-sm font-semibold text-[#061a3a]">
        {label}
      </label>

      <div className="flex border border-[#dbe3ee] bg-[#f8fafc]">
        <button
          type="button"
          onClick={() => handleModeChange("url")}
          className={`flex-1 px-4 py-3 text-sm font-semibold transition ${
            mode === "url"
              ? "bg-[#061a3a] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Link2 className="mr-2 inline h-4 w-4" /> Use media URL
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("upload")}
          className={`flex-1 px-4 py-3 text-sm font-semibold transition ${
            mode === "upload"
              ? "bg-[#061a3a] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Upload className="mr-2 inline h-4 w-4" /> Upload file
        </button>
      </div>

      {mode === "url" && (
        <div className="mt-4">
          <input
            type="url"
            value={value}
            onChange={(event) => {
              setUploaded(false);
              setError("");
              onChange(event.target.value);
            }}
            placeholder="https://media.fostiima.org/uploads/..."
            className="w-full border border-[#dbe3ee] bg-white px-4 py-3 text-sm text-[#061a3a] outline-none transition focus:border-[#061a3a]"
          />
          <p className="mt-2 text-sm text-slate-500">
            Paste a direct image or video URL.
          </p>
        </div>
      )}

      {mode === "upload" && (
        <div className="mt-4">
          <div className="flex items-center gap-3 border border-[#061a3a] bg-[#061a3a] px-4 py-4 text-white">
            <CloudUpload className="h-5 w-5" />
            <div>
              <p className="text-sm font-semibold">Hostinger Media Storage</p>
              <p className="mt-1 text-sm text-slate-300">
                Uploads are stored on your Hostinger hosting.
              </p>
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
              className={`mx-auto flex max-w-sm flex-col items-center justify-center ${
                uploading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              }`}
            >
              {uploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-[#061a3a]" />
              ) : (
                <Upload className="h-8 w-8 text-[#061a3a]" />
              )}
              <p className="mt-3 text-sm font-semibold text-[#061a3a]">
                {uploading ? "Uploading file..." : "Choose a file"}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Maximum {maxSizeMB}MB
              </p>
            </label>
          </div>
        </div>
      )}

      {uploaded && (
        <div className="mt-4 flex items-center justify-between border border-emerald-200 bg-emerald-50 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" /> File uploaded successfully.
          </div>
          <button
            type="button"
            onClick={clearMedia}
            className="text-emerald-700 hover:text-red-600"
            aria-label="Remove uploaded media"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {value && (
        <div className="mt-4 border border-[#dbe3ee] bg-[#f8fafc] p-3">
          <p className="break-all text-sm text-slate-500">{value}</p>
        </div>
      )}

      {error && (
        <div className="mt-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
