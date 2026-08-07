import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/en",
      },
    ];
  },
};

export default nextConfig;
