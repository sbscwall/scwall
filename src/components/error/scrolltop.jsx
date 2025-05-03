// page to make sure the scrolling always start at the top of the page

// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook from react-router-dom

const ScrollToTop = () => {
  const location = useLocation();  // Hook to access the current route's location

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to the top when the location changes
  }, [location]);  // Dependency array ensures effect runs whenever the location changes

  return null;  // This component doesn't render anything, it just executes the scroll action
};

export default ScrollToTop;
