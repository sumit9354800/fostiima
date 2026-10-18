
import { put } from "@vercel/blob";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Vercel Function request body limit is approximately 4.5 MB.
// Use client uploads for larger files.
const MAX_FILE_SIZE = 4 * 1024 * 1024;

const ALLOWED_TYPES: Record<
  string,
  { extension: string; folder: "images" | "videos" }
> = {
  "image/jpeg": { extension: "jpg", folder: "images" },
  "image/png": { extension: "png", folder: "images" },
  "image/webp": { extension: "webp", folder: "images" },
  "image/gif": { extension: "gif", folder: "images" },
  "video/mp4": { extension: "mp4", folder: "videos" },
  "video/webm": { extension: "webm", folder: "videos" },
  "video/quicktime": { extension: "mov", folder: "videos" },
};

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (
      !session?.user ||
      session.user.role !== "admin" ||
      session.user.banned
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file was provided." },
        { status: 400 },
      );
    }

    const fileType = ALLOWED_TYPES[file.type];

    if (!fileType) {
      return NextResponse.json(
        { error: "Unsupported file type. Use JPG, PNG, WebP, GIF, MP4, WebM, or MOV." },
        { status: 415 },
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "The selected file is empty." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size must not exceed 4 MB. Larger uploads need the direct-upload flow." },
        { status: 413 },
      );
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not configured.");
      return NextResponse.json(
        { error: "Blob storage is not configured." },
        { status: 503 },
      );
    }

    const fileName = `${Date.now()}.${fileType.extension}`;
    const blob = await put(
      `${fileType.folder}/${fileName}`,
      file,
      {
        access: "public",
        addRandomSuffix: true,
        contentType: file.type,
      },
    );

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      destination: "vercel-blob",
      originalFileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    });
  } catch (error) {
    console.error("[ADMIN_BLOB_UPLOAD_FAILURE]", error);

    return NextResponse.json(
      { error: "Unable to upload file to storage. Please try again." },
      { status: 500 },
    );
  }
}
