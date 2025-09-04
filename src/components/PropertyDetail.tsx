import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { 
  ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, Car, 
  Wifi, Dumbbell, Shield, TreePine, Camera, Phone, MessageCircle,
  Star, TrendingUp, Calculator, Eye, Clock, CheckCircle, ChevronLeft, ChevronRight,
  Download, ExternalLink, Building, Calendar, Users, Zap, Droplets, Wind,
  School, Hospital, ShoppingCart, Trees, Train, Building2, Home, Wrench,
  Play, Image as ImageIcon, FileText, HelpCircle, Plus
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
interface Property {
  id: number;
  title: string;
  price_formatted: string;
  price: string;
  city: string;
  state: string;
  beds: number;
  baths: number;
  area_sqft: number;
  area: string;
  location: string;
  description: string;
  amenities: string[];
  nearbyPlaces: { name: string; distance: string }[];
  projectInfo?: {
    projectTitle: string;
    builderName: string;
    fullLocation: string;
    possessionDate: string;
    priceRange: string;
    pricePerSqft: string;
    emiFrom: string;
    projectArea: string;
    buildings: string;
    units: string;
    sizes: string;
    configurations: string;
    launchDate: string;
  };
  developer?: {
    name: string;
    established: string;
    experience: string;
    description: string;
    certifications: string[];
    notableProjects: string[];
  };
  legalInfo: {
    rera: string;
    approvals: string[];
  };
  specifications: {
    age: string;
    parking: string;
  };
  images: string[];
}
import { EMICalculatorModal } from "./EMICalculatorModal";

export function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isEMIModalOpen, setIsEMIModalOpen] = useState(false);

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProperty(id);
    }
  }, [id]);

  const fetchProperty = async (propertyId: string) => {
    try {
      const response = await fetch(`http://localhost/Master-Code-NAL/api/properties.php?id=${propertyId}`);
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        const prop = data.data[0];
        // Add default images if none exist
        prop.images = [
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
        ];
        setProperty(prop);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'highlights', 'around', 'more', 'floor-plan', 'tour', 'amenities', 'contact', 'reviews', 'trends', 'brochure', 'calculator', 'locality', 'compare', 'developer', 'qa'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading property details...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-gray-50 flex items-center justify-center min-h-full py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Button onClick={() => navigate('/')} className="bg-[#0056D2] hover:bg-[#0056D2]/90">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120; // Account for sticky header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Button>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                variant={isLiked ? "default" : "outline"} 
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Property Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {property.projectInfo?.projectTitle || property.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  by {property.projectInfo?.builderName || property.developer?.name || 'Developer'}
                </p>
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{property.projectInfo?.fullLocation || property.location}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {property.specifications?.age === 'Under Construction' && (
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">New Launch</Badge>
                )}
                {property.specifications?.age === 'Ready to Move' && (
                  <Badge className="bg-blue-100 text-blue-800 px-3 py-1">Ready to Move</Badge>
                )}
                <Badge variant="outline" className="px-3 py-1">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  RERA
                </Badge>
                {property.projectInfo?.possessionDate && (
                  <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    Possession: {property.projectInfo.possessionDate}
                  </Badge>
                )}
              </div>

              {/* Price Strip */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {property.projectInfo?.priceRange || property.price}
                </div>
                <div className="text-lg text-gray-600 mb-2">
                  {property.projectInfo?.pricePerSqft || '₹8,500 - ₹12,000/sq.ft'}
                </div>
                <div className="text-sm text-green-600 font-medium">
                  EMI from {property.projectInfo?.emiFrom || '₹41.4K'}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-4">
                <Button className="flex-1 bg-[#0056D2] hover:bg-[#0056D2]/90 h-12">
                  Contact Developer
                </Button>
                <Button variant="outline" className="flex-1 h-12">
                  <Download className="w-4 h-4 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>

            {/* Right Column - Gallery */}
            <div className="relative">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border">
                <div className="relative group">
                  <ImageWithFallback
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-[400px] object-cover"
                  />
                  
                  {/* 3D Tour Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/70 text-white px-3 py-1">
                      <Play className="w-3 h-3 mr-1" />
                      3D/360° Tour
                    </Badge>
                  </div>
                  
                  {/* Photo Count */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/70 text-white px-3 py-1">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      +53
                    </Badge>
                  </div>
                  
                  {/* Navigation */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : property.images.length - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex(prev => prev < property.images.length - 1 ? prev + 1 : 0)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Tabs */}
      <div className="sticky top-16 bg-white border-b shadow-sm z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'highlights', label: 'Highlights' },
              { id: 'around', label: 'Around This Project' },
              { id: 'more', label: 'More About Project' },
              { id: 'floor-plan', label: 'Floor Plan' },
              { id: 'tour', label: 'Tour' },
              { id: 'amenities', label: 'Amenities' },
              { id: 'contact', label: 'Contact Sellers' },
              { id: 'reviews', label: 'Ratings & Reviews' },
              { id: 'trends', label: 'Price Trends' },
              { id: 'brochure', label: 'Brochure' },
              { id: 'calculator', label: 'Calculator' },
              { id: 'locality', label: 'Locality' },
              { id: 'compare', label: 'Compare Properties' },
              { id: 'developer', label: 'About Developer' },
              { id: 'qa', label: 'Q&A' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeSection === tab.id
                    ? 'border-[#0056D2] text-[#0056D2]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Overview Section */}
        <section id="overview" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {property.projectInfo?.projectArea && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Building className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <div className="text-xl font-bold">{property.projectInfo.projectArea}</div>
                    <div className="text-sm text-gray-500">Project Area</div>
                  </div>
                )}
                {property.projectInfo?.buildings && property.projectInfo?.units && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Building2 className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <div className="text-xl font-bold">{property.projectInfo.buildings} / {property.projectInfo.units}</div>
                    <div className="text-sm text-gray-500">Buildings/Units</div>
                  </div>
                )}
                {property.projectInfo?.sizes && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <div className="text-xl font-bold">{property.projectInfo.sizes}</div>
                    <div className="text-sm text-gray-500">Sizes (SBA)</div>
                  </div>
                )}
                {property.projectInfo?.configurations && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Home className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <div className="text-xl font-bold">{property.projectInfo.configurations}</div>
                    <div className="text-sm text-gray-500">Configurations</div>
                  </div>
                )}
                {property.projectInfo?.launchDate && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <div className="text-xl font-bold">{property.projectInfo.launchDate}</div>
                    <div className="text-sm text-gray-500">Launch</div>
                  </div>
                )}
                {property.projectInfo?.possessionDate && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <div className="text-xl font-bold">{property.projectInfo.possessionDate}</div>
                    <div className="text-sm text-gray-500">Possession</div>
                  </div>
                )}
                {/* Fallback for properties without projectInfo */}
                {!property.projectInfo && (
                  <>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Square className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                      <div className="text-xl font-bold">{property.area}</div>
                      <div className="text-sm text-gray-500">Total Area</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Home className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                      <div className="text-xl font-bold">{property.beds} BHK</div>
                      <div className="text-sm text-gray-500">Configuration</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Car className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                      <div className="text-xl font-bold">{property.specifications.parking}</div>
                      <div className="text-sm text-gray-500">Parking</div>
                    </div>
                  </>
                )}
              </div>
              <div className="mb-6">
                <Badge variant="outline" className="px-3 py-1">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  RERA ID: {property.legalInfo?.rera || 'Not Available'}
                </Badge>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {property.description}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Highlights Section */}
        <section id="highlights" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Privacy spacing between towers ensuring maximum natural light and ventilation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Double-glazed windows for noise reduction and energy efficiency</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>1-acre clubhouse with premium amenities and recreational facilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>50+ world-class amenities including swimming pool, gym, and sports facilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Rain-fed water body for sustainable water management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>5-minute access to Kempegowda International Airport</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Around This Project Section */}
        <section id="around" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Around This Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="px-3 py-1">
                  <School className="w-3 h-3 mr-1" />
                  Schools
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  <Hospital className="w-3 h-3 mr-1" />
                  Hospitals
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Supermarkets
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  <Trees className="w-3 h-3 mr-1" />
                  Parks
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  <Train className="w-3 h-3 mr-1" />
                  Metro/Bus
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">{place.name}</span>
                    <span className="text-sm text-gray-600">{place.distance}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* More About Project Section */}
        <section id="more" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>More About Project</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tiles">
                  <AccordionTrigger>Tiles & Flooring</AccordionTrigger>
                  <AccordionContent>
                    Premium vitrified tiles in living areas, anti-skid tiles in bathrooms, and wooden flooring in bedrooms.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="fittings">
                  <AccordionTrigger>Fittings & Fixtures</AccordionTrigger>
                  <AccordionContent>
                    High-quality CP fittings, modular switches, and premium bathroom fixtures from renowned brands.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="kitchen">
                  <AccordionTrigger>Kitchen Platform</AccordionTrigger>
                  <AccordionContent>
                    Granite countertops with stainless steel sink, provision for water purifier, and modular kitchen setup.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="doors">
                  <AccordionTrigger>Doors & Windows</AccordionTrigger>
                  <AccordionContent>
                    Engineered wood doors with premium hardware, UPVC windows with mosquito mesh, and safety grills.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="green">
                  <AccordionTrigger>Green Features</AccordionTrigger>
                  <AccordionContent>
                    Solar water heating, rainwater harvesting, waste management system, and energy-efficient lighting.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Floor Plan Section */}
        <section id="floor-plan" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Floor Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {property.projectInfo?.configurations ? 
                  property.projectInfo.configurations.split('/').map((bhk) => (
                    <div key={bhk} className="border rounded-lg p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">{bhk} BHK</h3>
                      <p className="text-gray-600 mb-2">{property.price}</p>
                      <p className="text-sm text-gray-500 mb-4">{property.area}</p>
                      <div className="flex gap-2 mb-4">
                        <Button variant="outline" size="sm" className="flex-1">3D</Button>
                        <Button variant="outline" size="sm" className="flex-1">2D</Button>
                      </div>
                      <Button className="w-full">View Plan</Button>
                    </div>
                  )) :
                  // Fallback for properties without projectInfo
                  <div className="border rounded-lg p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">{property.beds} BHK</h3>
                    <p className="text-gray-600 mb-2">{property.price}</p>
                    <p className="text-sm text-gray-500 mb-4">{property.area}</p>
                    <div className="flex gap-2 mb-4">
                      <Button variant="outline" size="sm" className="flex-1">3D</Button>
                      <Button variant="outline" size="sm" className="flex-1">2D</Button>
                    </div>
                    <Button className="w-full">View Plan</Button>
                  </div>
                }
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tour Section */}
        <section id="tour" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Virtual Tour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-8 text-center mb-6">
                <Play className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">3D/360° Virtual Tour</h3>
                <p className="text-gray-600 mb-4">Experience the property from the comfort of your home</p>
                <Button className="bg-[#0056D2] hover:bg-[#0056D2]/90">
                  <Play className="w-4 h-4 mr-2" />
                  Start Virtual Tour
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {property.images.slice(0, 4).map((image, index) => (
                  <ImageWithFallback
                    key={index}
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Amenities Section */}
        <section id="amenities" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  { icon: '🏊', name: 'Swimming Pool' },
                  { icon: '💪', name: 'Gymnasium' },
                  { icon: '🎭', name: 'Amphitheatre' },
                  { icon: '🎮', name: "Children's Play Area" },
                  { icon: '🏛️', name: 'Clubhouse' },
                  { icon: '⚡', name: 'Power Backup' },
                  { icon: '💧', name: 'Rainwater Harvesting' },
                  { icon: '🚗', name: 'Covered Parking' },
                  { icon: '🌳', name: 'Landscaped Gardens' },
                  { icon: '🔒', name: '24/7 Security' },
                  { icon: '🏃', name: 'Jogging Track' },
                  { icon: '🎾', name: 'Sports Courts' }
                ].map((amenity) => (
                  <div key={amenity.name} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{amenity.icon}</span>
                    <span className="font-medium text-sm">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Sellers Section */}
        <section id="contact" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Contact Sellers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Input placeholder="Full Name" />
                  <Input placeholder="Phone Number" />
                  <Input placeholder="Email Address" />
                  <Textarea placeholder="Message" rows={4} />
                  <Button className="w-full bg-[#0056D2] hover:bg-[#0056D2]/90">
                    Send Message
                  </Button>
                  <p className="text-xs text-gray-500">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Ratings & Reviews Section */}
        <section id="reviews" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Ratings & Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-[#0056D2]">4.5</div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-5 h-5 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Locality Rating</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Pros</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Excellent connectivity to airport</li>
                    <li>• Premium amenities and facilities</li>
                    <li>• Reputed developer with track record</li>
                    <li>• Good investment potential</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">Cons</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Under construction project</li>
                    <li>• Distance from city center</li>
                    <li>• Limited public transport options</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Price Trends Section */}
        <section id="trends" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Price Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-2xl font-bold">₹8,500/sq.ft</div>
                <Badge className="bg-green-100 text-green-800">+12.5% YoY</Badge>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center text-gray-500 mb-4">Price trend chart placeholder</div>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-green-100 rounded flex items-end justify-between px-4 pb-4">
                  {[40, 60, 45, 70, 55, 80, 85].map((height, index) => (
                    <div key={index} className={`bg-[#0056D2] w-8 rounded-t`} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Brochure Section */}
        <section id="brochure" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Brochure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Project Brochure</h3>
                <p className="text-gray-600 mb-4">Download detailed information about the project (PDF, 2.5 MB)</p>
                <Button className="bg-[#0056D2] hover:bg-[#0056D2]/90">
                  <Download className="w-4 h-4 mr-2" />
                  View / Download Brochure
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Calculator Section */}
        <section id="calculator" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-6 text-center">
                  <Calculator className="w-12 h-12 mx-auto mb-4 text-[#0056D2]" />
                  <h3 className="font-semibold mb-2">EMI Calculator</h3>
                  <p className="text-sm text-gray-600 mb-4">Calculate your monthly EMI</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsEMIModalOpen(true)}
                  >
                    Calculate EMI
                  </Button>
                </div>
                <div className="border rounded-lg p-6 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-[#0056D2]" />
                  <h3 className="font-semibold mb-2">Affordability</h3>
                  <p className="text-sm text-gray-600 mb-4">Check what you can afford</p>
                  <Button variant="outline" className="w-full">Check Affordability</Button>
                </div>
                <div className="border rounded-lg p-6 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-[#0056D2]" />
                  <h3 className="font-semibold mb-2">Eligibility</h3>
                  <p className="text-sm text-gray-600 mb-4">Check loan eligibility</p>
                  <Button variant="outline" className="w-full">Check Eligibility</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Locality Section */}
        <section id="locality" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Locality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Infrastructure & Connectivity</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Devanahalli is rapidly emerging as North Bangalore's most promising residential destination. 
                    The area benefits from excellent connectivity via the upcoming metro line to the airport, 
                    proximity to the Peripheral Ring Road, and direct access to major IT hubs.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop"
                    alt="Locality infrastructure"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=200&fit=crop"
                    alt="Metro connectivity"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Compare Properties Section */}
        <section id="compare" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Compare Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">{property.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Price Range:</span>
                      <span className="font-medium">{property.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Configurations:</span>
                      <span className="font-medium">
                        {property.projectInfo?.configurations || `${property.beds} BHK`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Possession:</span>
                      <span className="font-medium">
                        {property.projectInfo?.possessionDate || property.specifications.age}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>RERA:</span>
                      <span className="font-medium">Approved</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-6 bg-gray-50">
                  <h3 className="font-semibold mb-4">Similar Project</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Price Range:</span>
                      <span className="font-medium">₹75L - ₹2.2Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Configurations:</span>
                      <span className="font-medium">2/3/4 BHK</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Possession:</span>
                      <span className="font-medium">Ready to Move</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RERA:</span>
                      <span className="font-medium">Approved</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* About Developer Section */}
        <section id="developer" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>About Developer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 bg-[#0056D2] rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                  {property.developer?.name ? property.developer.name.split(' ').map(word => word[0]).join('').slice(0, 2) : 'DV'}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{property.developer?.name || 'Developer Name'}</h3>
                  <p className="text-gray-600 mb-2">
                    Established: {property.developer?.established || '1990'} ({property.developer?.experience || '30+ years'})
                  </p>
                  <div className="flex gap-2">
                    {property.developer?.certifications ? 
                      property.developer.certifications.map((cert) => (
                        <Badge key={cert} className="bg-green-100 text-green-800">{cert}</Badge>
                      )) :
                      <>
                        <Badge className="bg-green-100 text-green-800">RERA Certified</Badge>
                        <Badge className="bg-blue-100 text-blue-800">ISO Certified</Badge>
                      </>
                    }
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {property.developer?.description || 'A trusted real estate developer with years of experience in delivering quality projects on time.'}
              </p>
              {property.developer?.notableProjects && (
                <div>
                  <h4 className="font-semibold mb-2">Notable Projects:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {property.developer.notableProjects.map((project) => (
                      <li key={project}>• {project}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Q&A Section */}
        <section id="qa" className="scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle>Q&A</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full mb-6">
                <AccordionItem value="possession">
                  <AccordionTrigger>When is the possession date?</AccordionTrigger>
                  <AccordionContent>
                    {property.projectInfo?.possessionDate ? 
                      `The project is scheduled for possession in ${property.projectInfo.possessionDate}. The construction is progressing as per schedule.` :
                      property.specifications.age === 'Ready to Move' ?
                        'The property is ready to move in immediately.' :
                        'Please contact the developer for possession timeline details.'
                    }
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rera">
                  <AccordionTrigger>Is the project RERA approved?</AccordionTrigger>
                  <AccordionContent>
                    Yes, the project is RERA approved with registration number {property.legalInfo.rera}.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="loan">
                  <AccordionTrigger>Is home loan available?</AccordionTrigger>
                  <AccordionContent>
                    {property.legalInfo.approvals.includes('Bank Loan Available') ?
                      'Yes, home loans are available from all major banks and financial institutions. The project is pre-approved by leading banks.' :
                      'Please check with your bank for loan eligibility and approval process.'
                    }
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="amenities">
                  <AccordionTrigger>What amenities are included?</AccordionTrigger>
                  <AccordionContent>
                    The project includes {property.amenities.join(', ')} and many more premium facilities.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Ask a Question
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
      
      <EMICalculatorModal 
        isOpen={isEMIModalOpen} 
        onClose={() => setIsEMIModalOpen(false)} 
      />
    </div>
  );
}