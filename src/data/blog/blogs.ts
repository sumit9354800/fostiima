import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@/types/blog";

type DbBlogBlock = {
  id: string;
  type: string;
  position: number;
  content: string | null;
  data: string | null;
};

function parseJson(value: string | null) {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function mapBlocks(blocks: DbBlogBlock[]): BlogPost["content"] {
  return blocks
    .sort((a, b) => a.position - b.position)
    .map((block) => {
      const data = parseJson(block.data);

      switch (block.type) {
        case "heading":
          return {
            type: "heading",
            level:
              typeof data?.level === "number"
                ? data.level
                : 2,
            content: block.content ?? "",
          };

        case "list":
          return {
            type: "list",
            items:
              Array.isArray(data?.items)
                ? data.items
                : (block.content ?? "")
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean),
          };

        case "paragraph":
        default:
          return {
            type: "paragraph",
            content: block.content ?? "",
          };
      }
    }) as BlogPost["content"];
}

function mapBlog(blog: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  publishedAt: Date | null;
  status: "draft" | "published";
  metaTitle: string | null;
  metaDescription: string | null;
  blocks: DbBlogBlock[];
  blogKeywords: {
    keyword: string;
  }[];
}): BlogPost {
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    category: blog.category,
    coverImage: blog.coverImage,
    coverImageAlt: blog.coverImageAlt,
    author: blog.author,
    publishedAt: blog.publishedAt
      ? blog.publishedAt.toISOString().split("T")[0]
      : "",
    status: blog.status,
    content: mapBlocks(blog.blocks),
    seo: {
      metaTitle: blog.metaTitle ?? blog.title,
      metaDescription:
        blog.metaDescription ?? blog.excerpt,
      keywords: blog.blogKeywords.map(
        (item) => item.keyword,
      ),
    },
  };
}

export async function getPublishedBlogs(): Promise<BlogPost[]> {
  const blogs = await prisma.blogPost.findMany({
    where: {
      status: "published",
    },
    include: {
      blocks: {
        orderBy: {
          position: "asc",
        },
      },
      blogKeywords: true,
    },
    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return blogs.map(mapBlog);
}

export async function getBlogBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const blog = await prisma.blogPost.findFirst({
    where: {
      slug,
      status: "published",
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
    return undefined;
  }

  return mapBlog(blog);
}