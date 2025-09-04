import { useState } from "react";
import { Property } from "../data/properties";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Navigation, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface PropertyMapProps {
  properties: Property[];
  currentIndex?: number;
}

export function PropertyMap({ properties, currentIndex = 0 }: PropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapView, setMapView] = useState<'satellite' | 'roadmap'>('roadmap');

  // Remove internal navigation functions as they're handled externally

  // Mock coordinates for demonstration - in real app, you'd geocode addresses
  const getPropertyCoordinates = (property: Property) => {
    const baseCoords = {
      "Devanahalli": { lat: 13.2431, lng: 77.7085 },
      "Whitefield": { lat: 12.9698, lng: 77.7500 },
      "Sector 106": { lat: 28.4595, lng: 77.0266 },
      "Kolshet Road": { lat: 19.2183, lng: 72.9781 }
    };
    
    const locationKey = Object.keys(baseCoords).find(key => 
      property.location.includes(key)
    ) as keyof typeof baseCoords;
    
    const base = baseCoords[locationKey] || { lat: 12.9716, lng: 77.5946 };
    
    // Add small random offset for multiple properties in same area
    return {
      lat: base.lat + (Math.random() - 0.5) * 0.01,
      lng: base.lng + (Math.random() - 0.5) * 0.01
    };
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Property Locations
          </CardTitle>
          <div className="text-xs text-gray-500">
            {properties.length > 0 && `${currentIndex + 1} / ${properties.length}`}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 min-h-0">
        <div className="relative w-full h-full bg-gray-100 rounded overflow-hidden">
          {/* Mock Map Interface */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Property Markers */}
            {properties.map((property, index) => {
              const coords = getPropertyCoordinates(property);
              const x = ((coords.lng + 180) / 360) * 100;
              const y = ((90 - coords.lat) / 180) * 100;
              
              return (
                <div
                  key={property.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${Math.max(5, Math.min(95, x))}%`,
                    top: `${Math.max(5, Math.min(95, y))}%`
                  }}
                  onClick={() => {
                    setSelectedProperty(property);
                  }}
                >
                  <div className={`relative ${selectedProperty?.id === property.id ? 'z-20' : 'z-10'}`}>
                    <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-all ${
                      selectedProperty?.id === property.id 
                        ? 'bg-red-600 scale-125' 
                        : index === currentIndex
                        ? 'bg-orange-600'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {selectedProperty?.id === property.id && (
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-lg shadow-xl border p-3 z-30">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t rotate-45"></div>
                        
                        <div className="flex gap-3">
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{property.title}</h4>
                            <p className="text-xs text-gray-600 mb-1">{property.location}</p>
                            <div className="flex items-center gap-1 mb-1">
                              {property.verified && (
                                <Badge className="bg-green-600 text-white text-xs px-1 py-0">Verified</Badge>
                              )}
                              <Badge className="bg-blue-600 text-white text-xs px-1 py-0">{property.riblScore}</Badge>
                            </div>
                            <div className="text-sm font-bold text-blue-600">{property.price}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2 pt-2 border-t">
                          <div className="text-xs text-gray-500">
                            {property.beds}B • {property.baths}B • {property.area}
                          </div>
                          <Button size="sm" className="text-xs px-2 py-1 h-6">
                            View
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button size="sm" variant="outline" className="bg-white shadow h-8 w-8 p-0">
                +
              </Button>
              <Button size="sm" variant="outline" className="bg-white shadow h-8 w-8 p-0">
                -
              </Button>
            </div>
            
            {/* Property Count */}
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow px-3 py-2">
              <div className="text-xs font-semibold">{properties.length} Properties</div>
            </div>
            
            {/* Current Property Indicator */}
            {properties.length > 0 && (
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow px-3 py-2">
                <div className="text-xs font-semibold">Viewing: {currentIndex + 1} / {properties.length}</div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}