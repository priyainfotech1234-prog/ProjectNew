import React, {useState} from 'react';
import './Signup.css';

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
        <div className="entire-box">
            <div className="box">
                <form onSubmit={handleSubmit}>
                    <h2>Create Account</h2>
                    <div className="input-group">
                        <label>Username:</label>
                        <input type="text" name="username" placeholder="username" onChange={handleChange} required/>    
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input type="password" name="password" placeholder="password" onChange={handleChange} required/>
                    </div>
                    <div className="input-group">
                        <label>Name:</label>
                        <input type="text" name="name" placeholder="name" onChange={handleChange} required/>
                    </div>
                    <div className="input-group">
                        <label>E-Mail:</label>
                        <input type="email" name="email" placeholder="email" onChange={handleChange} required/>
                    </div>
                    <button type="submit" className="primary">Save & Register</button>
                 </form>
            </div>
        </div>
    );
}
export default Signup;