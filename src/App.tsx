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
  Legend,
} from "chart.js";
import LineChart from "./LineChart";
import { parseData } from "./data";
import {
  Metric,
  ScoresPercentages,
  SettingsMap,
  Url,
  UrlFinalScoreRow,
  UrlRow,
  UrlRows,
} from "./models";
import { scoresParameters, scoresWeights } from "./constants";
import { computeLogNormalScore } from "./lighthouse/audit";
import PercentagesParameters from "./MetricsPercentages";
import SelectPage from "./SelectPage";
import Settings from "./Settings";
import { addRegressions } from "./utils";

ChartJS.register(
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [url, setUrl] = useState<Url>("Gallery");
  const [parameters, setParameters] =
    useState<ScoresPercentages>(scoresParameters);
  const [settings, setSettings] = useState<SettingsMap>({
    minScore: 0,
    appendRegressions: 20,
    regressions: {
      responseStart: 100,
      responseEnd: 200,
      slowestAssetDuration: 200,
      duration: 400,
    },
  });
  const [data, setData] = useState<UrlRows>();

  const { appendRegressions, regressions, minScore } = settings;

  async function loadData() {
    setData(await parseData());
  }

  function getData(): UrlRow[] {
    const rows = data?.[url] || [];
    return appendRegressions
      ? addRegressions({
          rows,
          regressions,
          appendRegressions,
        })
      : rows;
  }

  function getScores(): UrlRow[] {
    return getData().map(
      (row) =>
        Object.fromEntries(
          (Object.entries(row) as [Metric, number][]).map(([metric, value]) => {
            const { p10, median } = parameters[url][metric];
            const score =
              computeLogNormalScore(
                {
                  p10,
                  median: Math.max(median, p10 + 1),
                },
                value
              ) * 100;
            return [metric, Math.max(score, minScore)];
          })
        ) as UrlRow
    );
  }

  function getFinalScores(): UrlFinalScoreRow[] {
    return getScores().map((row) =>
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
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex p-4 gap-8">
      <div className="flex flex-col gap-8">
        <SelectPage
          pages={Object.keys(data || {})}
          page={url}
          onPageChange={(page) => setUrl(page as Url)}
        />
        <div className="flex flex-col gap-4">
          <PercentagesParameters
            percentages={parameters[url]}
            onPercentagesChange={(percentages) =>
              setParameters({ ...parameters, [url]: percentages })
            }
          />
          <Settings settings={settings} onSettingsChange={setSettings} />
        </div>
      </div>
      {data && (
        <div className="flex-1 flex flex-col gap-8">
          {[
            { title: "Metrics Durations", rows: getData() },
            { title: "Metrics Scores", rows: getScores() },
            { title: "Final Score", rows: getFinalScores() },
          ].map((chart, index) => (
            <div key={index} className="h-[300px]">
              <LineChart title={chart.title} rows={chart.rows} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
