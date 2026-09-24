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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext,
) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await context.params;

    const existing =
      await prisma.homePlacementVideo.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Placement video not found.",
        },
        {
          status: 404,
        },
      );
    }

    const body = await request.json();

    const data: {
      youtubeId?: string;
      title?: string;
      batch?: string;
      sortOrder?: number;
      isActive?: boolean;
    } = {};

    if (body.youtubeId !== undefined) {
      const youtubeId = String(body.youtubeId).trim();

      if (!isValidYouTubeId(youtubeId)) {
        return NextResponse.json(
          {
            error: "Invalid YouTube video ID.",
          },
          {
            status: 400,
          },
        );
      }

      data.youtubeId = youtubeId;
    }

    if (body.title !== undefined) {
      const title = String(body.title).trim();

      if (!title) {
        return NextResponse.json(
          {
            error: "Video title cannot be empty.",
          },
          {
            status: 400,
          },
        );
      }

      data.title = title;
    }

    if (body.batch !== undefined) {
      const batch = String(body.batch).trim();

      if (!batch) {
        return NextResponse.json(
          {
            error: "Batch cannot be empty.",
          },
          {
            status: 400,
          },
        );
      }

      data.batch = batch;
    }

    if (body.sortOrder !== undefined) {
      const sortOrder = Number(body.sortOrder);

      if (!Number.isInteger(sortOrder) || sortOrder < 0) {
        return NextResponse.json(
          {
            error:
              "Sort order must be a valid non-negative number.",
          },
          {
            status: 400,
          },
        );
      }

      data.sortOrder = sortOrder;
    }

    if (body.isActive !== undefined) {
      data.isActive = Boolean(body.isActive);
    }

    const updated =
      await prisma.homePlacementVideo.update({
        where: {
          id,
        },
        data,
      });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(
      "[ADMIN_PLACEMENT_VIDEO_PATCH]",
      error,
    );

    return NextResponse.json(
      {
        error: "Failed to update placement video.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext,
) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await context.params;

    const existing =
      await prisma.homePlacementVideo.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Placement video not found.",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.homePlacementVideo.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "[ADMIN_PLACEMENT_VIDEO_DELETE]",
      error,
    );

    return NextResponse.json(
      {
        error: "Failed to delete placement video.",
      },
      {
        status: 500,
      },
    );
  }
}