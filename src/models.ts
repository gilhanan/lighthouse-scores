export interface RawRow {
  url: string;
  responseStart: string;
  responseEnd: string;
  slowestAssetDuration: string;
  duration: string;
}

export type UrlRow = Omit<RawRow, "url">;

export type Metric = keyof UrlRow;

export type MetricRows = { [metric in Metric]: number[] };

export type UrlRows = { [url: string]: UrlRow[] };
