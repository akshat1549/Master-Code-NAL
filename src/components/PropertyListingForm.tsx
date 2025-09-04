import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Home, FileText, Target, MapPin, Camera, CheckCircle, 
  Upload, Plus, X, Edit, Share, Eye, ArrowLeft, ArrowRight 
} from "lucide-react";

interface PropertyFormData {
  // Step 1: Basic Details
  title: string;
  propertyType: string;
  bhkConfig: string;
  area: string;
  price: string;
  description: string;
  
  // Step 2: Documents
  documents: { [key: string]: File[] };
  
  // Step 3: Listing Intent
  listingIntent: string;
  rentAmount?: string;
  deposit?: string;
  enableBidding: boolean;
  startingBid?: string;
  increment?: string;
  endDate?: string;
  amenities: string[];
  
  // Step 4: Location
  address: string;
  state: string;
  city: string;
  pincode: string;
  landmark: string;
  latitude?: string;
  longitude?: string;
  
  // Step 5: Media
  images: File[];
  coverImage?: number;
  video?: File;
}

const PROPERTY_TYPES = [
  "Apartment", "Villa", "Plot", "Commercial Space", "Office", "Shop", "Warehouse", "Farmhouse"
];

const BHK_OPTIONS = [
  "1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"
];

const DOCUMENT_CATEGORIES = [
  "Ownership Documents", "Government Approvals", "Tax Receipts", 
  "NOC Certificates", "Floor Plans", "Other Documents"
];

const AMENITIES = [
  "Swimming Pool", "Gymnasium", "Parking", "24/7 Security", "Garden", 
  "Elevator", "Balcony", "Air Conditioning", "Furnished", "Power Backup",
  "Water Supply", "Internet", "Clubhouse", "Children's Play Area"
];

export function PropertyListingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    propertyType: "",
    bhkConfig: "",
    area: "",
    price: "",
    description: "",
    documents: {},
    listingIntent: "",
    enableBidding: false,
    amenities: [],
    address: "",
    state: "",
    city: "",
    pincode: "",
    landmark: "",
    images: [],
  });

  const [selectedDocCategories, setSelectedDocCategories] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [listingId] = useState("NAL" + Math.random().toString(36).substr(2, 9).toUpperCase());

  const steps = [
    { number: 1, title: "Basic Details", icon: Home },
    { number: 2, title: "Documents", icon: FileText },
    { number: 3, title: "Listing Intent", icon: Target },
    { number: 4, title: "Location", icon: MapPin },
    { number: 5, title: "Media", icon: Camera },
    { number: 6, title: "Review & Submit", icon: CheckCircle },
  ];

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleDocumentUpload = (category: string, files: FileList | null) => {
    if (files) {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [category]: Array.from(files)
        }
      }));
    }
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)]
      }));
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 py-12 min-h-full">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="text-center">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Property Listed Successfully!
              </h2>
              <p className="text-gray-600 mb-2">Your listing ID is:</p>
              <Badge variant="outline" className="text-lg px-4 py-2 mb-8">
                {listingId}
              </Badge>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#0056D2] hover:bg-[#0056D2]/90">
                  <Eye className="w-4 h-4 mr-2" />
                  View Listing
                </Button>
                <Button variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Share Listing
                </Button>
                <Button variant="outline" onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    title: "",
                    propertyType: "",
                    bhkConfig: "",
                    area: "",
                    price: "",
                    description: "",
                    documents: {},
                    listingIntent: "",
                    enableBidding: false,
                    amenities: [],
                    address: "",
                    state: "",
                    city: "",
                    pincode: "",
                    landmark: "",
                    images: [],
                  });
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Another Listing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-teal-50 py-8 min-h-full">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">List Your Property</h1>
          <p className="text-gray-600">Follow the simple steps to list your property on NAL India</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                  currentStep >= step.number 
                    ? 'bg-[#0056D2] border-[#0056D2] text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.number ? 'bg-[#0056D2]' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Step {currentStep}: {steps[currentStep - 1].title}
            </h2>
          </div>
        </div>

        {/* Form Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter property name"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Property Type *</Label>
                    <Select value={formData.propertyType} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, propertyType: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROPERTY_TYPES.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>BHK Configuration *</Label>
                    <Select value={formData.bhkConfig} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, bhkConfig: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select BHK" />
                      </SelectTrigger>
                      <SelectContent>
                        {BHK_OPTIONS.map(bhk => (
                          <SelectItem key={bhk} value={bhk}>{bhk}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">Area (sq ft) *</Label>
                    <Input
                      id="area"
                      placeholder="Enter area in square feet"
                      value={formData.area}
                      onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      placeholder="Enter price in rupees"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Property Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of your property..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Documents */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Please select at least 3 document categories and upload relevant documents. 
                    Accepted formats: PDF, DOC, DOCX, JPG, PNG
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Select Document Categories (minimum 3) *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {DOCUMENT_CATEGORIES.map(category => (
                      <div key={category} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedDocCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedDocCategories(prev => [...prev, category]);
                              } else {
                                setSelectedDocCategories(prev => prev.filter(c => c !== category));
                              }
                            }}
                          />
                          <Label htmlFor={category} className="font-medium">{category}</Label>
                        </div>
                        
                        {selectedDocCategories.includes(category) && (
                          <div className="ml-6 space-y-2">
                            <Input
                              type="file"
                              multiple
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => handleDocumentUpload(category, e.target.files)}
                              className="text-sm"
                            />
                            {formData.documents[category] && (
                              <div className="text-xs text-gray-600">
                                {formData.documents[category].length} file(s) uploaded
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Listing Intent */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Listing Intent *</Label>
                  <RadioGroup
                    value={formData.listingIntent}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, listingIntent: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sale" id="sale" />
                      <Label htmlFor="sale">For Sale</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rent" id="rent" />
                      <Label htmlFor="rent">For Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label htmlFor="urgent">Urgent Sale</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.listingIntent === 'rent' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rentAmount">Monthly Rent (₹)</Label>
                      <Input
                        id="rentAmount"
                        placeholder="Enter monthly rent"
                        value={formData.rentAmount || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, rentAmount: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deposit">Security Deposit (₹)</Label>
                      <Input
                        id="deposit"
                        placeholder="Enter security deposit"
                        value={formData.deposit || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, deposit: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bidding"
                      checked={formData.enableBidding}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, enableBidding: !!checked }))
                      }
                    />
                    <Label htmlFor="bidding" className="font-medium">Enable Bidding</Label>
                  </div>

                  {formData.enableBidding && (
                    <div className="ml-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startingBid">Starting Bid (₹)</Label>
                        <Input
                          id="startingBid"
                          placeholder="Starting bid amount"
                          value={formData.startingBid || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, startingBid: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="increment">Increment (₹)</Label>
                        <Input
                          id="increment"
                          placeholder="Bid increment"
                          value={formData.increment || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, increment: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Property Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {AMENITIES.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Location */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Complete Property Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter complete address with building name, street, area..."
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                    id="landmark"
                    placeholder="Enter nearby landmark (optional)"
                    value={formData.landmark}
                    onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      placeholder="Enter latitude (optional)"
                      value={formData.latitude || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      placeholder="Enter longitude (optional)"
                      value={formData.longitude || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Interactive Map Preview</p>
                  <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">Map will be displayed here</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Media */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Property Images *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload multiple property images (interior and exterior views)
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{formData.images.length} image(s) uploaded</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <div className="aspect-square bg-gray-200 rounded border flex items-center justify-center">
                              <Camera className="w-6 h-6 text-gray-400" />
                            </div>
                            <Button
                              size="sm"
                              variant={formData.coverImage === index ? "default" : "outline"}
                              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs"
                              onClick={() => setFormData(prev => ({ ...prev, coverImage: index }))}
                            >
                              {formData.coverImage === index ? "Cover" : "Set Cover"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Property Video (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload a property video for better engagement
                    </p>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        video: e.target.files?.[0] 
                      }))}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  {formData.video && (
                    <p className="text-sm text-green-600">Video uploaded: {formData.video.name}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 6: Review & Submit */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Review Your Listing</h3>
                  <p className="text-sm text-blue-800">
                    Please review all the details before submitting your property listing.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Home className="w-5 h-5 mr-2" />
                        Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>Title:</strong> {formData.title || "Not provided"}</p>
                      <p><strong>Type:</strong> {formData.propertyType || "Not selected"}</p>
                      <p><strong>Configuration:</strong> {formData.bhkConfig || "Not selected"}</p>
                      <p><strong>Area:</strong> {formData.area || "Not provided"} sq ft</p>
                      <p><strong>Price:</strong> ₹{formData.price || "Not provided"}</p>
                      <p><strong>Intent:</strong> {formData.listingIntent || "Not selected"}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">
                        {selectedDocCategories.length} categories selected
                      </p>
                      <div className="space-y-1">
                        {selectedDocCategories.map(category => (
                          <Badge key={category} variant="outline" className="mr-1 mb-1">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Amenities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">
                        {formData.amenities.length} amenities selected
                      </p>
                      <div className="space-y-1">
                        {formData.amenities.slice(0, 6).map(amenity => (
                          <Badge key={amenity} variant="outline" className="mr-1 mb-1">
                            {amenity}
                          </Badge>
                        ))}
                        {formData.amenities.length > 6 && (
                          <Badge variant="outline">+{formData.amenities.length - 6} more</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>Address:</strong> {formData.address || "Not provided"}</p>
                      <p><strong>City:</strong> {formData.city || "Not provided"}</p>
                      <p><strong>State:</strong> {formData.state || "Not provided"}</p>
                      <p><strong>Pincode:</strong> {formData.pincode || "Not provided"}</p>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Camera className="w-5 h-5 mr-2" />
                        Media
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p><strong>Images:</strong> {formData.images.length} uploaded</p>
                          <p><strong>Video:</strong> {formData.video ? "1 uploaded" : "None"}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setCurrentStep(5)}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit Media
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I accept the <span className="text-blue-600 underline cursor-pointer">Terms & Conditions</span> and 
                      confirm that all information provided is accurate.
                    </Label>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < 6 ? (
            <Button onClick={handleNext} className="bg-[#0056D2] hover:bg-[#0056D2]/90 flex items-center">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Listing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}