import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/objective.css';
import '../css/questionnaire.css';
import '../css/global.css';
import confetti from 'canvas-confetti';
import { Button } from "@/components/ui/button"; 

const allObjectives = [
  { id: 'cashflow', label: 'I want to earn additional income', icon: '💵' },
  { id: 'networth', label: 'I want to increase my worth', icon: '📈' },
  { id: 'properties', label: 'I just want to own rental properties', icon: '🏘️' },
];

const Objective = () => {
  const [timeline, setTimeline] = useState(5);
  const [selectedId, setSelectedId] = useState(null);
  const [propertyCount, setPropertyCount] = useState(1);
  const [cashflow, setCashflow] = useState(500);
  const [networth, setNetworth] = useState(50000);
  const [completed, setCompleted] = useState(false);
  const [cancelled, setCancelled] = useState(false);

   const navigate = useNavigate();

  // Handles user selection for objective types
  const handleSelect = (id) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  // For incrementing and decrementing the user's goals
  const increment = (setter, step = 1) => () => setter(prev => prev + step);
  const decrement = (setter, min = 1, step = 1) => () => setter(prev => Math.max(min, prev - step));

  const selected = allObjectives.find(obj => obj.id === selectedId);
  const targetYear = new Date().getFullYear() + timeline;

  // Confetti effect once the objective is marked as complete
  useEffect(() => {
    if (completed || cancelled) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
  }, [completed, cancelled]);


// Handle when user clicks "Explore Deals" button
const handleExplore = () => {
  navigate("/hangtightanimation");

};



  // Format numbers with commas (thousands separator)
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };



  if (completed) {
    return (
      <div className="page-container">
      <div className="objective-completion">
        <canvas className="confetti-canvas"></canvas>
        <div className="confetti">🎉🎉🎉</div>
        <h2>Nothing can stop you from achieving your objectives!</h2>
        <p>Let's do it together! I'll show you now deals that fit with your objective and investor profile!</p>
        <Button className="button-start" onClick={handleExplore}>
          Explore deals
        </Button>
      </div>
      </div>
    );
  }

  if (cancelled) {
    return (
      <div className="page-container">
      <div className="objective-completion">
        <canvas className="confetti-canvas"></canvas>
        <div className="confetti">🎉🎉🎉</div>
        <h2>You’re on your way!</h2>
        <p>No worries if you haven’t set your objectives yet. You’re still moving forward, and we’ve got plenty of opportunities waiting for you!</p>
        <Button className="button-start" onClick={handleExplore}>
          Explore deals
        </Button>
      </div>
      </div>
    );
  }

 // Function to display the nudge message based on selected objective
 const getNudgeMessage = () => {
  switch (selectedId) {
    case 'cashflow':
      return (
        <p className="nudge-message">
          Start with a goal that feels achievable. 
          For example, with a 5-year timeline, you could target $500/month in cash flow from 1–2 rental properties. A property worth $100K with a 6% rental yield could bring you around $500 in monthly cash flow.
        </p>

      );
    case 'networth':
      return (
        <p className="nudge-message">
          Focus on realistic growth for your net worth over time. 
          For example, with a 2 year timeline, aiming to grow your net worth by $20,000 to $40,000 is a good start. 
        </p>
      );
    case 'properties':
      return (
        <p className="nudge-message">
          Start small and grow your portfolio as you gain more experience.
          For example, in the first year, aim for 1 or 2 properties to learn the ropes. After that, you can gradually scale your portfolio based on your experience and market conditions.
        </p>
      );
    default:
      return null;
  }
};



  // Main questionnaire view with objective selections
  return (
    <div className="page-container">
      <div className="objective-container">
        <header className="objective-header">
          <h2>Set Your Objectives</h2>
          <p>I’ll help you reach them.</p>
          <button className="skip-link" onClick={() => setCancelled(true)}>I'll set my objectives later</button>
        </header>

        {/* Objective selection */}
        <div className="objectives-list">
          <h3 className="objective-instruction">What objective would you like to achieve?</h3>
          {allObjectives.map(obj => (
            <div key={obj.id} className="objective-option">
              <input
                type="radio"
                name="objective"
                checked={selectedId === obj.id}
                onChange={() => handleSelect(obj.id)}
                id={`radio-${obj.id}`}
              />
              <label htmlFor={`radio-${obj.id}`}>{obj.icon} {obj.label}</label>
            </div>
          ))}
        </div>





        {/* Time slider and goal setup */}
        {selectedId === 'properties' && (
          <div className="summary-box">
            <h3 className="objective-instruction">What is your ambition?</h3>

            <div className="timeline-slider">
              <label>Timeline: {timeline} {timeline === 1 ? 'year' : 'years'}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={timeline}
                onChange={e => setTimeline(parseInt(e.target.value))}
              />
            </div>
            <div className="objective-summary">
              <div className="objective-sentence">I want to own <span className="inline-value">{propertyCount}</span> properties by {targetYear}.</div>
              <div className="value-control-inline">
                <button onClick={increment(setPropertyCount)}>+</button>
                <button onClick={decrement(setPropertyCount)}>−</button>
              </div>
            </div>
            <footer className="objective-footer">
                      {/* Display the nudge message for selected objective */}
        {selectedId && <div className="nudge-message-container">{getNudgeMessage()}</div>}
              <button className="cta-button" disabled={!selected} onClick={() => setCompleted(true)}>Let’s Go 🚀</button>
            </footer>
          </div>
        )}

        {selectedId === 'cashflow' && (
          <div className="summary-box">
            <h3 className="objective-instruction">What is your ambition?</h3>
            <div className="timeline-slider">
              <label>Timeline: {timeline} {timeline === 1 ? 'year' : 'years'}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={timeline}
                onChange={e => setTimeline(parseInt(e.target.value))}
              />
            </div>
            <div className="objective-summary">
              <div className="objective-sentence">I want to earn <span className="inline-value">${cashflow}</span> in monthly cash flow by {targetYear}.</div>
              <div className="value-control-inline">
                <button onClick={increment(setCashflow, 100)}>+</button>
                <button onClick={decrement(setCashflow, 0, 100)}>−</button>
              </div>
            </div>
            <footer className="objective-footer">
              {/* Display the nudge message for selected objective */}
              {selectedId && <div className="nudge-message-container">{getNudgeMessage()}</div>}
              <button className="cta-button" disabled={!selected} onClick={() => setCompleted(true)}>Let’s Go 🚀</button>
            </footer>
          </div>
        )}

        {selectedId === 'networth' && (
          <div className="summary-box">
            <h3 className="objective-instruction">What is your ambition?</h3>
            <div className="timeline-slider">
              <label>Timeline: {timeline} {timeline === 1 ? 'year' : 'years'}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={timeline}
                onChange={e => setTimeline(parseInt(e.target.value))}
              />
            </div>
            <div className="objective-summary">
              <div className="objective-sentence">I want to grow my net worth by <span className="inline-value">${formatNumberWithCommas(networth)}</span> by {targetYear}.</div>
              <div className="value-control-inline">
                <button onClick={increment(setNetworth, 5000)}>+</button>
                <button onClick={decrement(setNetworth, 0, 5000)}>−</button>
              </div>
            </div>
            <footer className="objective-footer">
              {/* Display the nudge message for selected objective */}
              {selectedId && <div className="nudge-message-container">{getNudgeMessage()}</div>}
              <button className="cta-button" disabled={!selected} onClick={() => setCompleted(true)}>Let’s Go 🚀</button>
            </footer>
          </div>
        )}

      </div>






    </div>
  );
};

export default Objective;
