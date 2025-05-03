//explore.jsx for the main exploration page

import React, { useEffect, useRef }  from "react";
import { FaSearch, FaCog, FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useSearchParams } from 'react-router-dom'; //to use navigate to other pages
import PropertyCard from "../components/propertycard";
import { getPropertyById } from "@/data/propertydata";

import "../css/explore.css";
import "../css/global.css";

const Explore = () => {
  
  const navigate = useNavigate(); //to navigate to email signup or to a specific propertycard
  const [searchParams] = useSearchParams();
  const focusId = searchParams.get("focus"); // e.g. Property2


  const fakeProperties = [
    { id: "Property1", data: getPropertyById("Property1") },
    { id: "Property2", data: getPropertyById("Property2") },
    { id: "Property3", data: getPropertyById("Property3") },
  ];
  

  // Map of refs per card to point to a specific card
  const cardRefs = useRef({});

// Scroll to focused card on mount
useEffect(() => {
  if (focusId && cardRefs.current[focusId]) {
    cardRefs.current[focusId].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }
}, [focusId]);


  return (
  
<div className="page-container">  

{/* 1. Any message before cards 
<div className="pre-explore-container">
1327 properties match your objectives! Scroll to explore! 👇 
</div>
*/}

{/* 2. container to handle card-to-card scroll and not free scroll */}
<div className="snap-container">

{/* 2. Property cards Overview */}
<div className="property-card-container">
{fakeProperties.map((propertyObj) => (
  <div
    key={propertyObj.id}
    ref={(el) => (cardRefs.current[propertyObj.id] = el)}
    className="property-card-wrapper"
  >
    <PropertyCard propertyId={propertyObj.id} />
  </div>
))}



{/* 3. CTA Card goes at the end */}
  <div className="property-card call-to-action-card">
    <div className="cta-content">
      <h3>🚀 Want to see more deals like this?</h3>
      <p>Sign up now to get early access to personalized investment opportunities.</p>
      <Button className="cta-button" onClick={() => navigate('/waitemailsoon')}>
        🔓 Unlock Full Access
      </Button>
    </div>
  </div>
</div>

</div>

</div>



  );
};

export default Explore;
