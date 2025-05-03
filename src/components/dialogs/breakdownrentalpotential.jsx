// rentalpotentialbreakdown.jsx to give user all details about rent
import React from 'react';
import '../../css/breakdownrentalpotential.css';
import '../../css/global.css';
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved


const formatCurrency = (value) => {
  if (typeof value !== "number") return "$–";
  return `$${Math.round(value).toLocaleString()}`;
};

const RentalPotentialBreakdown = ({ propertyId, sections = [] }) => {
   const property = getPropertyById(propertyId); //to call variables of each property with "property prefix"
  
  return (
    <div className="rental-breakdown-dialog">

      {/* Section 1: Preview Recap */}
      <div className="rental-preview-recap">
        <div className="recap-item">
          <span className="recap-label">Estimated Rent</span>
          <span className="recap-value">{formatCurrency(property.estimatedMonthlyRent)}</span>
        </div>
        <div className="recap-item">
          <span className="recap-label">Demand</span>
          <span className="recap-value">{property.demandLevel}</span>
        </div>
        <div className="recap-item">
          <span className="recap-label">Trend</span>
          <span className="recap-value">{property.trend}</span>
        </div>
        <div className="recap-item">
          <span className="recap-label">Status</span>
          <span className="recap-value">{property.isRented}</span>
        </div>
      </div>

      {/* Section 2: Metrics Summary */}
      <div className="rental-metrics-summary">
        <div className="metric-bar">
          <span className="metric-label">Risk</span>
          <div className="dots">
            <span className="dot filled"></span>
            <span className="dot filled"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
        <div className="metric-bar">
          <span className="metric-label">Growth</span>
          <div className="dots">
            <span className="dot filled"></span>
            <span className="dot filled"></span>
            <span className="dot filled"></span>
            <span className="dot filled"></span>
            <span className="dot"></span>
          </div>
        </div>

      </div>

      {/* Section 3: Full Breakdown */}
      {sections.map((section, idx) => (
        <div key={idx} className="rental-section">
          <h3 className="rental-section-title">{section.title}</h3>
          {section.data.map((item, i) => (
            <div key={i} className="rental-row">
              <div className="rental-label">{item.label}</div>
              <div className="rental-value">{item.value}</div>
              <div className={`rental-comment ${item.level || ''}`}>{item.comment}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RentalPotentialBreakdown;
