import { Metric, Regressions, UrlRow } from "./models";

export function addRegressions({
  rows,
  regressions,
}: {
  rows: UrlRow[];
  regressions: Regressions;
}): UrlRow[] {
  return [
    ...rows,
    ...rows.map((row) =>
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
