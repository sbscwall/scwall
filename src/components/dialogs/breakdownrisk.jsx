// breakdownrisk.jsx

import React from "react";
import { Button } from "@/components/ui/button"; 
import "../../css/breakdownrisk.css";
import "../../css/global.css";
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved


const BreakdownRisk = ({ propertyId }) => {
 
const property = getPropertyById(propertyId);

const aggregatedValue = `${property.vacancyRate*100}%: ${property.vacancyRateComment}`;
const aggregatedValue2 = `${property.propertyCondition}: ${property.propertyConditionComment}`;

const riskIndicators = [
  {
    label: "Vacancy Rate",
    status: property.vacancyRateRiskPreview,
    comment: aggregatedValue,
  },
  {
    label: 'Natural Risks',
    status: property.naturalRiskPreview,
    comment: property.naturalRiskComment,
  },
  {
    label: "Property Condition",
    status: property.propertyConditionRiskPreview,
    comment: aggregatedValue2,
  },
  {
    label: "Market-Property Fit",
    status: property.marketPropertyFitRiskPreview,
    comment: property.marketPropertyFitComment,
  }
];

const checklist = [
  property.verificationChecklist1,
  property.verificationChecklist2,
  property.verificationChecklist3,
  property.verificationChecklist4,
  property.verificationChecklist5,
];



  return (
  
    <div className="risk-dialog">

<div className="dialog-section">
  <div className="dialog-section-title">Risk Indicators</div>
  {riskIndicators.map((item, idx) => (
    <div key={idx} className="dialog-row">
      <div className="dialog-label">{item.label}</div>
      <div className={`dialog-value ${item.status === 'Ok' ? 'green' : 'amber'}`}>
        {item.status === 'Ok' ? '🟢' : '🟠'} {/* Render the emoji icons */}
      </div>
      <div className="dialog-comment">{item.comment}</div>
    </div>
  ))}
</div>

      <section className="risk-section">
        <h3>Checklist for deeper verification</h3>
        <h5>These additional verification points are specific recommendations tailored to this property listing. They do not replace or limit any other generic or specific inspections and verifications that should be performed during the property evaluation process.</h5>
        <div className="risk-checklist">
          {checklist.map((item, idx) => (
            <li key={idx}> {item}</li>
          ))}
        </div>
      </section>
    </div>




    
    

  );
};

export default BreakdownRisk;
