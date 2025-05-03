import React from "react";
import "../../css/button.css";
import "../../css/global.css";

export function Button({ children, variant = "first", size = "default", className = "", ...props }) {
  // Define style variants
  const styles = {
    primary: "button-primary",
    start: "button-start",
    secondary: "button-secondary",
    interest: "button-interest",
    ghost: "button-ghost",
    learn: "learn-more-button",
    close: "close-button",
    back: "back-button",
    add: "add-button",
    "portfolio-add": "add-button portfolio-add-button", //for the + button in portfolio page
    "explore-wealth-add": "add-button explore-wealth-add-button", //for the + button on property wealth simulation
    clicktoggle:"click-toggle-button", //one switch toggle with the name that changes on click
    cta: "cta-button",
    cta2: "cta-button2",
    update:"update-button"
  };

  // Define size variants
  const sizes = {

  };

  return (
    <button
      {...props}
      className={`${styles[variant] || styles.first} ${sizes[size] || sizes.default} rounded ${className}`}
    >
      {children}
    </button>
  );
}


