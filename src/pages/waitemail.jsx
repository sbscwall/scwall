import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import "@/css/waitemail.css";
import "@/css/global.css";

const Waitemail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false); // New state to track if email is already submitted
  const navigate = useNavigate();

  // Check if email is already submitted by the user
  useEffect(() => {
    const storedEmail = localStorage.getItem('submittedEmail');
    if (storedEmail) {
      setIsEmailSubmitted(true);  // Email already submitted, set flag
      setSuccessMessage('This email has already been submitted!');
    }
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setSuccessMessage('');  // Reset success message when email changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Check if email is already submitted using localStorage
    const storedEmail = localStorage.getItem('submittedEmail');
    if (storedEmail) {
      return;
    }

    // If it's a new email, store it in localStorage
    localStorage.setItem('submittedEmail', email);
    setIsEmailSubmitted(true);
    navigate("/thankyou");

    // Optionally, navigate to a thank you page
    // navigate('/thankyou'); // Uncomment if you want to redirect after submission
  };

  return (
    <div className="page-container">
      <div className="email-capture">
        <h1 className="page-title">Get Access to Scwall</h1>
        <p>Scwall is invite only</p>
        <h4 className="subheading">Be the first to try Scwall’s AI-driven investment insights. The future of real estate investing is almost here!</h4>

        <form className="email-form" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
            disabled={isEmailSubmitted} // Disable the form if email is already submitted
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}  {/* Display success message */}
          <Button className="button-start"> Sign up</Button> 
        </form>

        <h4 className="urgent-message">Limited spots available</h4>

        <Link to="/" className="link-return-home">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Waitemail;
