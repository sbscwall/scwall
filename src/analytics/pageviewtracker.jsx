import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import posthog from "@/analytics";

export default function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    posthog.capture("Page_Viewed", {
      pathname: location.pathname,
    });
  }, [location.pathname]);

  return null; // No UI rendered
}
