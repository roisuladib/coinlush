import '@/styles/globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';

import { AdBanner, Header, ProgressBar } from '@/components';
import { Adsense } from '@/components';
import { siteConfig } from '@/configs';

import Providers from './providers';

const geistSans = localFont({
   src: './fonts/GeistVF.woff',
   variable: '--font-geist-sans',
});
const geistMono = localFont({
   src: './fonts/GeistMonoVF.woff',
   variable: '--font-geist-mono',
});

export const metadata: Metadata = {
   metadataBase: new URL(siteConfig.url),
   title: {
      default: siteConfig.title,
      template: `%s - ${siteConfig.title}`,
   },
   description: siteConfig.description,
   applicationName: siteConfig.title,
   authors: {
      name: 'roisuladib',
      url: siteConfig.url,
   },
   publisher: 'roisuladib',
   creator: 'roisuladib',
   keywords: `${siteConfig.title}, Blockchain Crypto Exchange, Cryptocurrency Exchange, Bitcoin Trading, Ethereum price trend, BNB, CZ, BTC price, ETH wallet registration, LTC price, Kwek, Poloniex, Bittrex`,
   robots: { index: true, follow: true },
   icons: {
      icon: '/favicon/favicon.ico',
      shortcut: '/favicon/favicon-16x16.png',
      other: [
         {
            rel: 'apple-touch-ico',
            url: '/favicon/apple-touch-icon.png',
            type: 'image/png',
            sizes: '180x180',
         },
         {
            rel: 'icon',
            url: '/favicon/favicon-16x16.png',
            type: 'image/png',
            sizes: '16x16',
         },
         {
            rel: 'icon',
            url: '/favicon/favicon-32x32.png',
            type: 'image/png',
            sizes: '32x32',
         },
         {
            rel: 'icon',
            url: '/favicon/favicon-192x192.png',
            type: 'image/png',
            sizes: '192x192',
         },
         {
            rel: 'icon',
            url: '/favicon/favicon-512x512.png',
            type: 'image/png',
            sizes: '512x512',
         },
      ],
   },
   manifest: '/favicon/site.webmanifest',
   openGraph: {
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.title,
      images: [`${siteConfig.url}/favicon/images/og.jpg`],
      type: 'website',
      locale: 'en_US',
   },
   twitter: {
      card: 'summary_large_image',
      title: siteConfig.title,
      description: siteConfig.description,
      images: [`${siteConfig.url}/favicon/images/og.jpg`],
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         {process.env.NODE_ENV === 'production' && (
            <head>
               <Adsense pid="1341034655058100" />
            </head>
         )}
         <body
            className={`min-h-screen bg-background font-sans antialiased ${geistSans.variable} ${geistMono.variable}`}>
            <ProgressBar />
            <Providers>
               <Header />
               {process.env.NODE_ENV === 'production' && (
                  <AdBanner
                     dataAdFormat="auto"
                     dataFullWidthResponsive
                     dataAdSlot="8780783500"
                  />
               )}
               <main className="flex grow flex-col py-14">
                  <div className="mx-auto w-full max-w-7xl px-10">{children}</div>
               </main>
               <footer className="flex h-16 w-full items-center justify-center">
                  Design and Built with ❤️ by Roisuladib {new Date().getFullYear()}
               </footer>
            </Providers>
            <Toaster />

            <SpeedInsights />
         </body>
      </html>
   );
}
