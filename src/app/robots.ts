import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /_next/ must stay crawlable: it serves the CSS, JavaScript and
      // optimised images Google needs to render and index the pages.
      disallow: ["/admin/", "/api/"],
    },

    sitemap: [
      "https://www.fostiima.org/sitemap.xml",
      "https://www.fostiima.org/sitemap-images.xml",
      "https://www.fostiima.org/sitemap-index.xml",
      "https://www.fostiima.org/sitemap-videos.xml",
    ],
     host: "https://www.fostiima.org",
  };
}
