import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true ,
    localPatterns: [
      {
        pathname: '/assets/images/**/**',
      }
    ]
  }
};

export default nextConfig;
