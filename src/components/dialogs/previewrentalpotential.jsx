// rentalpotentialpreview.jsx that shows rental indicators on the category slider
import React from 'react';
import '../../css/previewrentalpotential.css';
import '../../css/global.css';
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved

const formatCurrency = (value) => {
  if (typeof value !== "number") return "$–";
  return `$${Math.round(value).toLocaleString()}`;
};



const RentalPotentialPreview = ({propertyId}) => {
  const property = getPropertyById(propertyId);

  return (
    <div className="rental-overlay">
      <div className="rental-row rental-top">
        <span className="rent-label">Estimated Rent: </span>
        <h3 className="rent-amount">{formatCurrency(property.estimatedMonthlyRent)}</h3>
        
      </div>
      <div className="rental-row rental-bottom">
      <span className="rent-status">{property.isRented}</span>
      <span className="rent-trend"> {property.demandLevel}</span>
        <span className="rent-trend"> {property.trend}</span>
      </div>
    </div>
  );
};

export default RentalPotentialPreview; 
