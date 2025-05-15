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
  const [showHangTight, setShowHangTight] = useState(false); // Flag for Hang Tight message 
   const [transitionMessage, setTransitionMessage] = useState(""); //manage transitions screens between questions
    const [fadeOut, setFadeOut] = useState(false); // To handle fade-out effect

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
    if (completed) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
  }, [completed]);


// Handle when user clicks "Explore Deals" button
const handleExplore = () => {
  console.log("showHangTight state after click:", showHangTight); // Log state change
  setShowHangTight(true); // Show Hang Tight message immediately
};


  //animation for transition-screen 
  useEffect(() => {
    if (showHangTight) {
      console.log("showHangTight state entered useeffect:", showHangTight);
      setTransitionMessage("Hang tight... we're generating the deals!");

  // Step 2: After 3 seconds, apply fade-out effect
  setTimeout(() => {
    console.log("Fade-out triggered");
    setFadeOut(true); // Trigger the fade-out effect after 3 seconds of showing the message
  }, 3000);

  // Step 3: After 4 seconds (including fade-out), navigate to the explore page
  setTimeout(() => {
    setShowHangTight(false); // Hide the "Hang Tight" message
    console.log("Navigating to explore page");
    navigate("/explore"); // Navigate to the explore page
  }, 6000); // Wait for the 1 second fade-out duration (total of 4 seconds before navigation)



    }
  }, [showHangTight, transitionMessage, navigate]);
  
  if(showHangTight) {
    return (
      <div className={`transition-screen ${fadeOut ? "fade-out" : "fade-in"}`}>
    <div className="processing-icon" />
    <p className="hang-tight-text">{transitionMessage}</p>
  </div>
    )}


  // Format numbers with commas (thousands separator)
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  // Confetti completion page
    // Conditional Rendering: Show the Hang Tight message or the objective page
    if (showHangTight) {
      return (
        <div className={`transition-screen fade-in`}>
          <div className="processing-icon" />
          <p className="hang-tight-text">{transitionMessage}</p>
        </div>
      );
    }

  if (completed) {
    return (
      <div className="page-container">
      <div className="objective-completion">
        <canvas className="confetti-canvas"></canvas>
        <div className="confetti">🎉🎉🎉</div>
        <h2>Nothing can stop you from achieving this objective!</h2>
        <p>Let's do it together! I'll show you now deals that fit with your objective and investor profile!</p>
        <Button className="button-start" onClick={handleExplore}>
          Explore deals
        </Button>
      </div>
      </div>
    );
  }




  // Conditional Rendering: Show the Hang Tight message or the objective page
  if (showHangTight) {
    return (
      <div className={`transition-screen fade-in`}>
        <div className="processing-icon" />
        <p className="hang-tight-text">{transitionMessage}</p>
      </div>
    );
  }

  // Main questionnaire view with objective selections
  return (
    <div className="page-container">
      <div className="objective-container">
        <header className="objective-header">
          <h2>Set Your Objectives</h2>
          <p>I’ll help you reach them.</p>
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
              <button className="cta-button" disabled={!selected} onClick={() => setCompleted(true)}>Let’s Go 🚀</button>
            </footer>
          </div>
        )}

      </div>






    </div>
  );
};

export default Objective;
