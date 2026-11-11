import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The default list ends at 3840px, which full-width images without a
    // "sizes" hint requested on large screens. 2048px covers 1024px CSS at 2x.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bdaddtyz0jzeqxij.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/what-is-the-difference-between-ugc-and-aicte",
        destination: "/blog/difference-between-ugc-and-aicte",
        permanent: true,
      },
      {
        source: "/blog/nmat-exam-dates",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/mba-syllabus",
        destination: "/blog/mba-syllabus-2025-overview",
        permanent: true,
      },
      {
        source: "/blog/list-of-mba-specializations-in-india",
        destination: "/blog/mba-specializations-in-india",
        permanent: true,
      },
      // Margdarshak event slugs renamed to match the edition each page shows
      // (the old "margdarshak-3" page was the 2.0 ceremony) and to remove the
      // uppercase "C", which made case-duplicate URLs possible.
      {
        source: "/conclave-conference/margdarshak-3",
        destination: "/conclave-conference/margdarshak-2-award-ceremony",
        permanent: true,
      },
      {
        source: "/conclave-conference/margdarshak-awards-:ceremony(Ceremony|ceremony)",
        destination: "/conclave-conference/margdarshak-3-award-ceremony",
        permanent: true,
      },
    ];
  },
};


export default nextConfig;
