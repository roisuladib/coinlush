import { fetchMarketDetail, fetchMarketDetailHistories, queryClient } from '@/lib';

import ChartHistroy from './_components/chart-histroy';
import Statistic from './_components/statistic';

export const dynamic = 'force-dynamic';

export default async function MarketsiD({ params: { id } }: { params: { id: string } }) {
   const uuid = decodeURIComponent(id).split('+')[0];
   await Promise.all([
      await queryClient.prefetchQuery({
         queryKey: ['market', uuid],
         queryFn: () => fetchMarketDetail(uuid),
      }),
      await queryClient.prefetchQuery({
         queryKey: ['market-history', uuid],
         queryFn: () => fetchMarketDetailHistories(uuid),
      }),
   ]);

   return (
      <div className="space-y-4">
         <Statistic uuid={uuid} />
         <ChartHistroy uuid={uuid} />
      </div>
   );
}
