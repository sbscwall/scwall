import React, { useState, useRef, useEffect }  from "react";
import { Pencil } from 'lucide-react';
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import ImageCarousel from "../components/ui/imagecarousel";
import PillDropdown from "../components/ui/pilldropdown";
import CategorySlider from "@/components/ui/categoryslider";
import PropertyWealthChart from "@/components/charts/propertywealthchart";
import FloatingBanner from '@/components/dialogs/floatingbanner'; // import floating popups to communicate instant messages
import WealthChartPopup from "@/components/popups/wealthchartpopup";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; 
import { LikeButton } from "@/components/ui/likebutton";
import { Info } from 'lucide-react';
import Tooltip from '@/components/ui/tooltip';  // to activate a light popup 
import "../css/propertycard.css";
import "../css/global.css";


const PropertyCard = () => {
  const [showPopup, setShowPopup] = useState(false); //for the cap rate popup when linked clicked
//  const [showInterestPopup, setShowInterestPopup] = useState(false); --> const to activate when available - for the "I'm interested" popup
//  const [phoneNumber, setPhoneNumber] = useState(""); --> const to activate when available -const to activate for the "i'm interested button and the phone number to add"
  const [openPopup, setOpenPopup] = useState(false); //for the clic on the graph to expand view
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip visibility state
  const heartIconRef = useRef(null); // Create a ref for the heart icon
  const tooltipContainerRef = useRef(null); // Ref for the tooltip container to detect clicks outside
  const navigate = useNavigate();  // For redirection
  const [showEarnBannerEarn, setShowEarnBannerEarn] = useState(false); // to add a floating banner on "i" icon for "you'll earn"
  const [showEarnBannerDownPayment, setShowEarnBannerDownPayment] = useState(false); // to add a floating banner on "i" icon for "down payment"

  // code for the pilldropdown
  const durationOptions = [
    { label: "per month", value: 5 },
    { label: "per year", value: 10 },
    { label: "In 5 years", value: 15 },
    { label: "In 10 years", value: 20 },
    { label: "In 15 years", value: 30 },
    { label: "In 30 years", value: 50 },
  ];
  
  const [selectedDuration, setSelectedDuration] = useState(10); //for the scrolling list with options to choose. related to pilldropdown
  
  // Toggle tooltip visibility on click on anything that needs to show a light popup
  const handleTooltipClick = () => {
    setShowTooltip(prevState => !prevState); // Toggle tooltip visibility
  };

// Close tooltip if click is outside the heart icon or tooltip container
useEffect(() => {
  const handleClickOutside = (event) => {
    try {
      if (tooltipContainerRef.current && !tooltipContainerRef.current.contains(event.target) && !heartIconRef.current.contains(event.target)) {
        setShowTooltip(false); // Close tooltip if click is outside
      }
    } catch (error) {
      console.error("Error in handleClickOutside:", error); // Log the error
    }
  };

  // Add event listener on mount
  document.addEventListener('mousedown', handleClickOutside);

  // Cleanup event listener on unmount
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


//redirection of the two buttons to a waitlist page for FAKE DOOR
  const handleFullReportClick = () => {
    navigate("/waitemailsoon");  // Redirect to waitemailsoon page when "Full Report" is clicked
  };

  const handleInterestClick = () => {
    navigate("/waitemailsoon");  // Redirect to waitemailsoon page when "I'm Interested" is clicked
  };

// Functions for navigation to edit page
const handleEdit = () => {
    navigate('/dataedit');  // Redirect to the explore page (property card page)
  };


  {/* FOR POP UP GUIDED TOUR - DOES NOT WORK WELL TO SEE LATER Define the banner messages
  const banners = [
    {
      message: "1327 properties match your objectives! Scroll to explore! 👇 ",
      variant: "success",
      position: "middle"
    },
    {
      message: "Or view them all in the grid! 👉",
      variant: "info",
      position: "top"
    },
    {
      message: "👆 Swipe the sliders left to get more info about the deal ",
      variant: "warning",
      position: "bottom"
    }
  ];
  */}






  /*code below for the "I'm interested" popup when the feature is available
  const renderInterestPopup = () => (

    <Dialog open={showInterestPopup} onOpenChange={setShowInterestPopup}>
    <DialogContent size="small" className="dialog-content">
    <DialogTitle className="dialog-title">
    Talk to a realtor and schedule your tour
    </DialogTitle>

    <DialogClose asChild>
    <button className="close-button">×</button>
    </DialogClose>

    <div className="dialog-description">
    Enter your number
    <input
          type="tel"
          placeholder=""
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none"
        />

          <Button variant="interest">
            Let’s go! 
          </Button>

    </div>
    </DialogContent>
    </Dialog>
  );*/


    return (
  
      <div>
{/* DOES NOT WORK WELL - GUIDED POPUP TOUR floating banner to show the number of properties found 
     
        <FloatingBanner
          message={banners}
          
          variant="success"  // Change to "info", "warning", "error" as needed
        />
 */}     

{/* Property card content goes below */}

      <div className="property-card">
        

{/* Worth section */}
         <div className="worth">

      {/* Worth figures sub-Section */}
      <div className="worth-value">
      <span className="worth-label">
      You'll earn
      <Info size={14} className="info-icon" onClick={() => setShowEarnBannerEarn(true)} />
      </span>
      <span className="worth-amount">$34,000</span>
      </div>

      {/* Worth Chart Section */}

          <div className="chart-section">
          <div className="chart-open"
          onClick={() => {
          setOpenPopup(true);
          }}
          >
        <PropertyWealthChart height="100%" />
          </div>
          </div>
        <WealthChartPopup open={openPopup} onClose={() => setOpenPopup(false)} />
  
{/* floating banner related to "you'll earn" "i" icon above} */}
        {showEarnBannerEarn && (
  <FloatingBanner
    message={[
      {
        message: (
          <>
            💸 <strong>Cash Flow = Rent – Expenses</strong><br />
            This is your income after paying everything, before your income taxes:<br />
            It’s what hits your pocket every month
          </>
        ),
        variant: "info",
        position: "middle"
      }
    ]}
    onClose={() => setShowEarnBannerEarn(false)}
  />
)}



{/* Like heart button */}

        {/* FAKE DOOR: activate the tootlip */}
        <div
        className="heart-icon-container"
        ref={heartIconRef} // Attach ref to the heart icon container
        onClick={handleTooltipClick} // Toggle tooltip visibility on container click
      >
        <LikeButton className="heart-icon">
          ❤️
        </LikeButton>
        {/* Render Tooltip only when showTooltip is true */}
        {showTooltip && 
                  <Tooltip
                  text="This feature is coming soon!"
                  targetRef={heartIconRef}
                  tooltipRef={tooltipContainerRef} // Pass the tooltip container ref
                />
        }
                </div>
            
         </div>
         


{/* Timing selection and profitability Section */}
          <div className="select-and-profit">
            <PillDropdown
            options={durationOptions}
            selected={selectedDuration}
            onSelect={(val) => setSelectedDuration(val)}
            />

            {/* cap rate link and pop up that gives more details*/}
            <div onClick={() => setShowPopup(true)} className="profitability-link">
            +4.5%
            </div>

            <Dialog open={showPopup} onOpenChange={setShowPopup}>
            <DialogContent size="small" className="dialog-content">
            <DialogTitle className="dialog-title">
              Cap Rate
            </DialogTitle>

            <DialogClose asChild>
            <button className="close-button">×</button>
            </DialogClose>

            <p className="dialog-sub-title">
            This cap rate is in the low range
            </p>
            <div className="dialog-description">
            💡 Cap Rate = Net Income ÷ Property Price
            </div>
            <div className="dialog-description">
            <p className="dialog-sentence">     
It shows how profitable a property is before considering your mortgage.
</p>
<p className="dialog-sentence"> 
 In general:<br />
• 4–5% → Low, safer but less return <br />
• 6–8% → Solid <br />
• 9%+ → High, but check the risks <br />
</p>
<p className="dialog-sentence">  
Use it to compare deals across markets fast. Higher isn’t always better!
</p>
          <p className="dialog-sentence">  
Example: $8,000 yearly income on a $160,000 property = 5% Cap Rate.
          </p>


          </div>
            
            </DialogContent>
            </Dialog>
            </div>


          {/* property analytics caroussel */}
            <CategorySlider />


          {/* Image Gallery with Price, Main Image and address */}
          <div className="price-image-section">
          <div className="price-detail-section">
              <div className="price-recommended-section">
                <div className="recommended-part">
                <h2 className="recommended-price">$450,000</h2>
                <div className="dp-text">Recommended</div>
                </div>
              <div className="down-payment-part">
              <div className="down-payment">
                $90,000
                <Info size={14} className="info-icon" onClick={() => setShowEarnBannerDownPayment(true)} />
                </div> 

              <div className="dp-text">Down payment</div>

{/* floating banner related to "down payment" "i" icon above} */}
{showEarnBannerDownPayment && (
  <FloatingBanner
    message={[
      {
        message: (
          <>
            <strong>🏦 Down Payment = Cash you need upfront.</strong><br />           
Standard is 20% of the property price for investment loans.
Lower down payments require additional monthly insurance.
          </>
        ),
        variant: "info",
        position: "middle"
      }
    ]}
    onClose={() => setShowEarnBannerDownPayment(false)}
  />
)}



              </div>
              <Pencil className="pc-edit-icon" size={16} onClick={handleEdit} />
          </div>
          <div className="price-listed-section">
              <h3 className="listed-price">$480,000</h3> 
              <div className="dp-text">listed</div>
          </div>
          </div>


          {/* Image Gallery with Main Image and sqft/bed/bath banner*/}
          <ImageCarousel />


          {/* property address */}
          <div className="address-top">123 Main Street, Sarasota FL 34233</div>
          
          {/*line below to use when feature is available}
        <button className="button-interest" onClick={() => setShowInterestPopup(true)}> 
            I'm interested!
          </button>*/}


        </div>

            <div className="property-go-further">
            {/* FAKE DOOR Full Report Button (Redirects to waitemailsoon) */}
            <button className="button-secondary" onClick={handleFullReportClick}>
            Full Report
            </button>

            {/* FAKE DOOR "I'm Interested" Button (Redirects to waitemailsoon) */}
            <button className="button-interest" onClick={handleInterestClick}>
            I'm interested!
            </button>
            {/*line below to activate when "i'm interested" feature is available
            {showInterestPopup && renderInterestPopup()} */}
            </div>

            </div>
        
            </div>
      );
    };
    
export default PropertyCard;
