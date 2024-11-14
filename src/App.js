import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Tilling from "./components/Tilling";
import Ranching from "./components/Ranching";
import Mining from "./components/Mining";
import Foraging from "./components/Foraging";
import Fishing from "./components/Fishing";
import backgroundImage from "./assets/background.jpg"; // Importing as an image

function App() {
  return (
    <Router>
      {/* Background container to hold the background image */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center center",
          minHeight: "100vh",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      ></div>

      {/* Main app container */}
      <div
        className="App"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "20px",
          minHeight: "100vh", // Ensures the app takes the full height
          display: "flex", // Flexbox to ensure content stretches correctly
          flexDirection: "column", // Stack content vertically
        }}
      >
        <div
          className="content-container"
          style={{
            position: "relative",
            zIndex: 2,
            padding: "20px",
            flex: "1", // Ensure the container stretches and takes remaining space
            backgroundColor: "rgba(0, 0, 0, 0.75)", // Black box background
            borderRadius: "8px",
            maxWidth: "1200px",
            margin: "20px auto",
          }}
        >
          <header>
            <h1 style={{ color: "white" }}>
              Stardew Valley Data Visualization
            </h1>
            <nav>
              {/* Link components styled as buttons */}
              <Link to="/tilling" className="nav-button">
                Tilling
              </Link>
              <Link to="/ranching" className="nav-button">
                Ranching
              </Link>
              <Link to="/mining" className="nav-button">
                Mining
              </Link>
              <Link to="/foraging" className="nav-button">
                Foraging
              </Link>
              <Link to="/fishing" className="nav-button">
                Fishing
              </Link>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/tilling" element={<Tilling />} />
              <Route path="/ranching" element={<Ranching />} />
              <Route path="/mining" element={<Mining />} />
              <Route path="/foraging" element={<Foraging />} />
              <Route path="/fishing" element={<Fishing />} />
              <Route
                path="/"
                element={<h2>Select a section to view data</h2>}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
