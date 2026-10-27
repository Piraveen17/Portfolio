import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollManager } from "./lib/scroll";
import { CarRentalPage } from "./pages/CarRentalPage";
import { Home } from "./pages/Home";
import { IntentLatchPage } from "./pages/IntentLatchPage";

export function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <ScrollManager />
      <Analytics />
      <SpeedInsights />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/intentlatch" element={<IntentLatchPage />} />
          <Route path="/work/car-rental" element={<CarRentalPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
