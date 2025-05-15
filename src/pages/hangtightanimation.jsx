import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/hangtightanimation.css';
import '../css/global.css';

const HangTightAnimation = () => {
  const navigate = useNavigate();
   const [fadeOut, setFadeOut] = useState(false); // To handle fade-out effect

  useEffect(() => {
    // Step 1: After 3 seconds, apply slide-out effect
    setTimeout(() => {
        setFadeOut(true); // Trigger the fade-out effect after 3 seconds of showing the message
    }, 3000);

    // Step 2: After 4 seconds (including slide-out), navigate to the explore page
    setTimeout(() => {
      navigate("/explore"); // Navigate to the explore page
    }, 5000); // Wait for the 1 second slide-out duration (total of 4 seconds before navigation)
  }, [navigate]);

  return (
    <div className={`hang-screen ${fadeOut ? "fade-out" : "fade-in"}`}>
      <div className="processing-icon" />
      <p className="hang-tight-text">Hang tight... we're generating the deals!</p>
    </div>
  );
};

export default HangTightAnimation;
