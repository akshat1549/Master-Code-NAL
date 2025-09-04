import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, MapPin, Mic, Calculator, Home, CreditCard, Building, Navigation } from "lucide-react";
import { LoginModal } from "./LoginModal";
import { EMICalculatorModal } from "./EMICalculatorModal";
import { PropertyValuationModal } from "./PropertyValuationModal";

export function HeroSection() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEMIModalOpen, setIsEMIModalOpen] = useState(false);
  const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);

  const quickActions = [
    { icon: Home, label: "Post Property Free", color: "bg-[#00BFA6]" },
    { icon: Calculator, label: "EMI Calculator", color: "bg-[#0056D2]" },
    { icon: Building, label: "Valuation", color: "bg-purple-600" },
  ];

  return (
    <section 
      className="relative py-12 lg:py-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 86, 210, 0.7), rgba(0, 191, 166, 0.7)), url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-[19rem] sm:text-[23rem] lg:text-[29rem] xl:text-[33rem] 2xl:text-[41rem] font-bold text-white mb-8 leading-tight">
            Find Your Perfect
            <br />
            <span className="text-[#00BFA6]">Dream Home</span>
          </h1>
          <p className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white/90 max-w-6xl mx-auto font-medium">
            Discover verified properties with transparency, trust, and technology
          </p>
        </div>

        {/* Smart Search Bar */}
        <div className="w-full max-w-4xl mx-auto flex justify-center">
          <Tabs defaultValue="buy" className="w-full max-w-3xl">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm h-10">
              <TabsTrigger value="buy" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm">
                Buy
              </TabsTrigger>
              <TabsTrigger value="sell" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm">
                Sell
              </TabsTrigger>
              <TabsTrigger value="plots" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm">
                Plots
              </TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-xl p-4 border border-white/30">
                <div className="flex gap-3 items-center">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      placeholder="Search by city, locality, or project name..."
                      className="pl-10 h-10 text-sm bg-white border-0 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="h-10 px-4 bg-white/10 border-white/30 text-white hover:bg-white/20 flex items-center text-sm"
                  >
                    <Navigation className="w-3 h-3 mr-1" />
                    Current Location
                  </Button>
                  <Button className="bg-[#0056D2] hover:bg-[#0056D2]/90 h-10 px-6 flex items-center text-sm">
                    <Search className="w-3 h-3 mr-1" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </Tabs>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-3xl mx-auto">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`${action.color} hover:${action.color}/90 text-white border-white/20 h-12 flex-col space-y-1`}
              onClick={() => {
                if (action.label === "Post Property Free") {
                  setIsLoginModalOpen(true);
                } else if (action.label === "EMI Calculator") {
                  setIsEMIModalOpen(true);
                } else if (action.label === "Valuation") {
                  setIsValuationModalOpen(true);
                }
              }}
            >
              <action.icon className="w-4 h-4" />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      <EMICalculatorModal 
        isOpen={isEMIModalOpen} 
        onClose={() => setIsEMIModalOpen(false)} 
      />
      <PropertyValuationModal 
        isOpen={isValuationModalOpen} 
        onClose={() => setIsValuationModalOpen(false)} 
      />
    </section>
  );
}