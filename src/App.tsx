import { useEffect, useState } from "react";
import "./App.css";
import {
  Chart as ChartJS,
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import DurationsChat from "./DurationsChat";
import { getData } from "./data";
import { Metric, ScoresPercentages, Url, UrlRow, UrlRows } from "./models";
import { scoresParameters } from "./constants";
import { computeLogNormalScore } from "./lighthouse/audit";

ChartJS.register(
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

function App() {
  const [parameters, setParameters] =
    useState<ScoresPercentages>(scoresParameters);
  const [minScore, setMinScore] = useState<number>(0);
  const [data, setData] = useState<UrlRows>({});

  async function loadData() {
    setData(await getData());
  }

  function DurationsCharts() {
    return (
      <div className="flex flex-row">
        {Object.entries(data).map(([url, rows]) => (
          <div key={url} className="flex-1">
            <DurationsChat title={url} urlRows={rows} />
          </div>
        ))}
      </div>
    );
  }

  function ScoresCharts() {
    return (
      <div className="flex flex-row">
        {Object.entries(data).map(([url, rows]) => {
          const scores = rows.map(
            (row) =>
              Object.fromEntries(
                Object.entries(row).map(([metric, value]) => {
                  const { p10, median } =
                    parameters[url as Url][metric as Metric];
                  const score =
                    computeLogNormalScore(
                      {
                        p10,
                        median,
                      },
                      value
                    ) * 100;
                  return [metric, Math.max(score, minScore)];
                })
              ) as UrlRow
          );

          return (
            <div key={url} className="flex-1">
              <DurationsChat title={url} urlRows={scores} />
            </div>
          );
        })}
      </div>
    );
  }

  function Parameters() {
    return (
      <div className="flex">
        {Object.entries(parameters).map(([url, rows]) => (
          <div key={url} className="flex flex-col border">
            <div className="p-2 font-bold">{url}</div>
            <div className="flex">
              <div className="p-2">
                {Object.keys(rows).map((metric) => (
                  <div key={metric}>{metric}</div>
                ))}
              </div>
              <div className="p-2">
                {Object.entries(rows).map(([metric, { p10, median }]) => (
                  <div key={metric}>
                    <input
                      type="number"
                      className="w-16"
                      value={p10}
                      min={1}
                      max={median}
                      onInput={(e) => {
                        setParameters({
                          ...parameters,
                          [url]: {
                            ...parameters[url as Url],
                            [metric as Metric]: {
                              ...[parameters[url as Url][metric as Metric]],
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
                        setParameters({
                          ...parameters,
                          [url]: {
                            ...parameters[url as Url],
                            [metric as Metric]: {
                              ...[parameters[url as Url][metric as Metric]],
                              metric: Number(e.currentTarget.value),
                            },
                          },
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4">
      <Parameters />
      <div className="flex flex-col gap-8">
        <DurationsCharts />
        <ScoresCharts />
      </div>
      <div>
        <label className="flex gap-2">
          <span>Min score</span>
          <input
            type="number"
            min={0}
            max={100}
            value={minScore}
            onInput={(e) => setMinScore(Number(e.currentTarget.value))}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
