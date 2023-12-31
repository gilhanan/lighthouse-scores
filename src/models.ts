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

export type MetricRows = Record<Metric, number[]>;

export type UrlRows = Record<Url, UrlRow[]>;

export type ScoresWeights = Record<Metric, number>;

export type Percentages = Record<"p10" | "median", number>;

export type MetricsPercentagesMap = Record<Metric, Percentages>;

export type ScoresPercentages = Record<Url, MetricsPercentagesMap>;

export type UrlFinalScoreRow = { finalScore: number };

export type UrlFinalScoreRows = Record<Url, UrlFinalScoreRow[]>;

export type Regressions = Record<Metric, number>;

export interface SettingsMap {
  minScore: number;
  appendRegressions: boolean;
  regressions: Regressions;
}
