import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calculator, CheckCircle, CreditCard, ArrowRight } from "lucide-react";
import { useState } from "react";
import { EMICalculatorModal } from "./EMICalculatorModal";

export function FinancialTools() {
  const [isEMIModalOpen, setIsEMIModalOpen] = useState(false);
  const tools = [
    {
      title: "EMI Calculator",
      description: "Calculate your monthly EMI with our advanced calculator",
      icon: Calculator,
      color: "bg-[#0056D2]",
      features: ["Interest Rate Comparison", "Tax Benefits", "Prepayment Options"],
      cta: "Calculate EMI",
    },
    {
      title: "Loan Eligibility Check",
      description: "Check your loan eligibility instantly",
      icon: CheckCircle,
      color: "bg-[#00BFA6]",
      features: ["Instant Approval", "Best Rates", "Multiple Banks"],
      cta: "Apply Now",
      highlight: true,
    },
    {
      title: "Pay Rent with Credit Card",
      description: "Pay your rent with credit card and earn rewards",
      icon: CreditCard,
      color: "bg-purple-600",
      features: ["Earn Rewards", "Easy Payment", "Instant Transfer"],
      cta: "Pay Rent",
    },
  ];

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Tools</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simplify your property financing with our comprehensive financial tools and services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 ${
                tool.highlight ? 'ring-2 ring-[#00BFA6] ring-offset-2' : ''
              }`}
            >
              {tool.highlight && (
                <div className="absolute top-0 right-0 bg-[#00BFA6] text-white text-xs px-3 py-1 rounded-bl-lg">
                  Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`${tool.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">{tool.description}</p>
                
                <div className="space-y-3 mb-6">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#00BFA6]" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => {
                    if (tool.title === "EMI Calculator") {
                      setIsEMIModalOpen(true);
                    }
                  }}
                  className={`w-full group ${
                    tool.highlight 
                      ? 'bg-[#00BFA6] hover:bg-[#00BFA6]/90' 
                      : 'bg-[#0056D2] hover:bg-[#0056D2]/90'
                  } text-white`}
                >
                  {tool.cta}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Financial Services */}
        <div className="mt-16 bg-gradient-to-r from-[#0056D2] to-[#00BFA6] rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Need Professional Help?</h3>
              <p className="text-white/90 mb-6">
                Connect with our certified financial advisors for personalized loan consultation and get the best deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" className="bg-white text-[#0056D2] hover:bg-white/90">
                  Talk to Advisor
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0056D2]">
                  Compare Loans
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">₹500Cr+</div>
                <div className="text-white/80 text-sm">Loans Disbursed</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">50,000+</div>
                <div className="text-white/80 text-sm">Happy Customers</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">8.5%</div>
                <div className="text-white/80 text-sm">Interest Rate</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">48 Hrs</div>
                <div className="text-white/80 text-sm">Quick Approval</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <EMICalculatorModal 
        isOpen={isEMIModalOpen} 
        onClose={() => setIsEMIModalOpen(false)} 
      />
    </section>
  );
}