import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import BlogEditor from "@/components/admin/blog/BlogEditor";

type EditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
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

  const blocks = blog.blocks.map(
    (block) => {
      let level: 2 | 3 | undefined;

      if (
        block.type === "heading" &&
        block.data
      ) {
        try {
          const parsed = JSON.parse(
            block.data,
          );

          if (
            parsed.level === 2 ||
            parsed.level === 3
          ) {
            level = parsed.level;
          }
        } catch {
          level = 2;
        }
      }

      return {
        id: block.id,
        type:
          block.type === "heading"
            ? ("heading" as const)
            : ("paragraph" as const),
        content: block.content || "",
        level,
      };
    },
  );

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
        coverImageAlt:
          blog.coverImageAlt,
        author: blog.author,
        status: blog.status,
        metaTitle:
          blog.metaTitle || "",
        metaDescription:
          blog.metaDescription || "",
        keywords:
          blog.blogKeywords.map(
            (item) => item.keyword,
          ),
        blocks,
      }}
    />
  );
}