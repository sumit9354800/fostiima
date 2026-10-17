import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN_TTL_SECONDS = 180;

export async function POST(request: Request) {
  try {
    // Require an authenticated, active admin session.
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

    // Prevent cross-origin token issuance. Same-origin browser requests
    // include the current site's Origin header.
    const origin = request.headers.get("origin");
    const requestOrigin = new URL(request.url).origin;
    if (origin && origin !== requestOrigin) {
      return NextResponse.json(
        { error: "Origin not allowed" },
        { status: 403 },
      );
    }

    const secret = process.env.IMX_MEDIA_UPLOAD_SECRET;
    if (!secret || secret.length < 32) {
      console.error("IMX_MEDIA_UPLOAD_SECRET is missing or too short.");
      return NextResponse.json(
        { error: "Media upload is not configured." },
        { status: 503 },
      );
    }

    const payload = Buffer.from(
      JSON.stringify({
        exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
        scope: "media:upload",
      }),
      "utf8",
    ).toString("base64url");

    // Must match upload.php: HMAC-SHA256 of the encoded payload, hex output.
    const signature = createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    return NextResponse.json(
      {
        token: `${payload}.${signature}`,
        expiresIn: TOKEN_TTL_SECONDS,
      },
      {
        headers: {
          "Cache-Control": "no-store, private",
          Pragma: "no-cache",
        },
      },
    );
  } catch (error) {
    console.error("Admin upload-token error:", error);
    return NextResponse.json(
      { error: "Unable to authorize media upload." },
      { status: 500 },
    );
  }
}
