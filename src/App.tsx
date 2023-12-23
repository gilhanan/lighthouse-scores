import React, { useEffect, useState } from "react";
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
import DurationsChat from "./DurationsChat";
import { getData } from "./data";
import { UrlRows } from "./models";

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
  const [data, setData] = useState<UrlRows>({});

  async function loadData() {
    setData(await getData());
  }

  useEffect(() => {
    loadData();
  }, []);

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

export default App;
