// src/components/tracking/PageTimer.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import posthog from "@/analytics";

export default function PageTimer() {
    const location = useLocation();
    const startRef = useRef(Date.now());
    const lastPathRef = useRef(location.pathname);
  
    useEffect(() => {
      const now = Date.now();
      const duration = Math.floor((now - startRef.current) / 1000);
  
      if (duration > 1) {
        posthog.capture("Page_Duration", {
          pathname: lastPathRef.current,
          seconds: duration,
        });
      }
  
      startRef.current = now;
      lastPathRef.current = location.pathname;
    }, [location.pathname]);
  
    return null;
  }
  
