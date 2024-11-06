import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Tilling from "./components/Tilling";
import Ranching from "./components/Ranching";
import Mining from "./components/Mining";
import Foraging from "./components/Foraging";
import Fishing from "./components/Fishing";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Stardew Valley Data Visualization</h1>
          <nav>
            <Link to="/tilling">Tilling</Link>
            <Link to="/ranching">Ranching</Link>
            <Link to="/mining">Mining</Link>
            <Link to="/foraging">Foraging</Link>
            <Link to="/fishing">Fishing</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/tilling" element={<Tilling />} />
            <Route path="/ranching" element={<Ranching />} />
            <Route path="/mining" element={<Mining />} />
            <Route path="/foraging" element={<Foraging />} />
            <Route path="/fishing" element={<Fishing />} />
            <Route path="/" element={<h2>Select a section to view data</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
