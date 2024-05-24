import React from 'react';
import '../styles/App.css';
import Footer from '../Components/Footer.tsx';
import ContactForm from '../Components/ContactForm.tsx';

function ContactUs() {
  return (
    <div className="Site-background">

      <div className="Site-title">
        Contact Us
      </div>   

      <ContactForm/>
    
      <Footer/>

    </div>
  );
}

export default ContactUs;
