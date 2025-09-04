import React from 'react';
import { User, Phone, Mail, Calendar, CheckCircle, Building, IndianRupee } from 'lucide-react';
import { mockAgent } from '../data/mockData';

const AgentProfile: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Agent Profile</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <div className="w-32 h-32 rounded-full border-4 border-[#2B256D]/20 bg-[#2B256D] text-white flex items-center justify-center text-5xl font-bold">
              {mockAgent.name?.charAt(0) || 'S'}
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold text-gray-900">{mockAgent.name}</h3>
              <div className="flex items-center space-x-2 mt-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-green-600">
                  KYC Verified
                </span>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="flex-1 space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-[#2B256D]" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{mockAgent.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{mockAgent.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="font-medium text-gray-900">January 15, 2023</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-500">Agent ID</p>
                    <p className="font-medium text-gray-900">{mockAgent.id}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Stats */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-[#2B256D]/10 to-[#2B256D]/20 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#2B256D] text-sm font-medium">Total Properties</p>
                      <p className="text-3xl font-bold text-[#2B256D]">{mockAgent.properties}</p>
                    </div>
                    <div className="w-12 h-12 bg-[#2B256D]/20 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-[#2B256D]" />
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Total Commission</p>
                      <p className="text-3xl font-bold text-green-900">₹{mockAgent.commission.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                      <IndianRupee className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* KYC Status Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Status</h3>
        <div className="p-4 rounded-lg border-2 border-green-200 bg-green-50">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-green-800">
                KYC Verified
              </p>
              <p className="text-sm text-green-600">
                Your KYC has been successfully verified. You have full access to all features.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-[#2B256D] rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">New property added</p>
              <p className="text-xs text-gray-600">3BHK Luxury Apartment in Bandra West</p>
            </div>
            <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Commission received</p>
              <p className="text-xs text-gray-600">₹25,000 for Cyber City plot sale</p>
            </div>
            <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Property visit scheduled</p>
              <p className="text-xs text-gray-600">Whitefield villa visit with Priya Patel</p>
            </div>
            <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;