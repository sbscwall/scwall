// src/pages/FaqPage.js
import React from "react";
import Footer from "@/components/footer"; 
import "@/css/adminpage.css"; 
import "@/css/global.css"; 

const Faq = () => {
  return (
    <div className="page-container">
         <div className="admin-page">
      <h1>Frequently Asked Questions (FAQ)</h1>

      <section className="detail-section">
        <h2>1. What is Scwall?</h2>
        <p>Scwall is an AI-powered platform that aims to help real estate investors make informed decisions. Currently, we are in the early stages of development, and by signing up, you're gaining early access to Scwall’s features as we finalize the platform.</p>
      </section>

      <section className="detail-section">
        <h2>2. How do I sign up for Scwall?</h2>
        <p>At this stage, Scwall is in **beta mode**.To sign up for Scwall, simply enter your email address and join our waitlist. As we finalize the platform, we’ll notify you when Scwall is ready for full use, and you'll be among the first to experience the platform.</p>
      </section>

      <section className="detail-section">
        <h2>3. Is Scwall free to use?</h2>
        <p>At this stage, Scwall is in **beta mode** and is available to users on a **waitlist basis**. While we are working on our pricing model, we will offer both free and premium plans once the full platform is live. Stay tuned for more details!</p>
      </section>

      <section className="detail-section">
        <h2>4. How does Scwall generate investment recommendations?</h2>
        <p>Scwall uses extremely detailed algorithms and AI to analyze real estate data and provide property recommendations. Currently, these recommendations are in the **testing phase**. As we improve the platform, the AI will get better at offering personalized investment insights tailored to your goals.</p>
      </section>

      <section className="detail-section">
        <h2>5. How secure is my data on Scwall?</h2>
        <p>Your privacy and security are our top priorities. Scwall uses industry-standard encryption to protect your personal data. For more details, you can read our <a href="/privacy" target="_blank">Privacy Policy</a> and <a href="/terms" target="_blank">Terms & Conditions</a>.</p>
      </section>

      <section className="detail-section">
        <h2>6. Can I cancel my account or subscription?</h2>
        <p>As we’re currently in **beta mode**, no payments have been processed yet. When the platform becomes available, you'll be able to manage your account and subscription settings. For now, you can simply unsubscribe from updates if you wish to opt-out.</p>
      </section>

      <section className="detail-section">
        <h2>7. How can I contact Scwall support?</h2>
        <p>If you have any questions or need assistance, you can contact us via email at <a href="mailto:support@scwall.com">support@scwall.com</a>. Our support system is in development, but we’re happy to assist you with any inquiries during this early access phase.</p>
      </section>

      <section className="detail-section">
        <h2>8. Can I use Scwall on mobile devices?</h2>
        <p>Yes! Scwall is fully optimized for mobile use, so you can access it from your smartphone or tablet and manage your investments on the go. Some features may not be fully available yet, but we are working on refining the experience.</p>
      </section>

      <section className="detail-section">
        <h2>9. How can I change my investment goals?</h2>
        <p>Currently, you can set basic investment preferences when you sign up. As we refine the platform, you’ll be able to update your investment goals directly within the platform. This feature will be fully available when Scwall is fully launched.</p>
      </section>

      <section className="detail-section">
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
        <p>Email: <a href="mailto:support@scwall.com">support@scwall.com</a></p>

      </section>
      </div>
       <Footer />  {/* Footer at the bottom */} 
    </div>
  );
};

export default Faq;
