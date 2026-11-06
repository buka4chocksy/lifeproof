import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@lifeproof/ui', '@lifeproof/design-tokens'],
};

export default nextConfig;
