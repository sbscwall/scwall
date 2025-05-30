import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import "@/css/global.css";
import posthog from "@/analytics";
import PageTimer from "@/analytics/pagetimer"; 

export default function App() {


  useEffect(() => {

    posthog.capture("Test_Event_From_App");
  }, []);

  useEffect(() => {
    const sessionStart = Date.now();
    posthog.capture("Visited_App");

    const handleUnload = () => {
      const sessionEnd = Date.now();
      const duration = Math.floor((sessionEnd - sessionStart) / 1000);
      posthog.capture("Session_Duration", { seconds: duration });
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return (
    <div className="min-h-screen">
       <PageTimer /> 
      <Header />
      <AppRouter />
      <Navbar />
    </div>
  );
}
