import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { fetchMarkets, queryClient } from '@/lib';

import TableMarkets from './_components/table-markets';

export default async function Markets({
   searchParams,
}: {
   searchParams: { [key: string]: string | string[] | undefined };
}) {
   await queryClient.prefetchQuery({
      queryKey: ['markets', 0],
      queryFn: () => fetchMarkets(0, 9),
   });
   const dehydratedState = dehydrate(queryClient);

   return (
      // Neat! Serialization is now as easy as passing props.
      // HydrationBoundary is a Client Component, so hydration will happen there.
      <HydrationBoundary state={dehydratedState}>
         <TableMarkets />
      </HydrationBoundary>
   );
}
