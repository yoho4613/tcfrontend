import React, { useState, useRef } from 'react';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import '../styles/ContactForm.css';


const ContactForm: React.FC = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const form = useRef<HTMLFormElement>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formData).some(value => value === '')) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response: EmailJSResponseStatus = 
      await emailjs.sendForm('service_yjzo6ab', 'template_k4c24h8', form.current!);
      console.log('Success:', response);
    } catch (error) {
      console.error('Failed:', error);
    }
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <form ref={form} className='Site-contactusform' onSubmit={handleSubmit} >
      <div>
        <label htmlFor="name" className='Site-contactusform-title'>Your Name:</label>
      </div>
      <div>
        <input type="text" id="name" name="name" className='Site-contactusform-input' value={formData.name} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="Your email" className='Site-contactusform-title'>Tell us your email:</label>
      </div>
      <div>
        <input type="email" id="email" name="email" className='Site-contactusform-input' value={formData.email} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="subject" className='Site-contactusform-title'>What is the reason for your inquiry:</label>
      </div>
      <div>
        <select id="subject" name="subject" className='Site-contactusform-input' value={formData.subject} onChange={handleChange}>
          <option value="">Select a subject</option>
          <option value="Business Partnership">Business Partnership</option>
          <option value="Advertising and Marketing">Advertising and Marketing</option>
          <option value="Investment">Investment</option>
          <option value="Data and Privacy">Data and Privacy</option>
          <option value="Customer Enquiry">Customer Enquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className='Site-contactusform-title'>Message:</label>
      </div>
      <div>
        <textarea id="message" name="message" className='Site-contactusform-longinput' value={formData.message} onChange={handleChange} />
      </div>

      <button className='Site-contactusform-button' type="submit">Submit</button>

    </form>
  );
}

export default ContactForm;
