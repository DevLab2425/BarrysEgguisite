import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/BarrysEgguisite/out',
  output: 'export',
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true ,
    localPatterns: [
      {
        pathname: '/BarrysEgguisite/out/assets/images/**/**',
      }
    ]
  }
};

export default nextConfig;
