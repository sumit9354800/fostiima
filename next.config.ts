import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ];
  },
};


export default nextConfig;
