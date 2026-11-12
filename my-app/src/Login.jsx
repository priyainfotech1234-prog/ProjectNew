import React, { useState } from 'react';
import './Login.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {saveUserData} from './auth';

// Accept props passed down from App.jsx
function Login({ setIsLoggedIn, setCurrentUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate=useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents page reload,prevent default form behavior
        setErrorMessage('');
        console.log("Login button was clicked");

        try {
            const response = await axios.post('https://projectnew-14ho.onrender.com/api/login/', {
                username: username,
                password: password
        }, {
            withCredentials: true
        });

            console.log("Success:", response.data);
            console.log("Response",Object.keys(response.data));
        
            //this is where id,name,role_id lands,axios catches and stores it in variable response
            
            //we pass response.data to saveUserData
           saveUserData(response.data)
            //localStorage.setItem(response.data)
            // Update App.jsx state so React instantly knows user is logged in
            setIsLoggedIn(true);
            setCurrentUser({
                name: response.data.name,
                role_id: response.data.role_id,
                userid: response.data.id,
                leaveBalances: { annual: 12, sick: 5, casual: 3 }
            });

             navigate('/dashboard');

        } catch(error){
            setErrorMessage("First Signup!!");
        }
    };
       

    return (
        <div className="entire-box">
            <div className="box">
                <h2>LOGIN</h2>
                <p style={{color:'red'}}>{errorMessage}</p>
                    <div>
                        <div className="input-group">
                            <label>Username:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        </div>
                        <div className="input-group">
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <button type="button" className="primary" onClick={handleLogin}>Login</button>
                    </div>
            </div>
        </div>
    );
}

export default Login;