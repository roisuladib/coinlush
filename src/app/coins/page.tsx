import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import TableMarkets from './_components/table-markets';
import { fetchCoins, getQueryClient } from '^/lib';

const queryClient = getQueryClient();

export default async function Markets() {
  await queryClient.prefetchQuery(fetchCoins());
  const dehydratedState = dehydrate(queryClient);

  return (
    <section className="space-y-6">
      <h1 className="font-semibold text-xl md:text-3xl">Top 20 cryptocurrencies</h1>
      {/* // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there. */}
      <HydrationBoundary state={dehydratedState}>
        <TableMarkets />
      </HydrationBoundary>
    </section>
  );
}
