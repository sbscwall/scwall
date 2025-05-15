import React, { } from 'react';
import "@/css/global.css";
import "@/css/objectivetracker.css";


// Progress bar component for amount (cash flow)
const ProgressBar = ({ value, max }) => {
  const percentage = Math.min((value / max) * 100, 100); // Calculate percentage


  return (
    
    <div 
    
    style={{ width: '100%', height: '10px', backgroundColor: '#ddd' }}>
      <div
        style={{
          width: `${percentage}%`,

        }}
      ></div>
    </div>
  );
};

// Main component to track cash flow progress and time progress
const ObjectiveCompletion = () => {

      // Function to format numbers with commas (thousands separator)
      const formatNumberWithCommas = (number) => {
        return new Intl.NumberFormat().format(number);
      };
  

  // Hardcoded data (for fake door testing)

  //money status
  const currentValue = 510; // Current cash flow (for testing)
  const targetValue = 1500;    // Goal to increase cash flow by $1000 in 2 years


  // time status
  const timeline = 2;           // 2 years target
  const startDate = new Date(2024, 10, 1); // Jun 1, 2024 (Months are 0-indexed)
  const currentDate = new Date();

  // Calculate the total timeline (in months)
  const totalTimelineMonths = timeline * 12; // 2 years = 24 months

  // Calculate the months passed since the start date
  const timeDifference = Math.max(
    (currentDate - startDate) / (1000 * 60 * 60 * 24 * 30), // in months
    0
  );
  const roundedTimeDifference = Math.round(timeDifference * 10) / 10; //in months

  
  // Calculate the time and progress percentage
  const timeProgress = Math.min((timeDifference / totalTimelineMonths) * 100, 100);
  const moneyProgress = Math.round((currentValue / targetValue) * 100);


  // Conditional message based on progress comparison
  let progressMessage = '';
  if (moneyProgress >= timeProgress) {
    progressMessage = "Great! You're ahead of schedule! Keep it up!";
  } else {
    progressMessage = "It's never too late to catch up! Stay focused and you'll get there!";
  }



  return (
    <div className="objective-tracker">
{/* Display feedback message */}
<h4>{progressMessage} </h4>

<p>Increase  monthly cash flow by ${targetValue} in {timeline} years</p>
      {/* Money Progress */}
      <div className="progress-container">
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${moneyProgress}%` }} // Dynamic width based on progress
      ></div>
    </div>
    {/* Percentage display */}
    <div className="progress-percentage">
      {`$ ${formatNumberWithCommas(currentValue)}`} in {roundedTimeDifference} months
    </div>
  </div>

      
    </div>
  );
};

export default ObjectiveCompletion;
