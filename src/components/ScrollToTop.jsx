import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  /* Scroll to the top whenever the page changes */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}