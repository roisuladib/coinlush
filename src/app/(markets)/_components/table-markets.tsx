/* eslint-disable indent */
'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';

import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';

import { Table, TColumn } from '@/components';
import { useIsomorphicLayoutEffect } from '@/hooks';
import { fetchMarkets } from '@/lib';
import { Market } from '@/types';
import { formatCurrency } from '@/utils';

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

const rowsPerPage = 9;

export default function TableMarkets() {
   const queryClient = useQueryClient();
   const [page, setPage] = useState(0);

   // This useQuery could just as well happen in some deeper
   // child to <Posts>, data will be available immediately either way
   const { isLoading, isFetching, data } = useQuery({
      queryKey: ['markets', page],
      queryFn: () => fetchMarkets(page, rowsPerPage),
      placeholderData: keepPreviousData,
   });

   const prefetch = useCallback(() => {
      queryClient.prefetchQuery({
         queryKey: ['markets', page],
         queryFn: () => fetchMarkets(page, rowsPerPage),
      });
   }, [page, queryClient]);

   useIsomorphicLayoutEffect(() => {
      if (page) {
         console.log('RUNNING :>> ');
         prefetch();
      }
   }, [page]);

   const renderCell = useCallback((market: Market['data']['coins'][number], key: React.Key) => {
      const cellValue = market[key as keyof Market['data']['coins'][number]] as string;

      switch (key) {
         case 'name':
            return (
               <div className="flex items-center gap-2">
                  <div className="relative size-7 overflow-hidden rounded-full">
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
            return formatCurrency(cellValue);

         case 'change':
            const isUp = +cellValue >= 0;
            return (
               <span className={isUp ? 'text-success' : 'text-danger'}>
                  {isUp ? `+${cellValue}` : cellValue}%
               </span>
            );

         case '24hVolume':
            return formatCurrency(cellValue);

         case 'marketCap':
            return formatCurrency(cellValue);

         case 'chart':
            return (
               <ChartSparkline
                  data={market.sparkline}
                  variant={String(market.change).startsWith('-') ? 'down' : 'up'}
               />
            );

         case 'detail':
            return (
               <Button
                  color="primary"
                  variant="light"
                  as={Link}
                  size="sm"
                  href={`/${market.uuid}+${market.name.replace(' ', '').toLowerCase()}-${market.symbol.toLowerCase()}`}>
                  Detail
               </Button>
            );

         default:
            return cellValue;
      }
   }, []);

   return (
      <>
         <Table
            ariaLabel="Markets"
            columns={columns}
            items={data?.data.coins || []}
            renderCell={renderCell}
            isLoading={isLoading || isFetching}
            pagination={{
               page: page + 1,
               total: 40060,
               setPage: page => setPage(page - 1),
               prefetch: prefetch,
               offsetPage: 1,
            }}
         />
         {/* <Table
            aria-label="Markets"
            bottomContent={
               pages > 0 ? (
                  <div className="flex w-full justify-center">
                     <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page + 1}
                        total={pages}
                        onChange={page => setPage(page - 1)}
                     />
                  </div>
               ) : null
            }
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}>
            <TableHeader columns={columns}>
               {column => (
                  <TableColumn
                     key={column.key}
                     allowsSorting={column.sortable}>
                     {column.label}
                  </TableColumn>
               )}
            </TableHeader>
            <TableBody
               items={data?.data.coins ?? []}
               loadingContent={<Spinner />}
               loadingState={loadingState}
               emptyContent={'No markets to display.'}>
               {item => (
                  <TableRow key={item.uuid}>
                     {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                  </TableRow>
               )}
            </TableBody>
         </Table> */}
      </>
   );
}
