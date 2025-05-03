import React, { useState } from "react";
import {Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Add this if not already
import PropertyWealthChart from "@/components/charts/propertywealthchart";
//import { getPropertyById } from "@/data/propertydata"; // import the file where all static data are saved
import "../../css/propertywealthchart.css";
import "../../css/global.css";

function WealthChartPopup({ propertyId, open, onClose }) {
  const [showMore, setShowMore] = useState(false);


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="popup-chart-section">
        <DialogTitle className="dialog-title">Wealth Projection</DialogTitle>

        <DialogClose asChild>
          <button className="close-button">×</button>
        </DialogClose>

        <DialogDescription className="dialog-description">
          This chart shows your projected equity growth over time.
        </DialogDescription>

        <div className="popup-chart-container">
          <PropertyWealthChart propertyId={propertyId} />
          
        </div>

        {!showMore && (
          <Button className="info-button" variant="outline" onClick={() => setShowMore(true)}>
            Learn More
          </Button>
        )}

        {showMore && (
          <div className="learn-more-content">
            <h4>🔮 How We Simulate Wealth Projection</h4>
            <p>We estimate how your investment could grow by combining:</p>
            <ul>
              <li>📈 Property appreciation (3–5%/year)</li>
              <li>💸 Rent growth (2–3%/year)</li>
              <li>📉 Expense inflation (around 2%)</li>
              <li>🏦 Loan amortization over time</li>
            </ul>
            <p>
              This helps you visualize not just cash flow—but **long-term
              wealth creation** from equity growth.
            </p>
            <Button variant="ghost" onClick={() => setShowMore(false)}>
              ← Hide
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default WealthChartPopup;
