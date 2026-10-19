
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { faqData } from "@/data/faqs";
import { requireAdmin } from "@/lib/admin/require-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await requireAdmin();

    let imported = 0;

    for (const [index, faq] of faqData.entries()) {
      await prisma.faq.upsert({
        where: { id: faq.id },
        update: {
          question: faq.question,
          answer: faq.answer,
          category: faq.category,
          sortOrder: index,
        },
        create: {
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
          category: faq.category,
          sortOrder: index,
          isActive: true,
        },
      });

      imported++;
    }

    return NextResponse.json({
      success: true,
      message: `${imported} FAQs imported successfully.`,
      count: imported,
    });
  } catch (error) {
    console.error("FAQ import error:", error);

    return NextResponse.json(
      { success: false, message: "FAQ import failed. Check server logs." },
      { status: 500 }
    );
  }
}
