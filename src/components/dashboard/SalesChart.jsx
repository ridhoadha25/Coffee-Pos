import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function SalesChart() {
  const data = {
    labels: [
      "Sen",
      "Sel",
      "Rab",
      "Kam",
      "Jum",
      "Sab",
      "Min",
    ],

    datasets: [
      {
        label: "Penjualan",
        data: [1200000, 1800000, 1500000, 2200000, 2600000, 3100000, 2800000],

        borderColor: "#6F4E37",

        backgroundColor: "rgba(111,78,55,0.15)",

        fill: true,

        tension: 0.4,

        pointBackgroundColor: "#6F4E37",

        pointBorderColor: "#fff",

        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        position: "top",
      },

      title: {
        display: true,
        text: "Grafik Penjualan Mingguan",
        font: {
          size: 18,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "#e5e7eb",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}