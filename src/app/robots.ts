import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        // Retired URLs from the old PHP/WordPress site (GSC, October 2026).
        // No current page has ".php" in its path; this also covers every
        // "/life-at-fostiima.php/nggallery/..." gallery URL.
        "/*.php",
        "/blog/the-ultimate-guide-to-success-when-seeking-an-mba-pgdm",
        // Malformed homepage URLs "/&" and "/$". "$" is the end-of-URL anchor
        // in robots.txt, so a literal "$" must be written as "%24".
        "/&",
        "/%24",
      ],
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
