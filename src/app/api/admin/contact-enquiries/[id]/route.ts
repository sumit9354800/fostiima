import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || session.user.role !== "admin" || session.user.banned) return null;
  return session;
}

const ALLOWED_STATUSES = new Set(["NEW", "READ", "REPLIED", "ARCHIVED"]);

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });

  try {
    const { id } = await context.params;
    const body = await request.json();
    const status = typeof body?.status === "string" ? body.status.toUpperCase() : "";

    if (!ALLOWED_STATUSES.has(status)) {
      return NextResponse.json({ success: false, message: "Invalid status." }, { status: 400 });
    }

    const enquiry = await prisma.contactEnquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, enquiry });
  } catch (error) {
    console.error("[ADMIN_CONTACT_ENQUIRY_PATCH]", error);
    return NextResponse.json({ success: false, message: "Unable to update enquiry." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });

  try {
    const { id } = await context.params;
    await prisma.contactEnquiry.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Enquiry deleted." });
  } catch (error) {
    console.error("[ADMIN_CONTACT_ENQUIRY_DELETE]", error);
    return NextResponse.json({ success: false, message: "Unable to delete enquiry." }, { status: 500 });
  }
}
