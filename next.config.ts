import type { NextConfig } from 'next';

const config: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.coinranking.com',
      },
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com',
      },
    ],
  },
};

export default config;
