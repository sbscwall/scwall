import AppRouter from "./routes/AppRouter"; 
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import "@/css/global.css";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <AppRouter />
      <Navbar />
    </div>
  );
}


