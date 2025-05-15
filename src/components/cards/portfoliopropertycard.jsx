import React, {useState, useRef, useEffect} from "react";
import Tooltip from '@/components/ui/tooltip';  // to activate a light popup 
import "../../css/portfoliopropertycard.css";
import "../../css/global.css";
import "../../css/icon.css";
import { Pencil } from "lucide-react";



const PortfolioPropertyCard = ({

  //initialisation of variables 
  id = "property-0",
  address = "123 Main St, Austin TX",
  units = 4,
  value = "$350,000",
  cashFlow = "+$420/mo",
  equity = "$112,000",
  status = "Rented",
  onEdit = () => {},
}) => {
  const statusColor = {
    Rented: "status-green",
    Vacant: "status-yellow",
    Sold: "status-red",
  }[status] || "status-gray";



  // FAKE DOOR: Toggle tooltip visibility on click show a light popup on property card pencil
 
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip visibility state
  const tooltipContainerRef = useRef(null); // Ref for the tooltip container to detect clicks outside
  const pencilIconRef = useRef(null); // Create a ref for the heart icon
    


// Close tooltip if click is outside the pencil icon or tooltip container
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      tooltipContainerRef.current &&
      !tooltipContainerRef.current.contains(event.target) &&
      !pencilIconRef.current.contains(event.target)
    ) {
      setShowTooltip(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <div className="portfolio-card" id={id}>
      <div className="card-header">
        <div>
          <div className="property-address">{address}</div>
          <div className="property-units">{units} units</div>
        </div>


 {/* FAKE DOOR: activate the tootlip/banner to notify edit feature not available */}
 <div
          className="pencil-container"
          ref={pencilIconRef}
          onClick={() => setShowTooltip((prev) => !prev)}
        >
          <Pencil className="edit-icon" onClick={onEdit} />
     

          {showTooltip && (
            <Tooltip
              text="This feature is coming soon!"
              targetRef={pencilIconRef}
              tooltipRef={tooltipContainerRef}
            />
          )}
        </div>
      </div>

      <div className="property-value">{value}</div>

      <div className="card-stats">
        <div className="portfolio-detail-line">
          <span className="portfolio-detail-label">Cash Flow:</span>
          <span className="portfolio-detail-value">{cashFlow}</span>
        </div>
        <div className="portfolio-detail-line">
          <span className="portfolio-detail-label">Equity Built:</span>
          <span className="portfolio-detail-value">{equity}</span>
        </div>
        <div className="portfolio-detail-line">
          <span className="portfolio-detail-label">Status:</span>
          <span className={`portfolio-detail-value status-badge ${statusColor}`}>{status}</span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPropertyCard;
