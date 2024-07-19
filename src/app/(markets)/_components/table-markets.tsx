/* eslint-disable indent */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Link } from '@nextui-org/link';
import { Select, SelectItem } from '@nextui-org/select';
import { Tooltip } from '@nextui-org/tooltip';

import {
   FetchQueryOptions,
   keepPreviousData,
   useQuery,
   useQueryClient,
} from '@tanstack/react-query';

import { LineChart, Table, TColumn } from '@/components';
import { ROWS_PER_PAGE } from '@/constants';
import { fetchCoins, rankings, timePeriods } from '@/lib';
import type { Selection } from '@/types';
import { Market } from '@/types';
import { cn, formatCurrency } from '@/utils';

import ChartSparkline from './chart-sparkline';

const columns: TColumn[] = [
   {
      key: 'name',
      label: 'Name',
   },
   {
      key: 'price',
      label: 'Price',
   },
   {
      key: 'change',
      label: 'Change',
   },
   {
      key: '24hVolume',
      label: '24h volume',
   },
   {
      key: 'marketCap',
      label: 'Market cap',
   },
   {
      key: 'chart',
      label: 'Chart',
   },
   {
      key: 'detail',
      label: 'Detail',
   },
];

const limits = [ROWS_PER_PAGE, 10, 15, 20, 50, 100] as const;

export default function TableMarkets() {
   const queryClient = useQueryClient();
   const [ranking, setRanking] = useState<Selection>(new Set([`${rankings[1]}`]));
   const [limit, setLimit] = useState<Selection>(new Set([`${ROWS_PER_PAGE}`]));
   const [timePeroid, setTimePeriod] = useState<Iterable<(typeof timePeriods)[number]>>(
      new Set(['24h']),
   );
   const [page, setPage] = useState(0);

   const getTimePeriod = useMemo(
      () => new Set(timePeroid).values().next().value as (typeof timePeriods)[number],
      [timePeroid],
   );
   const getRanking = useMemo(
      () => new Set(ranking).values().next().value as (typeof rankings)[number],
      [ranking],
   );
   const getLimit = useMemo(() => new Set(limit).values().next().value as number, [limit]);

   const fetchQueryOptions = useMemo<FetchQueryOptions<Market>>(
      () => ({
         queryKey: ['markets', page, getLimit, getTimePeriod, getRanking],
         queryFn: () =>
            fetchCoins({
               limit: getLimit,
               offset: page * getLimit,
               orderBy: getRanking,
               orderDirection: 'desc',
               referenceCurrencyUuid: 'ETQIOVR_rqox',
               timePeriod: getTimePeriod,
               tiers: [1, 2],
            }),
      }),
      [page, getLimit, getTimePeriod, getRanking],
   );

   // This useQuery could just as well happen in some deeper
   // child to <Posts>, data will be available immediately either way
   const { isLoading, isFetching, isRefetching, data, refetch } = useQuery({
      ...fetchQueryOptions,
      placeholderData: keepPreviousData,
   });

   const prefetch = useCallback(() => {
      queryClient.prefetchQuery(fetchQueryOptions);
   }, [fetchQueryOptions, queryClient]);

   useEffect(() => {
      if (getLimit || getTimePeriod) {
         refetch();
      }
   }, [getLimit, getTimePeriod, refetch]);

   const renderCell = useCallback((market: Market['data']['coins'][number], key: React.Key) => {
      const cellValue = market[key as keyof Market['data']['coins'][number]] as string;

      switch (key) {
         case 'name':
            return (
               <div className="flex items-center gap-2">
                  <div className="relative size-7 overflow-hidden">
                     <Image
                        src={market.iconUrl}
                        fill
                        className="size-full object-cover"
                        alt={cellValue}
                        loading="lazy"
                     />
                  </div>
                  <span>
                     {cellValue} /{' '}
                     <span className="font-medium text-foreground-500">
                        {market.symbol.toUpperCase()}
                     </span>
                  </span>
               </div>
            );

         case 'price':
            return formatCurrency(+cellValue);

         case 'change':
            const isUp = +cellValue >= 0;
            return (
               <Chip
                  color={isUp ? 'success' : 'danger'}
                  size="sm"
                  variant="flat">
                  {isUp ? `+${cellValue}` : cellValue}%
               </Chip>
            );

         case '24hVolume':
            return formatCurrency(+cellValue);

         case 'marketCap':
            return formatCurrency(+cellValue);

         case 'chart':
            return (
               <ChartSparkline
                  data={market.sparkline}
                  variant={String(market.change).startsWith('-') ? 'down' : 'up'}
               />
            );

         case 'detail':
            return (
               <Tooltip
                  content="Details"
                  showArrow>
                  <Button
                     color="primary"
                     variant="flat"
                     isIconOnly
                     as={Link}
                     size="sm"
                     href={`/${market.uuid}`}>
                     <LineChart className="size-5" />
                  </Button>
               </Tooltip>
            );

         default:
            return cellValue;
      }
   }, []);

   return (
      <Table
         ariaLabel="Markets"
         columns={columns}
         items={data?.data.coins || []}
         renderCell={renderCell}
         isLoading={isLoading || isFetching || isRefetching}
         bottomContent={
            <Select
               label="Limit"
               labelPlacement="outside"
               size="sm"
               items={limits.map(String).map(e => ({ key: e, label: e }))}
               selectedKeys={limit}
               className="max-w-20"
               onSelectionChange={setLimit}>
               {e => <SelectItem key={e.key}>{e.label}</SelectItem>}
            </Select>
         }
         topContent={
            <div className="flex items-center justify-between">
               <div className="inline-flex w-full justify-end gap-3">
                  <Select
                     label="Ranking"
                     labelPlacement="outside"
                     items={rankings.map(e => ({ key: e, label: e }))}
                     size="sm"
                     selectedKeys={ranking}
                     onSelectionChange={setRanking}
                     className="max-w-40"
                     classNames={{ value: cn('capitalize') }}>
                     {e => (
                        <SelectItem
                           className="capitalize"
                           key={e.key}>
                           {e.label}
                        </SelectItem>
                     )}
                  </Select>
                  <Select
                     label="Time period"
                     labelPlacement="outside"
                     size="sm"
                     selectedKeys={timePeroid}
                     onSelectionChange={setTimePeriod}
                     className="max-w-20">
                     {timePeriods.map(e => (
                        <SelectItem key={e}>{e}</SelectItem>
                     ))}
                  </Select>
               </div>
            </div>
         }
         pagination={{
            page: page + 1,
            total: data?.data.stats.total!,
            setPage: page => setPage(page - 1),
            prefetch: prefetch,
            rowsPerPage: getLimit,
            offsetPage: 1,
         }}
      />
   );
}
