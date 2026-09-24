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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: Request,
  context: RouteContext,
) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    const { id } = await context.params;

    const body = await request.json();

    const result = statSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error:
            result.error.issues[0]?.message ??
            "Invalid stat data.",
        },
        {
          status: 400,
        },
      );
    }

    const existing = await prisma.homeStat.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Stat not found.",
        },
        {
          status: 404,
        },
      );
    }

    const stat = await prisma.homeStat.update({
      where: {
        id,
      },
      data: result.data,
    });

    return NextResponse.json(stat);
  } catch (error) {
    console.error(
      "PUT /api/admin/home/stats/[id] error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update stat.",
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
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    const { id } = await context.params;

    const existing = await prisma.homeStat.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Stat not found.",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.homeStat.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE /api/admin/home/stats/[id] error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to delete stat.",
      },
      {
        status: 500,
      },
    );
  }
}