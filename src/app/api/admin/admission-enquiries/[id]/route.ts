
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const ALLOWED_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "CLOSED",
] as const;

type AdmissionStatus = (typeof ALLOWED_STATUSES)[number];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
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

    const { id } = await context.params;
    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    const status = (body as { status?: unknown }).status;

    if (
      typeof status !== "string" ||
      !ALLOWED_STATUSES.includes(status as AdmissionStatus)
    ) {
      return NextResponse.json(
        { error: "Invalid admission status." },
        { status: 400 },
      );
    }

    const existing = await prisma.admissionEnquiry.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Admission enquiry not found." },
        { status: 404 },
      );
    }

    const enquiry = await prisma.admissionEnquiry.update({
      where: { id },
      data: { status: status as AdmissionStatus },
      select: {
        id: true,
        status: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      enquiry,
    });
  } catch (error) {
    console.error("[ADMIN_ADMISSION_ENQUIRY_PATCH]", error);

    return NextResponse.json(
      { error: "Failed to update admission status." },
      { status: 500 },
    );
  }
}
