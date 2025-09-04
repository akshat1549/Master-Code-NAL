import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Shield, CheckCircle, FileCheck, Thermometer, Star, Users, Clock } from "lucide-react";

export function TrustTransparency() {
  const trustFeatures = [
    {
      title: "NAL Verified",
      description: "Every property undergoes rigorous verification by our experts",
      icon: Shield,
      color: "bg-[#00BFA6]",
      stats: "100% Properties Verified",
      features: ["Physical Verification", "Document Check", "Legal Clearance", "Price Validation"],
    },
    {
      title: "RIBL Scorecard",
      description: "Comprehensive scoring system rating properties from A+ to C",
      icon: Star,
      color: "bg-[#0056D2]",
      stats: "15+ Parameters",
      features: ["Location Score", "Construction Quality", "Amenities Rating", "Investment Potential"],
    },
    {
      title: "Instant Document Verification",
      description: "AI-powered document verification in real-time",
      icon: FileCheck,
      color: "bg-purple-600",
      stats: "99.7% Accuracy",
      features: ["Title Deed Check", "Approval Status", "Encumbrance Certificate", "Tax Records"],
    },
    {
      title: "Climate Risk Badge",
      description: "Environmental risk assessment for informed decisions",
      icon: Thermometer,
      color: "bg-orange-600",
      stats: "Climate Data Analysis",
      features: ["Flood Risk", "Air Quality", "Temperature Trends", "Disaster History"],
    },
  ];

  const achievements = [
    { number: "5M+", label: "Verified Properties", icon: CheckCircle },
    { number: "99.9%", label: "Accuracy Rate", icon: Shield },
    { number: "2.5M+", label: "Happy Customers", icon: Users },
    { number: "24/7", label: "Support Available", icon: Clock },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trust & Transparency</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            India's most trusted real estate platform with comprehensive verification and transparency measures
          </p>
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {trustFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`${feature.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {feature.stats}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {feature.features.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#00BFA6]" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* RIBL Scorecard Showcase */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-blue-50 to-teal-50">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">RIBL Scorecard</h3>
                  <p className="text-gray-600 mb-6">
                    Our proprietary Real Estate Intelligence and Buyer's Logic (RIBL) scoring system provides 
                    transparent property ratings based on 15+ crucial parameters.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span>Location & Connectivity</span>
                      <Badge className="bg-green-500 text-white">A+</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span>Construction Quality</span>
                      <Badge className="bg-blue-500 text-white">A</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span>Amenities & Facilities</span>
                      <Badge className="bg-yellow-500 text-white">B+</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span>Investment Potential</span>
                      <Badge className="bg-green-500 text-white">A+</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-white">A+</span>
                      </div>
                      <h4 className="font-bold text-lg">Overall RIBL Score</h4>
                      <p className="text-gray-600 text-sm">Excellent Investment Choice</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Location Score</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Quality Score</span>
                        <div className="flex space-x-1">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="w-4 h-4 text-gray-300" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Value Score</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-[#0056D2] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#0056D2] mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600 text-sm">{achievement.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Promise */}
        <div className="bg-gradient-to-r from-[#0056D2] to-[#00BFA6] rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">NAL Security Promise</h3>
            <p className="text-white/90 text-lg mb-6">
              Your security is our priority. Every transaction is protected with end-to-end encryption, 
              verified documentation, and comprehensive legal support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Secure Transactions</div>
                <div className="text-white/80 text-sm">Bank-grade security</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <FileCheck className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Legal Protection</div>
                <div className="text-white/80 text-sm">Complete legal coverage</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Verified Properties</div>
                <div className="text-white/80 text-sm">100% authenticity guarantee</div>
              </div>
            </div>
            <Button size="lg" className="bg-white text-[#0056D2] hover:bg-white/90">
              Learn More About Our Security
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}