'use client';

import { useEffect, useRef } from 'react';

import {
   CategoryScale,
   Chart,
   LinearScale,
   LineController,
   LineElement,
   PointElement,
   Tooltip,
} from 'chart.js';

import { formatCurrency } from '@/utils';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

type Props = {
   data: number[];
   variant?: 'up' | 'down';
};

const colorUp = (opacity = 1) => `rgba(23, 201, 100, ${opacity})`;
const colorDown = (opacity = 1) => `rgba(243, 18, 96, ${opacity})`;

export default function ChartSparkline({ data, variant }: Props) {
   const canvasRef = useRef<HTMLCanvasElement>(null);

   useEffect(() => {
      const context = canvasRef.current;
      if (context) {
         const chart = new Chart(context, {
            type: 'line',
            data: {
               labels: data,
               datasets: [
                  {
                     data,
                     fill: 'start',
                     backgroundColor: context => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(
                           0,
                           variant === 'up' ? 'rgba(0, 192, 118, 0.3)' : 'rgba(255, 104, 56, 0.05)',
                        );
                        gradient.addColorStop(
                           0.1,
                           variant === 'up' ? 'rgba(0, 192, 118, 0.3)' : 'rgba(255, 104, 56, 0.05)',
                        );
                        return gradient;
                     },
                     borderColor: variant === 'up' ? colorUp() : colorDown(),
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
               maintainAspectRatio: true,
               plugins: {
                  tooltip: {
                     callbacks: {
                        beforeTitle: () => '',
                        title: () => '',
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
                     borderColor:
                        variant === 'up' ? 'rgba(0, 192, 118, 0.1)' : 'rgba(255, 104, 56, 0.1)',
                     bodyColor: variant === 'up' ? colorUp() : colorDown(),
                  },
               },
               scales: {
                  x: {
                     display: false,
                  },
                  y: {
                     display: false,
                  },
               },
               elements: {
                  line: {
                     tension: 0.35,
                  },
               },
            },
         });

         return () => {
            chart.destroy();
         };
      }
   }, [data, variant]);

   return (
      <canvas
         ref={canvasRef}
         className="!h-14 !w-20"
      />
   );
}
