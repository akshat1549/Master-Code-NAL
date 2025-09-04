import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MapPin, Plus, CheckCircle, XCircle, Eye } from 'lucide-react';
import { mockVisits } from '../data/mockData';

const ScheduleVisits: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVisit, setNewVisit] = useState({
    propertyTitle: '',
    clientName: '',
    clientPhone: '',
    date: '',
    time: '',
    type: 'buyer' as 'buyer' | 'seller'
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-[#2B256D]/10 text-[#2B256D]';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New visit scheduled:', newVisit);
    setShowAddForm(false);
    setNewVisit({
      propertyTitle: '',
      clientName: '',
      clientPhone: '',
      date: '',
      time: '',
      type: 'buyer'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Schedule Visits</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] focus:ring-2 focus:ring-[#2B256D] focus:ring-offset-2 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule New Visit
          </button>
        </div>

        {/* Add Visit Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule New Visit</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                  <input
                    type="text"
                    value={newVisit.propertyTitle}
                    onChange={(e) => setNewVisit(prev => ({ ...prev, propertyTitle: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
                    placeholder="Enter property title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                  <input
                    type="text"
                    value={newVisit.clientName}
                    onChange={(e) => setNewVisit(prev => ({ ...prev, clientName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
                    placeholder="Enter client name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Phone</label>
                  <input
                    type="tel"
                    value={newVisit.clientPhone}
                    onChange={(e) => setNewVisit(prev => ({ ...prev, clientPhone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={newVisit.date}
                      onChange={(e) => setNewVisit(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      value={newVisit.time}
                      onChange={(e) => setNewVisit(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visit Type</label>
                  <select
                    value={newVisit.type}
                    onChange={(e) => setNewVisit(prev => ({ ...prev, type: e.target.value as 'buyer' | 'seller' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#2B256D] text-white py-2 px-4 rounded-lg hover:bg-[#4A3F8C] focus:ring-2 focus:ring-[#2B256D] focus:ring-offset-2 transition-colors"
                  >
                    Schedule Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Visits List */}
        <div className="space-y-4">
          {mockVisits.map((visit) => (
            <div key={visit.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{visit.propertyTitle}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(visit.status)}`}>
                      {getStatusIcon(visit.status)}
                      {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>{visit.clientName}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{visit.clientPhone}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(visit.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{visit.time}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Buyer
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex items-center px-3 py-2 text-[#2B256D] hover:text-[#4A3F8C] hover:bg-[#2B256D]/10 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                  {visit.status.toLowerCase() === 'scheduled' && (
                    <button className="flex items-center px-3 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {mockVisits.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No visits scheduled</h3>
            <p className="text-gray-500 mb-4">Schedule your first property visit to get started.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] focus:ring-2 focus:ring-[#2B256D] focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Visit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleVisits;