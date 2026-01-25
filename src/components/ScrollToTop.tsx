import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This "warps" the user back to the top of the screen
    window.scrollTo(0, 0);
  }, [pathname]); // Fires every time the URL path changes

  return null; // This component doesn't render any UI
};

export default ScrollToTop;