import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 100 * 1024 * 1024;

// Extensions are selected from the verified MIME type, not the uploaded filename.
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

async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin" || session.user.banned) {
    return null;
  }

  return session;
}

export async function POST(request: Request) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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
        {
          error:
            "Unsupported file type. Upload JPG, PNG, WebP, GIF, MP4, WebM, or MOV files.",
        },
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
        { error: "File size cannot exceed 100MB." },
        { status: 413 },
      );
    }

    // Save directly into the project's public directory so Next.js serves the file
    // at the returned root-relative URL. A UUID prevents name collisions/path traversal.
    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      fileType.folder,
    );
    await mkdir(uploadDirectory, { recursive: true });

    const fileName = `${Date.now()}-${randomUUID()}.${fileType.extension}`;
    const absolutePath = path.join(uploadDirectory, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(absolutePath, buffer, { flag: "wx" });

    const url = `/uploads/${fileType.folder}/${fileName}`;

    return NextResponse.json({
      success: true,
      url,
      destination: "public",
      fileName,
      originalFileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    });
  } catch (error) {
    const err = error as NodeJS.ErrnoException;

    // Log detailed diagnostics on the server.
    console.error("[ADMIN_LOCAL_UPLOAD_FAILURE]", {
      code: err?.code ?? "UNKNOWN",
      syscall: err?.syscall ?? "UNKNOWN",
      message: err?.message ?? "Unknown upload error",
    });

    // Return only safe diagnostic details to the admin browser.
    return NextResponse.json(
      {
        error: "Unable to save uploaded file.",
        code: err?.code ?? "UNKNOWN",
        operation: err?.syscall ?? "UNKNOWN",
      },
      { status: 500 },
    );
  }
}
