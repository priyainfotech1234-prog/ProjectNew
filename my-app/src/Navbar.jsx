import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';

function Navbar(props){
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
        {props.isLoggedIn ?(
            <div className="user-badge">
                <span>Welcome,{props.userName}</span>
                <button className="logbutton" onClick={()=> props.setIsLoggedIn(false)}>Logout</button>
            </div>
        ):(
            <Link to="/login" className="logbutton">Login</Link>
        )}
        </div>
        </>
        
    );
}
export default Navbar;
