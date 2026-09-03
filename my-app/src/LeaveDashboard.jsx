import React,{useState, useEffect} from 'react';

const LeaveDashboard=()=>{
    const[totalLeaves,setTotalLeaves]=useState(10);

    const applyLeave = () => {
        if (totalLeaves>0)
            setTotalLeaves(totalLeaves-1);
        else
            alert("No more Leaves!!")
    };

    const cancelLeave =()=> {
        if (totalLeaves<10)
            setTotalLeaves(totalLeaves+1)
    }

    return(
        <>
        <h2>Total Leave Balance: {totalLeaves} Days </h2>
        <button onClick={applyLeave}>Apply for 1 day Leave</button>
        <button onClick={cancelLeave}>Cancel Leaves</button>
        </>
    );
}
export default LeaveDashboard;