
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import BlogEditor from "@/components/admin/blog/BlogEditor";

type EditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type ParsedBlockData = {
  level?: number;
  headers?: unknown[];
  rows?: unknown[];
  src?: string;
  alt?: string;
  caption?: string;
};

export default async function EditBlogPage({
  params,
}: EditBlogPageProps) {
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
    notFound();
  }

  const blocks = blog.blocks.map((block) => {
    let data: ParsedBlockData = {};

    if (block.data) {
      try {
        const parsed: unknown = JSON.parse(block.data);

        if (
          typeof parsed === "object" &&
          parsed !== null &&
          !Array.isArray(parsed)
        ) {
          data = parsed as ParsedBlockData;
        }
      } catch {
        data = {};
      }
    }

    if (block.type === "heading") {
      const level: 2 | 3 =
        data.level === 3 ? 3 : 2;

      return {
        id: block.id,
        type: "heading" as const,
        content: block.content || "",
        level,
      };
    }

    if (block.type === "table") {
      const headers =
        Array.isArray(data.headers) && data.headers.length > 0
          ? data.headers.map((item) => String(item ?? ""))
          : ["Column 1", "Column 2"];

      const rows =
        Array.isArray(data.rows) && data.rows.length > 0
          ? data.rows.map((row) =>
              Array.isArray(row)
                ? row.map((cell) => String(cell ?? ""))
                : [],
            )
          : [["", ""]];

      return {
        id: block.id,
        type: "table" as const,
        content: "",
        table: {
          headers,
          rows,
        },
      };
    }

    if (block.type === "image") {
      return {
        id: block.id,
        type: "image" as const,
        content: block.content || "",
        src:
          typeof data.src === "string"
            ? data.src
            : block.content || "",
        alt:
          typeof data.alt === "string"
            ? data.alt
            : blog.title,
        caption:
          typeof data.caption === "string"
            ? data.caption
            : block.content || "",
      };
    }

    return {
      id: block.id,
      type: "paragraph" as const,
      content: block.content || "",
    };
  });

  return (
    <BlogEditor
      mode="edit"
      blogId={blog.id}
      initialData={{
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        category: blog.category,
        coverImage: blog.coverImage,
        coverImageAlt: blog.coverImageAlt,
        author: blog.author,
        status: blog.status,
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
        keywords: blog.blogKeywords.map(
          (item) => item.keyword,
        ),
        blocks,
      }}
    />
  );
}
