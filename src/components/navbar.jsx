import { useLocation, Link } from "react-router-dom";
// import { useLocation } from "react-router-dom"; TO BE ADDED WHEN FAKE DOOR DONE
import { AiFillHome, AiFillHeart, AiOutlineBarChart, AiOutlineUser, AiOutlineCalculator } from "react-icons/ai";
import { FiCompass } from 'react-icons/fi';
// import { useEffect, useState } from "react"; TO BE ADDED WHEN FAKE DOOR DONE
import "../css/navbar.css";
import "../css/global.css";

const NavBar  = () => {


const location = useLocation(); // Get the current route

{/*
  // Define the pages where the navbar should be hidden
  const hideNavBarPages = ["/"];
 // Check if the current page is the Landing Page (exact match for "/") or if it's one of the other paths in the hideNavBarPages array
 const shouldHideNavBar = hideNavBarPages.some((path) => location.pathname === path);

   // Define the pages starting with where the navbar should be hidden
   const hideNavBarPages2 = ["/question", "/question", "/profile", "/objective", "/door", "/waitemail","/thankyou",  "/terms", "/privacy", "/faq","/contact", "/aboutus"];
   // Check if the current page is the Landing Page (exact match for "/") or if it's one of the other paths in the hideNavBarPages array
   const shouldHideNavBar2 = hideNavBarPages2.some((path) => location.pathname.startsWith(path));
  
  // If the current page is one where we don't want the navbar, return null (i.e., hide it)
  if (shouldHideNavBar) {
    return null;
  }
  if (shouldHideNavBar2) {
    return null;
  }
*/}
  return (
    <nav className="nav-bar">
      {/* Home Button: Redirect to /explore */}
      <Link 
        to="/explore"
        className={`nav-link ${location.pathname === '/explore' ? 'active' : ''}`}
      >
        <FiCompass size={24} />
        <span>Explore</span>
      </Link>

      {/* Calculator Button: Redirect to /dataedit */}
      <Link 
        to="/calculator"
        className={`nav-link ${location.pathname === '/calculator' ? 'active' : ''}`}
      >
        <AiOutlineCalculator size={24} />
        <span>Calculator</span>
      </Link>

      {/* Portfolio Button: Redirect to /portfolio */}
      <Link 
        to="/portfolio" 
        className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}
      >
        <AiOutlineBarChart size={24} />
        <span>Portfolio</span>
      </Link>

      {/* Wishlist (Heart): Redirect to /waitemailaccount 
      <Link 
        to="/waitemail" 
        className={`nav-link ${location.pathname === '/waitemail' ? 'active' : ''}`}
      >
        <AiFillHeart size={24} />
        <span>Wishlist</span>
      </Link>
*/}


      {/* Account Button: Redirect to /waitemailaccount */}
      <Link 
        to="/waitemail" 
        className={`nav-link ${location.pathname === '/waitemail' ? 'active' : ''}`}
      >
        <AiOutlineUser size={24} />
        <span>Account</span>
      </Link>
    </nav>
  );
};

export default NavBar;
