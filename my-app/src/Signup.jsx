import React, {useState} from 'react';

function Signup(){
    const[formData,setFormData]=useState({username:'',password:'',name:'',email:''});

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch('http://localhost:8000/api/signup/',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData),
            });
            const data=await response.json();

            if (response.ok){
                alert(data.message);
            }else{
                alert(data.error||'Registration failed');
            }
        }catch(err){
            console.error('Network error:', err);
        }
    };
    return(
        <div>
            <form onSubmit={handleSubmit} className="Signup-form">
                    <h3>Create Account</h3>
                    <input type="text" name="username" placeholder="username" onChange={handleChange} required/>
                    <input type="password" name="password" placeholder="password" onChange={handleChange} required/>
                    <input type="text" name="name" placeholder="name" onChange={handleChange} required/>
                    <input type="email" name="email" placeholder="email" onChange={handleChange} required/>
                    <button type="submit">Save & Register</button>
                 </form>
        </div>
    );
}
export default Signup;