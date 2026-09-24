import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const statSchema = z.object({
  value: z
    .string()
    .trim()
    .min(1, "Value is required.")
    .max(50, "Value is too long."),

  label: z
    .string()
    .trim()
    .min(1, "Label is required.")
    .max(100, "Label is too long."),

  icon: z
    .string()
    .trim()
    .min(1, "Icon is required.")
    .max(50, "Icon is too long."),

  sortOrder: z
    .number()
    .int()
    .min(0)
    .max(999),

  isActive: z.boolean(),
});

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
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    const stats = await prisma.homeStat.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "asc",
        },
      ],
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error(
      "GET /api/admin/home/stats error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load stats.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    const body = await request.json();

    const result = statSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error.issues[0]?.message ??
            "Invalid stat data.",
        },
        {
          status: 400,
        },
      );
    }

    const stat = await prisma.homeStat.create({
      data: result.data,
    });

    return NextResponse.json(stat, {
      status: 201,
    });
  } catch (error) {
    console.error(
      "POST /api/admin/home/stats error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create stat.",
      },
      {
        status: 500,
      },
    );
  }
}