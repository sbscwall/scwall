import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import "@/css/floatingBanner.css";  // Make sure your custom CSS is correctly linked

const FloatingBanner = ({ message = [], onClose }) => {
  // If no message are passed, use an empty fallback array
  if (!Array.isArray(message)) {
    console.error("Invalid 'message' prop passed to FloatingBanner. Using empty array fallback.");
    message = []; // Default to empty array to prevent errors
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);


  // Check if the user has seen the banners before
  useEffect(() => {
    const hasSeenBanners = sessionStorage.getItem("bannersSeen");
    if (!hasSeenBanners) {
      // User has not seen the banners, show them
      setIsVisible(true);
    }
    // After the user has seen the banners, set the flag so they don't see them again
    sessionStorage.setItem("bannersSeen", "true");
  }, []); // Empty array ensures this only runs on component mount


  // Handle closing the banner
  const handleClose = () => {
    setIsVisible(false);  // Hide the banner immediately
    setTimeout(() => {
      if (onClose) onClose(currentIndex); // Notify the parent after the transition
    }, 3000);  // Small delay to ensure transition happens
  };

  // Move to the next banner with a delay
  const handleNext = () => {
    setIsVisible(false); // Start by hiding the current banner

    // Set a delay before transitioning to the next message
    setTimeout(() => {
      if (currentIndex < message.length - 1) {
        setCurrentIndex(currentIndex + 1); // Go to the next banner
      }
      setIsVisible(true); // Show the next message with a smooth fade-in
    }, 300);  // Delay before changing the message (300ms is the fade-out duration)
  };

  // If no valid banner is found, return null
  if (!isVisible || currentIndex >= message.length) return null;

  const currentBanner = message[currentIndex]; // Get the current banner content

  // Ensure the currentBanner exists before rendering
  if (!currentBanner) {
    console.error(`No banner found at index ${currentIndex}`);
    return null;
  }




  return (
    <div className={`floating-banner ${currentBanner.variant} ${currentBanner.position} ${currentIndex === 0 ? 'first-banner' : ''}`}>
      <div className="banner-content">
        <p>{currentBanner.message}</p>
        <div className="banner-actions">

        <Button onClick={handleClose} className="banner-close-button">
        Close
        </Button>       
{/* Only show Next button if it's not the last banner */}
{currentIndex < message.length - 1 && (
            <Button onClick={handleNext} className="next-button">Next</Button>
          )}

        </div>
      </div>
    </div>
  );
};

export default FloatingBanner;
