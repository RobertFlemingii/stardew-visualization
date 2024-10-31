import React, { useEffect, useState } from "react";

function Tilling() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/fetchTillingData")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h2>Tilling Data</h2>
      {/* Use data in charts, tables, etc. */}
    </div>
  );
}

export default Tilling;
