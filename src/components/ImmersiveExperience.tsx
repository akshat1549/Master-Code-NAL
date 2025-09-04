import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Eye, Camera, Smartphone, Play, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ImmersiveExperience() {
  const experiences = [
    {
      title: "360° Virtual Tours",
      description: "Experience properties from every angle with immersive virtual tours",
      icon: Eye,
      image: "https://images.unsplash.com/photo-1648147870253-c45f6f430528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGludGVyaW9yJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTY3NDkyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "bg-[#0056D2]",
      features: ["HD Quality", "Interactive Hotspots", "Mobile Friendly"],
    },
    {
      title: "AR Walkthrough",
      description: "Visualize furniture and décor in real-time using augmented reality",
      icon: Smartphone,
      image: "https://images.unsplash.com/photo-1664892798972-079f15663b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTY3OTY5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "bg-[#00BFA6]",
      features: ["Furniture Placement", "Color Visualization", "Live Preview"],
    },
    {
      title: "Drone View",
      description: "Get aerial perspectives and neighborhood insights from drone footage",
      icon: Camera,
      image: "https://images.unsplash.com/photo-1754797007288-cfa09b51b056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMHNreWxpbmUlMjBjaXR5fGVufDF8fHx8MTc1Njc5Njk4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "bg-purple-600",
      features: ["4K Footage", "Neighborhood View", "Traffic Analysis"],
    },
    {
      title: "NAL Stories",
      description: "Watch curated video stories showcasing property highlights and reviews",
      icon: Play,
      image: "https://images.unsplash.com/photo-1635108199395-8cd24af60af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjBleHRlcmlvcnxlbnwxfHx8fDE3NTY3OTY5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "bg-orange-600",
      features: ["Expert Reviews", "Resident Stories", "Quick Tours"],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Immersive Property Experience</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore properties like never before with cutting-edge technology and immersive experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((experience, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <ImageWithFallback
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                
                <div className="absolute top-4 left-4">
                  <div className={`${experience.color} p-2 rounded-lg`}>
                    <experience.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-900">New</Badge>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90">
                    <Play className="w-5 h-5 mr-2" />
                    Experience Now
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {experience.title}
                </h3>
                <p className="text-gray-600 mb-4">{experience.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {experience.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full group">
                  Try {experience.title}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Showcase */}
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Powered by Advanced Technology</h3>
            <p className="text-gray-600">Experience the future of property viewing with our innovative solutions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#0056D2] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">VR Ready</h4>
              <p className="text-sm text-gray-600">Compatible with all VR headsets</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#00BFA6] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Mobile AR</h4>
              <p className="text-sm text-gray-600">Works on any smartphone</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">4K Quality</h4>
              <p className="text-sm text-gray-600">Ultra-high definition visuals</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Live Streaming</h4>
              <p className="text-sm text-gray-600">Real-time property tours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}