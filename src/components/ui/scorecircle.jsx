import React from 'react';
import "../../css/scorecircle.css";
import "../../css/global.css";

function ScoreCircle({ score }) {
  const normalizedScore = Math.min(Math.max(score, 0), 10);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - normalizedScore / 10);

  const getColor = (score) => {
    if (score >= 7) return 'var(--color-data-green)';
    if (score >= 4) return 'var(--color-data-yellow)';
    return 'var(--score-red)';
  };

  const strokeColor = getColor(normalizedScore);

  return (
    <div className="score-circle-container">
<svg className="score-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle className="score-background" cx="50" cy="50" r="40" />
  <circle
    className="score-progress"
    cx="50"
    cy="50"
    r="40"
    style={{
      stroke: strokeColor,
      strokeDashoffset: strokeDashoffset,
    }}
  />
</svg>
      <h2 className="score-text">{normalizedScore}</h2>
    </div>
  );
}

export default ScoreCircle;
