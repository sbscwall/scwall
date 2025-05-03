// src/pages/TermsPage.js
import React from "react";
import Footer from "@/components/footer"; 
import "@/css/adminpage.css"; 
import "@/css/global.css"; 

const Terms = () => {
    return (
        <div className="page-container">
          <div className="admin-page">
          <h1>Terms and Conditions</h1>
          <p>Last updated: 04/30/2025</p>
          <p>Welcome to Scwall! These Terms and Conditions govern your use of our website and services. By using our services, you agree to these terms.</p>
    
          <section className="detail-section">
            <h2>1. Introduction</h2>
            <p>These Terms and Conditions ("Terms", "Agreement") govern your use of Scwall ("Service", "Website", "we", "us", or "our"). By accessing or using the Service, you agree to comply with these Terms and Conditions.</p>
          </section>
    
          <section className="detail-section">
        <h2>2. Financial Services Disclaimer</h2>
        <p>Scwall provides a platform for real estate investment analysis, including property recommendations, market insights, and financial metrics. However, **Scwall is not a registered financial advisor**, and the information provided on the platform is for **general informational purposes only**. The services and content offered do not constitute personalized financial advice, investment advice, or a recommendation of any investment strategy or product.</p>
        <p>**We do not offer investment advice** or endorse any specific properties, deals, or financial instruments. Any decision to buy, sell, or hold properties, or engage in any other financial actions based on information provided on Scwall, is the sole responsibility of the user. We strongly recommend consulting with a qualified financial advisor before making any investment decisions.</p>
        <p>**No Liability**: Scwall, its affiliates, and its employees will not be held responsible for any losses or damages arising from the use of information on the platform or the decisions made based on such information.</p>
      </section>

          <section className="detail-section">
            <h2>3. User Responsibilities</h2>
            <p>As a user of our platform, you are responsible for ensuring that you comply with all applicable laws, regulations, and these Terms. You agree not to:</p>
            <ul>
              <li>Use the platform for illegal purposes or fraudulent activity.</li>
              <li>Attempt to access any part of the Service that is not authorized for use.</li>
              <li>Distribute harmful or disruptive content, including malware or viruses.</li>
            </ul>
          </section>
    
          <section className="detail-section">
            <h2>4. User Account</h2>
            <p>To use certain features of the Service, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
            <p>You agree to immediately notify us of any unauthorized access to or use of your account.</p>
            <p>We reserve the right to suspend or terminate your account at any time, without prior notice, for conduct that violates these Terms or other behaviors that may harm other users or the platform.</p>
            <p>If your account is terminated, your access to certain features may be restricted, and any data associated with your account may be deleted, in accordance with our Privacy Policy.</p>
          </section>
    
          <section className="detail-section">
            <h2>5. Privacy Policy</h2>
            <p>We value your privacy. Please review our <a href="/privacy" target="_blank">Privacy Policy</a> to understand how we collect, use, and protect your personal data.</p>
          </section>
    
          <section className="detail-section">
            <h2>6. Changes to These Terms</h2>
            <p>We may update or revise these Terms at any time. Any changes will be posted on this page, and the date of the update will be reflected at the top of this page.</p>
            <p>By continuing to use the Service after any updates to these Terms, you agree to the revised terms.</p>
          </section>
    
          <section className="detail-section">
            <h2>7. Disclaimers and Limitation of Liability</h2>
            <p>Our Service is provided "as is" and we do not warrant that it will be free from errors, interruptions, or defects. We are not liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of the Service.</p>
          </section>
    
          <section className="detail-section">
            <h2>8. Governing Law</h2>
            <p>These Terms are governed by and construed in accordance with the laws of the United States, without regard to its conflict of law principles.</p>
          </section>
    
          <section className="detail-section">
            <h2>9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@scwall.com">support@scwall.com</a> or by filling <a href="/contact" target="_blank">this form</a>.</p>
          </section>
          </div>
<Footer />  {/* Footer at the bottom */} 

        </div>
      );
    };

export default Terms;
