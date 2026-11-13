import { NextResponse, type NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

// No route matches this path, so Next.js serves the site's 404 page with a real
// 404 status. Checking here guarantees that status for missing posts, even if
// a loading.tsx is added later (it would start streaming a 200 before the
// page's notFound() runs).
const UNROUTED_PATH = "/blog/post-unavailable/not-found";

// Retired email/banner campaigns whose homepage URLs Google still crawls
// ("Alternate page with proper canonical tag"). Only these are redirected, so
// UTM tags from live campaigns still reach analytics.
function isLegacyCampaign(utmSource: string | null): boolean {
  const source = utmSource?.trim().toLowerCase() ?? "";
  return source === "time" || source.startsWith("cumulative leads");
}

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    if (!isLegacyCampaign(url.searchParams.get("utm_source"))) {
      return NextResponse.next();
    }

    // Next.js redirects() would keep the query string, so this is done here.
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  return checkBlogExists(request, url.pathname.split("/")[2]);
}

// Published slugs, kept in memory so a blog page view doesn't open a database
// connection (the hosting MySQL user may open only 500 per hour). A newly
// published post can 404 for up to this long on an instance that already
// holds the list.
const SLUG_LIST_TTL_MS = 60_000;

let publishedSlugs: { slugs: Set<string>; expiresAt: number } | null = null;
let slugListRequest: Promise<Set<string>> | null = null;

async function loadPublishedSlugs(): Promise<Set<string>> {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    select: { slug: true },
  });

  const slugs = new Set(posts.map((post) => post.slug));
  publishedSlugs = { slugs, expiresAt: Date.now() + SLUG_LIST_TTL_MS };

  return slugs;
}

async function getPublishedSlugs(): Promise<Set<string>> {
  if (publishedSlugs && publishedSlugs.expiresAt > Date.now()) {
    return publishedSlugs.slugs;
  }

  // Concurrent requests share one query.
  slugListRequest ??= loadPublishedSlugs().finally(() => {
    slugListRequest = null;
  });

  try {
    return await slugListRequest;
  } catch (error) {
    // Keep serving the last known list while the database is unreachable.
    if (publishedSlugs) {
      return publishedSlugs.slugs;
    }

    throw error;
  }
}

async function checkBlogExists(request: NextRequest, slug: string) {

  try {
    if ((await getPublishedSlugs()).has(slug)) {
      return NextResponse.next();
    }
  } catch (error) {
    // A database failure must not be reported to crawlers as a missing page,
    // and passing through would stream a 200 error page. Log the error type
    // only, because driver messages can include connection details.
    console.error(
      "Blog existence check failed in proxy:",
      error instanceof Error ? error.name : "unknown error",
    );

    return new NextResponse("Service temporarily unavailable.", {
      status: 503,
      headers: {
        "Retry-After": "120",
        "Cache-Control": "no-store",
      },
    });
  }

  return NextResponse.rewrite(new URL(UNROUTED_PATH, request.url));
}

export const config = {
  matcher: [
    {
      source: "/",
      has: [{ type: "query", key: "utm_source" }],
    },
    {
      source: "/blog/:slug",
      // A listing page prefetches every visible post; each lookup is only
      // worth its query on a real navigation.
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
