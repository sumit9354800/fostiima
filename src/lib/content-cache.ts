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

// After a read fails, its fallback is served straight away for this long,
// so a database outage costs one slow request per reader per instance
// instead of a connection timeout on every page view.
const FAILED_READ_PAUSE_MS = 30_000;
const failedUntil = new Map<string, number>();

/**
 * Runs a cached read and returns `fallback` if it throws. Used for page
 * sections that can be left out while the database is unavailable. Each
 * `name` pauses separately, so one failing read never hides another read's
 * cached data.
 */
export async function readOrFallback<T>(
  name: string,
  read: () => Promise<T>,
  fallback: T,
): Promise<T> {
  if ((failedUntil.get(name) ?? 0) > Date.now()) {
    return fallback;
  }

  try {
    return await read();
  } catch (error) {
    failedUntil.set(name, Date.now() + FAILED_READ_PAUSE_MS);
    // Log the error type only: driver messages can include connection details.
    console.error(
      `${name} unavailable:`,
      error instanceof Error ? error.name : "unknown error",
    );

    return fallback;
  }
}

export function expireContentTag(tag: ContentTag): void {
  try {
    // Route handlers can't use updateTag(); { expire: 0 } makes the next
    // request fetch fresh data instead of serving the old copy.
    revalidateTag(tag, { expire: 0 });
  } catch {
    // Outside a Next.js request (scripts, seeding) there is no cache to clear.
  }
}
