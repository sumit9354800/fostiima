import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || session.user.role !== "admin" || session.user.banned) return null;
  return session;
}

export async function GET() {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const [enquiries, total, unread, replied, archived] = await Promise.all([
      prisma.contactEnquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      }),
      prisma.contactEnquiry.count(),
      prisma.contactEnquiry.count({ where: { status: "NEW" } }),
      prisma.contactEnquiry.count({ where: { status: "REPLIED" } }),
      prisma.contactEnquiry.count({ where: { status: "ARCHIVED" } }),
    ]);

    return NextResponse.json({
      success: true,
      enquiries,
      stats: { total, unread, replied, archived },
    });
  } catch (error) {
    console.error("[ADMIN_CONTACT_ENQUIRIES_GET]", error);
    return NextResponse.json({ success: false, message: "Unable to load contact enquiries." }, { status: 500 });
  }
}
