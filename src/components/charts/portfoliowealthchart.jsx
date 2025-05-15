// portfoliowealthchart.jsx
import React, { useState } from "react";
import "../../css/wealthchart.css";
import "../../css/global.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


// Hardcoded data for the charts (example values) for fake door
const netWorthData = [
    { date: new Date("2019-01-01").getTime(), netWorth: 63238 },
    { date: new Date("2020-01-01").getTime(), netWorth: 158020 },
    { date: new Date("2021-01-01").getTime(), netWorth: 225900 },
    { date: new Date("2022-01-01").getTime(), netWorth: 232600 },
    { date: new Date("2023-01-01").getTime(), netWorth: 282000 },
    { date: new Date("2024-01-01").getTime(), netWorth: 311000 },
    { date: new Date("2024-12-01").getTime(), netWorth: 331000 },
    { date: new Date("2025-01-01").getTime(), netWorth: 331000 },
    { date: new Date("2025-02-01").getTime(), netWorth: 414000 },
    { date: new Date("2025-03-01").getTime(), netWorth: 414000 },
    { date: new Date("2025-04-01").getTime(), netWorth: 414000 },
    { date: new Date("2025-05-01").getTime(), netWorth: 414000 },
    { date: new Date("2025-06-01").getTime(), netWorth: 414000 },
  ];


{/*
// Function to block the scroll during the use of the tooltip to read data on the chart
const handleTooltipToggle = (isVisible) => {
    if (isVisible) {
      document.body.classList.add("no-scroll"); // Disable scrolling when tooltip is shown
    } else {
      document.body.classList.remove("no-scroll"); // Re-enable scrolling when tooltip is hidden
    }
  };
*/}
  

function filterByDuration(data, chartFilter) {
    const now = new Date();
    let cutoff = new Date();
    
    switch (chartFilter) {
        case "3M":
        cutoff.setFullYear(now.getFullYear() - 0.25);
        break;
        case "YTD":
        cutoff = new Date(now.getFullYear(), 0, 1);
        break;
        case "1Y":
        cutoff.setFullYear(now.getFullYear() - 1);
        break;
        case "5Y":
        cutoff.setFullYear(now.getFullYear() - 5);
        break;
        case "10Y":
        cutoff.setFullYear(now.getFullYear() - 10);
        break;
        default:
        return data;
    }
    
    return data.filter((d) => new Date(d.date) >= cutoff);
    }


    

const PortfolioWealthChart = () => {

const timelineOptions = ["3M", "YTD", "1Y", "5Y", "10Y"];
const [chartFilter, setChartFilter] = useState("5Y");
const handleZoomChange = (filter) => {
    setChartFilter(filter);
  };
  
const filteredData = filterByDuration(netWorthData, chartFilter);


return (
    <div className="chart-container">
 <div style={{ width: "100%", height: "100%" }}>
  <ResponsiveContainer width="100%" height="100%">
        <LineChart 
        data={filteredData}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
        <XAxis 
        dataKey="date" 
        type="time"
        scale="time"
        domain={["dataMin", "dataMax"]}
        tickFormatter={(tick) => new Date(tick).toLocaleDateString("en-US", { year: "2-digit", month: "short" })}
        axisLine={true}
        tick={true}
        height={40}
        />

        <YAxis 
        domain={['auto', 'auto']}
        tick={false} 
        axisLine={true} 
        width={10} 
        />


        <Tooltip
        // code for the line to read wealth on the chart
        wrapperStyle={{ visibility: "hidden" }}  // Initially hidden
        content={({ active, payload, label, coordinate }) => {
            if (!active || !payload?.length) return null;
        
        const formattedDate = new Date(label).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });
      
          const formattedValue = payload[0].value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }); 

       //handleTooltipToggle(true); // Show tooltip

        return (
        <div className="chart-tooltip"
        style={{
        visibility: "visible",
        position: "absolute",
        left: coordinate.x,
        pointerEvents: "none",
        }}
        >
        <div>{formattedValue}</div>
        <div><strong>{formattedDate}</strong></div>
        

        </div>
        );
        }}
        //onMouseEnter={() => handleTooltipToggle(true)} // Show tooltip on mouse enter
       // onMouseLeave={() => handleTooltipToggle(false)} // Hide tooltip on mouse leave

        />




        <Line
        type="stepAfter"
        dataKey="netWorth"
        dot={false}
        stroke="var(--color-chart-line)"//line color
        strokeWidth={2}
        //fill="var(--color-accent-two)"
        />
        </LineChart>
        </ResponsiveContainer>


        </div>

        {/* Zoom Filter Buttons for Portfolio (Past Performance or Projection) */}
        <div className="chart-range-selector">
        {timelineOptions.map((option) => (
        <button
        key={option}
        className={`chart-range-button ${chartFilter === option ? "active" : ""}`}
        onClick={() => handleZoomChange(option)}
        >
        {option}
        </button>
        ))}
        </div>
        </div>
        );

        };

        export default PortfolioWealthChart;

