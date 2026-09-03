import React, { useReducer } from 'react';

// 1. THE REDUCER: The central rulebook that handles state updates
const leaveReducer = (leaves, action) => {
  if (action === "APPLY") {
    return leaves - 1; // Take 1 day leave
  } else if (action === "CANCEL") {
    return leaves + 1; // Restore 1 day leave
  } else if (action === "RESET") {
    return 10;         // Reset back to 10
  }
  return leaves;
};

const SimpleReducerTracker = () => {
  // 2. THE HOOK: [current_state, send_message_function]
  const [leaves, dispatch] = useReducer(leaveReducer, 10);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Remaining Leaves: {leaves}</h2>

      {/* 3. DISPATCH: Sending action messages to the reducer */}
      <button onClick={() => dispatch("APPLY")}>Apply Leave (-1)</button>
      <button onClick={() => dispatch("CANCEL")}>Cancel Leave (+1)</button>
      <button onClick={() => dispatch("RESET")}>Reset to 10</button>
    </div>
  );
};

export default SimpleReducerTracker;