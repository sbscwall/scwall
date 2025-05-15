import React from 'react';
import { MdEmail } from 'react-icons/md'; // Envelope icon
import { MdCheckCircle } from 'react-icons/md'; // Checkmark icon
import "@/css/waitemail.css";
import "@/css/global.css";


const Thankyou = () => {
    return (
        <div className="page-container">
        <div className="thank-you-page">
           
                <h1 className="thank-you-title">Thank You for Signing Up!</h1>
                <p className="thank-you-message">You’re officially on the list. We can’t wait to have you on board!</p>

                <div style={{ fontSize: '70px', display: 'inline-flex', alignItems: 'center' }}>
      <MdEmail style={{ marginRight: '8px' }} /> {/* Envelope icon */}
      <MdCheckCircle style={{ color: 'green' }} /> {/* Checkmark icon */}
    </div>

                <div className="what-happens-next">
                    <h2 className="next-steps-title">What Happens Next?</h2>
                    <ol>
                        <li>We’ll notify you to start using Scwall!</li>
                        <li>In the meantime, you’ll get sneak peeks, updates, and early access to exclusive features.</li>
                    </ol>
                </div>

                <a href="/explore" className="info-button">Back to Explore</a>
            </div>
        </div>
    );
};

export default Thankyou;

