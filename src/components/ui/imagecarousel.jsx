import React, { useRef, useState, useEffect } from "react";
import { FaBed, FaBath, FaArrowsAltH } from 'react-icons/fa'; // for the icons bed, baths, sqft in the picture
import "../../css/imagecarousel.css"; // Make sure this path is correct
import "../../css/global.css"; // Make sure this path is correct


export default function ImageCarousel({ images = [], sqft, beds, baths }) {

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  const handleScroll = () => {
    const scrollX = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    const index = Math.round(scrollX / width);
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
    <div className="image-carousel-wrapper">
      <div className="image-scroll-container" ref={scrollRef}>
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`image-slide ${currentIndex === idx ? "active" : ""}`}
          >
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="carousel-image"
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
