import { put } from "@vercel/blob";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function jsonError(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

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
      return jsonError("Unauthorized", 401);
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("[BLOG_IMAGE_UPLOAD] Blob token is missing.");
      return jsonError("Blog image storage is not configured.", 503);
    }

    let formData: FormData;

    try {
      formData = await request.formData();
    } catch {
      return jsonError("Invalid upload request.", 400);
    }

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return jsonError("No image file was provided.", 400);
    }

    const extension = ALLOWED_IMAGE_TYPES[file.type];

    if (!extension) {
      return jsonError(
        "Only JPG, PNG, WebP, and GIF images are allowed.",
        415,
      );
    }

    if (file.size === 0) {
      return jsonError("The selected image is empty.", 400);
    }

    if (file.size > MAX_FILE_SIZE) {
      return jsonError("Image size must not exceed 4 MB.", 413);
    }

    const blob = await put(
      `blog/images/${Date.now()}.${extension}`,
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
    console.error("[BLOG_IMAGE_UPLOAD_FAILURE]", error);

    return jsonError("Unable to upload blog image.", 500);
  }
}