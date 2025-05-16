import React from 'react';
import PropertyTile from '@/components/cards/propertytile';
import '@/css/propertygrid.css';
import '@/css/global.css';
import { useNavigate } from "react-router-dom";

// TEMP: trigger fresh Vercel build

const properties = [
  {
    id: "Property1",
    image: "/../../public/assets/property_img/lehigh_image1.jpg",
    score: 8,
    city: 'Lehigh Acres',
    state: 'FL',
    cashFlow: '$ 318',
    capRate: 7.72
  },
  {
    id: "Property2",
    image: "../../public/assets/property_img/ocala_image1.jpg",
    score: 7,
    city: 'Ocala',
    state: 'FL',
    cashFlow: '$ 155',
    capRate: 6.85
  },
  {
    id: "Property3",
    image: "../../public/assets/property_img/capecoral_image1.jpg",
    score: 7,
    city: 'Cape Coral',
    state: 'FL',
    cashFlow: '$ 104',
    capRate: 7.0
  },
  {
    image: "../../public/assets/property_img/grid1.jpg", // just to test a blurred one
    score: 9,
    city: 'Tampa',
    state: 'FL',
    cashFlow: 980,
    capRate: 7.5
  },
  {
    image: "../../public/assets/property_img/grid2.jpg", // just to test a blurred one
    score: 9,
    city: 'Tampa',
    state: 'FL',
    cashFlow: 980,
    capRate: 7.5
  },
  {
    image: "../../public/assets/property_img/grid3.jpg", // just to test a blurred one
    score: 9,
    city: 'Tampa',
    state: 'FL',
    cashFlow: 980,
    capRate: 7.5
  },
  {
    image: "../../public/assets/property_img/grid4.jpg", // just to test a blurred one
    score: 9,
    city: 'Tampa',
    state: 'FL',
    cashFlow: 980,
    capRate: 7.5
  },
  {
    image: "../../public/assets/property_img/grid5.jpg", // just to test a blurred one
    score: 9,
    city: 'Tampa',
    state: 'FL',
    cashFlow: 980,
    capRate: 7.5
  },
  {
    image: "../../public/assets/property_img/grid6.jpg", // just to test a blurred one
    score: 9,
    city: 'Tampa',
    state: 'FL',
    cashFlow: 980,
    capRate: 7.5
  },
  {
    image: "../../public/assets/property_img/grid7.jpg", // just to test a blurred one
    score: 9,
    city: 'Tampa',
    state: 'FL',
    cashFlow: 980,
    capRate: 7.5
  },
  {
    image: "../../public/assets/property_img/grid8.jpg", // just to test a blurred one
    score: 9,
    city: 'Tampa',
    state: 'FL',
    cashFlow: 980,
    capRate: 7.5
  },
  {
    image: "../../public/assets/property_img/grid9.jpg", // just to test a blurred one
    score: 9,
    city: 'Tampa',
    state: 'FL',
    cashFlow: 980,
    capRate: 7.5
  },

]

const PropertyGrid = () => {

const navigate=useNavigate(); //to call CTA from button

  if (!Array.isArray(properties)) {
    console.warn('PropertyGrid expected an array but got:', properties);
    return null;
  }

  return (
    <div className="page-container">
    <div className="property-grid">
      {properties.map((property, index) => (
        <PropertyTile
          key={index}
          property={property}
          isLocked={index > 2} // Only first 3 are unlocked
          onClick={() => navigate(`/explore?focus=${property.id}`)} //to navigate to propertycard of the tile       
          />
      ))}
      {/* CTA positioned on the locked tiles*/}
        <div className="global-unlock-cta">
        <p>See all properties found for you</p>
        <button className="cta-button" onClick={() => navigate("/waitemailexplore")}>
        Unlock My Deals
        </button>
        </div>
    </div>
    </div>
  );
};

export default PropertyGrid;
