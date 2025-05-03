// src/pages/adminpagesPrivacyPage.jsx

import React from "react";
import Footer from "@/components/footer"; 
import {Link} from "react-router-dom";
import "@/css/adminpage.css"; 
import "@/css/global.css"; 

const Privacy = () => {
  return (
    <div className="page-container">
        <div className="admin-page">
      <h1>Privacy Policy</h1>
      <p>Last updated: 04/30/2025</p>
      <p>Your privacy is very important to us. This privacy policy document outlines the types of personal information that is collected and recorded by Scwall and how we use it.</p>

      <section className="detail-section">
        <h2>1. Information We Collect</h2>
        <p>We collect various types of personal information to provide and improve our services. The information we collect includes:</p>
        <ul>
          <li><strong>Personal Information:</strong> This includes your name, email address, and other identifying information you provide when creating an account or interacting with the platform.</li>
          <li><strong>Usage Data:</strong> We collect data on how you interact with our platform, including the pages you visit, search queries, and actions you take.</li>
          <li><strong>Device Information:</strong> We collect information about the device you use to access our platform, including your device type, operating system, IP address, and browser type.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to track user behavior and improve your experience on our website. Cookies are small files stored on your device that help us remember your preferences and personalize content.</li>
        </ul>
      </section>

      <section className="detail-section">
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including:</p>
        <ul>
          <li>Providing, maintaining, and improving our platform and services.</li>
          <li>Personalizing content and providing recommendations based on your activity.</li>
          <li>Communicating with you, including sending emails or notifications related to your account, updates, or promotions.</li>
          <li>Analyzing usage data to improve the user experience and identify trends.</li>
          <li>Complying with legal obligations and protecting the security of our platform and users.</li>
        </ul>
      </section>

      <section className="detail-section">
        <h2>3. Sharing Your Information</h2>
        <p>We do not sell, rent, or trade your personal information. </p>
       
       {/* <ul>
          <li><strong>However, we may share your data in the following situations:Service Providers:</strong> We may share your information with third-party service providers who assist us in providing and improving the platform (e.g., payment processors, hosting providers, email service providers).</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to a valid legal request (e.g., a court order or government investigation).</li>
          <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of the transaction.</li>
        </ul> */}
      </section>

      <section className="detail-section">
        <h2>4. Data Security</h2>
        <p>We take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
      </section>

      <section className="detail-section">
        <h2>5. Your Privacy Rights</h2>
        <p>Depending on your location, you may have the following rights regarding your personal information:</p>
        <ul>
          <li><strong>Access:</strong> You have the right to request access to the personal information we hold about you.</li>
          <li><strong>Correction:</strong> You have the right to request that we correct any inaccuracies in your personal information.</li>
          <li><strong>Deletion:</strong> You have the right to request the deletion of your personal information, subject to certain legal exceptions.</li>
          <li><strong>Opt-Out:</strong> You can opt-out of receiving marketing emails from us by following the unsubscribe instructions in the emails or by contacting us directly.</li>
        </ul>
        <p>If you wish to exercise any of these rights, please contact us at <a href="mailto:support@scwall.com">support@scwall.com</a>.</p>
      </section>

      <section className="detail-section">
        <h2>6. Cookies and Tracking Technologies</h2>
        <p>We use cookies and other tracking technologies to collect data about your browsing activities on our platform. You can control the use of cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of the platform.</p>
      </section>

      <section className="detail-section">
        <h2>7. International Data Transfers</h2>
        <p>If you are located outside of [Your Country/Region], please be aware that your personal information may be transferred to and processed in a country different from your own. By using our platform, you consent to the transfer of your data to other countries, including those that may not have data protection laws equivalent to those in your jurisdiction.</p>
      </section>

      <section className="detail-section">
        <h2>8. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page, and we will update the "Last updated" date at the top of the page. Please review this Privacy Policy periodically for any updates.</p>
      </section>

      <section className="detail-section">
        <h2>9. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
        <p>Email: <a href="mailto:support@scwall.com">support@scwall.com</a></p>

      </section>
      </div>
      <Footer />  {/* Footer at the bottom */} 
  
    </div>
  );
};

export default Privacy;
