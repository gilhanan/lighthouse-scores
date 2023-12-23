export type Url = "PDP" | "Gallery" | "Embed PDP";

export interface RawRow {
  url: Url;
  responseStart: number;
  responseEnd: number;
  slowestAssetDuration: number;
  duration: number;
}

export type UrlRow = Omit<RawRow, "url">;

export type Metric = keyof UrlRow;

export type MetricRows = { [metric in Metric]: number[] };

export type UrlRows = { [url: string]: UrlRow[] };

export type ScoresPercentages = Record<
  Url,
  Record<
    Metric,
    {
      p10: number;
      median: number;
    }
  >
>;
