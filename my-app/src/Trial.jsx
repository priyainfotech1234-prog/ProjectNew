import React,{useState,useEffect,useReducer} from 'react';

const SwitchReducer=(light,action)=>{
        if (action==="TURN_ON") return "ON";
        if (action==="TURN_OFF") return "OFF";
        return light;
    };

const SimpleTracker=()=>{
    const[leaves,setLeaves]=useState(10);
    const[name,setName]=useState("priya");
    const[light,dispatch]=useReducer(SwitchReducer,"OFF");   
    
    useEffect(()=>{
        console.log("Background work: syncing leave count to browser tab",leaves);
        document.title=`leaves:${leaves}`;
    },[leaves]);

    useEffect(()=>{
        console.log("a");
    },[leaves]);

    useEffect(()=>{
        console.log("b");
    },[]);

    useEffect(()=>{
        console.log("c");
    });

    return(
        <>
        <h2>Remaining Leaves:{leaves}</h2>
        <button onClick={()=>setLeaves(leaves-1)}>Apply 1 day leave</button>
        <button onClick={()=>setName("pri")}>Click me</button>
        <h2>The light is:{light}</h2>
        <button onClick={()=>dispatch("TURN_ON")}>Turn On</button>
        <button onClick={()=>dispatch("TURN_OFF")}>Turn Off</button>
         </>
    );
}
export default SimpleTracker;