import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import {clearUser} from './auth';
import {useNavigate} from 'react-router-dom';

function Navbar({isLoggedIn,userName,setIsLoggedIn}){
    const navigate=useNavigate();
    const handleLogout=()=>{
        clearUser();
        setIsLoggedIn(false);
        navigate('/');
    };

    return(
        <>
        <div className="Navbar">
        <div className="title">
            <Link to="/">LMS Portal</Link>
        </div>
        <ul className="links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="right">
        {isLoggedIn ?(
            <div className="user-badge">
                <span className="welcome-text">Welcome {userName}</span>
                <button onClick={handleLogout} className="logbutton">Logout</button>
            </div>
        ):(
            <Link to="/login" className="logbutton">Login</Link>
        )}
        </div>
        </div>
        </>
        
    );
}
export default Navbar;
