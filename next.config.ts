import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exam-app.elevate-bootcamp.cloud',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
