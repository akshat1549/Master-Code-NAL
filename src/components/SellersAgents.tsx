import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Plus, TrendingUp, UserCheck, Globe, FileCheck, Edit } from "lucide-react";

export function SellersAgents() {
  const services = [
    {
      title: "Premium Listing Boost",
      description: "Get 3x more visibility with premium placement",
      icon: TrendingUp,
      price: "₹2,999",
      features: ["Top Search Results", "Featured Badge", "Social Media Promotion"],
      popular: false,
    },
    {
      title: "Tenant Verification",
      description: "Complete background check and verification",
      icon: UserCheck,
      price: "₹599",
      features: ["Credit Check", "Employment Verification", "Reference Check"],
      popular: true,
    },
    {
      title: "NRI Property Management",
      description: "Complete property management for overseas Indians",
      icon: Globe,
      price: "₹4,999/month",
      features: ["Rent Collection", "Maintenance", "Legal Support"],
      popular: false,
    },
    {
      title: "eStamp & eSign",
      description: "Digital documentation and legal compliance",
      icon: FileCheck,
      price: "₹1,299",
      features: ["Digital Stamps", "Online Signatures", "Legal Compliance"],
      popular: false,
    },
  ];

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">For Sellers & Agents</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful tools and services to help you sell properties faster and manage your real estate business efficiently
          </p>
        </div>

        {/* Main CTA */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-[#0056D2] to-[#00BFA6] text-white overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Post Your Property for FREE</h3>
                  <p className="text-white/90 mb-6 text-lg">
                    List your property in minutes and reach millions of verified buyers across India
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-white text-[#0056D2] hover:bg-white/90">
                      <Plus className="w-5 h-5 mr-2" />
                      Post Property Free
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0056D2]">
                      <Edit className="w-5 h-5 mr-2" />
                      Manage Listings
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">5M+</div>
                    <div className="text-white/80 text-sm">Active Buyers</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">30 Days</div>
                    <div className="text-white/80 text-sm">Avg. Sale Time</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">₹0</div>
                    <div className="text-white/80 text-sm">Listing Fee</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">99%</div>
                    <div className="text-white/80 text-sm">Success Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className={`relative group hover:shadow-xl transition-all duration-300 ${
              service.popular ? 'ring-2 ring-[#00BFA6] ring-offset-2' : ''
            }`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#00BFA6] text-white">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="bg-[#0056D2] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <div className="text-2xl font-bold text-[#0056D2]">{service.price}</div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 text-center mb-4">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#00BFA6] rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${
                    service.popular 
                      ? 'bg-[#00BFA6] hover:bg-[#00BFA6]/90' 
                      : 'bg-[#0056D2] hover:bg-[#0056D2]/90'
                  } text-white`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>
    </section>
  );
}