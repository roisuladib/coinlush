import '^/styles/globals.css';

import type { Metadata } from 'next';

import { headers } from 'next/headers';

import { cn } from '@heroui/theme';

import { SpeedInsights } from '@vercel/speed-insights/next';

import Providers from './providers';
import { AdBanner, Adsense, Header, ProgressBar } from '^/components';
import { font, siteConfig } from '^/config';

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

export default async function RootLayout({ children }: Readonly<Children>) {
  const headerFunc = await headers();
  const currency = headerFunc.get('x-currency') || 'USD';

  return (
    <html suppressHydrationWarning lang="en">
      {process.env.NODE_ENV === 'production' && (
        <head>
          <Adsense />
        </head>
      )}
      <body
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased',
          font.sans.variable,
          font.mono.variable,
        )}>
        <ProgressBar />
        <Providers currency={currency} themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <Header />
          <main className="mx-auto w-full max-w-7xl grow px-4 py-16 lg:px-10">
            {process.env.NODE_ENV === 'production' && (
              <div className="hidden">
                <AdBanner />
              </div>
            )}
            {children}
          </main>
          <footer className="flex h-16 w-full items-center justify-center">
            Design and Built with ❤️ by Roisuladib {new Date().getFullYear()}
          </footer>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
