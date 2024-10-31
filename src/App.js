import React from "react";
import "./App.css";
import Tilling from "./components/Tilling";
import Ranching from "./components/Ranching";
import Mining from "./components/Mining";
import Foraging from "./components/Foraging";
import Fishing from "./components/Fishing";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Stardew Valley Data Visualization</h1>
      </header>
      <main>
        <div className="component-container">
          <Tilling />
        </div>
        <div className="component-container">
          <Ranching />
        </div>
        <div className="component-container">
          <Mining />
        </div>
        <div className="component-container">
          <Foraging />
        </div>
        <div className="component-container">
          <Fishing />
        </div>
      </main>
    </div>
  );
}

export default App;
