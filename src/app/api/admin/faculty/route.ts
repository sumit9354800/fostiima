
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const faculty = await prisma.faculty.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ faculty });
  } catch (error) {
    console.error("[ADMIN_FACULTY_GET]", error);
    return NextResponse.json(
      { error: "Unable to load faculty." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const slug = String(body.slug ?? "").trim().toLowerCase();
    const image = String(body.image ?? "").trim();
    const qualification = String(body.qualification ?? "").trim();
    const experience = String(body.experience ?? "").trim();
    const domain = String(body.domain ?? "").trim();

    if (!name || !slug || !image || !qualification || !experience || !domain) {
      return NextResponse.json(
        { error: "Please complete all faculty fields." },
        { status: 400 },
      );
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug must contain lowercase letters, numbers and hyphens only." },
        { status: 400 },
      );
    }

    const existing = await prisma.faculty.findUnique({ where: { slug } });

    if (existing) {
      return NextResponse.json(
        { error: "This slug already exists. Please use another slug." },
        { status: 409 },
      );
    }

    const faculty = await prisma.faculty.create({
      data: { name, slug, image, qualification, experience, domain },
    });

    return NextResponse.json({ faculty }, { status: 201 });
  } catch (error) {
    console.error("[ADMIN_FACULTY_POST]", error);
    return NextResponse.json(
      { error: "Unable to create faculty member." },
      { status: 500 },
    );
  }
}
