import React from "react";
import "../../css/global.css";
import "../../css/button.css";

const ToggleView = ({ options = [], selected, onChange }) => {
  const nextOption = () => {
    const currentIndex = options.indexOf(selected);
    const nextIndex = (currentIndex + 1) % options.length;
    onChange(options[nextIndex]);
  };

  return (
    <div className="single-toggle">
      <button className="click-toggle-button" onClick={nextOption}>
        {selected === options[0] ? options[1] : options[0]}
      </button>
    </div>
  );
};

export default ToggleView;
