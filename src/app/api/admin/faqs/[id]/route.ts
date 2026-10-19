
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Context) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await request.json();

    const data: {
      question?: string;
      answer?: string;
      category?: string;
      sortOrder?: number;
      isActive?: boolean;
    } = {};

    if (body.question !== undefined) {
      data.question = String(body.question).trim();
      if (!data.question || data.question.length > 2000) {
        return NextResponse.json(
          { error: "Invalid question." },
          { status: 400 },
        );
      }
    }

    if (body.answer !== undefined) {
      data.answer = String(body.answer).trim();
      if (!data.answer || data.answer.length > 20000) {
        return NextResponse.json(
          { error: "Invalid answer." },
          { status: 400 },
        );
      }
    }

    if (body.category !== undefined) {
      data.category = String(body.category).trim();
      if (!data.category || data.category.length > 100) {
        return NextResponse.json(
          { error: "Invalid category." },
          { status: 400 },
        );
      }
    }

    if (body.sortOrder !== undefined) {
      const sortOrder = Number(body.sortOrder);

      if (!Number.isSafeInteger(sortOrder) || sortOrder < 0) {
        return NextResponse.json(
          { error: "Invalid sort order." },
          { status: 400 },
        );
      }

      data.sortOrder = sortOrder;
    }

    if (body.isActive !== undefined) {
      if (typeof body.isActive !== "boolean") {
        return NextResponse.json(
          { error: "isActive must be a boolean." },
          { status: 400 },
        );
      }

      data.isActive = body.isActive;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided." },
        { status: 400 },
      );
    }

    const faq = await prisma.faq.update({
      where: { id },
      data,
    });

    return NextResponse.json({ faq });
  } catch (error) {
    console.error("[ADMIN_FAQS_PATCH]", error);

    return NextResponse.json(
      { error: "Unable to update FAQ." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    await prisma.faq.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ADMIN_FAQS_DELETE]", error);

    return NextResponse.json(
      { error: "Unable to delete FAQ." },
      { status: 500 },
    );
  }
}
