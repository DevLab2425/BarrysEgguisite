import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/BarrysEgguisite',
  output: 'export',
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true ,
    localPatterns: [
      {
        pathname: '/BarrysEgguisite/assets/images/**/**',
      }
    ]
  }
};

export default nextConfig;
