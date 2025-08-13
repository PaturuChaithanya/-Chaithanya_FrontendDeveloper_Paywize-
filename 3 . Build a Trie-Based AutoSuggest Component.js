import React, { useState, useMemo } from "react";

function buildTrie(words) {
  const root = {};
  for (let w of words) {
    let node = root;
    for (let ch of w) node = node[ch] ??= {};
    node.$ = true; // end marker
  }
  return root;
}

function getSuggestions(trie, prefix, limit = 10) {
  let node = trie;
  for (let ch of prefix) {
    if (!(node = node[ch])) return [];
  }
  const res = [];
  (function dfs(n, path) {
    if (res.length >= limit) return;
    if (n.$) res.push(path);
    for (let k in n) if (k !== "$") dfs(n[k], path + k);
  })(node, prefix);
  return res;
}

export default function AutoSuggest() {
  const [q, setQ] = useState("");
  const trie = useMemo(
    () =>
      buildTrie([
        "apple",
        "app",
        "application",
        "banana",
        "bat",
        "battle",
        "cat",
        "cater",
        "dog",
        "doll",
        "dove",
        "door",
      ]),
    []
  );

  const suggestions = q ? getSuggestions(trie, q.toLowerCase()) : [];

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20, maxWidth: 300 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Type to search..."
        style={{ width: "100%", padding: "8px", fontSize: "14px" }}
      />

      {q && (
        <ul
          style={{
            border: "1px solid #ccc",
            borderTop: "none",
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {suggestions.length ? (
            suggestions.map((w, i) => (
              <li
                key={i}
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                }}
              >
                {w}
              </li>
            ))
          ) : (
            <li style={{ padding: "8px", color: "#999" }}>No results</li>
          )}
        </ul>
      )}
    </div>
  );
}
