import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';  // Import useHistory for redirection
import { Button } from "@/components/ui/button";
import "@/css/waitemail.css";
import "@/css/global.css";


const WaitemailExplore = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();  // Initialize history hook

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., send email to the server)
        
        // Redirect to the Thank You Page after submission
        navigate('/thankyouexplore'); // This will redirect the user to the "/thankyou" page
    };

    return (
        <div className="page-container">
        <div className="email-capture">

                <h1 className="page-title">Get Early Access to Scwall</h1>
                <h5 className="subheading">Be the first to try Scwall’s AI-driven investment insights. The future of real estate investing is almost here!</h5>

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
                <h5 className="urgent-message">Limited spots available!</h5>
                
               
            </div>
        </div>
    );
};

export default WaitemailExplore;
