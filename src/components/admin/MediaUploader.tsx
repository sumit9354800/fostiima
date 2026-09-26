"use client";

import {
CheckCircle2,
Cloud,
Loader2,
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

export default function MediaUploader({
value,
onChange,
accept = "image/*,video/*",
label = "Media",
maxSizeMB = 100,
}: MediaUploaderProps) {
const fileInputRef = useRef<HTMLInputElement>(null);

const [mode, setMode] = useState<"url" | "upload">(
value ? "url" : "url",
);

const [uploading, setUploading] = useState(false);
const [error, setError] = useState("");
const [uploaded, setUploaded] = useState(false);

function handleModeChange(nextMode: "url" | "upload") {
setMode(nextMode);
setError("");
setUploaded(false);


if (nextMode === "url") {
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
} else {
  onChange("");
}


}

function handleUrlChange(nextValue: string) {
setUploaded(false);
setError("");
onChange(nextValue);
}

async function handleFileChange(
event: React.ChangeEvent<HTMLInputElement>,
) {
const file = event.target.files?.[0];


if (!file) {
  return;
}

setError("");
setUploaded(false);

if (file.size > maxSizeMB * 1024 * 1024) {
  setError(
    `File size cannot exceed ${maxSizeMB}MB.`,
  );

  event.target.value = "";
  return;
}

try {
  setUploading(true);

  const formData = new FormData();

  formData.append("file", file);

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
      data.error ?? "Unable to upload file.",
    );
  }

  onChange(data.url);
  setUploaded(true);
} catch (error) {
  console.error("Cloudinary upload error:", error);

  setError(
    error instanceof Error
      ? error.message
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


if (fileInputRef.current) {
  fileInputRef.current.value = "";
}

}

return ( <div> <label className="mb-3 block text-sm font-semibold text-[#061a3a]">
{label} </label>

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
      Use Cloudinary URL
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
      Upload to Cloudinary
    </button>
  </div>

  {mode === "url" && (
    <div className="mt-4">
      <input
        type="url"
        value={value}
        onChange={(event) =>
          handleUrlChange(event.target.value)
        }
        placeholder="https://res.cloudinary.com/..."
        className="w-full border border-[#dbe3ee] bg-white px-4 py-3 text-sm text-[#061a3a] outline-none transition focus:border-[#061a3a]"
      />

      <p className="mt-2 text-md text-slate-500">
        Use a Cloudinary URL or another direct media URL.
      </p>
    </div>
  )}

  {mode === "upload" && (
    <div className="mt-4">
      <div className="flex items-center gap-3 border border-[#061a3a] bg-[#061a3a] px-4 py-4 text-white">
        <Cloud className="h-5 w-5" />

        <div>
          <p className="text-sm font-semibold">
            Cloudinary
          </p>

          <p className="mt-1 text-md text-slate-300">
            All uploaded media is stored on Cloudinary.
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
          className={`mx-auto flex max-w-sm cursor-pointer flex-col items-center justify-center ${
            uploading
              ? "cursor-not-allowed opacity-60"
              : ""
          }`}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-[#061a3a]" />
          ) : (
            <Upload className="h-8 w-8 text-[#061a3a]" />
          )}

          <p className="mt-3 text-sm font-semibold text-[#061a3a]">
            {uploading
              ? "Uploading to Cloudinary..."
              : "Choose a file"}
          </p>

          <p className="mt-1 text-md text-slate-400">
            Maximum {maxSizeMB}MB
          </p>
        </label>
      </div>
    </div>
  )}

  {uploaded && (
    <div className="mt-4 flex items-center justify-between border border-emerald-200 bg-emerald-50 px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-emerald-700">
        <CheckCircle2 className="h-4 w-4" />
        File uploaded to Cloudinary successfully.
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
      <p className="break-all text-md text-slate-500">
        {value}
      </p>
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
