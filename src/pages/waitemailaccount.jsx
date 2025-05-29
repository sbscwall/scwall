import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { handleEmail } from '@/components/ui/handleemail'; 
import "@/css/waitemail.css";
import "@/css/global.css";

const Waitemail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();



  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Reset error when the email changes
    setSuccessMessage(''); // Reset success message when the email changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmail(email, setError, setSuccessMessage, navigate); // Use the reusable function
  };


    return (
        <div className="page-container">
        <div className="email-capture">

        <h2 className="page-title">You're almost there!</h2>
        <p className="subheading">It looks like you’re not logged in yet. At Scwall, we are still in our early access phase, and we’re excited to bring real estate investment insights to a select group of users. We’re getting ready to accept new users soon!</p>

                <h2 className="page-title2">Get Early Access to Scwall</h2>
                <p className="subheading">Be the first to try Scwall’s AI-driven investment insights. The future of real estate investing is almost here!</p>

                <form className="email-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
          {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}  {/* Display success message */}
          <Button className="button-start"> Sign up</Button> 
        </form>

                <p className="subtext">We’ll notify you when Scwall is ready. No spam, promise!</p>
            </div>

            {/* Link to navigate back to the explore page */}
            <Link to="/explore" className="link-return-home">
                    Back to Home
                </Link>
        </div>
    );
};

export default Waitemail;
