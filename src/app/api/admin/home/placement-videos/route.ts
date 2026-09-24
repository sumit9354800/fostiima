import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

function isValidYouTubeId(value: string) {
  return /^[a-zA-Z0-9_-]{11}$/.test(value);
}

export async function GET() {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const videos = await prisma.homePlacementVideo.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "asc",
        },
      ],
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error(
      "[ADMIN_PLACEMENT_VIDEOS_GET]",
      error,
    );

    return NextResponse.json(
      {
        error: "Failed to fetch placement videos.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();

    const youtubeId = String(body.youtubeId ?? "").trim();
    const title = String(body.title ?? "").trim();
    const batch = String(body.batch ?? "").trim();

    const sortOrder = Number(body.sortOrder ?? 0);

    const isActive =
      typeof body.isActive === "boolean"
        ? body.isActive
        : true;

    if (!isValidYouTubeId(youtubeId)) {
      return NextResponse.json(
        {
          error:
            "Invalid YouTube video ID. It must contain exactly 11 characters.",
        },
        {
          status: 400,
        },
      );
    }

    if (!title) {
      return NextResponse.json(
        {
          error: "Video title is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!batch) {
      return NextResponse.json(
        {
          error: "Batch is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!Number.isInteger(sortOrder) || sortOrder < 0) {
      return NextResponse.json(
        {
          error: "Sort order must be a valid non-negative number.",
        },
        {
          status: 400,
        },
      );
    }

    const video = await prisma.homePlacementVideo.create({
      data: {
        youtubeId,
        title,
        batch,
        sortOrder,
        isActive,
      },
    });

    return NextResponse.json(video, {
      status: 201,
    });
  } catch (error) {
    console.error(
      "[ADMIN_PLACEMENT_VIDEOS_POST]",
      error,
    );

    return NextResponse.json(
      {
        error: "Failed to create placement video.",
      },
      {
        status: 500,
      },
    );
  }
}