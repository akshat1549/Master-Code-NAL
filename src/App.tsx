import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturedProperties } from "./components/FeaturedProperties";
import { MarketInsights } from "./components/MarketInsights";
import { FinancialTools } from "./components/FinancialTools";
import { ImmersiveExperience } from "./components/ImmersiveExperience";
import { SellersAgents } from "./components/SellersAgents";
import { NALServices } from "./components/NALServices";
import { KnowledgeHub } from "./components/KnowledgeHub";
import { TrustTransparency } from "./components/TrustTransparency";
import { Footer } from "./components/Footer";
import { PropertyDetail } from "./components/PropertyDetail";
import { PropertyListing } from "./components/PropertyListing";
import { AgentLogin } from "./components/AgentLogin";
import AgentDashboard from "./components/AgentDashboard";
import { SellerLogin } from "./components/SellerLogin";
import { SellerDashboard } from "./components/seller-dashboard/SellerDashboard";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";
import { AboutUs } from "./components/AboutUs";
import { ContactUs } from "./components/ContactUs";
import { PropertyListingForm } from "./components/PropertyListingForm";

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <MarketInsights />
      <FinancialTools />
      <ImmersiveExperience />
      <SellersAgents />
      <NALServices />
      <KnowledgeHub />
      <TrustTransparency />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/agent" element={<AgentLogin />} />
            <Route path="/agent/dashboard/*" element={<AgentDashboard />} />
            <Route path="/seller" element={<SellerLogin />} />
            <Route path="/seller/dashboard/*" element={<SellerDashboard />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/properties" element={<PropertyListing />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/list-property" element={<PropertyListingForm />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}