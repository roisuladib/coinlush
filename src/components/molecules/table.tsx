/* eslint-disable indent */
'use client';

import { useMemo, useState } from 'react';

import { Pagination } from '@nextui-org/pagination';
import { Spinner } from '@nextui-org/spinner';
import {
   getKeyValue,
   SortDescriptor,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   Table as TableNextUI,
   TableRow,
} from '@nextui-org/table';

import { useIsomorphicLayoutEffect } from '@/hooks';
import { cn } from '@/utils';

export type TColumn = {
   key: string;
   label: string;
   className?: string;
   sortable?: boolean;
   align?: 'left' | 'right' | 'center';
   shouldFontCurrency?: boolean;
};

interface Props<T> {
   ariaLabel?: string;
   columns: TColumn[];
   items: T[];
   isLoading?: boolean;
   renderCell?: (item: T, key: React.Key) => React.ReactNode;
   pagination?: {
      page: number;
      total: number;
      setPage: (page: number) => void;
      rowsPerPage?: number;
      offsetPage?: number;
      prefetch?: (page: number) => void;
   };
}

export function Table<T>({
   columns,
   items,
   renderCell,
   ariaLabel,
   isLoading,
   pagination,
}: Props<T>) {
   const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});
   const page = pagination?.page || 0;
   const limit = pagination?.rowsPerPage || 0;

   const pages = useMemo(() => Math.ceil(pagination?.total! / limit), [limit, pagination?.total]);

   const bottomContent = useMemo(
      () =>
         pages > 0 ? (
            <div className="flex w-full justify-end">
               <Pagination
                  showControls
                  page={page}
                  total={pages}
                  size="sm"
                  onChange={pagination!.setPage}
                  isDisabled={isLoading}
               />
            </div>
         ) : null,
      [isLoading, page, pages, pagination],
   );

   const loadingState = useMemo(() => (isLoading ? 'loading' : 'idle'), [isLoading]);

   useIsomorphicLayoutEffect(() => {
      if (page && pagination?.prefetch) {
         pagination.prefetch(page);
      }
   }, [page, pagination]);

   return (
      <TableNextUI
         aria-label={ariaLabel || 'Table'}
         sortDescriptor={sortDescriptor}
         onSortChange={setSortDescriptor}
         bottomContent={bottomContent}>
         <TableHeader>
            {columns.map((column, index) => (
               <TableColumn
                  // {...(columns.length - 1 !== index &&
                  //    items?.length > 1 && {
                  //       allowsSorting: true,
                  //    })}
                  allowsSorting={column.sortable}
                  className={cn(
                     'last:text-right',
                     // 'bg-inherit text-tiny font-normal first:pl-0 last:pr-0 last:text-right',
                     column.align === 'right' && 'text-right',
                     column.align === 'center' && 'text-center',
                     column.align === 'left' && 'text-left',
                  )}
                  key={column.key}>
                  {column.label}
               </TableColumn>
            ))}
         </TableHeader>
         <TableBody
            items={items.map((e, i) => ({ ...e, _index: i })) ?? []}
            loadingContent={<Spinner size="lg" />}
            loadingState={loadingState}
            emptyContent={'Data not found'}>
            {item => (
               <TableRow key={item._index}>
                  {columnKey => {
                     const _column = columns.find(e => e.key === columnKey);
                     const shouldAlign = _column?.align;
                     // const shouldFontCurrency = _column?.shouldFontCurrency;
                     const className = _column?.className;
                     return (
                        <TableCell
                           className={cn(
                              'first:pl-0 last:pr-0 last:text-right',
                              // shouldFontCurrency && 'font-currency',
                              shouldAlign && `text-${shouldAlign}`,
                              className,
                           )}>
                           {renderCell ? renderCell(item, columnKey) : getKeyValue(item, columnKey)}
                        </TableCell>
                     );
                  }}
               </TableRow>
            )}
         </TableBody>
      </TableNextUI>
   );
}
