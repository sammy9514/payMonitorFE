interface ChartProps {
  data: number[];
  labels: string[];
  label: string;
  backgroundColor?: string;
}

import * as Chart from "chart.js";
import { useEffect, useRef } from "react";
const {
  Chart: ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  BarController,
} = Chart;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  BarController
);

export const ChartComp = ({
  data,
  labels,
  label,
  backgroundColor = "#3b82f6",
}: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (!ctx) return;
      console.log(chartInstance.current);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      console.log(chartInstance.current);

      chartInstance.current = new ChartJS(ctx!, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: data,
              backgroundColor: backgroundColor,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data, labels, label, backgroundColor]);

  return <canvas ref={chartRef}></canvas>;
};
