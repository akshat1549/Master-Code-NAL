import { useState, useMemo, useEffect } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Search, MapPin, Bed, Bath, Square, Filter, Heart, Share2 } from "lucide-react";
import { properties as defaultProperties, Property } from "../data/properties";
import { PropertyMap } from "./PropertyMap";
import { Link } from "react-router-dom";

export function PropertyListing() {
  const [properties, setProperties] = useState<Property[]>(defaultProperties);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedBHK, setSelectedBHK] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);

  useEffect(() => {
    // Use default properties for now
    setProperties(defaultProperties);
  }, []);

  // Extract unique cities from properties
  const cities = useMemo(() => {
    const citySet = new Set(properties.map(p => p.location.split(',')[0].trim()));
    return Array.from(citySet);
  }, [properties]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let filtered = properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCity = selectedCity === "all" || 
                         property.location.toLowerCase().includes(selectedCity.toLowerCase());
      
      const matchesBHK = selectedBHK === "all" || 
                        property.beds.toString() === selectedBHK;
      
      const matchesPrice = priceRange === "all" || checkPriceRange(property.price, priceRange);
      
      return matchesSearch && matchesCity && matchesBHK && matchesPrice;
    });

    // Sort properties
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
        break;
      case "newest":
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        break;
    }

    return filtered;
  }, [properties, searchQuery, selectedCity, selectedBHK, priceRange, sortBy]);

  const extractPrice = (priceStr: string): number => {
    const match = priceStr.match(/₹([\d.]+)\s*([LCr])/);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    const unit = match[2];
    return unit === 'Cr' ? value * 10000000 : value * 100000;
  };

  const checkPriceRange = (priceStr: string, range: string): boolean => {
    const price = extractPrice(priceStr);
    switch (range) {
      case "under-50l":
        return price < 5000000;
      case "50l-1cr":
        return price >= 5000000 && price < 10000000;
      case "1cr-2cr":
        return price >= 10000000 && price < 20000000;
      case "above-2cr":
        return price >= 20000000;
      default:
        return true;
    }
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by property name, location, or builder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBHK} onValueChange={setSelectedBHK}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="BHK" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All BHK</SelectItem>
                <SelectItem value="1">1 BHK</SelectItem>
                <SelectItem value="2">2 BHK</SelectItem>
                <SelectItem value="3">3 BHK</SelectItem>
                <SelectItem value="4">4 BHK</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-50l">Under ₹50L</SelectItem>
                <SelectItem value="50l-1cr">₹50L - ₹1Cr</SelectItem>
                <SelectItem value="1cr-2cr">₹1Cr - ₹2Cr</SelectItem>
                <SelectItem value="above-2cr">Above ₹2Cr</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto text-sm text-gray-600">
              {filteredProperties.length} properties found
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Loading properties...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-280px)]">
            {/* Map Section */}
            <div className="h-full">
              <PropertyMap properties={filteredProperties} currentIndex={currentPropertyIndex} />
            </div>

            {/* Properties List */}
            <div className="h-full overflow-y-auto space-y-4">
              {filteredProperties.map((property, index) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPropertyIndex(index)}>
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {property.verified && (
                        <Badge className="absolute top-2 left-2 bg-green-500">
                          Verified
                        </Badge>
                      )}
                      {property.urgent && (
                        <Badge className="absolute top-2 right-2 bg-red-500">
                          Urgent
                        </Badge>
                      )}
                      <div className="absolute bottom-2 right-2 flex gap-1">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white/80">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white/80">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{property.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {property.riblScore}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      
                      <div className="text-2xl font-bold text-blue-600 mb-3">
                        {property.price}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.beds} Beds
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          {property.baths} Baths
                        </div>
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          {property.area}
                        </div>
                      </div>
                      
                      <Link to={`/property/${property.id}`}>
                        <Button className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg">No properties found matching your criteria</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}