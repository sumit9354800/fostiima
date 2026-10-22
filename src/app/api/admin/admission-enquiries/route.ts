
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

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

export async function GET(request: Request) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);

    const search = (searchParams.get("search") ?? "")
      .trim()
      .slice(0, 100);

    const status = searchParams.get("status") ?? "ALL";

    const page = Math.max(
      1,
      Math.min(1000000, Number(searchParams.get("page")) || 1),
    );

    const pageSize = 20;

    const allowedStatuses = [
      "NEW",
      "CONTACTED",
      "QUALIFIED",
      "CONVERTED",
      "CLOSED",
    ];

    if (
      status !== "ALL" &&
      !allowedStatuses.includes(status)
    ) {
      return NextResponse.json(
        { error: "Invalid status filter." },
        { status: 400 },
      );
    }

    const where = {
      ...(status !== "ALL" ? { status } : {}),
      ...(search
        ? {
            OR: [
              {
                fullName: {
                  contains: search,
                },
              },
              {
                email: {
                  contains: search,
                },
              },
              {
                mobile: {
                  contains: search,
                },
              },
              {
                city: {
                  contains: search,
                },
              },
            ],
          }
        : {}),
    };

    const [enquiries, total, statusCounts] =
      await Promise.all([
        prisma.admissionEnquiry.findMany({
          where,
          orderBy: {
            createdAt: "desc",
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
          select: {
            id: true,
            fullName: true,
            mobile: true,
            email: true,
            state: true,
            city: true,
            course: true,
            remarks: true,
            consent: true,
            source: true,
            status: true,
            emailSent: true,
            emailError: true,
            createdAt: true,
            updatedAt: true,
          },
        }),

        prisma.admissionEnquiry.count({ where }),

        prisma.admissionEnquiry.groupBy({
          by: ["status"],
          _count: {
            _all: true,
          },
        }),
      ]);

    const counts: Record<string, number> = {
      ALL: 0,
      NEW: 0,
      CONTACTED: 0,
      QUALIFIED: 0,
      CONVERTED: 0,
      CLOSED: 0,
    };

    for (const item of statusCounts) {
      counts[item.status] = item._count._all;
      counts.ALL += item._count._all;
    }

    return NextResponse.json({
      success: true,
      enquiries,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
      counts,
    });
  } catch (error) {
    console.error("[ADMIN_ADMISSION_ENQUIRIES_GET]", error);

    return NextResponse.json(
      { error: "Failed to load admission enquiries." },
      { status: 500 },
    );
  }
}
