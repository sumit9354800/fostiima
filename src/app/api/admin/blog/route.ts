import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BlogStatus } from "@/generated/prisma/client";

async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  return session;
}

export async function GET() {
  try {
    const session = await requireSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const blogs = await prisma.blogPost.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        blocks: {
          orderBy: {
            position: "asc",
          },
        },
        blogKeywords: true,
      },
    });

    return NextResponse.json({
      blogs,
    });
  } catch (error) {
    console.error("[ADMIN_BLOG_GET]", error);

    return NextResponse.json(
      { error: "Failed to load blogs." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      category,
      coverImage,
      coverImageAlt,
      author,
      publishedAt,
      status,
      metaTitle,
      metaDescription,
      keywords,
      blocks,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 },
      );
    }

    if (!slug?.trim()) {
      return NextResponse.json(
        { error: "Slug is required." },
        { status: 400 },
      );
    }

    if (!excerpt?.trim()) {
      return NextResponse.json(
        { error: "Excerpt is required." },
        { status: 400 },
      );
    }

    if (!category?.trim()) {
      return NextResponse.json(
        { error: "Category is required." },
        { status: 400 },
      );
    }

    const existingBlog = await prisma.blogPost.findUnique({
      where: {
        slug: slug.trim(),
      },
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: "A blog with this slug already exists." },
        { status: 409 },
      );
    }

    const blogStatus =
      status === "published"
        ? BlogStatus.published
        : BlogStatus.draft;

    const blog = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        category: category.trim(),
        coverImage: coverImage?.trim() || "",
        coverImageAlt:
          coverImageAlt?.trim() || title.trim(),
        author: author?.trim() || "FOSTIIMA Business School",
        publishedAt:
          blogStatus === BlogStatus.published
            ? publishedAt
              ? new Date(publishedAt)
              : new Date()
            : null,
        status: blogStatus,
        metaTitle: metaTitle?.trim() || null,
        metaDescription:
          metaDescription?.trim() || null,

        blocks: {
          create: Array.isArray(blocks)
            ? blocks.map(
                (
                  block: {
                    type?: string;
                    content?: string;
                    level?: number;
                  },
                  index: number,
                ) => ({
                  type: block.type || "paragraph",
                  position: index,
                  content: block.content?.trim() || "",
                  data:
                    block.type === "heading"
                      ? JSON.stringify({
                          level: block.level || 2,
                        })
                      : null,
                }),
              )
            : [],
        },

        blogKeywords: {
          create: Array.isArray(keywords)
            ? keywords
                .filter(
                  (keyword: unknown): keyword is string =>
                    typeof keyword === "string" &&
                    keyword.trim().length > 0,
                )
                .map((keyword) => ({
                  keyword: keyword.trim(),
                }))
            : [],
        },
      },

      include: {
        blocks: {
          orderBy: {
            position: "asc",
          },
        },
        blogKeywords: true,
      },
    });

    return NextResponse.json(
      {
        message: "Blog created successfully.",
        blog,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[ADMIN_BLOG_POST]", error);

    return NextResponse.json(
      { error: "Failed to create blog." },
      { status: 500 },
    );
  }
}