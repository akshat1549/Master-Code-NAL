import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Building, Users, Calendar, MessageCircle, ChevronDown, ChevronRight, Eye, EyeOff, Home } from 'lucide-react';
import { mockAgent, mockVisits, mockMessages, mockCommissions, mockNotifications } from '../data/mockData';
import { usePropertyContext } from '../context/PropertyContext';

const Dashboard: React.FC = () => {
  const { properties } = usePropertyContext();
  const [collapsedSections, setCollapsedSections] = useState({
    stats: false,
    properties: false,
    activities: false,
    quickActions: false
  });

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Calculate property counts based on status
  const availableProperties = properties.filter(p => p.status === 'Available').length;
  const soldProperties = properties.filter(p => p.status === 'Sold').length;
  const pendingProperties = properties.filter(p => p.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#2B256D] to-[#4A3F8C] rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Suresh!</h1>
              <p className="text-white/80">Here's what's happening with your properties today</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Total Earnings */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-center min-w-[140px]">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-3xl font-bold text-white">₹</span>
                <span className="text-3xl font-bold text-white">5,000</span>
              </div>
              <p className="text-white/90 font-medium">Total Earnings</p>
            </div>
            
            {/* Properties Count */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-center min-w-[140px]">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Home className="w-6 h-6 text-white" />
                <span className="text-3xl font-bold text-white">{properties.length}</span>
              </div>
              <p className="text-white/90 font-medium">Properties</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Collapsible */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Performance Statistics</h2>
          <button
            onClick={() => toggleSection('stats')}
            className="flex items-center space-x-2 text-[#2B256D] hover:text-[#4A3F8C] transition-colors"
          >
            {collapsedSections.stats ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {collapsedSections.stats ? 'Show' : 'Hide'}
            </span>
          </button>
        </div>
        {!collapsedSections.stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-[#2B256D]/10 to-[#2B256D]/20 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#2B256D] text-sm font-medium">Total Properties</p>
                  <p className="text-3xl font-bold text-[#2B256D]">{properties.length}</p>
                  <p className="text-[#2B256D] text-sm">+{properties.length - 3} from last month</p>
                </div>
                <div className="w-12 h-12 bg-[#2B256D]/20 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-[#2B256D]" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Available Properties</p>
                  <p className="text-3xl font-bold text-green-900">{availableProperties}</p>
                  <p className="text-green-600 text-sm">+{availableProperties - 1} from last month</p>
                </div>
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Sold Properties</p>
                  <p className="text-3xl font-bold text-blue-900">{soldProperties}</p>
                  <p className="text-blue-600 text-sm">+{soldProperties - 1} from last month</p>
                </div>
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Pending Properties</p>
                  <p className="text-3xl font-bold text-yellow-900">{pendingProperties}</p>
                  <p className="text-yellow-600 text-sm">+{pendingProperties - 1} from last month</p>
                </div>
                <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Properties - Collapsible */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Properties</h2>
          <button
            onClick={() => toggleSection('properties')}
            className="flex items-center space-x-2 text-[#2B256D] hover:text-[#4A3F8C] transition-colors"
          >
            {collapsedSections.properties ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {collapsedSections.properties ? 'Expand' : 'Collapse'}
            </span>
          </button>
        </div>
        {!collapsedSections.properties && (
          <div className="space-y-4">
            {properties.slice(0, 3).map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{property.title}</h3>
                    <p className="text-sm text-gray-600">{property.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-[#2B256D]">{property.price}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    property.status === 'Available' ? 'bg-green-100 text-green-800' :
                    property.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {property.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions - Collapsible */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <button
            onClick={() => toggleSection('quickActions')}
            className="flex items-center space-x-2 text-[#2B256D] hover:text-[#4A3F8C] transition-colors"
          >
            {collapsedSections.quickActions ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {collapsedSections.quickActions ? 'Expand' : 'Collapse'}
            </span>
          </button>
        </div>
        {!collapsedSections.quickActions && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-[#2B256D]/10 rounded-lg hover:bg-[#2B256D]/20 transition-colors">
              <Building className="w-6 h-6 text-[#2B256D]" />
              <span className="font-medium text-[#2B256D]">Add New Property</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Calendar className="w-6 h-6 text-green-600" />
              <span className="font-medium text-green-700">Schedule Visit</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-blue-700">Send Message</span>
            </button>
          </div>
        )}
      </div>

      {/* Recent Activities - Collapsible */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
          <button
            onClick={() => toggleSection('activities')}
            className="flex items-center space-x-2 text-[#2B256D] hover:text-[#4A3F8C] transition-colors"
          >
            {collapsedSections.activities ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {collapsedSections.activities ? 'Expand' : 'Collapse'}
            </span>
          </button>
        </div>
        {!collapsedSections.activities && (
          <div className="space-y-4">
            {properties.length > 3 && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-[#2B256D] rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New property added</p>
                  <p className="text-xs text-gray-600">{properties[0]?.title}</p>
                </div>
                <span className="text-xs text-gray-500 ml-auto">Just now</span>
              </div>
            )}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Property sold</p>
                <p className="text-xs text-gray-600">Commercial Plot in Cyber City</p>
              </div>
              <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Visit scheduled</p>
                <p className="text-xs text-gray-600">Independent Villa in Whitefield</p>
              </div>
              <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;