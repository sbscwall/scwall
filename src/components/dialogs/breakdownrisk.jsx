// breakdownrisk.jsx

import React, {useState} from "react";
import { Button } from "@/components/ui/button"; 
import "../../css/breakdownrisk.css";
import "../../css/global.css";
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved


const BreakdownRisk = ({ propertyId }) => {
 
const [showMore, setShowMore] = useState(false); // to expand "learn more" button
const property = getPropertyById(propertyId);

const riskIndicators = [
  {
    label: "Vacancy Rate",
    value: property.vacancyRate,
    comment: property.vacancyRateComment,
  },
  {
    label: property.naturalRisk,
    value: property.naturalRiskRisk,
    comment: property.naturalRiskComment,
  },
  {
    label: "Property Condition",
    value: property.propertyCondition,
    comment: property.propertyConditionComment,
  },
  {
    label: "Market-Property Fit",
    value: property.marketPropertyFit,
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
    <>
    <div className="risk-dialog">

<div className="dialog-section">
  <div className="dialog-section-title">Risk Indicators</div>
  {riskIndicators.map((item, idx) => (
    <div key={idx} className="dialog-row">
      <div className="dialog-label">{item.label}</div>
      <div className="dialog-value">{item.value}</div>
      <div className={`dialog-comment ${item.status === 'high' ? 'warning' : ''}`}>
        {item.comment}
      </div>
    </div>
  ))}
</div>

      <section className="risk-section">
        <h3>Checklist for deeper verification</h3>
        <ul className="risk-checklist">
          {checklist.map((item, idx) => (
            <li key={idx}> {item}</li>
          ))}
        </ul>
      </section>
    </div>


      {!showMore && (
          <Button className="info-button" variant="outline" onClick={() => setShowMore(true)}>
            Learn More
          </Button>
        )}
  
        {/* Inline Learn More Content */}
        {showMore && (
          <div className="learn-more-content">
            <h4>🔍 Risk Score helps you avoid the wrong bet.</h4>
            <p>We look at 5 things:</p>
            <ul>
              <li>💸 Local vacancy rates</li>
              <li>📍 Neighborhood volatility</li>
              <li>⚠️ Market appreciation</li>
              <li>📊 Rent-to-income ratio</li>
              <li>Price fluctuations</li>
            </ul>
            <p>
           It's like a background check for your investment!
            </p>
            <Button variant="ghost" onClick={() => setShowMore(false)}>← Hide</Button>
          
          
          </div>
        )}
    
    
    </>
  );
};

export default BreakdownRisk;
