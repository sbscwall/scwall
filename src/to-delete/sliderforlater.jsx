import React, { useState } from "react";
 
 //  const [price, setPrice] = useState(300000);
//  const [rent, setRent] = useState(2000);
 
 {/* Price and Rent Sliders */}
    <div className="slider-section">
    <div className="sliders">
      <div className="slider-container">
        <label>Price</label>
        <span className="slider-value">${price}</span>
        <input 
          type="range" 
          min="50000" 
          max="1000000" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
          className="slider"
        />
     
      </div>
      <div className="slider-container">
        <label>Rent</label>
        <span className="slider-value">${rent}</span>
        <input 
          type="range" 
          min="500" 
          max="5000" 
          value={rent} 
          onChange={(e) => setRent(e.target.value)}
          className="slider"
        />           
      </div>
    </div>
  </div>