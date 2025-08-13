import React, { useState, useRef, useEffect, useCallback } from "react";

export default function App() {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const fetchingRef = useRef(false);

  const fetchMore = useCallback(async () => {
    await new Promise((res) => setTimeout(res, 800)); // simulate API delay
    const newItems = Array.from({ length: 20 }, (_, i) => `Item ${page * 20 + i + 1}`);
    setItems((prev) => [...prev, ...newItems]);
    setPage((p) => p + 1);
    if (page >= 5) setHasMore(false); // stop after 5 pages
  }, [page]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !fetchingRef.current) {
        fetchingRef.current = true;
        Promise.resolve(fetchMore()).finally(() => {
          fetchingRef.current = false;
        });
      }
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchMore, hasMore]);

  return (
    <div style={{ padding: 20 }}>
      {items.map((item) => (
        <div key={item} style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
          {item}
        </div>
      ))}
      {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
    </div>
  );
}
