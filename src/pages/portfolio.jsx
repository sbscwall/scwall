import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Grid3x3, Users, TrendingUp, BarChart, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PortfolioPropertyCard from "@/components/cards/portfoliopropertycard";
import CardSlider from "@/components/cards/cardslider";
import PillDropdown from "@/components/ui/pilldropdown";
import PortfolioWealthChart from "@/components/charts/portfoliowealthchart";
import ObjectiveTracker from "@/components/ui/objectivetracker";
import "../css/portfolio.css";
import "../css/global.css";

export default function Portfolio() {
  const worthOptions = [
    { label: "Total Net Worth", value: 517045 },
    { label: "Total Gross Worth", value: 1350000 },
    { label: "Total Debt", value: 719000 },
  ];
  const [selectedWorth, setSelectedWorth] = useState(worthOptions[0]);
 
const [showMore, setShowMore] = useState(false); // to expand "learn more" button

  return (
 
      <div className="page-container">

{/* 1. Total Worth Section */}
<Card className="worth-card">
            <PillDropdown
              variant="borderless"
              options={worthOptions}
              selected={selectedWorth.value}
              onSelect={(value) => {
                const found = worthOptions.find((opt) => opt.value === value);
                if (found) setSelectedWorth(found);
              }}
            />
            <h1 className="worth-value">${selectedWorth.value.toLocaleString()}</h1>
            <p className="worth-date">As of May 2025</p>
          </Card>




        <div className="portfolio-content">


{/* 2. Objective tracker */}
          <section className="objectives-progress">
          <h3 className="section-title">My Goals Progress</h3>
          <ObjectiveTracker/>
          </section>



{/* 3. Statistics Section */}
          <div className="stat-section">
          <h3 className="section-title">My Wealth Key Figures</h3>
          <div className="money-flow-section">
              <Card className="money-card">
                <BarChart className="stat-icon" />
                <h3 className="money-value">$2,320</h3>
                <span className="money-label">Monthly Cashflow</span>
              </Card>
              <Card className="money-card">
                <TrendingUp className="stat-icon" />
                <h3 className="money-value">$6,520</h3>
                <span className="money-label">Monthly Income</span>
              </Card>
              <Card className="money-card">
                <TrendingDown className="stat-icon" />
                <h3 className="money-value">$4,200</h3>
                <span className="money-label">Monthly Expenses</span>
              </Card>
            </div>

            <div className="number-section">
              <Card className="number-card">
                <Home className="stat-icon" />
                <h3 className="number-value">4</h3>
                <span className="number-label">Properties</span>
              </Card>
              <Card className="number-card">
                <Grid3x3 className="stat-icon" />
                <h3 className="number-value">7</h3>
                <span className="number-label">Units</span>
              </Card>
              <Card className="number-card">
                <Users className="stat-icon" />
                <h3 className="number-value">3</h3>
                <span className="number-label">Rented</span>
              </Card>
            </div>

          </div>

  {/* 4. Wealth Chart */}
        <div className="portfolio-chart-part">
          <h3 className="section-title">My Wealth Evolution</h3>
          <div className="portfolio-chart-section">
             <PortfolioWealthChart/>
          </div>
        </div>

        <div className="learn-section">
        {!showMore && (
          <Button className="info-button" variant="outline" onClick={() => setShowMore(true)}>
            Learn More
          </Button>
        )}
                {/* Inline Learn More Content */}
                {showMore && (
          <div className="learn-more-content">
            <p>🔍 This chart shows what you’ve been really earning from your properties</p>
            <ul>
              <li>📈 Your performance = Cash Flow + Equity + Appreciation</li>
              <li>• Monthly net income</li>
              <li>• Equity built through loan paydown</li>
              <li>• Property value growth</li>
            </ul>
            <p>
            It’s not just about the rent,it’s about long-term wealth creation.
            </p>
            <Button variant="ghost" onClick={() => setShowMore(false)}>← Hide</Button>
            </div>
        )}
        </div>


  {/* 6. Portfolio Property Cards */}
      <div className="portfolio-properties-part">
          <h3 className="section-title">My Properties</h3>
          <div className="property-slider-section">
            <CardSlider title="">
              <PortfolioPropertyCard id="property-1" address="123 Main St, Austin TX" units={4} value="$350,000" cashFlow="+$420/mo" equity="$112,000" status="Rented" />
              <PortfolioPropertyCard id="property-2" address="456 Oak Dr, Miami FL" units={2} value="$280,000" cashFlow="+$310/mo" equity="$92,000" status="Vacant" />
              <PortfolioPropertyCard id="property-3" address="789 Pine Ln, Denver CO" units={3} value="$400,000" cashFlow="+$510/mo" equity="$145,000" status="Rented" />
              <PortfolioPropertyCard id="property-4" address="22 Elm St, Seattle WA" units={1} value="$250,000" cashFlow="+$180/mo" equity="$65,000" status="Sold" />
            </CardSlider>
          </div>


        </div>
  
        </div>




{/* 7. Floating Add Button */}    
      <Link 
        to="/waitemailaccount"
        className={`nav-link ${location.pathname === '/explore' ? 'active' : ''}`}
      >
        <Button variant="portfolio-add">+</Button>
      </Link>
    </div>
  
  );
}
