const API_URL = process.env.NEXT_PUBLIC_COIN_RANKING_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
   compress: true,
   poweredByHeader: false,
   devIndicators: {
      buildActivity: true,
      buildActivityPosition: 'bottom-right',
   },
   logging: {
      fetches: {
         fullUrl: true,
      },
   },
   images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'cdn.coinranking.com',
         },
      ],
   },
};

export default nextConfig;
