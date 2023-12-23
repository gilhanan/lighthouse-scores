import React from "react";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.floor(Math.random() * 10)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.floor(Math.random() * 10)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

interface Props {
  title: string;
}

function DurationsChat({ title }: Props) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Line options={options} data={data} />;
}

export default DurationsChat;
