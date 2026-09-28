import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';

const Footer=()=>{
    return(
        <>
        <footer className="footer-container">
            <p>&copy; {new Date().getFullYear()} LMS Portal. All rights reserved</p>
        </footer>
        </>
    )
}
export default Footer;