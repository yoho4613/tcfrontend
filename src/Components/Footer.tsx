import React from "react";
import { Link } from "react-router-dom";
import '../styles/Footer.css';

function Footer(){
    return(
    <footer className='Footer'>
        <Link to="/" className='Footer-Link'>&copy; 2024 MOOW LLC </Link>
        <Link to="/TermsAndConditions" className='Footer-Link'>Privacy Policy | Terms of Use</Link>
        <Link to="/ContactUs" className='Footer-Link'>Contact Us</Link>
      </footer>
    );

}

export default Footer;