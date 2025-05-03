// profile.jsx
import React, {useEffect, useState} from 'react';
import '../css/profile.css';
import "../css/global.css";
import { useNavigate } from 'react-router-dom';





const Profile = () => {
  const [name, setName] = useState("Investor");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
    }
  }, []);

//Set redirection to "/Objective" page "
const navigate = useNavigate();
const handleObjective = () => {
  navigate('/objective');
};




  return (
    <div className="page-container"> 
    <div className="profile-container">
      <h2 className="profile-greeting">Here’s your investor profile, {name}</h2>

      <div className="profile-section">
        <h3 className="profile-title">Your Style</h3>
        <p className="profile-text">
          You’re focused, thoughtful, and ready to grow. You value smart, low-risk moves and want your money working consistently over time.
        </p>
      </div>

      <div className="profile-section">
        <h3 className="profile-title">How We’ll Help</h3>
        <p className="profile-text">
          We’ll guide you to the right properties, based on your goals, your comfort zone, and real data. No stress, just smart investing.
        </p>
      </div>

      <div className="objectives-intro">
        🎯 Now let’s set your investment objectives. I’ll track your progress and personalize everything for you.
      </div>

      <button className="cta-button" onClick={handleObjective}>
        Set My Objectives
      </button>
    </div>
    </div>
  );
};

export default Profile;