import { Metric, SettingsMap } from "./models";

interface Props {
  settings: SettingsMap;
  onSettingsChange: (settings: SettingsMap) => void;
}

function Settings({ settings, onSettingsChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Settings</h2>
      <label className="flex gap-2 items-center">
        <span>Min score</span>
        <input
          type="number"
          min={0}
          max={100}
          value={settings.minScore}
          onInput={(e) =>
            onSettingsChange({
              ...settings,
              minScore: Number(e.currentTarget.value),
            })
          }
        />
      </label>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Regressions</h3>
        <label className="flex gap-2 items-center">
          <span>Append regressions</span>
          <input
            type="number"
            min={0}
            value={settings.appendRegressions}
            onInput={(e) =>
              onSettingsChange({
                ...settings,
                appendRegressions: Number(e.currentTarget.value),
              })
            }
          />
        </label>
        <table>
          <thead>
            <tr className="border border-gray-300">
              <th>Metric</th>
              <th>Regression</th>
            </tr>
          </thead>
          <tbody>
            {(Object.entries(settings.regressions) as [Metric, number][]).map(
              ([metric, value]) => {
                const id = `regression-${metric}`;
                return (
                  <tr key={metric} className="border border-gray-300">
                    <td>
                      <label htmlFor={id}>{metric}</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="w-full"
                        id={id}
                        value={value}
                        min={0}
                        onInput={({ currentTarget: { value } }) =>
                          onSettingsChange({
                            ...settings,
                            regressions: {
                              ...settings.regressions,
                              [metric]: Number(value),
                            },
                          })
                        }
                      />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Settings;
