// previewsell.jsx
import React from "react";
import "../../css/previewsell.css"; 
import "../../css/global.css"; 
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved

const formatCurrency = (value) => {
  if (typeof value !== "number") return "$–";
  return `$${Math.round(value).toLocaleString()}`;
};

const PreviewSell = ({ propertyId }) => {
const property = getPropertyById(propertyId); //to call variables of each property with "property prefix"
const appreciationPc = property.appreciation * 100;

  return (
    <div className="preview-overlay">
      <div className="preview-row preview-top">
        <span className="preview-label">You can sell it in 5 years for</span>
        <h3 className="preview-focus-data">+{formatCurrency(property.projected5yValueIncrease)}</h3>
      </div>
      <div className="preview-row preview-middle">
      <span className="preview-label"> 📈 </span>
      <span className="preview-label"> Property value increase </span>
        <span className="preview-classic-data"> {appreciationPc}% per year</span>
      </div>
      <div className="preview-row preview-bottom">
      <span className="preview-label"> ⏳ </span>
      <span className="preview-label"> You can sell it in </span>
        <span className="preview-classic-data"> {property.avgDaysOnMarket} days</span>
      </div>
    </div>
  );
};

export default PreviewSell;
