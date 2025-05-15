import React, { useRef, useState, useEffect } from "react";
import { debounce } from "lodash";
import "../../css/cardslider.css";
import "../../css/global.css";

const CardSlider = ({ title = "", children = [] }) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create a debounced handleScroll function outside of useCallback
  const handleScroll = debounce(() => {
    console.time('scrollHandler'); // Start timer
    const scrollX = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.firstChild?.getBoundingClientRect().width || 1;
    const index = Math.round(scrollX / cardWidth);
    setCurrentIndex(index);
    console.timeEnd('scrollHandler'); // End timer
  }, 300); // 300ms debounce delay

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      return () => ref.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

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
