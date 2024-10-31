import React, { useEffect, useState } from "react";

function Mining() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/fetchMiningData")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h2>Mining Data</h2>
      {/* Use data in charts, tables, etc. */}
    </div>
  );
}

export default Mining;
