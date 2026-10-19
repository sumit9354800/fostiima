
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();

    const faqs = await prisma.faq.findMany({
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "asc" },
      ],
    });

    return NextResponse.json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error("[ADMIN_FAQS_GET]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load FAQs.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const question = String(body.question ?? "").trim();
    const answer = String(body.answer ?? "").trim();
    const category = String(body.category ?? "General").trim();
    const sortOrder = Number(body.sortOrder ?? 0);
    const isActive = body.isActive !== false;

    if (!question || !answer || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Question, answer and category are required.",
        },
        { status: 400 },
      );
    }

    if (
      question.length > 2000 ||
      answer.length > 20000 ||
      category.length > 100
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more fields exceed the allowed length.",
        },
        { status: 400 },
      );
    }

    if (!Number.isSafeInteger(sortOrder) || sortOrder < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Sort order must be a non-negative integer.",
        },
        { status: 400 },
      );
    }

    const faq = await prisma.faq.create({
      data: {
        question,
        answer,
        category,
        sortOrder,
        isActive,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: faq,
        message: "FAQ created successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[ADMIN_FAQS_POST]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create FAQ.",
      },
      { status: 500 },
    );
  }
}
