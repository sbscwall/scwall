import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import '@/css/fakedoor.css';  
import '@/css/global.css';  


const FakeDoor = () => {
    const navigate = useNavigate();
    const [startTransitionExplore, setStartTransitionExplore] = useState(false); //for a nice animation before the explore page appears
    const [isNavigatingToWaitlist, setIsNavigatingToWaitlist] = useState(false); // Flag to handle waitlist navigation

    const handleJoinWaitlist = () => {
      setIsNavigatingToWaitlist(true); // Set flag to prevent transition
      navigate("/waitemail"); // Navigate to the waitlist page immediately
    };
  
    const handleExplorePage = () => {
        setStartTransitionExplore(true); // triggers fade-out class
        setTimeout(() => {
          navigate('/explore');
        }, 1000); // 1s fade duration
      };

  return (
    <div className="page-container">
        <div className={`waitlist-container ${startTransitionExplore && !isNavigatingToWaitlist ? "fade-out" : ""}`}>
                 <div className="waitlist-header">
        <h2>Almost There! Unlock Your Personalized Scwall Experience</h2>
      </div>

      <div className="waitlist-body">
        <p className="intro-text">
          Take a sneak peek at sample properties and get a feel for Scwall’s features. These are just examples, but the full experience is waiting for you!
        </p>

        <div className="waitlist-info">
          <h2>Why Join the Waitlist?</h2>
          <ul>
            <li>Scwall is growing, and we’re working hard to deliver the most personalized real estate investment tools just for you.</li>
            <li>Join the waitlist now to be the first to experience tailored property recommendations, data-driven insights, and all the powerful tools Scwall has to offer.</li>
            <li>Be part of the exclusive group that gets early access to smarter, easier property investment—designed for you.</li>
          </ul>
        </div>

        <div className="teaser-section">
          <h3>Here’s a preview of what’s to come!</h3>
          <div className="sample-properties">
            {/* Sample Property 1 */}
            <div className="property-example">
              <img src="/path-to-sample-image1.jpg" alt="Sample Property 1" />
            </div>
            {/* Sample Property 2 */}
            <div className="property-example">
              <img src="/path-to-sample-image2.jpg" alt="Sample Property 2" />
            </div>
          </div>
        </div>

        <div className="cta-buttons">
          <Button className="cta-button" onClick={handleJoinWaitlist}>
            Join the Waitlist Now
            </Button>

            <Button className="optional-link" onClick={handleExplorePage}> 
            Skip for now
            </Button>


 
        </div>
      </div>

    </div>
    </div>
  );
}

export default FakeDoor;
