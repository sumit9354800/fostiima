import { cache } from "react";

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

// Listing (/blog): only the fields a blog card shows. Article blocks and
// keywords aren't loaded here, so `content` and `seo.keywords` are empty on
// these objects; the article page loads the full post with getBlogBySlug().
export async function getPublishedBlogs(): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    where: {
      status: "published",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      coverImage: true,
      coverImageAlt: true,
      author: true,
      publishedAt: true,
      status: true,
      metaTitle: true,
      metaDescription: true,
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

  return posts.map((post) =>
    mapDbBlogPost({ ...post, blocks: [], blogKeywords: [] }),
  );
}

// cache() lasts for one server request, so generateMetadata() and the page share
// a single lookup and content is never stale between requests.
export const getBlogBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
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
  },
);

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