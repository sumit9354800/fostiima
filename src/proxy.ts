import { NextResponse, type NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

// No route matches this path, so Next.js serves the site's 404 page with a real
// 404 status. /blog/[slug] can't do this itself: the root loading.tsx starts
// streaming a 200 before the page's notFound() runs.
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

async function checkBlogExists(request: NextRequest, slug: string) {

  try {
    const post = await prisma.blogPost.findFirst({
      where: { slug, status: "published" },
      select: { id: true },
    });

    if (post) {
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
