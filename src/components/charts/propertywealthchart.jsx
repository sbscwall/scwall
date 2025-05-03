import React from "react";
import "../../css/wealthchart.css";
import "../../css/global.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getPropertyById } from "@/data/propertydata"; // import the file where all static data are saved



const PropertyWealthChart = ({ propertyId }) => {
  // Fetch static property data using propertyId
  const property = getPropertyById(propertyId);
 
  // If property data is not found or still loading
  if (!property) {
    return <div>Property data not found</div>;
  }


  // Function to calculate mortgage balance after a certain number of years
  function calculateMortgageBalance(property, years) {

    const remainingBalance =
      property.loanAmount *
        Math.pow(1 + property.monthlyRate, years * 12) -
      (property.monthlyMortgagePayment * (Math.pow(1 + property.monthlyRate, years * 12) - 1) / property.monthlyRate);


    return remainingBalance > 0 ? remainingBalance : 0;
  }

  // Function to generate the wealth projection data
  function generateWealthProjection(property) {
    const projectionData = [];
    let currentValue = property.recommendedPrice;
    let currentMortgage = property.loanAmount;
    let accumulatedCashFlow = 0;
    let annualUpdatedCashFlow = property.annualCashFlow;


    for (let year = 1; year <= 40; year++) {
      // Property value growth based on appreciation
      currentValue *= 1 + property.appreciation;


      // Calculate remaining mortgage balance
      currentMortgage = calculateMortgageBalance(property, year);
      // Calculate equity
      const equity = currentValue - currentMortgage;

      // Update cash flow (assuming it's reinvested in the property or saved)
      accumulatedCashFlow += annualUpdatedCashFlow;
  
      // Calculate total wealth: Equity + accumulated cash flow
      const totalWealth = equity + accumulatedCashFlow;

      // Add data point for this year
      projectionData.push({
        year: year,
        projectedNetWorth: totalWealth
      });

      // Increase rent for the next year
      annualUpdatedCashFlow *= 1 + property.rentGrowth;
    }






    return projectionData;
  }

  const projectionData = generateWealthProjection(property); // Directly use the property data

  return (
    <div className="chart-container">
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectionData}>
            <XAxis
              dataKey="year"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={false}
              interval={0}
              height={0}
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={false}
              axisLine={false}
              width={0}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;

                const formattedValue = payload[0].value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                });

                return (
                  <div className="chart-tooltip">
                    <div><strong>Year {label}</strong></div>
                    <div>{formattedValue}</div>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="projectedNetWorth"
              dot={false}
              stroke="var(--color-chart-line)"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PropertyWealthChart;

