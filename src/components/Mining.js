import React, { useEffect, useState } from "react";

function Mining() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/fetchMiningData")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Temporary logging
        setData(data);
      });
  }, []);

  return (
    <div>
      <h2>Mining Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Mining;
