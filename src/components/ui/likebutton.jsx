import React, { useState } from "react";
import confetti from "canvas-confetti";
import "../../css/global.css";
import "../../css/likebutton.css";

export function LikeButton({ isLiked = false, onToggle }) {
    const [liked, setLiked] = useState(isLiked);
  
    const handleToggle = () => {
      const newLiked = !liked;
      setLiked(newLiked);
      onToggle && onToggle(newLiked);
  
      if (newLiked) triggerConfetti();
    };
  
    const triggerConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        scalar: 1.2,
        ticks: 200,
        zIndex: 1000,
      });
    };
  
    return (
      <button
        className={`like-button ${liked ? "liked" : ""}`}
        onClick={handleToggle}
      >
        {liked ? "💜" : "🤍"}
      </button>
    );
  }
