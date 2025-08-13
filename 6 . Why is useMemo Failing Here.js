
import React, { useMemo } from "react";

export default function App({ data }) {
  const { id = "", value = "" } = data || {};

  const expensiveResult = useMemo(
    () => heavyComputation({ id, value }),
    [id, value]
  );

  return <div>{expensiveResult}</div>;
}

function heavyComputation(obj) {
  console.log("Running heavy computation...");
  return `${obj.id} - ${obj.value}`;
}

//If data is an object, [data.id] means React will 
// only re-run heavyComputation when //data.id changes.
// But if any other property of data changes (data.name, data.value, //etc.), your computation will not run again, which could give you stale results.

//Also, if data can sometimes be null or undefined, 
// data.id will throw an error

