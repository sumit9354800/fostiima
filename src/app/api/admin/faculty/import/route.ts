
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";
import { facultyData } from "@/data/faculty";

export const runtime = "nodejs";

export async function POST() {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    let imported = 0;
    let skipped = 0;

    for (const item of facultyData) {
      const existing = await prisma.faculty.findUnique({
        where: { slug: item.slug },
      });

      if (existing) {
        // Preserve records already managed through the admin panel.
        skipped++;
        continue;
      }

      await prisma.faculty.create({
        data: {
          slug: item.slug,
          name: item.name,
          image: item.image || "",
          qualification: item.qualification || "Not specified",
          experience: item.experience || "Not specified",
          domain: item.domain || "Not specified",
        },
      });

      imported++;
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      totalInSource: facultyData.length,
      message: "Faculty import completed.",
    });
  } catch (error) {
    console.error("[FACULTY_IMPORT]", error);

    return NextResponse.json(
      { error: "Faculty import failed." },
      { status: 500 },
    );
  }
}
