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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function Ranching() {
  const [data, setData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("Base Price");
  const [selectedProfession, setSelectedProfession] = useState("All");

  useEffect(() => {
    Papa.parse("/ranching.csv", {
      download: true,
      header: true,
      complete: (result) => {
        console.log(result.data); // log parsed data
        setData(result.data);
      },
    });
  }, []);

  // Define profession multipliers (example values)
  const professionMultipliers = {
    Rancher: 1.2,
    Farmer: 1.1,
    // Add more professions with their respective multipliers
  };

  // Filter data based on selected profession
  const filteredData =
    selectedProfession === "All"
      ? data
      : data.filter((entry) => entry.profession === selectedProfession);

  const chartData = {
    labels: filteredData.map((entry) => entry.product),
    datasets: [
      {
        label: selectedMetric,
        data: filteredData.map((entry) => {
          const basePrice = parseInt(entry.base_price, 10);
          const multiplier = professionMultipliers[entry.profession] || 1; // Default to 1 if no multiplier
          return basePrice * multiplier; // Calculate effective price
        }),
        backgroundColor: filteredData.map(() => getRandomColor()),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: {
          minRotation: 90, // Sets minimum rotation to 90 degrees
          maxRotation: 90, // Sets maximum rotation to 90 degrees
          align: "start", // Optionally aligns the text to the start of each tick
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container" style={{ height: "400px", width: "100%" }}>
      <h2>Ranching Data - {selectedMetric}</h2>
      <select
        value={selectedProfession}
        onChange={(e) => setSelectedProfession(e.target.value)}
        style={{ marginBottom: "1rem" }}
      >
        <option value="All">All Professions</option>
        <option value="Rancher">Rancher</option>
        <option value="Farmer">Farmer</option>
        {/* Add more professions as necessary */}
      </select>
      <select
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
        style={{ marginBottom: "1rem" }}
      >
        <option value="Base Price">Base Price</option>
        <option value="Profession">Profession</option>
        {/* Add more options for other metrics as necessary */}
      </select>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default Ranching;
