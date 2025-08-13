import React, { useState } from "react";

// Diffing functions
function diffProps(oldProps = {}, newProps = {}) {
  const changes = {};

  for (let key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      changes[key] = newProps[key];
    }
  }

  for (let key in oldProps) {
    if (!(key in newProps)) {
      changes[key] = null;
    }
  }

  return changes;
}

function diff(oldNode, newNode) {
  if (!newNode) return { type: "DELETE" };
  if (!oldNode) return { type: "INSERT", node: newNode };
  if (oldNode.type !== newNode.type) return { type: "REPLACE", node: newNode };

  const propChanges = diffProps(oldNode.props, newNode.props);

  const childrenPatches = [];
  const maxLen = Math.max(
    oldNode.children?.length || 0,
    newNode.children?.length || 0
  );

  for (let i = 0; i < maxLen; i++) {
    childrenPatches.push(diff(oldNode.children?.[i], newNode.children?.[i]));
  }

  if (Object.keys(propChanges).length === 0 && childrenPatches.every((p) => !p)) {
    return null;
  }

  return {
    type: "UPDATE",
    props: Object.keys(propChanges).length ? propChanges : undefined,
    children: childrenPatches,
  };
}

// Sample trees
const oldTree = {
  type: "div",
  props: { id: "root" },
  children: [{ type: "p", props: { class: "text" }, children: [] }],
};

const newTree = {
  type: "div",
  props: { id: "root", class: "container" },
  children: [
    { type: "p", props: { class: "highlight" }, children: [] },
    { type: "span", props: {}, children: [] },
  ],
};

export default function App() {
  const [patch, setPatch] = useState(null);

  const handleDiff = () => {
    const result = diff(oldTree, newTree);
    console.log(result);
    setPatch(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Virtual DOM Diffing Demo</h1>
      <button onClick={handleDiff}>Diff Trees</button>
      {patch && (
        <pre style={{ background: "#f0f0f0", padding: 10 }}>
          {JSON.stringify(patch, null, 2)}
        </pre>
      )}
    </div>
  );
}
