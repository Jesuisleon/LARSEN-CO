import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import lodash from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { useReport } from "hooks/useReport";
import LoadingSpinner from "components/LoadingSpinner.jsx";

export default function LineChart() {
  const { getAllReport, isLoading, error } = useReport();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Sales report",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "1990",
        data: [0, 3500, 1200, 7000, 0, 1000, 18700],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "2023",
        data: [2000, 3000, 4000, 5000, 6000, 7000, 8000],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  const getAllReportBySalesman = async () => {
    const reports = await getAllReport();
    if (!reports) return;
    const newReports = reports.reduce(
        (acc, report) => {
          // La date est enregistrée en format ISO (YYYY-MM-DD)
          const month = parseInt(report.date.split("-")[1]);
          const total = report.total_sales;

          acc.datasets[1].data[month - 1] += total
          return acc;
        },
        lodash.cloneDeep(data)
      );

      setData(newReports);
  };

  useEffect(() => {
    getAllReportBySalesman();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;
  return <Line options={options} data={data} />;
}
