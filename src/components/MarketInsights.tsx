import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { TrendingUp, MapPin, Shield, Thermometer, Wifi, Car } from "lucide-react";
import { useState } from "react";
import { PropertyValuationModal } from "./PropertyValuationModal";

export function MarketInsights() {
  const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);
  const insights = [
    {
      title: "Property Valuation Tool",
      description: "Get instant property valuations powered by AI",
      icon: TrendingUp,
      color: "bg-[#0056D2]",
    },
    {
      title: "Locality Insights",
      description: "Comprehensive area analysis with CFI scoring",
      icon: MapPin,
      color: "bg-[#00BFA6]",
    },
    {
      title: "Climate Risk Assessment",
      description: "Environmental risk factors and safety ratings",
      icon: Thermometer,
      color: "bg-orange-600",
    },
  ];

  const localityFeatures = [
    { icon: Wifi, label: "Connectivity", score: "9.2" },
    { icon: Shield, label: "Safety", score: "8.7" },
    { icon: Car, label: "Transport", score: "8.9" },
    { icon: TrendingUp, label: "Growth", score: "9.1" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make informed decisions with our comprehensive market analysis and data-driven insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interactive Price Heatmap */}
          <div className="relative">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#0056D2]" />
                  Price Heatmap - India
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-6 h-80">
                  {/* Simplified India Map Representation */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative">
                      {/* Mumbai */}
                      <div className="absolute top-20 left-8 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse cursor-pointer group">
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                              Mumbai: ₹15,000/sq ft
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Delhi */}
                      <div className="absolute top-8 left-20 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse cursor-pointer group">
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                              Delhi: ₹12,000/sq ft
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bangalore */}
                      <div className="absolute top-28 left-16 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse cursor-pointer group">
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                              Bangalore: ₹8,500/sq ft
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Chennai */}
                      <div className="absolute top-32 left-20 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse cursor-pointer group">
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                              Chennai: ₹7,200/sq ft
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Pune */}
                      <div className="absolute top-24 left-12 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse cursor-pointer group">
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                              Pune: ₹6,800/sq ft
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Map outline */}
                      <svg width="200" height="250" className="text-gray-300">
                        <path
                          d="M50 50 Q100 30 150 50 Q180 80 170 130 Q150 180 120 200 Q80 220 50 200 Q20 170 30 120 Q35 80 50 50Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white rounded-lg p-3 shadow-lg">
                      <div className="text-xs font-semibold mb-2">Price Range</div>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Low</span>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Medium</span>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Cards */}
          <div className="space-y-6">
            {insights.map((insight, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${insight.color} p-3 rounded-lg`}>
                      <insight.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {insight.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{insight.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          if (insight.title === "Property Valuation Tool") {
                            setIsValuationModalOpen(true);
                          }
                        }}
                      >
                        Try Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Locality Features */}
            <Card>
              <CardHeader>
                <CardTitle>Locality Analysis - Bandra West</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {localityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <feature.icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">{feature.label}</span>
                      </div>
                      <Badge variant="secondary" className="bg-[#00BFA6] text-white">
                        {feature.score}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex space-x-2">
                  <Badge className="bg-green-100 text-green-800">Low Climate Risk</Badge>
                  <Badge className="bg-blue-100 text-blue-800">High Connectivity</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Premium Location</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <PropertyValuationModal 
        isOpen={isValuationModalOpen} 
        onClose={() => setIsValuationModalOpen(false)} 
      />
    </section>
  );
}