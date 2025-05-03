import { useLocation, useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/searchbar";
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
const hideGridButtonPages = ["/", "/question", "/profile", "/objective", "/door", "/waitemail", "/terms", "/privacy", "/faq","/contact"];
  
// Check if the current page is one of those where the grid button should be hidden
  const shouldHideGridButton = hideGridButtonPages.some((path) => location.pathname === path);

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
           {!isValuePage && <h3 className="logo-text">SCWALL</h3>} {/* Hide logo text on value pages */}
         </Link>
 
         {/* Middle Section: Show Search Bar ONLY on Value Pages 
         {isValuePage && (
           <div className="search-bar-container">
             <SearchBar /> 
           </div>
         )}
           */}
 
         {/* Right Section: Menu Button */}
         {!shouldHideGridButton && (
          <Button variant="ghost" size="icon" className="menu-button" onClick={handleClick}>
            {isGridPage ? <Menu className="menu-icon" /> : <LayoutGrid className="menu-icon" />}
          </Button>
        )}

       </div>
     </header>  );
}
