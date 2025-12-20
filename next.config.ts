import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aliiev-lomach.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
