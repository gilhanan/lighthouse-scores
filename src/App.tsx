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
import {
  Metric,
  ScoresPercentages,
  Url,
  UrlFinalScoreRow,
  UrlFinalScoreRows,
  UrlRow,
  UrlRows,
} from "./models";
import { scoresParameters, scoresWeights } from "./constants";
import { computeLogNormalScore } from "./lighthouse/audit";
import PercentagesParameters from "./PercentagesParameters";

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
  const [data, setData] = useState<UrlRows>({} as UrlRows);

  async function loadData() {
    setData(await getData());
  }

  function getScores(): UrlRows {
    return Object.fromEntries(
      (Object.entries(data) as [Url, UrlRow[]][]).map(([url, rows]) => {
        const scores = rows.map((row) =>
          Object.fromEntries(
            (Object.entries(row) as [Metric, number][]).map(
              ([metric, value]) => {
                const { p10, median } = parameters[url][metric];
                const score =
                  computeLogNormalScore(
                    {
                      p10,
                      median,
                    },
                    value
                  ) * 100;
                return [metric, Math.max(score, minScore)];
              }
            )
          )
        );

        return [url, scores];
      })
    ) as UrlRows;
  }

  function getFinalScores(): UrlFinalScoreRows {
    return Object.fromEntries(
      Object.entries(getScores()).map(([url, rows]) => {
        const scores = rows.map((row) =>
          (Object.entries(row) as [Metric, number][]).reduce(
            (acc, [metric, value]) => ({
              ...acc,
              finalScore: acc.finalScore + value * scoresWeights[metric],
            }),
            {
              finalScore: 0,
            } as UrlFinalScoreRow
          )
        );

        return [url, scores];
      })
    ) as UrlFinalScoreRows;
  }

  function Charts({ data }: { data: UrlRows | UrlFinalScoreRows }) {
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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4">
      <PercentagesParameters
        parameters={parameters}
        onParametersChange={setParameters}
      />
      <div className="flex flex-col gap-8">
        <Charts data={data} />
        <Charts data={getScores()} />
        <Charts data={getFinalScores()} />
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
