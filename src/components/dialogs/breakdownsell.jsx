// breakdownsell.jsx code to show sellin value over time accessible from the category detail slide - Selling value
import React from "react";
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved
import "../../css/breakdownsell.css";
import "../../css/global.css";

const formatCurrency = (value) => {
  if (typeof value !== "number") return "$–";
  return `$${Math.round(value).toLocaleString()}`;
};

const BreakdownSell = ({ propertyId }) => {

const property = getPropertyById(propertyId);

  const sections = [
    {
      title: " ⏳ Can I sell fast if I need to exit?",
      data: [
        {
          label: "Average Days on Market",
          value: property.avgDaysOnMarket,
          comment: "Local average time to sell similar properties"
        },
        {
          label: "Best Selling Season",
          value: property.bestSellingSeason,
          comment: "Months with fastest turnover historically"
        }
      ]
    },
    {
      title: "📈 Will I gain equity over time?",
      data: [
        {
          label: "Appreciation Rate",
          value: `${property.appreciation*100} %`,
          comment: "Annual estimated growth rate of this property"
        },
        {
          label: "Projected 5Y Value",
          value: formatCurrency(property.projected5yValue),
          comment: "Estimated new value if held for 5 years"
        },
        {
        label: "Projected 5Y Value increase",
        value: formatCurrency(property.projected5yValueIncrease),
        comment: "Estimated gain if held for 5 years"
      }
      ]
    }
  ];

  return (
    <div className="breakdown-dialog">
      {sections.map((section, idx) => (
        <div key={idx} className="dialog-data-section">
          <div className="dialog-data-section-title">{section.title}</div>
          {section.data.map((item, i) => (
            <div key={i} className="dialog-data-row">
              <div className="dialog-data-label">{item.label}</div>
              <div className="dialog-data-value">{item.value}</div>
              <div className={`dialog-data-comment ${item.level || ''}`}>{item.comment}</div>
            </div>
          ))}
        </div>
      ))}

    </div>
  );
};

export default BreakdownSell;
