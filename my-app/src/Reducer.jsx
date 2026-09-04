import React, {useReducer} from 'react';

function countChange(count,action){
    if (action==="count+1") return count+1;
    if (action==="count-1") return count-1;
    if (action==="count") return 0;
    return count;

}

function Reducer(){

  const[count,dispatch]=useReducer(countChange,0);

    return(
        <>
      <h1>Use Reducer Concept:</h1>
      <h4>Count is:{count}</h4>
      <button onClick={()=>dispatch("count+1")}>Increment</button>
      <button onClick={()=>dispatch("count-1")}>Decrement</button>
      <button onClick={()=>dispatch("count")}>Reset</button>
      </>
    )

}
export default Reducer; 