'use client';

import { useEffect, useMemo, useRef } from 'react';

import { Spinner } from '@nextui-org/spinner';

import { useQuery } from '@tanstack/react-query';
import {
   CategoryScale,
   Chart,
   LinearScale,
   LineController,
   LineElement,
   PointElement,
   Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';

import { fetchMarketDetailHistories } from '@/lib';
import { formatCurrency } from '@/utils';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const colorUp = (opacity = 1) => `rgba(23, 201, 100, ${opacity})`;
const colorDown = (opacity = 1) => `rgba(243, 18, 96, ${opacity})`;

export default function ChartHistroy({ uuid }: { uuid: string }) {
   const chartRef = useRef<HTMLCanvasElement>(null);

   const { isLoading, isFetching, data } = useQuery({
      queryKey: ['market-history', uuid],
      queryFn: () => fetchMarketDetailHistories(uuid),
   });

   const _isLoading = useMemo(() => isLoading || isFetching, [isFetching, isLoading]);

   const dataChart = useMemo(() => data?.data.history, [data?.data.history]);

   useEffect(() => {
      const ctx = chartRef.current;

      if (ctx) {
         const chart = new Chart(ctx, {
            type: 'line',
            data: {
               labels: dataChart!.map(e => dayjs(e.timestamp * 1000).format('HH:mm')),
               datasets: [
                  {
                     fill: true,
                     data: dataChart!.map(e => e.price),
                     backgroundColor: colorDown(),
                     borderColor: colorUp(),
                     borderJoinStyle: 'round',
                     borderCapStyle: 'round',
                     borderWidth: 1.5,
                     pointRadius: 0,
                     pointHitRadius: 10,
                     tension: 0.2,
                  },
               ],
            },
            options: {
               plugins: {
                  tooltip: {
                     callbacks: {
                        label: ctx => formatCurrency(ctx.parsed.y),
                     },
                     displayColors: false,
                     padding: 4,
                     position: 'nearest',
                     caretSize: 5,
                     backgroundColor: 'rgba(255,255,255,0.9)',
                     bodyFont: {
                        weight: 'bold',
                     },
                     borderWidth: 0.5,
                     borderColor: colorUp(),
                     titleColor: colorDown(),
                     bodyColor: colorDown(),
                  },
               },
               scales: {
                  y: {},
               },
               interaction: {
                  intersect: false,
               },
            },
         });

         return () => {
            chart.destroy();
         };
      }
   }, [dataChart]);

   if (_isLoading) {
      return <Spinner />;
   }

   return <canvas ref={chartRef} />;
}
