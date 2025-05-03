import React from 'react';
import '@/css/propertytile.css';
import '@/css/global.css';


const PropertyTile = ({ property, isLocked, onClick }) => {


  if (isLocked) {
    return (
      
      <div className="tile locked-tile">
        <img src={property.image} alt="Locked Property" className="tile-image locked-image" />
      </div>


      
    );
  }

  return (
    
    <div className="tile clickable" onClick={onClick}>
    <div className="tile">
      <img src={property.image} alt="Property" className="tile-image" />
      <div className="tile-info">
        <div className="deal-score">Score: {property.score}</div>
        <div className="location">{property.city}, {property.state}</div>
        <div className="cashflow">💰 {property.cashFlow}/mo</div>
        <div className="caprate">📈 {property.capRate}%</div>
      </div>
    </div>
    </div>

  );


};

export default PropertyTile;
