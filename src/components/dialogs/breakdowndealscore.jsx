// dealscorebreakdown.jsx – breakdown of the property deal score
import { Button } from "@/components/ui/button"; 
import "../../css/breakdowndealscore.css";
import "../../css/global.css";
import React, { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DealScoreBreakdown = ({ data, descriptions = {} }) => {
  const [view, setView] = useState("radar");
  const [showMore, setShowMore] = useState(false); // to expand "learn more" button

  const toggleView = () => {
    setView((prev) => (prev === "radar" ? "list" : "radar"));
  };



  return (
    <>
    <div className="deal-score-chart">
      <div className="single-toggle">
        <Button className="click-toggle-button" onClick={toggleView}>
          {view === "radar" ? "List View" : "Radar View"}
        </Button>
      </div>


      {view === "radar" && (
  <p className="chart-subtitle">
    The closer a point is to the edge, the better.
  </p>
)}
      {view === "radar" ? (
            
        <ResponsiveContainer width="100%" height={350} >
          <RadarChart cx="40%" cy="50%" outerRadius="60%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 10 }} />
            <Radar
              name="Deal Score"
              dataKey="score"
              stroke="var(--color-object)"
              fill="var(--color-object)"
              fillOpacity={0.6}
            />
        
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <ul className="score-list">
          {data.map((item) => (
            <li key={item.category} className="score-list-item">
              <div className="score-title">{item.category}
  
              {descriptions[item.category] && (
                <p className="score-description">{descriptions[item.category]}</p>
              )}
            </div>
              <div className="score-bar-section">
              <div className="score-bar-container">
                <div className="score-bar" style={{ width: `${item.score * 10}%` }} />
              </div>
              <span className="score-value">{item.score}/10</span>
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>

 {/* Learn more button and expanded view */}


    {!showMore && (
        <Button className="info-button" variant="outline" onClick={() => setShowMore(true)}>
          Learn More
        </Button>
      )}

      {/* Inline Learn More Content */}
      {showMore && (
        <div className="learn-more-content">
          <h3>🔍 How Scwall Calculates Deal Score</h3>
          <p>We combine multiple factors that matter most to investors based on a weighted algorithm, from 1, very bad to 10, excellent. </p>
          <Button variant="ghost" onClick={() => setShowMore(false)}>← Hide</Button>
        </div>
      )}
         </>
  );
};

export default DealScoreBreakdown;
