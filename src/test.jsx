i have a pb with my code. it says React hook is called conditionally... import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "@/css/global.css";
import "@/css/questionnaire.css";

const transitionReplies = {
  1: {
    "🎯 I want to build wealth, but no clue where to start.": name => `Everyone starts somewhere, ${name}! you’re in the right place. Scwall turns 10,000+ properties into your first easy win.`,
    "💸 Looking for passive income (and maybe early retirement?).": name => `Smart move, ${name}! Scwall helps you reach that goal with pre-analyzed, income-generating deals from day one.`,
    "🏠 Dreaming of owning rental properties. Seems cool!": name => `You're speaking our language, ${name}! We’ve already screened 10,000+ properties so you get to skip the overwhelm.`,
    "🤔 Just curious—show me what you’ve got.": name => `Curiosity is where smart investing begins! We’ll show you how Scwall turns data into clarity for over 10,000 deals. No guesswork needed, ${name}`
  },
  2: {
    "🌱 Nope, total beginner.": name => `You won't be soon, ${name}! Scwall shows you what each property could do for your wealth, before you even invest.`,
    "🔑 Once or twice, testing the waters.": name => `Time to go deeper, ${name}! Every Scwall listing includes a full wealth impact simulation. No guesswork needed.`,
    "🏢 Yep, got a few properties already.": name => `You’re ready to scale, ${name}! Scwall lets you compare wealth-building potential across every property you review.`,
    "💼 Pro here—show me advanced stuff.": name => `Advanced mode unlocked, ${name}! Scwall simulates equity growth, cash-on-cash return, and long-term net worth per property.`
  },
  3: {
    "🏚 Let's start small (Under $50k).": () => `Small budget, smart approach! Scwall shows you how even small deals can build big wealth, all tracked in your personalized dashboard.`,
    "🏘 Ready to grow ($50k–$200k).": () => `Solid zone to scale up! Scwall visualizes your portfolio growth live, so every dollar works harder.`,
    "🏢 Let’s go big ($200k+).": () => `Big moves ahead! Scwall shows your impact with growth projections right from your dashboard.`,
    "🤑 Sky’s the limit—show me the good stuff!": () => `You think big, we like that! Your Scwall dashboard will track how your empire builds, in one click.`
  },
  4: {
    "😴 Zero effort. Show me easy money.": name => `Then sit back, ${name}. Scwall filters the market and highlights top deals with smart scoring, so you don’t have to.`,
    "🛠 Hands-on, DIY projects sound fun.": () => `We got you. We give you renovation potential, equity growth, and deep-dive calculators per property.`,
    "🏃 Somewhere in the middle—teach me as I go.": name => `We’ll guide you, ${name}. Use our deal scores and toggle deeper when you’re ready, it’s your pace.`,
    "🤷 No idea, I’m winging it.": name => `No worries, ${name}! Scwall’s scoring system keeps things simple: the best deals float to the top.`
  },
  5: {
    "🦥 The Slow and Steady—patience is profit.": () => `We love steady. Scwall highlights low-risk, long-hold options with full risk scoring.`,
    "🚀 The Hustler—fast flips, fast cash.": () => `Speed mode activated. Scwall shows short-term flip deals and rates them by risk so you stay sharp.`,
    "🐢 The Careful Calculator—show me the safest bets.": () => `Perfect match. Every property comes with a Scwall risk score, so you never buy blind.`,
    "🦄 The Dreamer—big risks, big rewards.": () => `Dream big, but decide smart. Scwall gives you the bold deals — and the full risk picture behind them.`
  },

  6: {
    "🧪 Total control—I want all the data and details!": () => `Welcome to the data jungle. Every Scwall property includes 100+ data points, and full transparency.`,
    "🤝 I trust smart recommendations, just guide me.": () => `We’ll show you the best deals based on your profile. No spreadsheets needed, just smart picks.`,
    "🏃 A bit of both—give me data, but don’t overwhelm me.": () => `That’s our sweet spot. You’ll get clean insights with just one tap to dive deeper.`,
    "🎲 Surprise me with smart picks!": () => `We got you. Scwall delivers curated recommendations,  but always with the ‘why’ behind each one.`
  }
};

const questions = [
  { id: 1, text: name => `${name}, what brings you here today?`, options: [
      "🎯 I want to build wealth, but no clue where to start.",
      "💸 Looking for passive income (and maybe early retirement?).",
      "🏠 Dreaming of owning rental properties—seems cool!",
      "🤔 Just curious—show me what you’ve got."
    ]
  },

  { id: 2, text: () => "Have you ever invested before?", options: [
    "🌱 Nope, total beginner.",
    "🔑 Once or twice—testing the waters.",
    "🏢 Yep, got a few properties already.",
    "💼 Pro here—show me advanced stuff."
  ]
},

  { id: 3, text: () => "How much are you thinking of investing?", options: [
      "🏚 Let's start small (Under $50k).",
      "🏘 Ready to grow ($50k–$200k).",
      "🏢 Let’s go big ($200k+).",
      "🤑 Sky’s the limit—show me the good stuff!"
    ]
  },
  { id: 4, text: () => "⚡ How involved do you want to be?", options: [
      "😴 Zero effort. Show me easy money.",
      "🛠 Hands-on, DIY projects sound fun.",
      "🏃 Somewhere in the middle—teach me as I go.",
      "🤷 No idea, I’m winging it."
    ]
  },
  { id: 5, text: () => "Pick your investor style", options: [
      "🦥 The Slow and Steady—patience is profit.",
      "🚀 The Hustler—fast flips, fast cash.",
      "🐢 The Careful Calculator—show me the safest bets.",
      "🦄 The Dreamer—big risks, big rewards."
    ]
  },

  { id: 6, text: () => "⚡ How much control do you want over your investments?", options: [
      "🧪 Total control—I want all the data and details!",
      "🤝 I trust smart recommendations—just guide me.",
      "🏃 A bit of both—give me data, but don’t overwhelm me.",
      "🎲 Surprise me with smart picks!"
    ]
  }
];


const QuestionnaireFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionIndex = isNaN(parseInt(id)) ? 0 : parseInt(id);

  const [answers, setAnswers] = useState({});
  const [inputName, setInputName] = useState("");
  const [name, setName] = useState("");
  const [showTransition, setShowTransition] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  //set that the next page after the intro page "what's your name" is question 1 page
  const [nextPath, setNextPath] = useState("/question/1");
  
  //variable for transition-creen pages
  //const transitionRef = useRef(null);


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

  // Handle skipping the whole questionnaire
  const handleSkipAll = () => {
    setTransitionMessage(`Skipping the questionnaire...`);
    setNextPath("/profile"); // Redirect to the profile page or the next logical section
    setShowTransition(true);
  };

    // Display the transition screen each time user clicks skip
    const handleSkip = () => {
      setTransitionMessage(`You're skipping this question...`);
      setShowTransition(true);
      setNextPath(`/question/${questionIndex + 1}`);
    };
  
    // Display transition screen based on the current transition state
    if (showTransition) {
      return (
        <div className="transition-screen fade-in">
          <p className="question-text">{transitionMessage}</p>
          <div className="transition-hint">Click anywhere to continue...</div>
  
          {/* Skip the whole questionnaire link */}
          <div className="skip-all-container">
            <button className="skip-all-link" onClick={handleSkipAll}>Skip the whole questionnaire</button>
          </div>
        </div>
      );
    }

  //outcomes of user answers
  const handleSelect = (questionId, option) => {
    const updatedAnswers = { ...answers, [questionId]: option };
    setAnswers(updatedAnswers);
    localStorage.setItem("userAnswers", JSON.stringify(updatedAnswers));

    const replyFn = transitionReplies[questionId]?.[option];
    const message = typeof replyFn === "function" ? replyFn(name) : replyFn;
    if (message) {
      setShowTransition(true);

      // Final question: show processing screen
      if (questionId === questions.length) {
        setTransitionMessage("Processing your investor profile...");
        setNextPath("/profile");
        return;
      }
      setTransitionMessage(message);
      if (questionId < questions.length) {
        setNextPath(`/question/${questionId + 1}`);
      } else {
        setNextPath("/profile"); // or another endpoint after final question
      }
    } else {
      if (questionId < questions.length) {
      navigate(`/question/${questionId + 1}`);
    } else {
      navigate("/profile"); // or dashboard/final page
    }
    }
  };

  //animation for transition-screen between 2 questions: either it switches to next question after user clic or 5sec
  useEffect(() => {
    console.log("[Transition] useEffect triggered");
    if (showTransition) {
      document.body.classList.add("transition-active");
    
      //to skip transition-screens after 5sec or on user clck, except for the lscreen after the last question: it triggers a waiting animation (like airlines) that fades after 3sec
 
      const isProcessing = transitionMessage.includes("Processing your investor profile");
      const auto = setTimeout(() => {
        setShowTransition(false);
        navigate(nextPath);
      }, isProcessing ? 3000 : 5000);

      const handleClick = (e) => {
        if (isProcessing) return true; // block user input during processing
        if (!e.target.closest('.transition-screen')) return;
        clearTimeout(auto);
        setShowTransition(false);
        navigate(nextPath);
        console.log('user click removed')
      };
  
      document.addEventListener("click", handleClick);
  
      return () => {
        clearTimeout(auto);
        document.removeEventListener("click", handleClick);
      };
    }

  }, [showTransition, nextPath, navigate, transitionMessage]);
  


  if (questionIndex === 0 && !showTransition) {
    return (
      <div className="page-container">
      <div className={`question-container fade-in ${fadeOut ? "fade-out" : ""}`}> 
        <p className="question-text">Welcome to Scwall! How should I call you?</p>
        <Input
          className="option-button"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Type your name..."
        />
        <div className="questionnaire-button">
          <Button className="button-primary" onClick={handleNameSubmit}>
            Continue
          </Button>
          <button className="skip-link" onClick={handleNameSubmit}>Just call me Investor</button>
        </div>
      </div>
      </div>
    );
  }

  if (showTransition) {
    const isProcessing = transitionMessage.includes("Processing your investor profile");
    return (
      <div className="transition-screen fade-in">
        {isProcessing ? (
          <>
            <div className="processing-icon" />
            <p className="question-text">Hang tight, we’re generating your investor profile...</p>
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
  const current = questions[questionIndex - 1];

  return (
    <div className="page-container">
      <div className="questionnaire-header">
        <button className="back-button" onClick={() => navigate(questionIndex > 1 ? `/question/${questionIndex - 1}` : "/question/0")}> <AiOutlineArrowLeft size={20} /></button>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${(questionIndex / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="question-container fade-in">
        <p className="question-text">{typeof current.text === "function" ? current.text(name) : current.text}</p>
        <div className="option-list">
          {current.options.map((option, index) => (
            <Button key={index} className="option-button" onClick={() => handleSelect(current.id, option)}>{option}</Button>
          ))}
        </div>
        <button className="skip-link" onClick={handleSkip}>Skip this question</button>
      </div>
    </div>
  );
};

export default QuestionnaireFlow;