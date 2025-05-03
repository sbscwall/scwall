import React from "react";
import "../../css/global.css";
import "../../css/slider.css";

const Slider = ({
  min,
  max,
  step,
  value,
  label,
  onChange,
  unit = "",
}) => {
  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue); // Update value in parent
  };


  // Calculate the filled percentage of the thumb based on the current value
  const thumbFillPercentage = ((value - min) / (max - min)) * 100;

  // Set the background gradient for the track to show the filled part dynamically
  const thumbBackground = `linear-gradient(to right, #D4AF37 ${thumbFillPercentage}%, #d4af377e ${thumbFillPercentage}%)`;


  return (
    <div className="generic-slider-container">
      <label className="generic-slider-label">{label}</label>
      
      <div className="slider-container">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="generic-slider"
          style={{
            width: '100%',
            height:'2px',
            background: thumbBackground  // Dynamically update the background with gradient for the track
                    }}  // Apply dynamic background and position
        />
        
        <div className="slider-value">
          <span>{`${value.toLocaleString()}${unit}`}</span>  {/* Display value with optional unit */}
        </div>
      </div>

       </div>
  );
};

export default Slider;
