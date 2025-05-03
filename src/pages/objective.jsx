// objective.jsx
import React, { useState, useEffect} from 'react';
//import { useRouter } from "next/router";
import { useNavigate } from 'react-router-dom';
import '../css/objective.css';
import '../css/global.css';
import confetti from 'canvas-confetti';
import { Button } from "@/components/ui/button"; 





const allObjectives = [
    { id: 'properties', label: 'I want to own Rental Properties', icon: '🏘️' },
    { id: 'cashflow', label: 'I want to earn Monthly Cash Flow', icon: '💵' },
    { id: 'networth', label: 'I want to increase Net Worth', icon: '📈' },
  ];
  
  
  const Objective = () => {
    const [timeline, setTimeline] = useState(5);
    const [selectedId, setSelectedId] = useState(null);
    const [propertyCount, setPropertyCount] = useState(1);
    const [cashflow, setCashflow] = useState(500);
    const [networth, setNetworth] = useState(50000);
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();
   // const router = useRouter();

    const handleSelect = (id) => {
      setSelectedId(prev => (prev === id ? null : id));
    };
  
    const increment = (setter, step = 1) => () => setter(prev => prev + step);
    const decrement = (setter, min = 1, step = 1) => () => setter(prev => Math.max(min, prev - step));
  
    const selected = allObjectives.find(obj => obj.id === selectedId);
    const targetYear = new Date().getFullYear() + timeline;
  
    useEffect(() => {
      if (completed) {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      }
    }, [completed]);
  
    const [startTransition, setStartTransition] = useState(false); //for a nice animation before the explore page appears
    const handleExplore = () => {
      setStartTransition(true); // triggers fade-out class
      setTimeout(() => {
        navigate('/door');
      }, 1000); // 1s fade duration
    };
    
  
    if (completed) {
      return (
        <div className={`objective-completion ${startTransition ? "fade-out" : ""}`} onClick={handleExplore}>
          <canvas className="confetti-canvas"></canvas>
          <div className="confetti">🎉🎉🎉</div>
          <h2>Nothing can stop you from achieving this objective!</h2>
          <p>Let's do it together! I'll show you now deals that fit with your objective and investor profile!</p>
          <span className="tap-to-start">Click anywhere to start exploring the best personalised deals→</span>
        </div>
      );
    }
  
    return (
    <div className="page-container">
      <div className="objective-container">
        <header className="objective-header">
          <h2>Set Your Objectives</h2>
          <p>I’ll help you reach them.</p>
        </header>
  
 {/* checkboxes so that the user can select an objective*/}  
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

        

{/* slider so that the user can set a time for the objective*/}       

  
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
        <div className="objective-sentence">I want to grow my net worth by <span className="inline-value">${networth}</span> by {targetYear}.</div>
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
  