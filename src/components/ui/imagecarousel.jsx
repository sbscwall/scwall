import React, { useRef, useState, useEffect } from "react";
import { debounce } from "lodash";
import { FaBed, FaBath, FaArrowsAltH } from 'react-icons/fa'; // for the icons bed, baths, sqft in the picture
import "../../css/imagecarousel.css"; // Make sure this path is correct
import "../../css/global.css"; // Make sure this path is correct

export default function ImageCarousel({ images = [], sqft, beds, baths }) {
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
    <div className="image-carousel-wrapper">
      <div className="image-scroll-container" ref={scrollRef}>
        {images.map((src, idx) => (
          <div key={idx} className={`image-slide ${currentIndex === idx ? "active" : ""}`}>
            {/* Lazy load the images */}
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="carousel-image"
              loading="lazy" // Adding lazy load here
              style={{
                transform: `translateX(${(currentIndex - idx) * 20}px)`,
              }}
            />
            {/* Banner with property details that moves with each image */}
            <div className="property-details-banner">
              <div className="property-sqft-detail">
                <FaArrowsAltH className="icon" /> {sqft} sqft
              </div>
              <div className="property-sqft-detail">
                <FaBed className="icon" /> {beds} Beds
              </div>
              <div className="property-sqft-detail">
                <FaBath className="icon" /> {baths} Baths
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicator dots for the carousel */}
      <div className="image-indicator">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`indicator-dot ${currentIndex === idx ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
