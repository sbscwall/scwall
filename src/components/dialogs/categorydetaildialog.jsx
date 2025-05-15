import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/categorydetaildialog.css";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function CategoryDetailDialog({ showPopup, setShowPopup, initialIndex = 0, slides }) {
  const [activeSlide, setActiveSlide] = useState(initialIndex);

  // Function to handle custom pagination dot click
  const handleDotClick = (index) => {
    setActiveSlide(index);
    swiperRef.current.swiper.slideTo(index);
  };

  const swiperRef = React.useRef(null);  // Swiper reference

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="dialog-content" dialog-flex-container>
        
        <DialogTitle className="dialog-title">
          {/* You can place a title or any other content here */}
        </DialogTitle>
        
        <DialogDescription className="dialog-description">
        </DialogDescription>

        {/* Custom Pagination Dots */}
        <div className="custom-pagination">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`custom-pagination-dot ${activeSlide === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>

        {/* Swiper Component */}
        <div className="swiper-container">
          <Swiper
            ref={swiperRef}
            pagination={{ clickable: true }}
            initialSlide={initialIndex}
            modules={[Pagination]}
            className="swiper"
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)} // Sync custom pagination
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="category-dialog-slide">
                  <h2>{slide.title}</h2>
                  {slide.content}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </DialogContent>
    </Dialog>
  );
}
