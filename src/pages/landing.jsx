import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import LandingSection from "@/components/ui/landingsection";
import "../css/global.css";
import "../css/landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const handleTryFeatures = () => {
    navigate("/question/0");  // Redirect to questions page when "try features" is clicked
  };

  return (
    <div className="page-container">
    <div className="landing-container">

<div className="catching-section">
    <h1 className="catching-phrase">We do the homework.</h1>
    <h1 className="catching-phrase">You build the wealth.</h1>
   
</div>

<div className="value-prop"> 
<h4 className="value-phrase">  The future of real estate investing is here.  </h4>
    <h4 className="value-phrase">  Invest like a pro.  </h4>
    <h4 className="value-phrase">  Scwall gives you confidence at every step. </h4>
    <h4 className="value-phrase"> Get access to analyzed deals that fit your objectives. </h4>
</div>

<div className="cta-section"> 
<Button className="button-start" onClick={() => navigate("/waitemail")}>
Sign up
</Button>
<div className="wait-section"> 
  <div className="wait-phrase"> Limited early access only</div>
<div className="urgent-phrase"> 2100+ already joined</div>
</div>

    {/* CTA link to try the features */}
          <Button className="info-button" onClick={handleTryFeatures}>
        Try Scwall features before everyone
          </Button>


{/*  <div className="wait-CTA">  <Link to="/login" className="login-link">Join the waitlist</Link> </div>*/}
</div>


    </div>
    <LandingSection/>
    </div>
  

  );
};

export default Landing;
