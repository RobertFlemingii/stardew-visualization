import React, { useEffect, useState } from "react";

function Foraging() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/fetchForagingData")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h2>Foraging Data</h2>
      {/* Use data in charts, tables, etc. */}
    </div>
  );
}

export default Foraging;
