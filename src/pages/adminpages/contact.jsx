// src/pages/ContactPage.js
import React, { useState } from "react";
import "@/css/adminpage.css"; 
import "@/css/global.css"; 

const Contact = () => {
  // State to track the form fields and submission status
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false); // Track if the form was submitted

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to an API or email service
    // For now, we'll just log it and show a success message
    console.log("Form submitted:", formData);
    setSubmitted(true); // Set form submission status to true
  };

  return (
    <div className="page-container">
    <div className="contact-page">
      <h1>Contact Us</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="cta-button">
            Submit
          </button>
        </form>
      ) : (
        <div className="thank-you-message">
          <h2>Thank you for reaching out!</h2>
          <p>We’ve received your message and will get back to you shortly.</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Contact;
