import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "@/css/global.css";
import "@/css/questionnaire.css";


const transitionReplies = {

  1: {
    "🌱 Nope, total beginner": name => `You won't be soon, ${name}! Scwall shows you what each property could do for your wealth, before you even invest`,
    "🔑 Once or twice, testing the waters": name => `Time to go deeper, ${name}! Every Scwall listing includes a full wealth impact simulation. No guesswork needed`,
    "🏢 Yep, got a few properties already": name => `You’re ready to scale, ${name}! Scwall lets you compare wealth-building potential across every property you review`,
    "💼 Pro here. Show me advanced stuff": name => `Advanced mode unlocked, ${name}! Scwall simulates equity growth, cash-on-cash return, and long-term net worth per property`
  },
  2: {
    "💸 I want regular income": () => `Nice choice! Scwall will show you the best passive income opportunities with stable cash flow thanks to 200+ data points`,
    "🏠 Long-Term Wealth. I’m building a legacy": () => `Great call! Building long-term wealth is all about steady growth and smart decisions. Scwall analyzes market long term appreciation for each deal`,
    "🏃 A bit of both": () => `That’s our sweet spot. Scwall will show you a mix of opportunities to help you build both short-term and long-term wealth`,
    "🤔 I’m still figuring it out": () => `No worries! Scwall’s got your back. We’ll guide you through every step of the investment process`
  },
  3: {
    "🏚 Under $50k": name => `Small budget, smart approach ${name}! Scwall shows you how even small deals can build big wealth, all tracked in your personalized dashboard.`,
    "🏘 Between $50k–$200k": name => `Solid zone to scale up ${name}! Scwall visualizes your portfolio growth live, so every dollar works harder.`,
    "🏢 over $200k": name => `Big moves ahead ${name}! Scwall shows your impact with growth projections right from your dashboard.`,
    "🤑 Sky’s the limit!": name => `You think big ${name}, we like that! Your Scwall dashboard will track how your empire builds, in one click.`
  },
  4: {
    "🐢 Low risk, safe investments first": () => `We love steady. Scwall provides full risk scoring but don't forget every investment includes some risks`,
    "🦥 I’m okay with some risk": () => `You’re open to some risk for better rewards, and that’s a balanced approach! With Scwall, we’ll show you properties that provide solid returns without putting you at unnecessary risk`,
    "⚡ I like a bit of thrill": () => `You like a bit of excitement, and we get that! High-risk investments can lead to big rewards, but it’s important to stay informed`,
    "🔥 Bring on the high stakes": () => `You’re ready for the big risks, and Scwall is here to back you up. We’ll give you access to the highest-stakes deals, but remember, high rewards come with their share of risks`
  },
  
};

const questions = [

  { id: 1, text: () => "Have you ever invested in real estate before?", options: [
    "🌱 Nope, total beginner",
    "🔑 Once or twice, testing the waters",
    "🏢 Yep, got a few properties already",
    "💼 Pro here. Show me advanced stuff"
  ]
},
{ id: 2, text: () => "What's your investment goal?", options: [
  "💸 I want regular income",
  "🏠 Long-Term Wealth. I’m building a legacy",
  "🏃 A bit of both",
  "🤔 I’m still figuring it out"
]
},
  { id: 3, text: () => "How much cash are you thinking of putting in?", options: [
      "🏚 Under $50k",
      "🏘 Between $50k–$200k",
      "🏢 over $200k",
      "🤑 Sky’s the limit!"
    ]
  },
  { id: 4, text: () => "How do you feel about risk when it comes to investing?", options: [
    "🐢 Low risk, safe investments first",
    "🦥 I’m okay with some risk",
    "⚡ I like a bit of thrill",
    "🔥 Bring on the high stakes"
  ]
},

];


const QuestionnaireFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionIndex = isNaN(parseInt(id)) ? 1 : parseInt(id); // Set the starting question to 1
  const [answers, setAnswers] = useState({});
  const [inputName, setInputName] = useState("");
  const [name, setName] = useState("");
  const [showTransition, setShowTransition] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState(""); //manage transitions screens between questions
  const [fadeOut, setFadeOut] = useState(false);
  const [inputZip, setInputZip] = useState(""); // Store the zip code input
  const [nextPath, setNextPath] = useState("/question/1");   //set that the next page after the intro page "what's your name" is question 1 page


  //PART TO HANDLE QUESTIONS THAT REQUIRE AN INPUT FORM
  //ask the name to the user and store it for further purpose, or use "investor" by default
  const handleNameSubmit = () => {
    const nameToUse = inputName.trim() || "Investor";
    setFadeOut(true);
    setTimeout(() => {
      setName(nameToUse);
      localStorage.setItem("userName", nameToUse);
      setTransitionMessage(`Nice to meet you, ${nameToUse}! Let's get to know you.`);
      setNextPath("/question/1");
      setShowTransition(true);
    }, 400);
  };

    //retrieve user name to use it in answers
    const handleSelect = (questionId, option) => {
      const updatedAnswers = { ...answers, [questionId]: option };
      setAnswers(updatedAnswers);
      localStorage.setItem("userAnswers", JSON.stringify(updatedAnswers));
  
      const replyFn = transitionReplies[questionId]?.[option];
      const message = typeof replyFn === "function" ? replyFn(name) : replyFn;
  
      if (message) {
        setShowTransition(true);
        setTransitionMessage(message);
      
        if (questionId < questions.length) {
          setNextPath(`/question/${questionId + 1}`);
        } else if (questionId === questions.length) {
          setNextPath("/question/6"); // Go to zip code input
        } else {
          setTransitionMessage("Hang tight...");
          setNextPath("/profile");
        }
      }
    };

    const handleZipSubmit = () => {
      const zipToUse = inputZip.trim();
      if (!zipToUse) {
        alert("Please enter a valid zip code.");
        return;
      }
      setFadeOut(true);
      setTimeout(() => {
        localStorage.setItem("userZip", zipToUse);
        setTransitionMessage("Hang tight while we retrieve your investor profile");
        setNextPath("/profile");
        setShowTransition(true);
        setFadeOut(false); 
      }, 400);
    };

    

// SKIP PART HANDLING
  
// Display the transition screen each time user clicks skip
  const handleSkip = () => {
    setTransitionMessage(`We understand time is precious! Feel free to skip ahead or complete the questionnaire to get tailored insights`);
    //setIsSkipTransition(true); // Mark this as a skip transition
    setShowTransition(true);
     setNextPath(`/question/${questionIndex + 1}`);
  };
  
    // Function for skipping the entire questionnaire
    const handleSkipAll = () => {
      setTransitionMessage('We understand! We are preparing your objectives');
      //setIsSkipTransition(false); // Reset isSkipTransition when navigating away
      setShowTransition(true);
      setNextPath("/objective"); // Or the next page you want to navigate to
    };
  




  //animation for transition-screen between 2 questions: either it switches to next question after user clic or 5sec
  useEffect(() => {
    if (showTransition && transitionMessage) {
      document.body.classList.add("transition-active");
      const isFinalTransition = transitionMessage.toLowerCase().includes("hang tight");
      const auto = setTimeout(() => {
        setShowTransition(false);
        navigate(nextPath);
      }, isFinalTransition ? 3000 : 5000);

      const handleClick = (e) => {
        if (!isFinalTransition && e.target.closest(".transition-screen")) {
          clearTimeout(auto);
          setShowTransition(false);
          navigate(nextPath);
        }
      };

      document.addEventListener("click", handleClick);
      return () => {
        clearTimeout(auto);
        document.removeEventListener("click", handleClick);
      };
    }
  }, [showTransition, transitionMessage, nextPath, navigate]);

  if (showTransition && transitionMessage) {
   
    const isFinal = transitionMessage.toLowerCase().includes("hang tight");
    return (
      <div className="transition-screen fade-in">
        {isFinal ? (
          <>
            <div className="processing-icon" />
            <p className="question-text">{transitionMessage}</p>
          </>
        ) : (
          <>
            <p className="question-text">{transitionMessage}</p>
            <div className="transition-hint">Click anywhere to continue...</div>
          </>
        )}
      </div>
    );
  }

  


 // Question 1
  if (questionIndex === 0 && !showTransition) {
    return (
      <div className="page-container">
      <div className={`question-container fade-in ${fadeOut ? "fade-out" : ""}`}> 
        <p className="question-text">Welcome to Scwall! </p>
        <p className="question-text">How should I call you?</p>
        <Input
          className="option-button"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Type your name..."
        />
        <div className="questionnaire-button">
          <Button className="cta-button" onClick={handleNameSubmit}>
            Continue
          </Button>
          <button className="skip-link" onClick={handleNameSubmit}>Just call me Investor</button>
        </div>
      </div>
      </div>
    );
  }


  // Zip code question page
  if (questionIndex === 6) { // This should be the final question before profile
    return (
      <div className="page-container">
        <div className={`question-container fade-in }`}>
          <p className="question-text">And last question, {name}! What's your zip code?</p>
          <Input
            className="option-button"
            value={inputZip}
            onChange={(e) => setInputZip(e.target.value)}
            placeholder="Enter your zip code"
            maxLength={5} // Optional: limit to standard 5-digit zip code
          
          />
          <div className="questionnaire-button">
            <Button className="cta-button" onClick={handleZipSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
 
    );
  }

  const currentQuestion = questions[questionIndex - 1];



if (currentQuestion) {
  return (
    <div className="page-container">
      <div className="questionnaire-header">
        {/* Back Arrow Button */}
        {questionIndex > 1 && (
          <button
            className="back-button"
            onClick={() => navigate(questionIndex > 1 ? `/question/${questionIndex - 1}` : "/question/0")}
          >
            <AiOutlineArrowLeft size={20} />
          </button>
        )}
          <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${((questionIndex) / questions.length) * 100}%` }}></div>
        </div>
      </div>
      <div className="question-container fade-in">
        <p className="question-text">{typeof currentQuestion.text === "function" ? currentQuestion.text(name) : currentQuestion.text}</p>
        <div className="option-list">
          {currentQuestion.options.map((option, index) => (
            <Button key={index} className="option-button" onClick={() => handleSelect(currentQuestion.id, option)}>{option}</Button>
          ))}
        </div>
        <button className="skip-link" onClick={handleSkip}>skip this question</button>
        <button className="skip-all-link" onClick={handleSkipAll}>Skip the whole questionnaire</button>
      </div>
    </div>
  );
}

// Default case, in case there are issues
return <div>Something went wrong. Please try again later.</div>;
};

export default QuestionnaireFlow;
