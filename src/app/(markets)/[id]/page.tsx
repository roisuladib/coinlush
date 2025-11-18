import ChartHistroy from './_components/chart-histroy';
import Statistic from './_components/statistic';
import { fetchMarketDetail, fetchMarketDetailHistories, getQueryClient } from '^/lib';

export const dynamic = 'force-dynamic';

const queryClient = getQueryClient();

export default async function MarketsDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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
