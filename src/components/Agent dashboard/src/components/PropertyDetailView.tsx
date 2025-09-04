import React from 'react';
import { X, MapPin, Square, Bed, Calendar, Building2, GraduationCap, Utensils, ShoppingBag, Train, Bus, Edit, Trash2, Share2, Download } from 'lucide-react';

interface PropertyDetailViewProps {
  property: {
    id: string;
    title: string;
    price: string;
    status: 'Available' | 'Pending' | 'Sold';
    location: string;
    area: string;
    bedrooms: string;
    addedDate: string;
    image: string;
    description?: string;
    amenities?: string[];
    nearbyLocations?: Array<{
      name: string;
      type: string;
      distance: string;
    }>;
  };
  onClose: () => void;
  onScheduleVisit?: (property: any) => void;
  onEdit?: (property: any) => void;
  onDelete?: (propertyId: string) => void;
}

const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ 
  property, 
  onClose, 
  onScheduleVisit, 
  onEdit, 
  onDelete 
}) => {
  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'metro':
        return <Train className="w-5 h-5 text-[#2B256D]" />;
      case 'transport':
        return <Bus className="w-5 h-5 text-[#2B256D]" />;
      case 'hospital':
        return <Building2 className="w-5 h-5 text-[#2B256D]" />;
      case 'school':
        return <GraduationCap className="w-5 h-5 text-[#2B256D]" />;
      case 'restaurant':
        return <Utensils className="w-5 h-5 text-[#2B256D]" />;
      case 'shopping':
        return <ShoppingBag className="w-5 h-5 text-[#2B256D]" />;
      default:
        return <MapPin className="w-5 h-5 text-[#2B256D]" />;
    }
  };

  const handleScheduleVisit = () => {
    if (onScheduleVisit) {
      onScheduleVisit(property);
    }
    onClose();
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(property);
    }
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      onDelete(property.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Edit Property"
            >
              <Edit className="w-4 h-4" />
              <span className="text-sm font-medium">Edit</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title="Delete Property"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Delete</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {property.status}
                </span>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{property.price}</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#2B256D]" />
                    <span className="text-gray-700">{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Square className="w-5 h-5 text-[#2B256D]" />
                    <span className="text-gray-700">{property.area}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Bed className="w-5 h-5 text-[#2B256D]" />
                    <span className="text-gray-700">{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-[#2B256D]" />
                    <span className="text-gray-700">{property.addedDate}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleScheduleVisit}
                className="w-full bg-[#2B256D] text-white py-3 px-6 rounded-lg hover:bg-[#4A3F8C] transition-colors font-medium"
              >
                Schedule Visit
              </button>
            </div>
          </div>

          {/* Property Description */}
          {property.description && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Description</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
          )}

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#2B256D] rounded-full"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Locations */}
          {property.nearbyLocations && property.nearbyLocations.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nearby Locations</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.nearbyLocations.map((location, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 border border-[#2B256D]/20 bg-white rounded flex items-center justify-center">
                        {getLocationIcon(location.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{location.name}</p>
                        <p className="text-sm text-gray-600">{location.distance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleScheduleVisit}
              className="flex-1 bg-[#2B256D] text-white py-3 px-6 rounded-lg hover:bg-[#4A3F8C] transition-colors font-medium"
            >
              Schedule Visit
            </button>
            <a
              href={property.image}
              download
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Download Brochure
            </a>
            <button
              onClick={async () => {
                const shareText = `${property.title} • ${property.location}`;
                const shareUrl = window.location.href;
                try {
                  // @ts-ignore
                  if (navigator.share) {
                    // @ts-ignore
                    await navigator.share({ title: property.title, text: shareText, url: shareUrl });
                  } else {
                    await navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
                    alert('Share link copied to clipboard');
                  }
                } catch (e) {
                  console.error(e);
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={handleEdit}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Edit Property
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailView;
