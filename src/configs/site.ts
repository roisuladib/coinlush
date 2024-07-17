export type SiteConfig = typeof siteConfig;

export const siteConfig = {
   title: 'Coinlush - Cryptocurrency price list',
   description:
      'Explore top coin cryptocurrencies and get information about price, coins market and price chart',
   url:
      process.env.NODE_ENV === 'production'
         ? 'https://coinlush-roisuladib.vercel.app'
         : 'http://localhost:3000',
};
