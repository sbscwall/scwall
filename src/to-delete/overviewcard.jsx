import React from "react";
import sampleImage1 from "../../public/assets/property_img/A12000_image1.jpg";
import sampleImage2 from "../../public/assets/property_img/A12000_image1.jpg";
import sampleImage3 from "../../public/assets/property_img/A12000_image1.jpg";
import PropertyWealth from "../components/propertywealth";
import "../css/propertycard.css";
import "../css/global.css";


const PropertyCard = () => {
    return (
        <div className="property-card">
          {/* Left: Image Gallery with Main Image on Top */}
          <div className="image-gallery">
            <img src={sampleImage1} alt="Main Property" className="property-image main image-filter" />
            <div className="thumbnail-row">
              <img src={sampleImage2} alt="Property 2" className="property-image small-left image-filter" />
              <img src={sampleImage3} alt="Property 3" className="property-image small-right image-filter" />
            </div>
          </div>
    
          {/* Right Section: Divided into Property Info, Metrics, and Chart */}
          <div className="property-right">
            {/* Property Info: Address, Price, Rent */}
            <div className="property-info">
              <div className="address-top">123 Main Street, Sarasota FL 34233</div>
              <div className="price-rent-score-section">
              <div className="price-rent-section">
                <div className="price">
                  <span className="price-amount">$300,000</span>
                </div>
                <div className="rent">
                  <span className="rent-label">Rent:</span>
                  <span className="rent-amount">$2,000</span>
                </div>
                </div>

            {/*Deal Score Circle */}
            <div className="score-container">
              <div className="deal-score">8.4</div>
              </div> 
            </div>
    
            </div>
        

            
            {/* financial metrics */}
            <div className="finance-metrics">
                <div className="metric-value">
                <span className="metric-label">Cashflow:</span>
                <span className="metric-amount">$200/month</span>
                </div>
                <div className="metric-value">
                <span className="metric-label">Cap Rate:</span>
                <span className="metric-amount">4.5%</span>
                </div>
            </div>
            
    
            {/* Chart Section */}
            <div className="chart-section">
            <div className="chart-container">
            <PropertyWealth />
            </div>
            </div>

          </div>
        </div>
      );
    };
    
export default PropertyCard;
