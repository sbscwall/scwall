import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "@/pages/landing";
import Questionnaire from "@/pages/questionnaire"; 
import Profile from "@/pages/profile"; 
import Explore from "@/pages/explore"; 
import PropertyGrid from "@/pages/propertygrid"; 
import Portfolio from "@/pages/portfolio"; 
import Objective from "@/pages/objective"; 
import Waitemail from "@/pages/waitemail"; 
import WaitemailExplore from "@/pages/waitemailexplore"; 
import Waitemailaccount from "@/pages/waitemailaccount"; 
import Waitemailsoon from "@/pages/waitemailsoon"; 
import Thankyou from "@/pages/thankyou"; 
import ThankyouExplore from "@/pages/thankyouexplore"; 
import DataEeditPage from "@/pages/dataedit"; 
import ScrollToTop from "@/components/error/scrolltop";
import AboutUs from "@/pages/aboutus";
import Terms from "@/pages/adminpages/terms";
import Privacy from "@/pages/adminpages/privacy";
import Faq from "@/pages/adminpages/faq";
import Contact from "@/pages/adminpages/contact";
import FakeDoor from "@/pages/fakedoor";
import HangTightAnimation from "@/pages/hangtightanimation";
import PageViewTracker from "@/analytics/pageviewtracker"; //for analytics







const AppRouter = () => {

  return (
<>
  
    <ScrollToTop />
    <PageViewTracker /> 
    <Routes>
    <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />

        <Route path="/" element={<Landing />} />
        <Route path="/question/:id" element={<Questionnaire />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/explore" element={<Explore />} />
        <Route path="/grid" element={<PropertyGrid />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/objective" element={<Objective />} />
        <Route path="/hangtightanimation" element={<HangTightAnimation />} />
        <Route path="/door" element={<FakeDoor />} />
        <Route path="/waitemail" element={<Waitemail />} />
        <Route path="/waitemailexplore" element={<WaitemailExplore />} />
        <Route path="/waitemailaccount" element={<Waitemailaccount />} /> {/*page to inform the log in not being available*/}
        <Route path="/waitemailsoon" element={<Waitemailsoon />} /> {/*page to inform of a feature not being available*/}
        <Route path="/thankyou" element={<Thankyou />} /> {/*page to say thank you after entering email*/}
        <Route path="/thankyouexplore" element={<ThankyouExplore />} /> {/*page to say thank you after entering email and before explore page*/}
        <Route path="/dataedit/:propertyId" element={<DataEeditPage />} /> {/*page to let the user edit all eligible data*/}
    </Routes>
    </>
  );

}

export default AppRouter;

