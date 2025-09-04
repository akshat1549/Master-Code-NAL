import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Heart, MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Property {
  id: number;
  title: string;
  price_formatted: string;
  city: string;
  state: string;
  beds: number;
  baths: number;
  area_sqft: number;
  ribl_rating?: string;
  status: string;
}

function PropertyCard({ property }: { property: Property }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer" onClick={handleCardClick}>
      <div className="relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-[#00BFA6] text-white">NAL Verified</Badge>
          {property.status === 'Urgent Sale' && (
            <Badge variant="destructive">Urgent Sale</Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-white text-gray-900 font-bold">
            RIBL {property.ribl_rating || ''}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{property.title}</h3>
        <div className="text-xl font-bold text-[#0056D2] mb-2">{property.price_formatted}</div>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.city}, {property.state}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {property.beds > 0 && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>{property.beds} Beds</span>
              </div>
            )}
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.baths} Baths</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.area_sqft.toLocaleString()} sq ft</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost/Master-Code-NAL/api/properties.php');
      const data = await response.json();
      if (data.success) {
        setProperties(data.data.slice(0, 12)); // Show only 12 properties
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading properties...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover handpicked properties verified by our experts with complete transparency
          </p>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-8">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="fresh">Fresh</TabsTrigger>
            <TabsTrigger value="urgent">Urgent</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="text-center">
              <Button 
                onClick={() => window.location.href = '/properties'}
                className="bg-[#0056D2] hover:bg-[#0056D2]/90 px-8 py-3"
              >
                View More Properties
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.slice(1).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fresh" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="urgent" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.filter(p => p.status === 'Urgent Sale').map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}