
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    const body = (await request.json()) as HandleUploadBody;

    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
if (!/^videos\/[a-zA-Z0-9._-]+\.(mp4|webm|mov)$/i.test(pathname)) {
  throw new Error("Only MP4, WebM, and MOV videos are allowed.");
}

        return {
         allowedContentTypes: [
  "video/mp4",
  "video/webm",
  "video/quicktime",
],
          addRandomSuffix: true,
          maximumSizeInBytes: 100 * 1024 * 1024,
        };
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[ADMIN_VIDEO_UPLOAD_FAILURE]", error);

    return NextResponse.json(
      { error: "Unable to authorize video upload." },
      { status: 400 },
    );
  }
}
