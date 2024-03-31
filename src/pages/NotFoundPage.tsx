import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/App.css';

function LandingPage() {


  return (
    <div className="Site-background">

      <div className='Site-container'></div>

      <div className='Site-container'>
        <div className="Site-title">
            This page does not exist
        </div>  
      </div>


      <footer className='Footer'>
        <div  className='FooterCopyright'> 
          &copy; 2024 MOOW LLC 
        </div>
        <div className='FooterTermsAndConditions'>
            <Link to="/TermsAndConditions.tsx">Privacy Policy | Terms of Use</Link>
        </div>
        <div className="FooterContactUs">
          Contact Us
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;
