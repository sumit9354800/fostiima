import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@/types/blog";
import { mapDbBlogPost } from "./mapper";

const blogInclude = {
  blocks: {
    orderBy: {
      position: "asc" as const,
    },
  },
  blogKeywords: {
    orderBy: {
      keyword: "asc" as const,
    },
  },
};

export async function getPublishedBlogs(): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    where: {
      status: "published",
    },
    include: blogInclude,
    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return posts.map(mapDbBlogPost);
}

export async function getBlogBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      status: "published",
    },
    include: blogInclude,
  });

  if (!post) {
    return null;
  }

  return mapDbBlogPost(post);
}

export async function getAllAdminBlogs() {
  return prisma.blogPost.findMany({
    include: {
      blocks: {
        orderBy: {
          position: "asc",
        },
      },
      blogKeywords: {
        orderBy: {
          keyword: "asc",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getAdminBlogById(id: string) {
  return prisma.blogPost.findUnique({
    where: {
      id,
    },
    include: {
      blocks: {
        orderBy: {
          position: "asc",
        },
      },
      blogKeywords: {
        orderBy: {
          keyword: "asc",
        },
      },
    },
  });
}