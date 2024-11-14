import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale
);

function Tilling() {
  const [data, setData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("Sell Price");
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [scaleType, setScaleType] = useState("logarithmic"); // State to track scale type
  const [isTiller, setIsTiller] = useState(false); // State to track if Tiller is selected

  useEffect(() => {
    Papa.parse("/tilling.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  }, []);

  const handleSeasonChange = (season) => {
    setSelectedSeasons((prevSeasons) =>
      prevSeasons.includes(season)
        ? prevSeasons.filter((s) => s !== season)
        : [...prevSeasons, season]
    );
  };

  const filteredData = data.filter((entry) => {
    const entrySeasons = entry.Season.split(", ");
    return (
      selectedSeasons.length === 0 ||
      selectedSeasons.some((season) => entrySeasons.includes(season))
    );
  });

  const chartData = {
    labels: filteredData.map((entry) => entry.Crop),
    datasets: [
      {
        label: selectedMetric,
        data: filteredData.map((entry) => {
          let sellPrice = parseFloat(entry.SellPrice); // Base sell price
          if (isTiller) {
            sellPrice *= 1.1; // Apply 1.1 multiplier if Tiller is selected
          }
          return Math.floor(sellPrice);
        }),
        backgroundColor: filteredData.map((entry) => entry.Color || "#808080"),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: {
          minRotation: 90,
          maxRotation: 90,
          align: "start",
        },
      },
      y: {
        beginAtZero: true,
        type: scaleType, // Dynamically set the y-axis scale type
      },
    },
  };

  return (
    <div className="chart-container" style={{ height: "400px", width: "100%" }}>
      <h2 style={{ color: "white" }}>Tilling Data - {selectedMetric}</h2>

      <div style={{ color: "white", marginBottom: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={selectedSeasons.includes("Spring")}
            onChange={() => handleSeasonChange("Spring")}
          />
          Spring
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedSeasons.includes("Summer")}
            onChange={() => handleSeasonChange("Summer")}
          />
          Summer
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedSeasons.includes("Fall")}
            onChange={() => handleSeasonChange("Fall")}
          />
          Fall
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedSeasons.includes("Winter")}
            onChange={() => handleSeasonChange("Winter")}
          />
          Winter
        </label>
      </div>

      {/* Tiller toggle checkbox */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "white", marginRight: "10px" }}>
          Tiller Profession:
        </label>
        <input
          type="checkbox"
          checked={isTiller}
          onChange={() => setIsTiller((prev) => !prev)} // Toggle Tiller profession
        />
      </div>

      {/* Dropdown for selecting scale type */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "white", marginRight: "10px" }}>
          Scale Type:{" "}
        </label>
        <select
          value={scaleType}
          onChange={(e) => setScaleType(e.target.value)} // Update scale type when changed
        >
          <option value="linear">Linear Scale</option>
          <option value="logarithmic">Logarithmic Scale</option>
        </select>
      </div>

      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default Tilling;
