import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/categorydetaildialog.css";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";


export default function CategoryDetailDialog({ showPopup, setShowPopup, initialIndex = 0, slides }) {
  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="dialog-content"  dialog-flex-container>
        
        <DialogTitle className="dialog-title">
        </DialogTitle>
        
        <DialogDescription className="dialog-description">
        </DialogDescription>

        <div className="dialog-scroll-container">
        <Swiper
          pagination={{ clickable: true }}
          initialSlide={initialIndex}
          modules={[Pagination]}
          className="swiper"
          style={{ height: "100%" }}
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
        
        <div className="dialog-footer">
        <div className="swiper-pagination-bullet" />
   
        </div>
      </DialogContent>


    </Dialog>
  );
}
