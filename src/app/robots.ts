import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/_next/"],
    },

    sitemap: [
      "https://www.fostiima.org/sitemap.xml",
      "https://www.fostiima.org/sitemap-images.xml",
      "https://www.fostiima.org/sitemap-videos.xml",
    ],
  };
}
