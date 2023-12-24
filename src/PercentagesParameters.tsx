import {
  Metric,
  MetricsPercentages,
  Percentages,
  ScoresPercentages,
  Url,
} from "./models";

interface Props {
  parameters: ScoresPercentages;
  onParametersChange: (parameters: ScoresPercentages) => void;
}

function PercentagesParameters({ parameters, onParametersChange }: Props) {
  return (
    <div className="flex">
      {(Object.entries(parameters) as [Url, MetricsPercentages][]).map(
        ([url, rows]) => (
          <div key={url} className="flex flex-col border">
            <div className="p-2 font-bold">{url}</div>
            <div className="flex">
              <div className="p-2">
                {Object.keys(rows).map((metric) => (
                  <div key={metric}>{metric}</div>
                ))}
              </div>
              <div className="p-2">
                {(Object.entries(rows) as [Metric, Percentages][]).map(
                  ([metric, { p10, median }]) => (
                    <div key={metric} className="flex gap-2">
                      <input
                        type="number"
                        className="w-16"
                        value={p10}
                        min={1}
                        max={median}
                        onInput={(e) => {
                          onParametersChange({
                            ...parameters,
                            [url]: {
                              ...parameters[url],
                              [metric]: {
                                ...parameters[url][metric],
                                p10: Number(e.currentTarget.value),
                              },
                            },
                          });
                        }}
                      />
                      <input
                        type="number"
                        className="w-16"
                        value={median}
                        min={p10}
                        onInput={(e) => {
                          onParametersChange({
                            ...parameters,
                            [url]: {
                              ...parameters[url],
                              [metric]: {
                                ...parameters[url][metric],
                                median: Number(e.currentTarget.value),
                              },
                            },
                          });
                        }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default PercentagesParameters;
