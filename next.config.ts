import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fostiima.org",
      },
      {
        protocol: "https",
        hostname: "wlproject.weblink4you.com",
      },
    ],
  },
};

export default nextConfig;