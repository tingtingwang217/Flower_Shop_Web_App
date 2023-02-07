import { useLocation } from "react-router-dom"; // returns the current location object
import { useEffect } from "react"; 

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); //scrolls to a particular set of coordinates in the documen:top(here)
  }, [pathname]); //when the path changes, scroll to top
  return null;
}