import React from 'react';
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved
import '../../css/previewmoneyflow.css';
import '../../css/global.css';

const formatCurrency = (value) => {
  if (typeof value !== "number") return "$–";
  return `$${Math.round(value).toLocaleString()}`;
};


const MoneyFlowPreview = ({ propertyId, onClick }) => {
  

  const property = getPropertyById(propertyId);

  return (
    <div className="money-flow-compact" onClick={onClick}>

      <div className="money-flow-columns">
        <div className="money-block">
          <p className="money-label">Monthly Money In</p>
          <h3 className="money-amount">{formatCurrency(property.monthlyTotalIncome)}</h3>
        </div>
        <div className="money-block">
          <p className="money-label">Monthly Money Out</p>
          <h3 className="money-amount">{formatCurrency(property.monthlyTotalExpense)}</h3>
        </div>
      </div>
    </div>
  );
};

export default MoneyFlowPreview;
