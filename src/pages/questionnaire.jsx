import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "@/css/global.css";
import "@/css/questionnaire.css";
import posthog from "@/analytics";

//answer to questions with personalized responses
const transitionReplies = {
  1: {
    "🌱 Nope, total beginner": name => `You won't be soon, ${name}! Scwall shows you what each property could do for your wealth, before you even invest`,
    "🔑 Once or twice, testing the waters": name => `Time to go deeper, ${name}! Every Scwall listing includes a full wealth impact simulation. No guesswork needed`,
    "🏢 Yep, got a few properties already": name => `You’re ready to scale, ${name}! Scwall lets you compare wealth-building potential across every property you review`,
    "💼 Pro here. Show me advanced stuff": name => `Advanced mode unlocked, ${name}! Scwall simulates equity growth, cash-on-cash return, and long-term net worth per property`
  },
  2: {
    "🏚 Under $40k": name => `Smart approach ${name}! Scwall shows you how even small deals can build big wealth, all tracked in your personalized dashboard.`,
    "🏘 Between $40k–$80k": name => `Solid zone to scale up ${name}! Scwall visualizes your portfolio growth live, so every dollar works harder.`,
    "🏢 Between $81k–$130k": name => `Big moves ahead ${name}! Scwall shows your impact with growth projections right from your dashboard.`,
    "🤑 Above 131k": name => `You think big ${name}, we like that! Your Scwall dashboard will track how your empire builds, in one click.`
  },
  3: {
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
  { id: 2, text: () => "How much cash are you thinking of putting in?", options: [
      "🏚 Under $40k",
      "🏘 Between $40k–$80k",
      "🏢 Between $81k–$130k",
      "🤑 Above 131k"
    ]
  },
  { id: 3, text: () => "How do you feel about risk when it comes to investing?", options: [
    "🐢 Low risk, safe investments first",
    "🦥 I’m okay with some risk",
    "⚡ I like a bit of thrill",
    "🔥 Bring on the high stakes"
  ]
},
 { id: 4, text: () => "What’s your zip code?", options: [], input: true 
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
  const [questionStartTime, setQuestionStartTime] = useState(Date.now()); //analytics time per question


  // Handle the transition for questions
  useEffect(() => {
    if (questionIndex === 0) {
      setFadeOut(false); // Disable fade-out for question 0
    } else {
      setFadeOut(true); // Enable fade-out for other questions
    }

    let isMounted = true;

  if (isMounted && questionIndex > 0) {
    const now = Date.now();
    const duration = Math.floor((now - questionStartTime) / 1000);
    posthog.capture("Question_Duration", {
      questionId: questionIndex,
      seconds: duration,
    });
    setQuestionStartTime(now);
  }

  return () => {
    isMounted = false;
  };
  }, [questionIndex]);



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

// Handle Question Selection
      const handleSelect = (questionId, option) => {
        const updatedAnswers = { ...answers, [questionId]: option };
        setAnswers(updatedAnswers);
        localStorage.setItem("userAnswers", JSON.stringify(updatedAnswers));

        //analytics: track answers
        posthog.capture("Onboarding_Answer", {
          questionId,
          answer: option,
        });
      
        // Handle transition message based on the selected option
        const replyFn = transitionReplies[questionId]?.[option];
        const message = typeof replyFn === "function" ? replyFn(name) : replyFn;
      
        if (message) {
        setShowTransition(true);
        setTransitionMessage(message);

        if (questionId < questions.length+1) {
        setNextPath(`/question/${questionId + 1}`);
        } else {
        setNextPath("/objective"); // Or wherever you need to go after the questionnaire
        }
        }
      };

// Handle Zip Code Submission and Transition
    const handleZipSubmit = () => {
      const zipToUse = inputZip.trim();
      if (!zipToUse) {
        alert("Please enter a valid zip code.");
        return;
      }
      setFadeOut(true);
     // setTimeout(() => {
        localStorage.setItem("userZip", zipToUse);

  // ✅ Analytics: track onboarding end
  posthog.capture("Completed_Onboarding", {
    userZip: zipToUse,
  });


       setTransitionMessage("Thank you, we're almost done, let's set your objectives");
        setNextPath("/objective");
        setShowTransition(true);
    //    setFadeOut(false); 
    //  }, 400);
    };

    
  
// handle skip question
  const handleSkip = () => {

  // ✅ Analytics: track skip questions
    posthog.capture("Skipped_Question", {
      questionId: questionIndex,
    });
    

    setTransitionMessage(`We understand time is precious! Feel free to skip ahead or complete the questionnaire to get tailored insights`);
    //setIsSkipTransition(true); // Mark this as a skip transition
    setShowTransition(true);
    if (questionIndex < questions.length) {
      setNextPath(`/question/${questionIndex + 1}`);
    } else {
      setNextPath("/objective"); 
    }
  };
  
// handle skip entire questionnaire
    const handleSkipAll = () => {

     // ✅ Analytics: track skip questionnaire
     posthog.capture("Skipped_Questionnaire");


      setTransitionMessage('We understand! We are preparing your objectives');
      //setIsSkipTransition(false); // Reset isSkipTransition when navigating away
      setShowTransition(true);
      setNextPath("/objective"); 
    };
  
  //animation for transition-screen between 2 questions: either it switches to next question after user clic or 5sec
  useEffect(() => {
    if (showTransition && transitionMessage) {
      document.body.classList.add("transition-active");
  
      const auto = setTimeout(() => {
        setShowTransition(false);
        navigate(nextPath);  // Navigate to the next question or profile page
      }, 5000); // Set a reasonable duration for the transition screen
  
      const handleClick = (e) => {
        if (e.target.closest(".transition-screen")) {
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
    return (
      <div className="transition-screen fade-in">
            <p className="question-text">{transitionMessage}</p>
            <div className="transition-hint">Click anywhere to continue...</div>
      </div>
    );
  }


 // Question 1
  if (questionIndex === 0 && !showTransition) {
    return (
      <div className="page-container">
      <div className={`question-container fade-in ${fadeOut ? "fade-out" : ""}`}> 
        <p className="question-text">Welcome to Scwall!</p>
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
  if (questionIndex === 4) { 
    return (
      <div className="page-container">
      <div className="questionnaire-header">
        {/* Back Arrow Button */}
        {questionIndex > 0 && (
          <button
            className="back-button"
            onClick={() => navigate(`/question/${questionIndex - 1}`)} // Navigate to previous question dynamically
          >
            <AiOutlineArrowLeft size={20} />
          </button>
        )}
          <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${((questionIndex) / questions.length) * 100}%` }}></div>
        </div>
      </div>



      <div className={`question-container fade-in`}>
          <p className="question-text"> What's your zip code?</p>
          <Input
            className="option-button"
            value={inputZip}
            onChange={(e) => setInputZip(e.target.value)}
            placeholder="Enter your zip code"
            maxLength={5} // Optional: limit to standard 5-digit zip code
            type="tel" // Use 'tel' to enable numeric keypad on mobile
            inputMode="numeric" // Forces the numeric keypad on mobile devices
            pattern="[0-9]{5}"// Ensures only 5 numbers can be entered (validation for mobile and desktop)
            onInput={(e) => {
              // Optional: Automatically limits input to 5 characters and ensures only digits
              e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
              setInputZip(e.target.value);
            }}
          />

          <div className="questionnaire-button">
            <Button className="cta-button" onClick={handleZipSubmit}>
              Continue
            </Button>
          </div>
          <button className="skip-link" onClick={handleSkip}>skip this question</button>
        <button className="skip-all-link" onClick={handleSkipAll}>Skip the whole questionnaire</button>
    
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
        {questionIndex > 0 && (
          <button
            className="back-button"
            onClick={() => navigate(`/question/${questionIndex - 1}`)} // Navigate to previous question dynamically
          >
            <AiOutlineArrowLeft size={20} />
          </button>
        )}
          <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${((questionIndex) / questions.length) * 100}%` }}></div>
        </div>
      </div>
      <div className={`question-container fade-in`}>
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
