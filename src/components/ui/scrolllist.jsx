// components/ui/ScrollList.jsx
import React from "react";
import "../../css/global.css"; 
import "../../css/scrolllist.css"; 

export default function ScrollList({ options, selected, onSelect }) {
  return (
    <div className="scroll-list-container">
      {options.map((option) => (
        <div
          key={option.value}
          className={`scroll-list-option ${
            selected === option.value ? "selected" : ""
          }`}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
}
