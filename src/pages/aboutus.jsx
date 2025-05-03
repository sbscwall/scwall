// src/pages/AboutPage.js
import React from 'react';
import "../css/aboutus.css"; 
import "../css/global.css"; 
import teamImg from "@/assets/team.jpg";
import { Button } from "@/components/ui/button"; 

const AboutUs = () => {
  return (
    <div className="page-container">
    <div className="about-page">
      <h1>Our Story</h1>

      <section className="about-section">
        <h2>How Scwall Was Born</h2>
        <p>
          Hi, I’m Sonia, the founder of Scwall. What started as a
          personal investment tool using just an Excel sheet quickly grew into
          something I couldn’t live without. Over time, I refined my methods, and
          soon my friends started asking for advice on property valuations, even
          if they weren’t planning to invest. That’s when I realized there was a
          real need for a tool to simplify property analysis for everyone.
        </p>

        <p>
          Scwall was born out of this realization: a platform that makes real
          estate investment more accessible and data-driven. Our goal is to
          empower investors to make smarter, more informed decisions.
        </p>
      </section>

 <img className="team-image" src={teamImg} />   

      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          Scwall aims to provide AI-driven insights and powerful tools to
          help investors make the best decisions. Our mission is to simplify
          the real estate investment process, from property analysis to
          personalized recommendations. We believe that everyone, regardless
          of experience, should have access to professional-grade investment
          tools.
        </p>
      </section>

      <section className="cta-section">
        <h3>Ready to Get Started?</h3>
        <p>Join the waitlist and be among the first to experience Scwall!</p>
        <Button className="cta-button">Join the Waitlist</Button>
      </section>
    </div>
    </div>
  );
};

export default AboutUs;
