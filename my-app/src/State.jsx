import React,{useState,useReducer,useEffect} from 'react';

function countChange(counter,action){
    if (action==="counter+1") return counter+1;
    if (action==="counter-1") return counter-1;
    if (action==="counter") return 0;
    return counter;

}

const MasterComponent=()=>{

    const[count,setCount]=useState(()=>{
        const saved=localStorage.getItem("counts");
        return saved!== null?Number(saved):0;
    });
    const[name,setName]=useState("");
    const[age,setAge]=useState("");

    const[counter,dispatch]=useReducer(countChange,0);

    useEffect(()=>{
        localStorage.setItem("counts",count);
        document.title=`Clicked ${count} times`;
    },[count]);

    useEffect(()=>{
        if(name||age){
            console.log(`User Info Updated-> Name:${name},Age:${age}`);
        }
        
    },[name,age]);

    return(
        <>
        <div style={{padding:"20px",fontFamily:"sans-serif"}}>
        <h1>Mastering React Hooks:</h1>
        <section style={{marginBottom:"20px"}}>
            <h2>1.Simple Counter(useState)</h2>
            <button onClick={()=>setCount(count+1)}>useState Click Count:{count}</button>
        </section>
        <hr/>
        <section style={{margin:"20px 0"}}>
            <h2>2.Controlled Profile Form</h2>
            <div>
                <input type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div style={{marginTop:"10px"}}>
                <input type="number" placeholder="Enter Age" value={age} onChange={(e)=>setAge(e.target.value)} />
            </div>
            <h3>Profile Summary:{name?name:"___"} is {age?age:"___"} years old</h3>
        </section>
        <hr/>
        <section style={{marginTop:"20px"}}> 
            <h2>3.Action Counter (useReducer) </h2>
            <h3>Reducer Count:{counter}</h3>
            <button onClick={()=>dispatch("counter+1")}>Increment</button>
            <button onClick={()=>dispatch("counter-1")}>Decrement</button>
            <button onClick={()=>dispatch("counter")}>Reset</button>
        </section>
        </div>
        </>
    )
}
export default MasterComponent;
