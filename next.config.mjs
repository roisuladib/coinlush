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
         {
            protocol: 'https',
            hostname: 'pagead2.googlesyndication.com',
         },
         {
            protocol: 'https',
            hostname: 'googleads.g.doubleclick.net',
         },
      ],
   },
   experimental: {
      instrumentationHook: true,
   },
};

export default nextConfig;
