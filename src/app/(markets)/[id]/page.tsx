import { fetchMarketDetail, fetchMarketDetailHistories, queryClient } from '@/lib';

import ChartHistroy from './_components/chart-histroy';
import Statistic from './_components/statistic';

export const dynamic = 'force-dynamic';

export default async function MarketsiD({ params: { id } }: { params: { id: string } }) {
   await Promise.all([
      await queryClient.prefetchQuery({
         queryKey: ['market', id],
         queryFn: () => fetchMarketDetail(id),
      }),
      await queryClient.prefetchQuery({
         queryKey: ['market-history', id],
         queryFn: () => fetchMarketDetailHistories(id),
      }),
   ]);

   return (
      <div className="space-y-4">
         <Statistic uuid={id} />
         <ChartHistroy uuid={id} />
      </div>
   );
}
