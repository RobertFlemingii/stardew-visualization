import React, { useEffect, useState } from "react";

function Ranching() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/fetchRanchingData")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h2>Ranching Data</h2>
      {/* Use data in charts, tables, etc. */}
    </div>
  );
}

export default Ranching;
