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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
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

    const program = await prisma.homeProgram.findUnique({
      where: {
        id,
      },
    });

    if (!program) {
      return NextResponse.json(
        { error: "Program not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      program,
    });
  } catch (error) {
    console.error("Admin program GET error:", error);

    return NextResponse.json(
      {
        error: "Unable to load program.",
      },
      {
        status: 500,
      },
    );
  }
}

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

    const existing = await prisma.homeProgram.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Program not found." },
        { status: 404 },
      );
    }

    const body = await request.json();

    const data: {
      title?: string;
      category?: string;
      duration?: string;
      imageUrl?: string;
      href?: string;
      sortOrder?: number;
      isActive?: boolean;
    } = {};

    if (body.title !== undefined) {
      const title =
        typeof body.title === "string"
          ? body.title.trim()
          : "";

      if (!title) {
        return NextResponse.json(
          { error: "Title cannot be empty." },
          { status: 400 },
        );
      }

      data.title = title;
    }

    if (body.category !== undefined) {
      const category =
        typeof body.category === "string"
          ? body.category.trim()
          : "";

      if (!category) {
        return NextResponse.json(
          { error: "Category cannot be empty." },
          { status: 400 },
        );
      }

      data.category = category;
    }

    if (body.duration !== undefined) {
      const duration =
        typeof body.duration === "string"
          ? body.duration.trim()
          : "";

      if (!duration) {
        return NextResponse.json(
          { error: "Duration cannot be empty." },
          { status: 400 },
        );
      }

      data.duration = duration;
    }

    if (body.imageUrl !== undefined) {
      const imageUrl =
        typeof body.imageUrl === "string"
          ? body.imageUrl.trim()
          : "";

      if (!imageUrl) {
        return NextResponse.json(
          { error: "Please upload an image." },
          { status: 400 },
        );
      }

      data.imageUrl = imageUrl;
    }

    if (body.href !== undefined) {
      const href =
        typeof body.href === "string"
          ? body.href.trim()
          : "";

      if (!href) {
        return NextResponse.json(
          { error: "Program link cannot be empty." },
          { status: 400 },
        );
      }

      data.href = href;
    }

    if (body.sortOrder !== undefined) {
      const sortOrder = Number(body.sortOrder);

      if (!Number.isInteger(sortOrder)) {
        return NextResponse.json(
          { error: "Sort order must be a whole number." },
          { status: 400 },
        );
      }

      data.sortOrder = sortOrder;
    }

    if (body.isActive !== undefined) {
      if (typeof body.isActive !== "boolean") {
        return NextResponse.json(
          { error: "Invalid active status." },
          { status: 400 },
        );
      }

      data.isActive = body.isActive;
    }

    const program = await prisma.homeProgram.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json({
      success: true,
      program,
    });
  } catch (error) {
    console.error("Admin program PATCH error:", error);

    return NextResponse.json(
      {
        error: "Unable to update program.",
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

    const existing = await prisma.homeProgram.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Program not found." },
        { status: 404 },
      );
    }

    await prisma.homeProgram.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Admin program DELETE error:", error);

    return NextResponse.json(
      {
        error: "Unable to delete program.",
      },
      {
        status: 500,
      },
    );
  }
}