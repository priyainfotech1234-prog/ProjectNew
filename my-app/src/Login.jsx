import React, { useState } from 'react';
import axios from 'axios';

// Accept props passed down from App.jsx
function Login({ setIsLoggedIn, setCurrentUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents page reload
        setErrorMessage('');

        try {
            // Send POST request directly to your Django backend API
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: username,
                password: password
            });

            console.log("Success! Server Response:", response.data);

            // Save user data in browser storage
            localStorage.setItem('userid', response.data.userid);
            localStorage.setItem('role_id', response.data.role_id);
            localStorage.setItem('name', response.data.name);

            // Update App.jsx state so React instantly knows user is logged in
            setIsLoggedIn(true);
            setCurrentUser({
                name: response.data.name,
                role_id: response.data.role_id,
                userid: response.data.userid,
                leaveBalances: { annual: 12, sick: 5, casual: 3 }
            });

            // Redirect user to the dashboard route
            window.location.href = '/dashboard'; 

        } catch (error) {
            // Catch errors sent back from Django (like status=400 wrong password)
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error || "Invalid credentials");
            } else {
                setErrorMessage("Network error. Is the Django server running?");
            }
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "Left" }}>
            <h2>LOGIN</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Username:</label><br />
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                
                <div style={{ marginBottom: "15px" }}>
                    <label>Password:</label><br />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                
                <button type="submit" style={{ padding: "10px 20px", background: "blue", color: "white", border: "none" }}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;