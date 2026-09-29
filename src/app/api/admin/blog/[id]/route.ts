import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BlogStatus } from "@/generated/prisma/client";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  return session;
}

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    const session = await requireSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const blog = await prisma.blogPost.findUnique({
      where: {
        id,
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

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      blog,
    });
  } catch (error) {
    console.error("[ADMIN_BLOG_GET_ONE]", error);

    return NextResponse.json(
      { error: "Failed to load blog." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const session = await requireSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
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

    const existingSlug = await prisma.blogPost.findFirst({
      where: {
        slug: slug.trim(),
        NOT: {
          id,
        },
      },
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: "Another blog already uses this slug." },
        { status: 409 },
      );
    }

    const blogStatus =
      status === "published"
        ? BlogStatus.published
        : BlogStatus.draft;

    const blog = await prisma.$transaction(
      async (tx) => {
        await tx.blogBlock.deleteMany({
          where: {
            postId: id,
          },
        });

        await tx.blogKeyword.deleteMany({
          where: {
            postId: id,
          },
        });

        return tx.blogPost.update({
          where: {
            id,
          },

          data: {
            title: title.trim(),
            slug: slug.trim(),
            excerpt: excerpt?.trim() || "",
            category: category?.trim() || "",
            coverImage: coverImage?.trim() || "",
            coverImageAlt:
              coverImageAlt?.trim() ||
              title.trim(),
            author:
              author?.trim() ||
              "FOSTIIMA Business School",

            publishedAt:
              blogStatus === BlogStatus.published
                ? publishedAt
                  ? new Date(publishedAt)
                  : new Date()
                : null,

            status: blogStatus,

            metaTitle:
              metaTitle?.trim() || null,

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
                      type:
                        block.type ||
                        "paragraph",

                      position: index,

                      content:
                        block.content?.trim() ||
                        "",

                      data:
                        block.type ===
                        "heading"
                          ? JSON.stringify({
                              level:
                                block.level ||
                                2,
                            })
                          : null,
                    }),
                  )
                : [],
            },

            blogKeywords: {
              create: Array.isArray(
                keywords,
              )
                ? keywords
                    .filter(
                      (
                        keyword: unknown,
                      ): keyword is string =>
                        typeof keyword ===
                          "string" &&
                        keyword.trim()
                          .length > 0,
                    )
                    .map((keyword) => ({
                      keyword:
                        keyword.trim(),
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
      },
    );

    return NextResponse.json({
      message: "Blog updated successfully.",
      blog,
    });
  } catch (error) {
    console.error("[ADMIN_BLOG_PATCH]", error);

    return NextResponse.json(
      { error: "Failed to update blog." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    const session = await requireSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const existingBlog =
      await prisma.blogPost.findUnique({
        where: {
          id,
        },
      });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog not found." },
        { status: 404 },
      );
    }

    await prisma.blogPost.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    console.error("[ADMIN_BLOG_DELETE]", error);

    return NextResponse.json(
      { error: "Failed to delete blog." },
      { status: 500 },
    );
  }
}