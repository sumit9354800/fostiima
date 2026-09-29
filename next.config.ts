import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/ag-landing-page",
        destination: "https://fostiima.org/ag-landing-page",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;