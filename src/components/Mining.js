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

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function Mining() {
  const [data, setData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("Base Price"); // Match CSV column name exactly
  const [selectedProfession, setSelectedProfession] = useState("All");

  useEffect(() => {
    Papa.parse("/mining.csv", {
      download: true,
      header: true,
      complete: (result) => {
        console.log(result.data); // To verify CSV data structure
        setData(result.data);
      },
    });
  }, []);

  const professionMultipliers = {
    Gemologist: 1.3,
    Blacksmith: 1.2,
    // Add more professions as needed
  };

  const filteredData =
    selectedProfession === "All"
      ? data
      : data.filter((entry) => entry.profession === selectedProfession);

  const chartData = {
    labels: filteredData.map((entry) => entry.name), // Ensure "Name" matches CSV header exactly
    datasets: [
      {
        label: selectedMetric,
        data: filteredData.map((entry) => {
          const basePrice = parseInt(entry.price, 10); // Ensure metric matches CSV
          const multiplier = professionMultipliers[entry.profession] || 1;
          return basePrice * multiplier;
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
      <h2>Mining Data - {selectedMetric}</h2>
      <select
        value={selectedProfession}
        onChange={(e) => setSelectedProfession(e.target.value)}
        style={{ marginBottom: "1rem" }}
      >
        <option value="All">All Professions</option>
        <option value="Gemologist">Gemologist</option>
        <option value="Blacksmith">Blacksmith</option>
        {/* Add more professions if needed */}
      </select>
      <select
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
        style={{ marginBottom: "1rem" }}
      >
        <option value="Price">Price</option>
        <option value="Base Price">Base Price</option>
        {/* Ensure these options match CSV columns */}
      </select>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default Mining;
