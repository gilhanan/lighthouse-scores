import React from "react";
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
  return (
    <div className="flex flex-row">
      {new Array(3).fill(0).map((_, i) => (
        <div className="flex-1">
          <DurationsChat key={i} title={`Chat ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default App;
