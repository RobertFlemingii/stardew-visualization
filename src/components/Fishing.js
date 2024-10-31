import React, { useEffect, useState } from "react";

function Fishing() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/fetchFishingData")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h2>Fishing Data</h2>
      {/* Use data in charts, tables, etc. */}
    </div>
  );
}

export default Fishing;
