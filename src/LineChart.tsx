import React from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";
import { AnnotationOptions } from "chartjs-plugin-annotation";

type Row = Record<string, number>;

type Metric = keyof Row;

type MetricRows = Record<Metric, number[]>;

export interface LineChartProps {
  title: string;
  rows: Row[];
  annotations?: {
    yMin?: number;
    yMax?: number;
    xMin?: number;
    xMax?: number;
  }[];
}

function getMetricRows(rows: Row[]): MetricRows {
  return rows.reduce<MetricRows>((acc, row) => {
    Object.entries(row).forEach((metrics) => {
      const [metric, value] = metrics as [Metric, number];
      acc[metric] = acc[metric] || [];
      acc[metric].push(value);
    });

    return acc;
  }, {} as MetricRows);
}

function LineChart({ title, rows, annotations }: LineChartProps) {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      annotation: {
        annotations: annotations?.map<AnnotationOptions>(
          ({ yMin, yMax, xMin, xMax }) => ({
            type: "line",
            yMin,
            yMax,
            xMin,
            xMax,
            borderWidth: 2,
          })
        ),
      },
    },
  };

  const metricRows = getMetricRows(rows);

  const data: ChartData<"line"> = {
    labels: rows.map((_, index) => index),
    datasets: Object.entries(metricRows).map(([label, data]) => ({
      label,
      data,
    })),
  };

  return <Line options={options} data={data} />;
}

export default LineChart;
