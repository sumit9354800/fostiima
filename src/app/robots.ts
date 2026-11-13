import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        // These old gallery URLs 301 to /life-at-fostiima (next.config.ts), so
        // they stay crawlable for Google to see the redirect. The longer
        // Allow rule wins over "Disallow: /*.php".
        "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/1/image/45",
        "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/1/image/22-1",
        "/life-at-fostiima.php/nggallery/album/Workshop-on-Self-Awareness/image/self-awarness",
        "/life-at-fostiima.php/nggallery/album/Workshop-on-Self-Awareness/image/self-awarness-1",
        "/life-at-fostiima.php/nggallery/album/Workshop-on-Self-Awareness/image/self-awarness-3",
        "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8715",
      ],
      // /_next/ must stay crawlable: it serves the CSS, JavaScript and
      // optimised images Google needs to render and index the pages.
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
