import { Metric, Regressions, UrlRow } from "./models";

export function addRegressions({
  rows,
  appendRegressions,
  regressions,
}: {
  rows: UrlRow[];
  appendRegressions: number;
  regressions: Regressions;
}): UrlRow[] {
  return [
    ...rows,
    ...rows.slice(rows.length - appendRegressions).map((row) =>
      (Object.entries(regressions) as [Metric, number][]).reduce(
        (acc, [metric, regression]) => ({
          ...acc,
          [metric]: row[metric] + regression,
        }),
        {} as UrlRow
      )
    ),
  ];
}
