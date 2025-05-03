import React, { useRef, useState, useEffect } from "react";
import "../../css/cardslider.css";
import "../../css/global.css";

const CardSlider = ({ title = "", children = [] }) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    const scrollX = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.firstChild?.getBoundingClientRect().width || 1;
    const index = Math.round(scrollX / cardWidth);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      return () => ref.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="card-slider-wrapper">
      <div className="title-and-tracker">
        <h2 className="slider-title">{title}</h2>
        <div className="slider-indicator">
          {React.Children.map(children, (_, idx) => (
            <div className={`indicator-dot ${currentIndex === idx ? "active" : ""}`} />
          ))}
        </div>
      </div>

      <div className="card-scroll-container" ref={scrollRef}>
        {React.Children.map(children, (child, idx) => (
          <div className="slider-card" key={idx}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
