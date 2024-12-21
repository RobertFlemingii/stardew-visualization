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

function Fishing() {
  const [data, setData] = useState([]);
  const [selectedMetric] = useState("Sell Price");
  const [quality, setQuality] = useState("regular"); // State for quality selection
  const [profession, setProfession] = useState("none"); // State for selected profession
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedWeathers, setSelectedWeathers] = useState([]);

  const [scaleType, setScaleType] = useState("logarithmic"); // State to track scale type

  // Quality multipliers map
  const qualityMultipliers = {
    regular: 1,
    silver: 1.25,
    gold: 1.5,
    iridium: 2,
  };

  // Profession multipliers map
  const professionMultipliers = {
    none: 1,
    fisher: 1.25,
    angler: 1.5,
  };

  useEffect(() => {
    Papa.parse("/fishing.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  }, []);

  const handleToggle = (setter, value) => {
    setter((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value]
    );
  };

  // Location toggle
  const handleLocationChange = (location) =>
    handleToggle(setSelectedLocations, location);

  // Time toggle
  const handleTimeChange = (time) => handleToggle(setSelectedTimes, time);

  // Seasons toggle
  const handleSeasonChange = (season) =>
    handleToggle(setSelectedSeasons, season);

  // Weather toggle
  const handleWeatherChange = (weather) =>
    handleToggle(setSelectedWeathers, weather);

  const filteredData = data.filter((fish) => {
    // Check if fish meets location, time, weather, and season criteria, with optional chaining
    const matchesLocation = selectedLocations
      ? fish.Location?.includes(selectedLocations)
      : true;
    const matchesTime = selectedTimes
      ? fish.Time?.includes(selectedTimes)
      : true;
    const matchesWeather = selectedWeathers
      ? fish.Weather?.includes(selectedWeathers)
      : true;
    const matchesSeason = selectedSeasons
      ? fish.Season?.includes(selectedSeasons)
      : true;

    // Only include fish that meet all the criteria
    return matchesLocation && matchesTime && matchesWeather && matchesSeason;
  });

  const chartData = {
    labels: filteredData.map((entry) => entry.name),
    datasets: [
      {
        label: selectedMetric,
        data: filteredData.map((entry) => {
          let sellPrice = parseFloat(entry.price); // Base sell price
          sellPrice *= professionMultipliers[profession]; // Apply profession multiplier
          sellPrice *= qualityMultipliers[quality]; // Apply quality multiplier
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
      <h2 style={{ color: "white" }}>Fishing Data - {selectedMetric}</h2>

      <div style={{ color: "white", marginBottom: "1rem" }}>
        <label style={{ color: "white", marginRight: "10px" }}>Location:</label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Pelican Town River")}
            onChange={() => handleLocationChange("Pelican Town River")}
          />
          Pelican Town River
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Mountain Lake")}
            onChange={() => handleLocationChange("Mountain Lake")}
          />
          Mountain Lake
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Cindersnap Pond")}
            onChange={() => handleLocationChange("Cindersnap Pond")}
          />
          Cindersnap Pond
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Cindersnap Waterfall")}
            onChange={() => handleLocationChange("Cindersnap Waterfall")}
          />
          Cindersnap Waterfall
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Beach")}
            onChange={() => handleLocationChange("Beach")}
          />
          Beach
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Deep Sea Submarine")}
            onChange={() => handleLocationChange("Deep Sea Submarine")}
          />
          Deep Sea Submarine
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Secret Woods Pond")}
            onChange={() => handleLocationChange("Secret Woods Pond")}
          />
          Secret Woods Pond
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Sewers")}
            onChange={() => handleLocationChange("Sewers")}
          />
          Sewers
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Mutant Bug Lair")}
            onChange={() => handleLocationChange("Mutant Bug Lair")}
          />
          Mutant Bug Lair
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Mines")}
            onChange={() => handleLocationChange("Mines")}
          />
          Mines
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Witch's Swamp")}
            onChange={() => handleLocationChange("Witch's Swamp")}
          />
          Witch's Swamp
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Desert Pond")}
            onChange={() => handleLocationChange("Desert Pond")}
          />
          Desert Pond
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Ginger Island River")}
            onChange={() => handleLocationChange("Ginger Island River")}
          />
          Ginger Island River
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Ginger Island Pond")}
            onChange={() => handleLocationChange("Ginger Island Pond")}
          />
          Ginger Island Pond
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Pirate Cove")}
            onChange={() => handleLocationChange("Pirate Cove")}
          />
          Pirate Cove
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Volcano Caldera")}
            onChange={() => handleLocationChange("Volcano Caldera")}
          />
          Volcano Caldera
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedLocations.includes("Ginger Island Beach")}
            onChange={() => handleLocationChange("Ginger Island Beach")}
          />
          Ginger Island Beach
        </label>
        <br />
        <label style={{ color: "white", marginRight: "10px" }}>Time:</label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedTimes.includes("Morning")}
            onChange={() => handleTimeChange("Morning")}
          />
          Morning
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedTimes.includes("Afternoon")}
            onChange={() => handleTimeChange("Afternoon")}
          />
          Afternoon
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedTimes.includes("Evening")}
            onChange={() => handleTimeChange("Evening")}
          />
          Evening
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedTimes.includes("Night")}
            onChange={() => handleTimeChange("Night")}
          />
          Night
        </label>
        <br />
        <label style={{ color: "white", marginRight: "10px" }}>Season:</label>
        <label style={{ marginLeft: "10px" }}>
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
        <br />
        <label style={{ color: "white", marginRight: "10px" }}>Weather:</label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedWeathers.includes("Sun")}
            onChange={() => handleWeatherChange("Sun")}
          />
          Sun
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedWeathers.includes("Rain")}
            onChange={() => handleWeatherChange("Rain")}
          />
          Rain
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={selectedWeathers.includes("Wind")}
            onChange={() => handleWeatherChange("Wind")}
          />
          Wind
        </label>
      </div>

      {/* Dropdown for selecting quality */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "white", marginRight: "10px" }}>Quality:</label>
        <select
          value={quality}
          onChange={(e) => setQuality(e.target.value)} // Update quality when changed
        >
          <option value="regular">Regular</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="iridium">Iridium</option>
        </select>
      </div>

      {/* Dropdown for selecting profession */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "white", marginRight: "10px" }}>
          Profession:
        </label>
        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)} // Update profession when changed
        >
          <option value="none">None</option>
          <option value="fisher">Fisher</option>
          <option value="angler">Angler</option>
        </select>
      </div>

      {/* Dropdown for selecting scale type */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "white", marginRight: "10px" }}>
          Scale Type:
        </label>
        <select
          value={scaleType}
          onChange={(e) => setScaleType(e.target.value)} // Update scale type when changed
        >
          <option value="logarithmic">Logarithmic</option>
          <option value="linear">Linear</option>
        </select>
      </div>

      {/* Chart */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default Fishing;
