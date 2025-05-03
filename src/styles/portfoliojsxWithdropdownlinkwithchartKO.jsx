// propertywealthchart.jsx
import React from "react";
import "../../css/propertywealthchart.css";
import "../../css/global.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

{/* Function to generate wealth data based on the selected range (Past or Projection)
const generateWealthData = (duration, isProjection) => {
  const data = [];
  let baseValue = 50000;

  // Generate data for past (up to the current year) or for projections (future data)
  const startYear = isProjection ? new Date().getFullYear() : 0; // Projection starts from current year
  for (let year = startYear; year < startYear + duration; year++) {
    baseValue += Math.floor(Math.random() * 15000) - 5000; // Simulate some fluctuation
    data.push({ year, wealth: Math.max(baseValue, 0) });
  }

  return data;
}; 
*/}

const PropertyWealthChart = ({ height = "100%", width = "100%", selectedChart, netWorthData, grossWorthData, debtData }) => {
 // const wealthData = generateWealthData(duration, isProjection); // Generate data based on the selected filter and projection flag

  let chartData = [];
  let chartKey = "";
  let lineColor = "#8884d8"; // Default color for line (Net Worth)


// Based on selected chart, choose which data to show and apply color
switch (selectedChart) {
  case "Net Worth":
    chartData = netWorthData;
    chartKey = "netWorth";
    lineColor = "#82ca9d"; // Green for Net Worth
    break;
  case "Gross Worth":
    chartData = grossWorthData;
    chartKey = "grossWorth";
    lineColor = "#ff7300"; // Orange for Gross Worth
    break;
  case "Debt":
    chartData = debtData;
    chartKey = "debt";
    lineColor = "#d63031"; // Red for Debt
    break;
  default:
    chartData = netWorthData;
    chartKey = "netWorth";
    lineColor = "#82ca9d";
    break;
}





  //function to block the scroll during the use of the tooltip to read data on the chart
const handleTooltipToggle = (isVisible) => {
  if (isVisible) {
    document.body.classList.add("no-scroll"); // Disable scrolling when tooltip is shown
  } else {
    document.body.classList.remove("no-scroll"); // Re-enable scrolling when tooltip is hidden
  }
};



  return (
    <div style={{ width, height }}>
      <ResponsiveContainer>
        <LineChart 
        data={chartData}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <XAxis 
          dataKey="year" 
          type="number" 
          domain={["dataMin", "dataMax"]} 
          axisLine={true} tick={false} 
          height={10} 
          interval={0} 
          />
          <YAxis 
          domain={["dataMin", "dataMax"]} 
          tick={false} 
          axisLine={true} 
          width={10} 
          />
          <Line
            type="monotone"
            dataKey={chartKey}
            stroke={lineColor}
            strokeWidth={3}
            dot={false}
          />

           <Tooltip
                  // code for the line to read wealth on the chart
              wrapperStyle={{ visibility: "hidden" }}  // Initially hidden
              content={({ active, payload, label, coordinate }) => {
                if (!active || !payload?.length || !coordinate?.x || !coordinate?.y) return null;
            
                handleTooltipToggle(true); // Show tooltip
          
          
                return (
                  <div
                  
                    className="chart-tooltip"
                    style={{
                      visibility: "visible",
                      position: "absolute",
                      left: coordinate.x,
                      pointerEvents: "none",
                    }}
                  >
                    <div><strong>{label} years</strong></div>
                    <div>${payload[0].value}</div>
                  </div>
                );
              }}
              onMouseEnter={() => handleTooltipToggle(true)} // Show tooltip on mouse enter
              onMouseLeave={() => handleTooltipToggle(false)} // Hide tooltip on mouse leave
          
            />
            
          
                  </LineChart>
                </ResponsiveContainer>
          
          
              </div>
            );
          
          };
          
          export default PropertyWealthChart;
          
