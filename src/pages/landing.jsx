import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; 
import LandingSection from "@/components/ui/landingsection";
import "../css/global.css";
import "../css/landing.css";
import posthog from "@/analytics";

const Landing = () => {

//analytics
  // 1. Track landing page load
  useEffect(() => {
    posthog.capture("Visited_Landing");
  }, []);

  // 2. Track sign up click
  const handleSignupClick = () => {
    posthog.capture("Clicked_Signup");
    navigate("/waitemail");
  };

  // 3. Track "Try Scwall Features" click
  const handleTryFeatures = () => {
    posthog.capture("Started_Onboarding", { entry: "Landing_Try_Button" });
    navigate("/question/0");
  };



  const navigate = useNavigate();


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
<Button className="button-start" onClick={handleSignupClick}>
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
