import { Button } from "./ui/button";
import { Shield, Users, Award, Target, Heart, TrendingUp } from "lucide-react";

export function AboutUs() {
  const values = [
    { icon: Shield, title: "Trust & Transparency", description: "We believe in complete transparency in all our dealings" },
    { icon: Users, title: "Customer First", description: "Your satisfaction is our top priority" },
    { icon: Award, title: "Excellence", description: "We strive for excellence in every service we provide" },
    { icon: Target, title: "Innovation", description: "Using cutting-edge technology to serve you better" }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "10,000+", label: "Properties Listed" },
    { number: "500+", label: "Expert Agents" },
    { number: "25+", label: "Cities Covered" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0056D2] to-[#00BFA6] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About NAL India</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Revolutionizing real estate with transparency, trust, and technology. 
            Your dream home is just a click away.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At NAL India, we're committed to transforming the real estate experience by eliminating 
                traditional barriers and creating a seamless, transparent platform where buyers, sellers, 
                and renters can connect directly.
              </p>
              <p className="text-lg text-gray-600">
                We leverage advanced technology and data-driven insights to provide accurate property 
                valuations, market trends, and personalized recommendations that help you make informed decisions.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <Heart className="w-12 h-12 text-[#0056D2] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose NAL India?</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Zero commission for direct owner contact</li>
                <li>• Verified properties and genuine listings</li>
                <li>• Advanced search and filtering options</li>
                <li>• Expert guidance and support</li>
                <li>• Transparent pricing and processes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <value.icon className="w-12 h-12 text-[#0056D2] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0056D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-lg text-white/90">Numbers that speak for our success</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied customers who have found their perfect property with NAL India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#0056D2] hover:bg-[#0056D2]/90 text-white px-8 py-3">
              Browse Properties
            </Button>
            <Button variant="outline" className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white px-8 py-3">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}