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
import annotationPlugin from "chartjs-plugin-annotation";
import LineChart, { LineChartProps } from "./LineChart";
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
  Legend,
  annotationPlugin
);

function App() {
  const [url, setUrl] = useState<Url>("PDP");
  const [parameters, setParameters] =
    useState<ScoresPercentages>(scoresParameters);
  const [settings, setSettings] = useState<SettingsMap>({
    minScore: 0,
    appendRegressions: true,
    regressions: {
      responseStart: 100,
      responseEnd: 100,
      slowestAssetDuration: 100,
      duration: 100,
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

  const regressionsAnnotation = {
    xMin: data?.[url].length,
    xMax: data?.[url].length,
  };
  const scoreAnnotations = [
    { yMin: 95, yMax: 95 },
    { yMin: 5, yMax: 5 },
    regressionsAnnotation,
  ];

  const chartsProps = [
    {
      title: "Metrics Durations",
      rows: getData(),
      annotations: [regressionsAnnotation],
    },
    {
      title: "Metrics Scores",
      rows: getScores(),
      annotations: scoreAnnotations,
    },
    {
      title: "Final Score",
      rows: getFinalScores(),
      annotations: scoreAnnotations,
    },
  ] satisfies LineChartProps[];

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
          {chartsProps.map((props, index) => (
            <div key={index} className="h-[300px]">
              <LineChart {...props} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
