//categoryslider.jsx to show preview and details per category
import React, { useRef, useState, useEffect } from "react";
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
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved
import "../../css/categoryslider.css";
import "../../css/global.css"; 

export default function CategorySlider({ propertyId }) {

  //define the import from propertydata
  const property = getPropertyById(propertyId);
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);


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



{/*Variables for rental potential breakdown */}
  const rentalSections = [
    {
      title: "💸 How strong is the rental market here?",
      data: [
        { label: "Neighborhood Avg Rent", value: property.neighborhoodAvgRent, comment: property.AvgRentComment },
        { label: "Market Rent Range", value: property.marketRentRange, comment: property.marketRentRangeComment},
        { label: "Rent Growth (YoY)", value: property.rentGrowth, comment: property.rentGrowthComment },
        { label: "Vacancy Rate", value: property.vacancyRate, comment: property.vacancyRateComment, level: "warning" },
      ]
    },
    {
      title: "🧠 Who lives here — and can they afford it?",
      data: [
        { label: "Avg Income", value: property.avgIncome, comment: property.avgIncomeComment, level: "warning" },
        { label: "Median Age", value: property.medianAge, comment: property.medianAgeComment },
        { label: "Average family composition", value: property.avgIncome, comment: property.avgIncomeComment },
        { label: "% Renters in City", value: property.rentersPct, comment: property.rentersPctComment },
        { label: "HOA", value: property.hoaStatus, comment: property.hoaComment, level: "warning" }
      ]
    },
    {
      title: "🌍 What’s it like to live here?",
      data: [
        { label: "School Score", value: property.schoolScore, comment: property.schoolScoreComment },
        { label: "Crime Rate", value: property.crimeRate, comment: property.crimeRateComment, level: "warning" },
        { label: "Walk Score", value: property.walkScore, comment: property.walkScoreComment },
        { label: "Transit Score", value: property.transitScore, comment: property.transitScoreComment }
      ]
    }
  ];


{/*Variables for Selling value breakdown 
  const sellBreakdownData = {
    avgDaysOnMarket: property.avgDaysOnMarket,
    bestSellingSeason: property.bestSellingSeason,
    propertyAppreciation: property.appreciation,
    projectedValueIncrease: property.projected5yValue,
    priceEvolutionData: [
      { year: 2018, price: 240000 },
      { year: 2019, price: 250000 },
      { year: 2020, price: 260000 },
      { year: 2021, price: 275000 },
      { year: 2022, price: 285000 },
      { year: 2023, price: 295000 },
      { year: 2024, price: 305000 },
      { year: 2025, price: 317000, projected: true },
      { year: 2026, price: 328000, projected: true },
      { year: 2027, price: 340000, projected: true }
    ]
  };
  */}

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
  
  
  

//SLIDER1: Deal score - content for the preview and details for the breakdown popup
const categories = [
  {
    title: "Deal Score",
    content: (
      <div className="slide-content">
        <ScoreCircle score={property.dealScore} />
        <p className="slide-description">
        {property.dealScoreComment}
        </p>
      </div>
    ),
    details: (
      <>
        <h3>{property.dealScore} /10</h3>
        <p className="detail-description">
        We’ve broken down this score to help you understand the strengths and risks of this investment opportunity.
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
    title: "Risk Score",
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
