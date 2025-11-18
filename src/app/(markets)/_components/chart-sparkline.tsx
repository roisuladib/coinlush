'use client';

import { useEffect, useRef, useState } from 'react';

import {
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

import { formatCurrency } from '^/utils';

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

type Props = {
  data: number[];
  variant?: 'up' | 'down';
};

const colorUp = (opacity = 1) => `rgba(23, 201, 100, ${opacity})`;
const colorDown = (opacity = 1) => `rgba(243, 18, 96, ${opacity})`;

export default function ChartSparkline({ data, variant }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    value: string;
  }>({ visible: false, x: 0, y: 0, value: '' });

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
              fill: 'origin',
              backgroundColor: ctx => {
                const chart = ctx.chart;
                const { chartArea } = chart;

                if (!chartArea) return;

                const gradient = chart.ctx.createLinearGradient(
                  0,
                  chartArea.top,
                  0,
                  chartArea.bottom,
                );

                if (variant === 'up') {
                  gradient.addColorStop(0, 'rgba(23, 201, 100, 0.3)');
                  gradient.addColorStop(1, 'rgba(23, 201, 100, 0)');
                } else {
                  gradient.addColorStop(0, 'rgba(243, 18, 96, 0.3)');
                  gradient.addColorStop(1, 'rgba(243, 18, 96, 0)');
                }

                return gradient;
              },
              borderColor: variant === 'up' ? colorUp() : colorDown(),
              borderJoinStyle: 'round',
              borderCapStyle: 'round',
              borderWidth: 1.5,
              pointRadius: 0,
              pointHitRadius: 10,
              tension: 0.35,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              enabled: false,
              external: context => {
                const tooltipModel = context.tooltip;

                if (tooltipModel.opacity === 0) {
                  setTooltip(prev => ({ ...prev, visible: false }));
                  return;
                }

                const position = context.chart.canvas.getBoundingClientRect();
                const value = tooltipModel.dataPoints?.[0]?.raw as number;

                setTooltip({
                  visible: true,
                  x: position.left + tooltipModel.caretX,
                  y: position.top + tooltipModel.caretY - 45,
                  value: formatCurrency(value),
                });
              },
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
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data, variant]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={120} height={56} />
      {tooltip.visible && (
        <div
          className="pointer-events-none fixed z-50 rounded-small border px-2 py-1.5 font-bold text-tiny shadow-black/10 shadow-md"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, 0)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: variant === 'up' ? colorUp(0.3) : colorDown(0.3),
            color: variant === 'up' ? colorUp() : colorDown(),
          }}>
          {tooltip.value}
          <div
            className="-bottom-1.5 -translate-x-1/2 absolute left-1/2 h-0 w-0 border-t-[6px] border-r-[6px] border-r-transparent border-l-[6px] border-l-transparent"
            style={{ borderTopColor: variant === 'up' ? colorUp(0.3) : colorDown(0.3) }}
          />
          <div
            className="-bottom-[5px] -translate-x-1/2 absolute left-1/2 h-0 w-0 border-t-[5px] border-r-[5px] border-r-transparent border-l-[5px] border-l-transparent"
            style={{ borderTopColor: 'rgba(255, 255, 255, 0.95)', }}
          />
        </div>
      )}
    </div>
  );
}
