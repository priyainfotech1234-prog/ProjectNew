import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
    return(
        <>
        <div className="navbar">
        <div className="title">
            <p>E-COMMERCE</p>
        </div>
            <ul className="links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
        </div>
        </>
    );
}
export default Navbar;