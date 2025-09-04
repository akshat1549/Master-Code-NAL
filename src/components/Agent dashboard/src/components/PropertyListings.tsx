import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Calendar, MapPin, Building, Bed, Square, X } from 'lucide-react';
import { Property } from '../types';
import PropertyDetailView from './PropertyDetailView';
import AddProperty from './AddProperty';
import { usePropertyContext } from '../context/PropertyContext';

interface PropertyListingsProps {
  onScheduleVisit?: (property: Property) => void;
}

const PropertyListings: React.FC<PropertyListingsProps> = ({ onScheduleVisit }) => {
  const { properties, deleteProperty } = usePropertyContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCloseDetailView = () => {
    setSelectedProperty(null);
  };

  const handleScheduleVisit = (property: Property) => {
    if (onScheduleVisit) {
      onScheduleVisit(property);
    }
    setSelectedProperty(null);
  };

  const handleAddProperty = () => {
    setShowAddProperty(true);
  };

  const handleCloseAddProperty = () => {
    setShowAddProperty(false);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowAddProperty(true);
  };

  const handleDeleteProperty = (propertyId: string) => {
    deleteProperty(propertyId);
    setSelectedProperty(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Sold':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // If showing add property form, render it
  if (showAddProperty) {
    return (
      <div className="space-y-6">
        {/* Add Property Form */}
        <AddProperty 
          onNavigateToDashboard={handleCloseAddProperty}
          editingProperty={editingProperty}
          onEditComplete={() => {
            setEditingProperty(null);
            setShowAddProperty(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Property Listings</h2>
            <p className="text-gray-600">Manage and view all your properties</p>
          </div>
          <button
            onClick={handleAddProperty}
            className="flex items-center space-x-2 px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                {property.status}
              </span>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{property.area}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-lg font-bold text-[#2B256D]">
                  <span className="text-lg font-bold text-[#2B256D]">₹</span>
                  <span>{property.price.replace('₹', '')}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedProperty(property)}
                  className="flex items-center space-x-2 px-3 py-2 text-[#2B256D] hover:bg-[#2B256D]/10 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">View Details</span>
                </button>
                <button
                  onClick={() => handleScheduleVisit(property)}
                  className="flex items-center space-x-2 px-3 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Schedule Visit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'All' 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first property'
            }
          </p>
          {!searchTerm && statusFilter === 'All' && (
            <button
              onClick={handleAddProperty}
              className="flex items-center space-x-2 px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Property</span>
            </button>
          )}
        </div>
      )}

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailView
          property={selectedProperty}
          onClose={handleCloseDetailView}
          onScheduleVisit={handleScheduleVisit}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />
      )}
    </div>
  );
};

export default PropertyListings;