import { createHash } from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { auth } from "@/lib/auth";

const MAX_FILE_SIZE = 100 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (
    !session?.user ||
    session.user.role !== "admin" ||
    session.user.banned
  ) {
    return null;
  }

  return session;
}

function getSafeExtension(fileName: string, mimeType: string) {
  const extension = path.extname(fileName).toLowerCase();

  if (extension) {
    return extension;
  }

  const extensions: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "image/gif": ".gif",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "video/quicktime": ".mov",
  };

  return extensions[mimeType] ?? "";
}

async function uploadToCloudinary(file: File) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are not configured.");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "fostiima/home";

  const signatureBase = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;

  const signature = createHash("sha1")
    .update(signatureBase)
    .digest("hex");

  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", folder);
  formData.append("signature", signature);

  const resourceType = file.type.startsWith("video/")
    ? "video"
    : "image";

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok || !data.secure_url) {
    console.error("Cloudinary upload error:", data);

    throw new Error(
      data?.error?.message ?? "Cloudinary upload failed.",
    );
  }

  return data.secure_url as string;
}

async function uploadToPublicFolder(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const extension = getSafeExtension(
    file.name,
    file.type,
  );

  const fileName = `${crypto.randomUUID()}${extension}`;

  const uploadDirectory = path.join(
    process.cwd(),
    "public",
    "uploads",
    "home",
  );

  await mkdir(uploadDirectory, {
    recursive: true,
  });

  const filePath = path.join(
    uploadDirectory,
    fileName,
  );

  await writeFile(filePath, buffer);

  return `/uploads/home/${fileName}`;
}

export async function POST(request: Request) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const destination = String(
      formData.get("destination") ?? "",
    );

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "No file was provided.",
        },
        {
          status: 400,
        },
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error: "This file type is not supported.",
        },
        {
          status: 400,
        },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File size cannot exceed 100MB.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      destination !== "cloudinary" &&
      destination !== "public"
    ) {
      return NextResponse.json(
        {
          error: "Invalid upload destination.",
        },
        {
          status: 400,
        },
      );
    }

    const url =
      destination === "cloudinary"
        ? await uploadToCloudinary(file)
        : await uploadToPublicFolder(file);

    return NextResponse.json({
      success: true,
      url,
      destination,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    });
  } catch (error) {
    console.error("Admin upload error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to upload file.",
      },
      {
        status: 500,
      },
    );
  }
}