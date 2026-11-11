import { revalidateTag } from "next/cache";

// Public pages read the database through cached functions tagged with these
// tags. The hosting MySQL user may open only 500 connections per hour, so
// public traffic must not reach the database on every request.
export const CONTENT_TAGS = {
  home: "home-content",
  blog: "blog-posts",
  faqs: "faqs",
} as const;

export type ContentTag = (typeof CONTENT_TAGS)[keyof typeof CONTENT_TAGS];

// Cached content is refreshed in the background at most this often. Admin
// edits expire the matching tag immediately (see src/lib/prisma.ts).
export const CONTENT_REVALIDATE_SECONDS = 300;

// Which tag each Prisma model's rows feed into. Model names as Prisma reports
// them in query extensions.
export const CONTENT_TAG_BY_MODEL: Partial<Record<string, ContentTag>> = {
  BlogPost: CONTENT_TAGS.blog,
  BlogBlock: CONTENT_TAGS.blog,
  BlogKeyword: CONTENT_TAGS.blog,
  HomeStat: CONTENT_TAGS.home,
  HomePlacementVideo: CONTENT_TAGS.home,
  HomeAbout: CONTENT_TAGS.home,
  HomeAboutHighlight: CONTENT_TAGS.home,
  Faq: CONTENT_TAGS.faqs,
};

export function expireContentTag(tag: ContentTag): void {
  try {
    // Route handlers can't use updateTag(); { expire: 0 } makes the next
    // request fetch fresh data instead of serving the old copy.
    revalidateTag(tag, { expire: 0 });
  } catch {
    // Outside a Next.js request (scripts, seeding) there is no cache to clear.
  }
}
