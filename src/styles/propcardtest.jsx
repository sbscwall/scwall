// Updated version of PropertyCard.jsx
// Accepts props for reusable cards with static data injected from Explore.jsx

import React, { useState, useRef, useEffect } from "react";
import { Pencil, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "../components/ui/imagecarousel";
import PillDropdown from "../components/ui/pilldropdown";
import CategorySlider from "@/components/ui/categoryslider";
import PropertyWealthChart from "@/components/charts/propertywealthchart";
import FloatingBanner from '@/components/dialogs/floatingbanner';
import WealthChartPopup from "@/components/popups/wealthchartpopup";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LikeButton } from "@/components/ui/likebutton";
import Tooltip from '@/components/ui/tooltip';
import "../css/propertycard.css";
import "../css/global.css";

const PropertyCard = ({
  address,
  price,
  listedPrice,
  downPayment,
  cashFlow,
  capRate,
  wealthAmount
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showEarnBannerEarn, setShowEarnBannerEarn] = useState(false);
  const [showEarnBannerDownPayment, setShowEarnBannerDownPayment] = useState(false);
  const heartIconRef = useRef(null);
  const tooltipContainerRef = useRef(null);
  const navigate = useNavigate();
  const [selectedDuration, setSelectedDuration] = useState(10);

  const durationOptions = [
    { label: "per month", value: 5 },
    { label: "per year", value: 10 },
    { label: "In 5 years", value: 15 },
    { label: "In 10 years", value: 20 },
    { label: "In 15 years", value: 30 },
    { label: "In 30 years", value: 50 },
  ];

  const handleTooltipClick = () => setShowTooltip(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipContainerRef.current &&
        !tooltipContainerRef.current.contains(event.target) &&
        !heartIconRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFullReportClick = () => navigate("/waitemailsoon");
  const handleInterestClick = () => navigate("/waitemailsoon");
  const handleEdit = () => navigate('/dataedit');

  return (
    <div className="property-card">
      <div className="worth">
        <div className="worth-value">
          <span className="worth-label">
            You'll earn <Info size={14} className="info-icon" onClick={() => setShowEarnBannerEarn(true)} />
          </span>
          <span className="worth-amount">{wealthAmount}</span>
        </div>
        <div className="chart-section">
          <div className="chart-open" onClick={() => setOpenPopup(true)}>
            <PropertyWealthChart height="100%" />
          </div>
        </div>
        <WealthChartPopup open={openPopup} onClose={() => setOpenPopup(false)} />
        {showEarnBannerEarn && (
          <FloatingBanner
            message={[{
              message: <><strong>💸 Cash Flow = Rent – Expenses</strong><br />It’s what hits your pocket every month.</>,
              variant: "info",
              position: "middle"
            }]}
            onClose={() => setShowEarnBannerEarn(false)}
          />
        )}
        <div className="heart-icon-container" ref={heartIconRef} onClick={handleTooltipClick}>
          <LikeButton className="heart-icon">❤️</LikeButton>
          {showTooltip && (
            <Tooltip text="This feature is coming soon!" targetRef={heartIconRef} tooltipRef={tooltipContainerRef} />
          )}
        </div>
      </div>

      <div className="select-and-profit">
        <PillDropdown
          options={durationOptions}
          selected={selectedDuration}
          onSelect={setSelectedDuration}
        />
        <div onClick={() => setShowPopup(true)} className="profitability-link">
          +{capRate}
        </div>
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
          <DialogContent size="small" className="dialog-content">
            <DialogTitle className="dialog-title">Cap Rate</DialogTitle>
            <DialogClose asChild><button className="close-button">×</button></DialogClose>
            <p className="dialog-sub-title">This cap rate is in the low range</p>
            <div className="dialog-description">💡 Cap Rate = Net Income ÷ Property Price</div>
            <div className="dialog-description">
              <p className="dialog-sentence">Shows profitability before mortgage. Use it to compare deals across markets.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <CategorySlider />

      <div className="price-image-section">
        <div className="price-detail-section">
          <div className="price-recommended-section">
            <div className="recommended-part">
              <h2 className="recommended-price">{price}</h2>
              <div className="dp-text">Recommended</div>
            </div>
            <div className="down-payment-part">
              <div className="down-payment">
                {downPayment}
                <Info size={14} className="info-icon" onClick={() => setShowEarnBannerDownPayment(true)} />
              </div>
              <div className="dp-text">Down payment</div>
              {showEarnBannerDownPayment && (
                <FloatingBanner
                  message={[{
                    message: <><strong>🏦 Down Payment</strong><br />Usually 20% of the price, required upfront.</>,
                    variant: "info",
                    position: "middle"
                  }]}
                  onClose={() => setShowEarnBannerDownPayment(false)}
                />
              )}
            </div>
            <Pencil className="pc-edit-icon" size={16} onClick={handleEdit} />
          </div>
          <div className="price-listed-section">
            <h3 className="listed-price">{listedPrice}</h3>
            <div className="dp-text">listed</div>
          </div>
        </div>
        <ImageCarousel/>
        <div className="address-top">{address}</div>
      </div>

      <div className="property-go-further">
        <button className="button-secondary" onClick={handleFullReportClick}>Full Report</button>
        <button className="button-interest" onClick={handleInterestClick}>I'm interested!</button>
      </div>
    </div>
  );
};

export default PropertyCard;
