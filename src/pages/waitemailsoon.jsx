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

                <h1 className="page-title">Get Access to Scwall</h1>
                <p>Scwall is invite only </p>
                <h4  className="subheading">Be the first to try Scwall’s AI-driven investment insights. The future of real estate investing is almost here!</h4>

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
                <h4 className="urgent-message">Limited spots available</h4>
                
                {/* Link to navigate back to the explore page */}
                <Link to="/explore" className="link-return-home">
                    Back to Explore
                </Link>
            </div>
        </div>
    );
};

export default Waitemail;
