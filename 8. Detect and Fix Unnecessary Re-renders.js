import React, { useState, useEffect, useMemo, useCallback } from "react";

const Chart = React.memo(function Chart({ title, data, onClick }) {
  console.log(`Render: ${title}`);
  return (
    <div onClick={onClick} style={{ border: "1px solid #ccc", padding: 10, margin: 5 }}>
      <h4>{title}</h4>
      <p>{data.join(", ")}</p>
    </div>
  );
});

export default function App() {
  const [chart1, setChart1] = useState([1, 2, 3]);
  const [chart2] = useState([10, 20, 30]);

  useEffect(() => {
    const id = setInterval(() => {
      setChart1((prev) => [...prev.slice(1), prev[prev.length - 1] + 1]);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const chart2Processed = useMemo(() => chart2.map((n) => n * 2), [chart2]);
  const handleClick = useCallback((name) => alert(`Clicked ${name}`), []);

  return (
    <div>
      <Chart title="Chart 1" data={chart1} onClick={() => handleClick("Chart 1")} />
      <Chart title="Chart 2" data={chart2Processed} onClick={() => handleClick("Chart 2")} />
    </div>
  );
}