import { Metric, MetricsPercentagesMap, Percentages } from "./models";

interface Props {
  percentages: MetricsPercentagesMap;
  onPercentagesChange: (value: MetricsPercentagesMap) => void;
}

function MetricsPercentages({ percentages, onPercentagesChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Metrics Percentages</h2>
      <table>
        <thead>
          <tr className="border border-gray-300">
            <th>Metric</th>
            <th>P10</th>
            <th>P50</th>
          </tr>
        </thead>
        <tbody>
          {(Object.entries(percentages) as [Metric, Percentages][]).map(
            ([metric, { p10, median }]) => (
              <tr key={metric} className="border border-gray-300">
                <td>{metric}</td>
                <td>
                  <input
                    type="number"
                    className="w-full"
                    value={p10}
                    min={1}
                    max={median}
                    onInput={({ currentTarget: { value } }) => {
                      onPercentagesChange({
                        ...percentages,
                        [metric]: {
                          ...percentages[metric],
                          p10: Number(value),
                        },
                      });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="w-full"
                    value={median}
                    min={p10}
                    onInput={({ currentTarget: { value } }) => {
                      onPercentagesChange({
                        ...percentages,
                        [metric]: {
                          ...percentages[metric],
                          median: Number(value),
                        },
                      });
                    }}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MetricsPercentages;
