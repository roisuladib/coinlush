'use client';

import { useMemo } from 'react';

import { Spinner } from '@nextui-org/spinner';

import { useQuery } from '@tanstack/react-query';

import { fetchMarketDetail } from '@/lib';

export default function Statistic({ uuid }: { uuid: string }) {
   const { isLoading, isFetching, data } = useQuery({
      queryKey: ['market', uuid],
      queryFn: () => fetchMarketDetail(uuid),
   });

   const _isLoading = useMemo(() => isLoading || isFetching, [isFetching, isLoading]);

   if (_isLoading) {
      return <Spinner />;
   }

   return <div>{data?.data.coin.name}</div>;
}
