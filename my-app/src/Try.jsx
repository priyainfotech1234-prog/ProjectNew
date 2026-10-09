import React, {useState} from 'react';

function Try(){

    const [username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const handleLogin=async(e)=>{
        e.preventDefault();

        console.log("sending this to Django",{username,password});

        const response=await fetch('http://127.0.0.1:8000/api/login/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
            username:username,
            password:password
        })
        });
        console.log("Response",response.status);
        const data = await response.json();
        console.log("Django's error explanation:", data);

        if(response.ok){
            localStorage.setItem('name',data.name);
            window.location.href='/dashboard';
        }else{
            alert("Login Failed")
        }
    };

    return(
        <>
        <h1>This is my login page!!</h1>
        <p>Memory:{username}</p>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Type your username" value={username} onChange={(e)=>{setUsername(e.target.value);console.log("Memory:",e.target.value);}}/>
            <input type="password" placeholder="Type your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
        </>
    );
}
export default Try;