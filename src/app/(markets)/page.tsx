import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { AdBanner } from '@/components';
import { ROWS_PER_PAGE } from '@/constants';
import { fetchCoins, getQueryClient } from '@/lib';

import TableMarkets from './_components/table-markets';

const queryClient = getQueryClient();

export default async function Markets() {
   await queryClient.prefetchQuery({
      queryKey: ['markets', 0, ROWS_PER_PAGE, '24h', 'marketCap'],
      queryFn: () =>
         fetchCoins({
            limit: ROWS_PER_PAGE,
            offset: 0,
            orderBy: 'marketCap',
            orderDirection: 'desc',
            referenceCurrencyUuid: 'ETQIOVR_rqox',
            timePeriod: '24h',
            tiers: [1, 2],
         }),
   });
   const dehydratedState = dehydrate(queryClient);

   return (
      <>
         {process.env.NODE_ENV === 'production' && (
            <AdBanner
               dataAdFormat="auto"
               dataFullWidthResponsive
               dataAdSlot="8780783500"
            />
         )}
         <section className="space-y-6">
            <h1 className="text-xl font-semibold md:text-3xl">Top 20 cryptocurrencies</h1>
            {/* // Neat! Serialization is now as easy as passing props.
      // HydrationBoundary is a Client Component, so hydration will happen there. */}
            <HydrationBoundary state={dehydratedState}>
               <TableMarkets />
            </HydrationBoundary>
         </section>
      </>
   );
}
