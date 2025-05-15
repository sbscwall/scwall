//categoryslider.jsx to show preview and details per category
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import CategoryCard from "./categorycard";
import CategoryDetailDialog from "../dialogs/categorydetaildialog";
import DealScoreBreakdown from "../dialogs/breakdowndealscore";
import MoneyFlowPreview from '../dialogs/previewmoneyflow'; 
import MoneyFlowBreakdown from '../dialogs/breakdownmoneyflow'; 
import RentalPotentialPreview from '../dialogs/previewrentalpotential';
import RentalPotentialBreakdown from '../dialogs/breakdownrentalpotential';
import BreakdownSell from '../dialogs/breakdownsell';
import BreakdownRisk from '../dialogs/breakdownrisk';
import PreviewSell from "../dialogs/previewsell";
import PreviewRisk from "../dialogs/previewrisk";
import ScoreCircle from "./scorecircle";
import { Info, Pencil } from 'lucide-react';
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved
import "../../css/categoryslider.css";
import "../../css/global.css"; 

export default function CategorySlider({ propertyId }) {

  //define the import from propertydata
  const property = getPropertyById(propertyId);
  const navigate = useNavigate();  // For redirection
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);
  const [showEarnBannerDownPayment, setShowEarnBannerDownPayment] = useState(false); // to add a floating banner on "i" icon for "down payment"


{/*Variables for deal score* from propertydata.jsx*/}
const dealScoreData = [
  { category: "Cashflow", score: property.cashflowScore },
  { category: "Market", score: property.marketScore },
  { category: "Location", score: property.locationScore },
  { category: "Occupancy", score: property.occupancyScore },
  { category: "Maintenance", score: property.maintenanceScore },
  { category: "Appreciation", score: property.appreciationScore },
];

const dealScoreDescriptions = {
  Cashflow: "Monthly income after expenses",
  Market: "Supply and demand in the local market",
  Location: "Neighborhood quality and desirability",
  Occupancy: "Expected vacancy levels",
  Turnover: "Tenant stability and lease renewals",
  Maintenance: "Expected ongoing costs",
  Simplicity: "Rental friendly regulations",
  Appreciation: "Property value growth potential",
};


// Functions for navigation to edit page
const handleEdit = () => {
  navigate(`/dataedit/${propertyId}`);  // Redirect to the explore page (property card page)
  };




{/*Variables for rental potential breakdown */}
  const rentalSections = [
    {
      title: "💸 How strong is the rental market here?",
      data: [
        { label: "Market average rent for similar properties", value: property.marketRentRange, comment: property.marketRentRangeComment},
        { label: "Rent Growth (YoY)", value: `${(property.rentGrowth * 100).toFixed(1)}%`, comment: property.rentGrowthComment },
        { label: "Vacancy Rate", value: `${(property.vacancyRate * 100).toFixed(0)}%`, comment: property.vacancyRateComment },
      ]
    },
    {
      title: "🧠 Who lives here, and can they afford the rent?",
      data: [
        { label: "Average Income", value: `$${(property.avgIncome /12).toFixed(0)}`, comment: property.avgIncomeComment},
        { label: "Median Age", value: property.medianAge, comment: property.medianAgeComment },
        { label: "Average family composition", value: property.familyComposition, comment: property.familyComposition },
        { label: "% Renters in City", value: property.rentersPct, comment: property.rentersPctComment },
        { label: "HOA", value: property.hoaStatus, comment: property.hoaComment, level: "warning" }
      ]
    },
    {
      title: "🌍 What’s it like to live here?",
      data: [
        { label: "School Score", value: property.schoolScore, comment: property.schoolScoreComment },
        { label: "Crime Rate", value: property.crimeRate, comment: property.crimeRateComment },
        { label: "Walk Score", value: property.walkScore, comment: property.walkScoreComment },
        { label: "Transit Score", value: property.transitScore, comment: property.transitScoreComment }
      ]
    }
  ];



  {/*Variables for Risk preview */}
  const previewRiskItems = [
    {
      label: "Vacancy Rate",
      status: property.vacancyRateRiskPreview
    },
    {
      label: "Natural Risk",
      status: property.naturalRiskPreview
    },
    {
      label: "Condition",
      status: property.propertyConditionRiskPreview
    },
    {
      label: "Market Fit",
      status: property.marketPropertyFitRiskPreview
    }
  ];
  

  {/*Variables for Risk breakdown */}
  const riskIndicators = [
    {
      label: "Vacancy Rate",
      value: `${property.vacancyRate * 100}%`,
      status: property.vacancyRateRisk,
      comment: property.vacancyRateComment
    },
    {
      label: "Natural Risk",
      value: property.naturalRisk,
      status: property.naturalRiskRisk,
      comment: property.naturalRiskComment
    },
    {
      label: "Property Condition",
      value: property.propertyCondition,
      status: property.propertyConditionRisk,
      comment: property.propertyConditionComment
    },
    {
      label: "Market-Property Fit",
      value: property.marketPropertyFit,
      status: property.marketPropertyFitRisk,
      comment: property.marketPropertyFitComment
    }
  ];


  const checklist = [

    property.verificationChecklist1,
    property.verificationChecklist2,
    property.verificationChecklist3,
    property.verificationChecklist4,
    property.verificationChecklist5



/*
    "Confirm utility bills and HOA fees",
    "Request 12-month rent roll",
    "Check insurance premium for flood zone",
    "Inspect roof, HVAC, plumbing condition",
    "Walk the neighborhood",
    "Validate rent with local comps",
    "Review maintenance history",
    "Ask about tenant turnover and past evictions" */

  ]; 
  
  const formatCurrency = (value) => {
    if (typeof value !== "number") return "$–";
    return `$${Math.round(value).toLocaleString()}`;
  };
  

//SLIDER1: Deal score - content for the preview and details for the breakdown popup
const categories = [
  {
    title: "Deal Score",
    content: (
      <div className="slide-content">
        <ScoreCircle score={property.dealScore} />
        <div className="price-detail-section">
        <div className="listed-section">
                <h4 className="listed-price">{formatCurrency(property.listedPrice)}</h4> 
                <h5 className="indication-text">listed Price</h5>
                </div>
                <div className="recommended-section">
                <h4 className="recommended-price">{formatCurrency(property.recommendedPrice)}</h4>
                <h5 className="indication-text">Recommended Price</h5>
                </div>
              <div className="down-payment-section">
              <h4 className="down-payment"> {formatCurrency(property.downPayment)}
                <Info size={14} className="info-icon" onClick={() => setShowEarnBannerDownPayment(true)} />
              </h4> 

              <h5 className="indication-text">Down payment</h5>

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


              
              
              <Pencil className="edit-icon" size={16} onClick={handleEdit} />
           
          </div>

          </div>
      </div>
    ),
    details: (
      <>
        <h3>{property.dealScore} /10</h3>
        <p className="slide-description">
        {property.dealScoreComment}
        </p>

        <DealScoreBreakdown data={dealScoreData} descriptions={dealScoreDescriptions} /> 
      </>
    ),
  },


//SLIDER2: Money In/Out - content for the preview and details for the breakdown popup
 {
    title: "Money in/out", 
    content: (
    <div className="slide-content">
    <div className="slide-description">
    <MoneyFlowPreview propertyId={propertyId} />

   </div> 
  </div>
  ),
    details: (
      <>


{/*money in/out detail in the dialog box*/}

<MoneyFlowBreakdown propertyId={propertyId}
data={{
  income: [{ label: 'Rent', amount: property.estimatedMonthlyRent, key: 'rent' },
    { label: 'Vacancy Buffer', amount: property.vacancyRate * property.estimatedMonthlyRent, key: 'vacancy' }
  ],
  expenses: [
    { label: 'Mortgage', amount: property.monthlyMortgagePayment, key: 'mortgage' },
    { label: 'Insurance', amount: property.insurance, key: 'insurance' },
    { label: 'Property Tax', amount: property.propertyTax, key: 'taxes' },
    { label: 'HOA', amount: property.hoa, key: 'hoa' },
    { label: 'Property Management', amount: property.propertyManagement, key: 'management' },
    { label: 'Maintenance', amount: property.maintenance, key: 'maintenance' },
    // 
  ]

  

}}
  onEdit={(key) => {
    console.log('Open edit modal for:', key);
    //  edit modal trigger here
  }}

/>
      </>

    ),
  },



//SLIDER3: Rental potential - content for the preview and details for the breakdown popup
  {
    title: "Rental potential",
    content: (
      <div className="slide-content">
      <div className="slide-description">
      <RentalPotentialPreview propertyId={propertyId}
        estimatedRent={(property.estimatedMonthlyRent)}
        isRented= {property.isrented}
        rentTrend={property.trend}
        demandTag={property.demandLevel}
      />
      </div>
    </div>
    ),
    details: (
      <>
        <RentalPotentialBreakdown propertyId={propertyId} sections={rentalSections} />
      </>
    ),
  },


  //SLIDER4: Selling value - content for the preview and details for the breakdown popup
  {
    title: "Selling value",
    content: (
      <div className="slide-content">
      <div className="slide-description">
      <PreviewSell propertyId={propertyId} 
        projectedValue={property.projected5yValue}
        projectedValueIncrease={`${property.projected5yValueIncrease}`}
        propertyAppreciation={`+${property.appreciation}%`}
        avgDaysOnMarket={`${property.avgDaysOnMarket} days`}
      />
      </div>
    </div>
    ),
    details: (
      <>
        <BreakdownSell propertyId={propertyId} />
      </>
    ),
  },

  //SLIDER5: Risk Score - content for the preview and details for the breakdown popup
  {
    title: "Risks",
    content: (
      <div className="slide-content">
      <div className="slide-description">
      <PreviewRisk propertyId={propertyId} items={previewRiskItems} />
      </div>
    </div>
    ),
    details: (
      <>
<BreakdownRisk propertyId={propertyId} data={riskIndicators} list={checklist} /> 
      </>
    ),
  },


];


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

  const openPopup = (index) => {
    setPopupIndex(index);
    setPopupOpen(true);
  };

  return (
    <div className="category-slider-wrapper">
      <div className="title-and-indicator">
      <h3 className="category-card-title">{categories[currentIndex].title}</h3>
        <div className="category-bar-indicator">
          {categories.map((_, idx) => (
            <div
              key={idx}
              className={`indicator-bar ${currentIndex === idx ? "active" : ""}`}
            ></div>
          ))}
        </div>
      </div>

      <div className="category-scroll-container" ref={scrollRef}>
        {categories.map((cat, idx) => (
          <div key={idx} onClick={() => openPopup(idx)}>
            <CategoryCard content={cat.content} />
          </div>
        ))}
      </div>

      <CategoryDetailDialog
          showPopup={popupOpen}
          setShowPopup={setPopupOpen}
        onClose={() => setPopupOpen(false)}
        initialIndex={popupIndex}
        slides={categories.map(({ title, details }) => ({
          title,
          content: details,
        }))}
      />
    </div>
  );
}
