import React, { useState } from "react";

export default function Scheduler() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [conflict, setConflict] = useState(false);

  const hasConflict = (start, end) =>
    events.some(e => start < e.end && end > e.start);

  const addEvent = () => {
    const s = Number(start), e = Number(end);
    if (!title || s >= e) return;
    const isConflict = hasConflict(s, e);
    setConflict(isConflict);
    if (!isConflict) {
      setEvents([...events, { title, start: s, end: e }].sort((a, b) => a.start - b.start));
      setTitle(""); setStart(""); setEnd("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Scheduler</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="number" placeholder="Start" value={start} onChange={e => setStart(e.target.value)} />
      <input type="number" placeholder="End" value={end} onChange={e => setEnd(e.target.value)} />
      <button onClick={addEvent}>Add</button>
      {conflict && <p style={{ color: "red" }}>⚠ Overlap detected!</p>}
      <ul>
        {events.map((ev, i) => (
          <li key={i}>{ev.title}: {ev.start} - {ev.end}</li>
        ))}
      </ul>
    </div>
  );
}
