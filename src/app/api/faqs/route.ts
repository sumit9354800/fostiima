
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "asc" },
      ],
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
      },
    });

    return NextResponse.json(
      { success: true, data: faqs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Public FAQs API error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch FAQs." },
      { status: 500 }
    );
  }
}
