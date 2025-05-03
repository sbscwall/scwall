// previewrisk.jsx

import React from "react";
import "../../css/previewrisk.css";
import "../../css/global.css";
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved


const PreviewRisk = ({ propertyId }) => {
  const property = getPropertyById(propertyId);

  const items = [
    { label: "Vacancy Rate", status: property.vacancyRateRiskPreview },
    { label: "Natural Risk", status: property.naturalRiskPreview },
    { label: "Condition", status: property.propertyConditionRiskPreview },
    { label: "Market Fit", status: property.marketPropertyFitRiskPreview }
  ];

  return (
    <div className="risk-preview">
      <div className="risk-preview-grid">
        {items.map(({ label, status }, i) => (
          <div
            key={i}
            className="risk-preview-item"
          >
            <div className="risk-preview-label">{label}</div>
            <div className={`risk-preview-status ${status === 'Ok' ? 'Ok' : 'attention'}`}>
              {status === 'Ok' ? '✅' : '🔍'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewRisk;

