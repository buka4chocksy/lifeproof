import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@lifeproof/ui', '@lifeproof/contracts', '@lifeproof/design-tokens'],
};

export default nextConfig;
