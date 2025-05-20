import { useLocation, useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { Button } from "@/components/ui/button";
import { LayoutGrid, Menu } from 'lucide-react';
import PropertyGrid from "@/pages/propertygrid";
import logo from "@/assets/logo.png";
import "../css/global.css";
import "../css/header.css"; 
import "../css/icon.css"; 

export default function Header() {
  const location = useLocation(); // Get the current route
  const navigate = useNavigate();

   // Define which pages are "value pages"
   const valuePages = ["/value", "/explore", "/portfolio", "/grid"]; 
   const isValuePage = valuePages.some((path) => location.pathname.startsWith(path));
   

// Define the pages where the grid button should be hidden
const hideGridButtonPages = ["/"];
// Check if the current page is one of those where the grid button should be hidden
  const shouldHideGridButton = hideGridButtonPages.some((path) => location.pathname === path);

// Define the pages starting with where the navbar should be hidden
const hideGridButtonPages2 = ["/question", "/aboutus", "/profile", "/objective", "/door", "/waitemail", "/thankyou", "/terms", "/privacy", "/faq","/contact"];
// Check if the current page is the Landing Page (exact match for "/") or if it's one of the other paths in the hideNavBarPages array
const shouldHideGridButton2 = hideGridButtonPages2.some((path) => location.pathname.startsWith(path));

  // Combine both conditions: Hide button if either condition is true
  const shouldHideGridButtonRule = shouldHideGridButton || shouldHideGridButton2;



   //to access grid mode or explore mode from the top right menu button
   const isGridPage = location.pathname === '/grid';

   const handleClick = () => {
     navigate(isGridPage ? '/explore' : '/grid');
   };


   return (
     <header className="header">
       <div className="header-container">
         
         {/* Left Section: Logo (Clickable, Goes to Landing Page) */}
         <Link to="/" className="logo-container">
           <img src={logo} alt="Scwall Logo" className="logo" />
           {!isValuePage && <h2 className="logo-text">Scwall</h2>} {/* Hide logo text on value pages */}
         </Link>
 

 
         {/* Right Section: Menu Button */}

{!shouldHideGridButtonRule ? (
          <Button variant="ghost" size="icon" className="menu-button" onClick={handleClick}>
            {isGridPage ? <Menu className="menu-icon" /> : <LayoutGrid className="menu-icon" />}
          </Button>
        ) : (
          <Button className="button-start-header" onClick={() => navigate("/waitemail")}>
          Sign up
          </Button>
        )}

       </div>
     </header>  );
}
