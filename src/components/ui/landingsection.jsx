import React, { useRef, useEffect } from "react";
import '../../css/landingsection.css';
import '../../css/global.css';
import { Button } from "@/components/ui/button"; 
import { Link, useNavigate } from "react-router-dom";
import bestDealImg from '../../assets/landing_img/bestdeal.jpg';
import portfolioImg from '../../assets/landing_img/portfolio.jpg';
import wealthProjectionGIF from '../../assets/landing_img/wealth-projection.jpg';
import stepObjectiveImg from "../../assets/landing_img/objectives.jpg";
import stepQuestionsImg from "../../assets/landing_img/question.jpg";
import founderImg from "../../assets/founder.jpg";
import Footer from "@/components/footer"; 


const LandingSection = () => {

  const navigate=useNavigate(); //to navigate to other pages

    {/* to define the sliders in section2 */}
    const scrollRef = useRef(null);
    const scrollRef2 = useRef(null);

    useEffect(() => {
        const ref = scrollRef.current;
        const ref2 = scrollRef2.current;
        const handleScroll = () => {};
        if (ref) {
            ref.addEventListener("scroll", handleScroll);
          return () => ref.removeEventListener("scroll", handleScroll );
        }
        if (ref2) {
            ref2.addEventListener("scroll", handleScroll);
          return () => ref.removeEventListener("scroll", handleScroll );
        }
      });

  return (

    <div className="landing-section-container">

  {/* Social proof section 1 */}

<section className="testimonials-section">
        <h2> What Users Are Saying </h2>
        <div className="testimonials">
              {/* Testimonial 1 */}
            <div className="testimonial">
                <div className="testimonial-content">
                    <p className="quote">“I’ve tried a few real estate tools, but none of them provide the personalized insights like Scwall. This is the future of investing!”</p>
                </div>
                <div className="testimonial-author">
                    <p className="author-name">Brad M.</p>
                    <p className="author-title"> HR manager </p>
                </div>
            </div>
            {/* Testimonial 2 */}
            <div className="testimonial">
                <div className="testimonial-content">
                    <p className="quote">“Scwall helped me identify better investments in just one week of testing! Can’t wait to see it live!”</p>
                </div>
                <div className="testimonial-author">
                    <p className="author-name">Christina D.</p>
                    <p className="author-title">Sales representative</p>
                </div>
            </div>
        </div>

</section>


      {/* Section 2: How It Works */}
      <section className="how-it-works">
        <h2>Your guided path to smarter real estate investments</h2>

          <div className="step">
              <h3 className="text-block">We personalize the research</h3>

        <div className="card-scroll-container" ref={scrollRef}>
        <div className="slider-card">
          <h3>🎯 Set your wealth goals</h3>
          <p>
            Want to boost your net worth by $100K in 3 years?
            Start by defining what success looks like for you
          </p>
          <img src={stepObjectiveImg} alt="Set objectives" />
        </div>

        <div className="slider-card">
          <h3>🧠 We Tailor the Experience</h3>
          <p>
            Answer a few quick questions. We’ll personalize everything to your
            risk tolerance, experience, and timeline.
          </p>
          <img src={stepQuestionsImg} alt="Answer questions" />
        </div>
        </div>
  </div>
  <Button className="button-start" onClick={() => navigate("/waitemail")}>
          Get Early Access 
          </Button>
  </section>


{/* Social proof section 2 */}
        <section className="testimonials-section">

        <h2> What Professionals Are Saying </h2>
        <div className="testimonials">
              {/* Testimonial 1 */}
            <div className="testimonial">
                <div className="testimonial-content">
                    <p className="quote">“Scwall is poised to disrupt real estate investment with its journey approach.” </p>
                </div>
                <div className="testimonial-author">
                    <p className="author-name">Francisco P.</p>
                    <p className="author-title"> Realtor, FL </p>
                </div>
            </div>
            {/* Testimonial 2 */}
            <div className="testimonial">
                <div className="testimonial-content">
                    <p className="quote">“The future of real estate investing is almost here, and the first users will be the ones to reap the rewards. Don’t miss your chance!”</p>
                </div>
                <div className="testimonial-author">
                    <p className="author-name">Scwall Team</p>
                    <p className="author-title"></p>
                </div>
            </div>
        </div>

</section>


  <section className="how-it-works">
      {/* CTA link to try the features */}
      <Link to="/question/0" className="info-button"> Try Scwall features before everyone </Link> 
                  
          <div className="step">
          <h2>Built to save you time Designed to make you confident</h2>
            <div className="text-block">
              <h3>Find the best deals, for you</h3>
              <p>Our engine scores every property based on your preferences and flags what truly deserves attention.</p>
            </div>
            <img src={bestDealImg} alt="Property card recommendation" className="step-image" />
          </div>

          <div className="step">
            <div className="text-block">
              <h3>Simulate your wealth</h3>
              <p>Visualize how each property impacts your future in cash flow, net worth, and goal progress.</p>
            </div>
            <img src={wealthProjectionGIF} alt="Wealth simulation in action" className="step-image" />
          </div>

          <div className="step">
            <div className="text-block">
              <h3>Track your portfolio</h3>
              <p>Stay in control with real-time alerts and performance insights as you grow.</p>
            </div>
            <img src={portfolioImg} alt="Portfolio tracking dashboard" className="step-image" />
          </div>
    </section>

{/* Social proof section 1 */}
<section className="testimonials-section">
    <div className="container">
        <h2 className="section-title"></h2>
        <div className="testimonials">
              {/* Testimonial 1 */}
            <div className="testimonial">
                <div className="testimonial-content">
                    <p className="quote">“Only a limited number of early access spots remain. Join thousands of real estate investors eager to get started.” </p>
                </div>
                <div className="testimonial-author">
                    <p className="author-name">Scwall Team</p>
                    <p className="author-title"> </p>
                </div>
            </div>
        </div>
    </div>
</section>

{/* Section 4: About us */}
      <section className="story-teaser">
        <h2>Our Story</h2>

        <div className="teaser-content">
        <div className="teaser-text">
        <p>
          Hi, I'm Sonia, the founder of Scwall. </p>
          <p>Scwall was born from a simple Excel sheet and a desire to make real
          estate investing smarter. What started as a personal tool quickly
          turned into a platform to help others make better investment decisions.
          <p>Want to learn more about how we got here? </p>
        </p>
        </div>
        <div className="teaser-image">
          <img className="founder-image" src={founderImg} />   
        </div>
        </div>

        <Button className="button-start" onClick={() => navigate("/aboutus")}>
          Read Our Full Story
          </Button>
      </section>
   

      {/* Section 4: Join Early Access */}
      <section className="join-early">
        <h2>The smartest time to start investing was yesterday. The second-best time is now.</h2>
        <h3>Join hundreds of early users getting a smarter real estate experience</h3>
        <h3>Before it opens to everyone</h3>

      </section>

      <Button className="button-start" onClick={() => navigate("/waitemail")}>
         Join the waitlist
        </Button>
      

        <Footer />  {/* Footer at the bottom */} 
    </div>
  );
};

export default LandingSection;
