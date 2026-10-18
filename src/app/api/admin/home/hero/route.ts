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
  try {
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

    const hero = await prisma.homeHero.findFirst({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error(
      "GET /api/admin/home/hero error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load hero settings.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(request: Request) {
  try {
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

    const body = await request.json();

    const videoUrl = String(
      body.videoUrl ?? "",
    ).trim();

    if (!videoUrl) {
      return NextResponse.json(
        {
          error: "Hero video URL is required.",
        },
        {
          status: 400,
        },
      );
    }

    const existing =
      await prisma.homeHero.findFirst({
        orderBy: {
          createdAt: "asc",
        },
      });

    const hero = existing
      ? await prisma.homeHero.update({
          where: {
            id: existing.id,
          },
          data: {
            videoUrl,
            isActive: true,
          },
        })
      : await prisma.homeHero.create({
          data: {
            videoUrl,
            isActive: true,
          },
        });

    return NextResponse.json(hero);
  } catch (error) {
    console.error(
      "PUT /api/admin/home/hero error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to save hero.",
      },
      {
        status: 500,
      },
    );
  }
}