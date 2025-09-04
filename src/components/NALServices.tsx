import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FileCheck, Palette, Truck, Sparkles, Shield, ArrowRight } from "lucide-react";

export function NALServices() {
  const services = [
    {
      title: "Document Verification",
      description: "Complete legal verification of all property documents",
      icon: FileCheck,
      color: "bg-[#0056D2]",
      features: ["Title Verification", "Legal Clearance", "Compliance Check"],
      price: "Starting ₹2,999",
      popular: true,
    },
    {
      title: "Interiors & Design",
      description: "End-to-end interior design and execution services",
      icon: Palette,
      color: "bg-[#00BFA6]",
      features: ["3D Design", "Modular Interiors", "Turnkey Solutions"],
      price: "Starting ₹1,999/sq ft",
      popular: false,
    },
    {
      title: "Movers & Packers",
      description: "Hassle-free relocation with trusted moving partners",
      icon: Truck,
      color: "bg-purple-600",
      features: ["Packing & Moving", "Insurance Cover", "Safe Delivery"],
      price: "Starting ₹3,999",
      popular: false,
    },
    {
      title: "Cleaning Services",
      description: "Professional cleaning for your new or existing property",
      icon: Sparkles,
      color: "bg-orange-600",
      features: ["Deep Cleaning", "Sanitization", "Maintenance"],
      price: "Starting ₹1,499",
      popular: false,
    },
    {
      title: "NAL Protect Insurance",
      description: "Comprehensive insurance coverage for your property",
      icon: Shield,
      color: "bg-red-600",
      features: ["Property Cover", "Legal Protection", "24/7 Support"],
      price: "Starting ₹999/year",
      popular: true,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">NAL Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete real estate ecosystem with trusted services for every step of your property journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`group hover:shadow-xl transition-all duration-300 relative ${
              service.popular ? 'ring-2 ring-[#00BFA6] ring-offset-2' : ''
            }`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#00BFA6] text-white">Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <p className="text-gray-600">{service.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <div className="text-lg font-bold text-[#0056D2] mb-4">{service.price}</div>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#00BFA6] rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full bg-[#0056D2] hover:bg-[#0056D2]/90 text-white group">
                  Book Service
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Process */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How NAL Services Work</h3>
            <p className="text-gray-600">Simple 4-step process to get your service completed</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Book Online", description: "Choose your service and book instantly" },
              { step: "2", title: "Expert Assignment", description: "We assign verified professionals" },
              { step: "3", title: "Service Delivery", description: "Get quality service at your doorstep" },
              { step: "4", title: "Quality Assurance", description: "100% satisfaction guaranteed" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-[#0056D2] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-[#0056D2] mb-2">50,000+</div>
            <div className="text-gray-600">Services Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#00BFA6] mb-2">4.8/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
            <div className="text-gray-600">Verified Partners</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-[#0056D2] to-[#00BFA6] text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need Custom Service Package?</h3>
              <p className="text-white/90 mb-6">
                Talk to our experts for customized service packages tailored to your specific needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-[#0056D2] hover:bg-white/90">
                  Talk to Expert
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0056D2]">
                  View All Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}