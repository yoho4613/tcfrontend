import React from 'react';
import '../styles/App.css';
import Footer from '../Components/Footer.tsx';

function LandingPage() {


  return (
    <div className="LandingPage-background">

      <div className='Site-container'></div>

      <div className='Site-container'>
      <div className="Landing-title">
        Pure imagination
      </div>   

      <div className="Site-content">
        Our platform is an invitation-only gateway to a world where your digital assets' security meets conveninence and innovation.
        <br/>
        With MOOW, you gain not just a cloud storage but a partner in navigating the web3 landscape.
      </div>

      <div className="Site-content">
        Join Our Mailing List
      </div>

      </div>
      <Footer/>
    </div>
  );
}

export default LandingPage;
