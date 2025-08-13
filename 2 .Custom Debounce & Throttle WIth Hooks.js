import React, { useEffect, useRef, useState } from "react";

export default function DebounceThrottleExample() {
  
  const useDebounce = (value, delay) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debounced;
  };

  const useThrottle = (value, delay) => {
    const [throttled, setThrottled] = useState(value);
    const lastRan = useRef(Date.now());

    useEffect(() => {
      const handler = setTimeout(() => {
        if (Date.now() - lastRan.current >= delay) {
          setThrottled(value);
          lastRan.current = Date.now();
        }
      }, delay - (Date.now() - lastRan.current));

      return () => clearTimeout(handler);
    }, [value, delay]);

    return throttled;
  };

  
  const [text, setText] = useState("");

  const debouncedText = useDebounce(text, 500); // runs after stop typing
  const throttledText = useThrottle(text, 500); // runs at fixed intervals

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h3>Custom Debounce & Throttle Example</h3>
      <input
        style={{ padding: 8, fontSize: 16 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <div style={{ marginTop: 20 }}>
        <p><b>Raw:</b> {text}</p>
        <p><b>Debounced (500ms):</b> {debouncedText}</p>
        <p><b>Throttled (500ms):</b> {throttledText}</p>
      </div>
    </div>
  );
}


