import React, { useState } from "react";

function VirtualList({ items, height = 400, rowHeight = 30 }) {
  const [scrollTop, setScrollTop] = useState(0);
  const start = Math.floor(scrollTop / rowHeight);
  const end = start + Math.ceil(height / rowHeight);
  const visible = items.slice(start, end);

  return (
    <div
      style={{ height, overflow: "auto", border: "1px solid #ccc" }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * rowHeight }}>
        <div style={{ transform: `translateY(${start * rowHeight}px)` }}>
          {visible.map((item, i) => (
            <div key={start + i} style={{ height: rowHeight, padding: "0 8px", borderBottom: "1px solid #eee" }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const items = Array.from({ length: 100_000 }, (_, i) => `Row ${i + 1}`);
  return <VirtualList items={items} height={500} rowHeight={35} />;
}