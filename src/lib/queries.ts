import { unstable_cache } from "next/cache";
import { cache } from "react";

import {
  CONTENT_REVALIDATE_SECONDS,
  CONTENT_TAGS,
} from "@/lib/content-cache";
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

// Public blog reads are cached (see src/lib/content-cache.ts); the mapped
// BlogPost values are plain JSON, so they survive the cache unchanged.
export const getPublishedBlogs = unstable_cache(
  loadPublishedBlogs,
  ["published-blogs"],
  { tags: [CONTENT_TAGS.blog], revalidate: CONTENT_REVALIDATE_SECONDS },
);

async function loadPublishedBlogs(): Promise<BlogPost[]> {
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

// cache() lasts for one server request, so generateMetadata() and the page share
// a single lookup; unstable_cache keeps it across requests until an admin edit
// or the revalidate period expires it.
export const getBlogBySlug = cache(
  unstable_cache(
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
    ["blog-by-slug"],
    { tags: [CONTENT_TAGS.blog], revalidate: CONTENT_REVALIDATE_SECONDS },
  ),
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