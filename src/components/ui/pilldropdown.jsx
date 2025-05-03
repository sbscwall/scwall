import React, { useState } from "react";
import "../../css/global.css";
import "../../css/pilldropdown.css";

export default function PillDropdown({ options, selected, onSelect, variant = "default" }) {

  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <div className={`pill-dropdown ${variant}`}>
      <div
        className="pill-selected"
        onClick={() => setOpen((prev) => !prev)}
      >
        {options.find((opt) => opt.value === selected)?.label || "Select"}
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="pill-options">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`pill-option ${
                selected === opt.value ? "selected" : ""
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
