import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useHistory for redirection
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';  // Import Link for navigation
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

                <h2 className="page-title">Feature Coming Soon!</h2>
                <p className="subheading">
                    You like this feature? Us too! We're working hard behind the scenes to bring it to you as soon as possible.
                In the meantime, join our waitlist to stay updated and be the first to know when this feature goes live!
                </p>

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

                {/* Link to navigate back to the explore page */}
                <Link to="/explore" className="link-return-home">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Waitemail;
