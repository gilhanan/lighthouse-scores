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
import { Metric, Url, UrlRow, UrlRows } from "./models";
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
                  const { p10 } =
                    scoresParameters[url as Url][metric as Metric];
                  const score =
                    computeLogNormalScore(
                      {
                        p10: p10,
                        median: p10 * 2,
                      },
                      value
                    ) * 100;
                  return [metric, Math.max(score, 80)];
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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <DurationsCharts />
      <ScoresCharts />
    </div>
  );
}

export default App;
