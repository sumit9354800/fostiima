
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Context) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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

    if (existing && existing.id !== id) {
      return NextResponse.json(
        { error: "This slug already belongs to another faculty member." },
        { status: 409 },
      );
    }

    const faculty = await prisma.faculty.update({
      where: { id },
      data: { name, slug, image, qualification, experience, domain },
    });

    return NextResponse.json({ faculty });
  } catch (error) {
    console.error("[ADMIN_FACULTY_PATCH]", error);
    return NextResponse.json(
      { error: "Unable to update faculty member." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.faculty.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ADMIN_FACULTY_DELETE]", error);
    return NextResponse.json(
      { error: "Unable to delete faculty member." },
      { status: 500 },
    );
  }
}
