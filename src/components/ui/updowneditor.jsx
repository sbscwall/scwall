import React, { useState } from "react";
import "../../css/global.css"; 
import "../../css/updowneditor.css"; 

const UpdownEditor = ({
  label,                // Label for the input field
  value,                // Current value (e.g., mortgage rate, rent, etc.)
  minValue = 0,         // Minimum allowed value
  maxValue = 100,       // Maximum allowed value
  increment = 0.25,     // Increment value for increase/decrease
  onChange,             // Callback function to propagate value change
  unit = "",            // Unit of the value (optional, e.g., % or $)
}) => {
  const [currentValue, setCurrentValue] = useState(value); // Set initial value

  // Handle increase
  const handleIncrease = () => {
    if (currentValue < maxValue) {
      const newValue = currentValue + increment;
      setCurrentValue(newValue);
      onChange(newValue); // Pass the new value to the parent component
    }
  };

  // Handle decrease
  const handleDecrease = () => {
    if (currentValue > minValue) {
      const newValue = currentValue - increment;
      setCurrentValue(newValue);
      onChange(newValue); // Pass the new value to the parent component
    }
  };

  return (
    <div className="generic-editor">
      <div className="editor-label">{label}</div>
      <div className="editor-controls">
        <button className="editor-button" onClick={handleDecrease}>-</button>
        <input
          type="number"
          value={currentValue.toFixed(2)} // Display value with 2 decimal places
          readOnly
          className="editor-display"

        />
          {unit && <span className="unit-display">{unit}</span>}  {/* Display unit next to the value */}
        <button className="editor-button" onClick={handleIncrease}>+</button>
      </div>
      
    </div>
  );
};

export default UpdownEditor;
