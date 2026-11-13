
import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";

import {
  CONTENT_REVALIDATE_SECONDS,
  CONTENT_TAGS,
} from "@/lib/content-cache";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Every homepage visit requests this, so the list is cached (see
// src/lib/content-cache.ts). Admin FAQ edits expire it.
const getActiveFaqs = unstable_cache(
  async () =>
    prisma.faq.findMany({
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
    }),
  ["active-faqs"],
  { tags: [CONTENT_TAGS.faqs], revalidate: CONTENT_REVALIDATE_SECONDS },
);

export async function GET() {
  try {
    const faqs = await getActiveFaqs();

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
