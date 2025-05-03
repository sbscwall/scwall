import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';  // Import useHistory for redirection
import { Button } from "@/components/ui/button";
import "@/css/waitemail.css";
import "@/css/global.css";


const Waitemail = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();  // Initialize history hook

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., send email to the server)
        
        // Redirect to the Thank You Page after submission
        navigate('/thankyou'); // This will redirect the user to the "/thankyou" page
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
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button className="button-start">Get Early Access</Button>
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
