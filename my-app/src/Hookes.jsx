import React, { useState, useEffect, useReducer } from 'react';

// 1. Reducer Function (State Logic)
const reducer = (counter, action) => {
  if (action === "increament") {
    return counter + 1;
  } else if (action === "decreament") {
    return counter - 1;
  }
  return counter;
};

const Counter = () => {
  // 2. State Management
  const [counter, dispatch] = useReducer(reducer, 0);
  const [count, setCount] = useState(0);

  // 3. Side Effects (Background Tasks)
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log("useState count updated:", count);
    
    // Safely sync state with browser storage
    localStorage.setItem("counts", count);
  }, [count]); // Only runs when 'count' changes!

  return (
    <>
      {/* Section 1: useState Counter */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          Click {count} times
        </button>
      </div>

      {/* Section 2: useReducer Counter */}
      <div>
        <button onClick={() => dispatch("increament")}>
          Increament
        </button>
        <p>Reducer Counter: {counter}</p>
        <button onClick={() => dispatch("decreament")}>
          Decreament
        </button>
      </div>
    </>
  );
};

export default Counter;