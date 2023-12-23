import React from "react";
import { Line } from "react-chartjs-2";
import { UrlRow, Metric, MetricRows } from "./models";
import { ChartOptions, ChartData } from "chart.js";

interface Props {
  title: string;
  urlRows: UrlRow[];
}

function getMetricRows(urlRows: UrlRow[]): MetricRows {
  return urlRows.reduce<MetricRows>((acc, row) => {
    Object.entries(row).forEach((metrics) => {
      const [metric, value] = metrics as [Metric, string];
      acc[metric] = acc[metric] || [];
      acc[metric].push(parseInt(value));
    });

    return acc;
  }, {} as MetricRows);
}

function DurationsChat({ title, urlRows }: Props) {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  };

  const metricRows = getMetricRows(urlRows);

  const data: ChartData<"line"> = {
    labels: urlRows.map((_, index) => index),
    datasets: Object.entries(metricRows).map(([label, data]) => ({
      label,
      data,
    })),
  };

  return <Line options={options} data={data} />;
}

export default DurationsChat;
