import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const DEFAULT_ABOUT = {
  eyebrow: "About FOSTIIMA",
  title:
    "FOSTIIMA Business School Among the Best MBA Colleges in Delhi NCR",
  description1:
    "Selecting the best MBA Colleges in Delhi from a list of numerous institutes which may make claims of being the best can be challenging. Our difference isn't just in the marketing, its in the DNA, our faculty and how our curriculum has been designed at FOSTIIMA Business School. Educating through a highly interactive platform and an experiential environment, FOSTIIMA is one of the Best MBA Colleges in Delhi NCR that provides a conducive learning environment with an emphasis on teamwork, vision, creativity and discipline.",
  description2:
    "We have designed our MBA Course and PGDM Course in such a way that it helps the students understand the theory of the business and then apply it into the practical aspects of the business, a gap which many PGDM Colleges in Delhi are not able to bridge. What makes FOSTIIMA unique is that students are not only learning the concepts of management, but they are also in the presence of industry veterans who have experience in multiple cross-functional and cross-industry areas and bring their experience into every session.",
};

const DEFAULT_HIGHLIGHTS = [
  {
    title: "Founded by IIM-A Alumni",
    description:
      'Conceived and managed by the 1973 batch of IIM Ahmedabad — "Friends Of The Stars of IIM-A" — bringing premier pedagogy to management aspirants.',
    icon: "Landmark",
    sortOrder: 0,
  },
  {
    title: "AICTE Approved & AIU Equivalent",
    description:
      "2-Year Full-Time PGDM recognized by Association of Indian Universities (AIU) as equivalent to an MBA degree from premier Indian universities.",
    icon: "ShieldCheck",
    sortOrder: 1,
  },
  {
    title: "Harvard Case Pedagogy",
    description:
      "Immersive corporate problem-solving with Harvard & IIM case studies, simulation labs, Bloomberg terminals, and 2-month summer internships.",
    icon: "Award",
    sortOrder: 2,
  },
  {
    title: "50+ IIM Mentors & Faculty",
    description:
      "Distinguished cohort of 50+ IIM alumni faculty with 30–40 years of corporate and academic leadership, maintaining a strong student-faculty ratio.",
    icon: "GraduationCap",
    sortOrder: 3,
  },
  {
    title: "Consistent 100% Placements",
    description:
      "Top corporate conglomerates hire from campus every year with packages reaching up to ₹30 LPA across Marketing, BFSI, Consulting, Analytics & Tech.",
    icon: "BriefcaseBusiness",
    sortOrder: 4,
  },
  {
    title: "Strategic Delhi NCR Campus",
    description:
      "Modern, fully air-conditioned smart campus in Dwarka Institutional Area, Sector 9, New Delhi with digital library and partner hostel facilities.",
    icon: "Building2",
    sortOrder: 5,
  },
];

const aboutSchema = z.object({
  eyebrow: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description1: z.string().trim().min(1),
  description2: z.string().trim().optional().or(z.literal("")),
  isActive: z.boolean().default(true),
  highlights: z
    .array(
      z.object({
        title: z.string().trim().min(1),
        description: z.string().trim().min(1),
        icon: z.string().trim().min(1),
        sortOrder: z.coerce.number().int().min(0),
        isActive: z.boolean().default(true),
      }),
    )
    .default([]),
});

async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (
    !session?.user ||
    session.user.role !== "admin" ||
    session.user.banned
  ) {
    return null;
  }

  return session;
}

async function ensureDefaultAbout() {
  const existing = await prisma.homeAbout.findFirst({
    include: {
      highlights: true,
    },
  });

  if (existing) {
    return existing;
  }

  return prisma.homeAbout.create({
    data: {
      ...DEFAULT_ABOUT,
      isActive: true,
      highlights: {
        create: DEFAULT_HIGHLIGHTS.map((item) => ({
          ...item,
          isActive: true,
        })),
      },
    },
    include: {
      highlights: {
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      },
    },
  });
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const about = await ensureDefaultAbout();

    return NextResponse.json(about);
  } catch (error) {
    console.error("GET /api/admin/home/about error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load About section.",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = aboutSchema.parse(await request.json());

    const existing = await prisma.homeAbout.findFirst();

    if (!existing) {
      const created = await prisma.homeAbout.create({
        data: {
          eyebrow: body.eyebrow,
          title: body.title,
          description1: body.description1,
          description2: body.description2 || null,
          isActive: body.isActive,
          highlights: {
            create: body.highlights.map((item) => ({
              title: item.title,
              description: item.description,
              icon: item.icon,
              sortOrder: item.sortOrder,
              isActive: item.isActive,
            })),
          },
        },
        include: {
          highlights: {
            orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
          },
        },
      });

      revalidatePath("/");
      revalidatePath("/admin/home/about");

      return NextResponse.json(created);
    }

    const about = await prisma.$transaction(async (tx) => {
      const updated = await tx.homeAbout.update({
        where: {
          id: existing.id,
        },
        data: {
          eyebrow: body.eyebrow,
          title: body.title,
          description1: body.description1,
          description2: body.description2 || null,
          isActive: body.isActive,
        },
      });

      await tx.homeAboutHighlight.deleteMany({
        where: {
          homeAboutId: existing.id,
        },
      });

      await tx.homeAboutHighlight.createMany({
        data: body.highlights.map((item) => ({
          homeAboutId: existing.id,
          title: item.title,
          description: item.description,
          icon: item.icon,
          sortOrder: item.sortOrder,
          isActive: item.isActive,
        })),
      });

      return tx.homeAbout.findUniqueOrThrow({
        where: {
          id: updated.id,
        },
        include: {
          highlights: {
            orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
          },
        },
      });
    });

    revalidatePath("/");
    revalidatePath("/admin/home/about");

    return NextResponse.json(about);
  } catch (error) {
    console.error("PUT /api/admin/home/about error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error:
            error.issues[0]?.message ?? "Invalid About section data.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update About section.",
      },
      { status: 500 },
    );
  }
}