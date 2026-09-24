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

export async function GET() {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const programs = await prisma.homeProgram.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "asc",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      programs,
    });
  } catch (error) {
    console.error("Admin programs GET error:", error);

    return NextResponse.json(
      {
        error: "Unable to load programs.",
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

    const title =
      typeof body.title === "string"
        ? body.title.trim()
        : "";

    const category =
      typeof body.category === "string"
        ? body.category.trim()
        : "";

    const duration =
      typeof body.duration === "string"
        ? body.duration.trim()
        : "";

    const imageUrl =
      typeof body.imageUrl === "string"
        ? body.imageUrl.trim()
        : "";

    const href =
      typeof body.href === "string"
        ? body.href.trim()
        : "";

    const sortOrder = Number(body.sortOrder ?? 0);

    const isActive =
      typeof body.isActive === "boolean"
        ? body.isActive
        : true;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 },
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: "Category is required." },
        { status: 400 },
      );
    }

    if (!duration) {
      return NextResponse.json(
        { error: "Duration is required." },
        { status: 400 },
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Please upload an image." },
        { status: 400 },
      );
    }

    if (!href) {
      return NextResponse.json(
        { error: "Program link is required." },
        { status: 400 },
      );
    }

    if (!Number.isInteger(sortOrder)) {
      return NextResponse.json(
        { error: "Sort order must be a whole number." },
        { status: 400 },
      );
    }

    const program = await prisma.homeProgram.create({
      data: {
        title,
        category,
        duration,
        imageUrl,
        href,
        sortOrder,
        isActive,
      },
    });

    return NextResponse.json(
      {
        success: true,
        program,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Admin programs POST error:", error);

    return NextResponse.json(
      {
        error: "Unable to create program.",
      },
      {
        status: 500,
      },
    );
  }
}