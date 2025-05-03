import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import LandingSection from "@/components/ui/landingsection";
import "../css/global.css";
import "../css/landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
    <div className="landing-container">

<div className="catching-section">
    <h1 className="catching-phrase">We crack the code.</h1>
    <h1 className="catching-phrase">You build the wealth.</h1>
</div>

<div className="value-prop"> 
    <h5 className="value-phrase">  Invest in real estate like a pro, without being one.  </h5>
    <h5 className="value-phrase">  Scwall gives you confidence at every step. </h5>
    <h5 className="value-phrase"> Like having a top-tier advisor, without the calls or the costs </h5>
</div>

<div className="cta-section"> 
<Button className="button-start" onClick={() => navigate("/waitemail")}>
Get early access 
</Button>

 <Link to="/question/0" className="info-button"> Try Scwall features before everyone </Link> 
 </div>

<div className="wait-section"> 
  <div className="wait-phrase"> Limited early access only</div>
<div className="urgent-phrase"> Join 3200+ early investors</div>
{/*  <div className="wait-CTA">  <Link to="/login" className="login-link">Join the waitlist</Link> </div>*/}
</div>


    </div>
    <LandingSection/>
    </div>
  

  );
};

export default Landing;
