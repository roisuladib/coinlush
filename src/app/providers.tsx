'use client';

import type { ThemeProviderProps } from 'next-themes';

import { useRouter } from 'next/navigation';

import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/toast';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';

import CurrencyProvider from './currency-provider';

interface Props extends Children {
  currency: string;
  themeProps?: Omit<ThemeProviderProps, 'children'>;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 3600 * 1_000,
        // staleTime: 3600 * 1_000,
        // gcTime: 1000 * 60 * 60 * 24,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children, currency, themeProps }: Props) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider
        className="relative flex h-screen flex-col"
        navigate={path => router.push(path)}>
        <ToastProvider placement="top-center" />
        <ThemeProvider {...themeProps}>
          <CurrencyProvider currency={currency} />
          {children}
        </ThemeProvider>
      </HeroUIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
