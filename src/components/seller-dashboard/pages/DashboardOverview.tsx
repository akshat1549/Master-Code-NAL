
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";

type OverviewSectionProps = {
  sellerName?: string;
};

export default function OverviewSection(_: OverviewSectionProps) {
  const stats = {
    activeListings: 24,
    totalViews: 45200,
    newLeads: 187,
    riblScore: 47,
    verificationPercentage: 92,
  };

  const pipeline = {
    new: 23,
    contacted: 45,
    viewing: 0,
    negotiating: 18,
    closed: 12,
  };

  // Mock properties data for the table
  const properties = [
    {
      id: '1',
      title: '3BHK Premium Apartment',
      location: 'Koramangala, Bangalore',
      price: '₹2.8 Cr',
      riblScore: 'A+',
      verification: 'verified',
      views: 1234,
      leads: 23,
    },
    {
      id: '2',
      title: '4BHK Villa with Garden',
      location: 'Whitefield, Bangalore',
      price: '₹4.2 Cr',
      riblScore: 'A',
      verification: 'pending',
      views: 856,
      leads: 15,
    },
    {
      id: '3',
      title: '2BHK Modern Flat',
      location: 'Electronic City, Bangalore',
      price: '₹1.6 Cr',
      riblScore: 'B+',
      verification: 'verified',
      views: 567,
      leads: 8,
    },
    {
      id: '4',
      title: '5BHK Independent House',
      location: 'JP Nagar, Bangalore',
      price: '₹3.5 Cr',
      riblScore: 'A+',
      verification: 'under_review',
      views: 789,
      leads: 19,
    },
  ];

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">✓ Verified</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">⚠ Pending</span>;
      case 'under_review':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">📋 Under Review</span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Pending</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Premium Seller
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeListings}
                </p>
                <p className="text-green-600 text-sm mt-2">+2 from last month</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-home text-blue-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(stats.totalViews / 1000).toFixed(1)}K
                </p>
                <p className="text-green-600 text-sm mt-2">+12% from last week</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-eye text-green-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">New Leads</p>
                <div className="relative inline-block">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.newLeads}
                  </p>
                  <span className="absolute -top-2 -right-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                    23
                  </span>
                </div>
                <p className="text-green-600 text-sm mt-2">+8 today</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-user-plus text-orange-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">RIBL Score Avg</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(stats.riblScore / 10).toFixed(1)}
                </p>
                <p className="text-green-600 text-sm mt-2">+0.2 improvement</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-star text-yellow-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Verification</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.verificationPercentage}%
                </p>
                <p className="text-gray-600 text-sm mt-2">3 pending docs</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-shield-check text-green-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Lead Pipeline Status */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <CardHeader className="pb-4 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">Lead Pipeline Status</CardTitle>
            <Button variant="outline" size="sm" className="text-blue-600 border border-blue-600 hover:bg-blue-100 text-xs py-1 px-2 rounded">
              Live Updates
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
                {pipeline.new}
              </div>
              <p className="text-sm font-medium text-gray-900">New</p>
              <p className="text-xs text-gray-600">Leads</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
                {pipeline.contacted}
              </div>
              <p className="text-sm font-medium text-gray-900">Contacted</p>
              <p className="text-xs text-gray-600">Leads</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
                {pipeline.viewing}
              </div>
              <p className="text-sm font-medium text-gray-900">Negotiation</p>
              <p className="text-xs text-gray-600">Leads</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
                {pipeline.closed}
              </div>
              <p className="text-sm font-medium text-gray-900">Closed</p>
              <p className="text-xs text-gray-600">Leads</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Listings */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <CardHeader className="pb-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold">My Listings</CardTitle>
              <p className="text-sm text-gray-600">4 Properties</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-gray-700 border border-gray-300 hover:bg-gray-100">
                <i className="fas fa-upload mr-2"></i>
                Batch Upload
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <i className="fas fa-plus mr-2"></i>
                Add New Property
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <Button variant="outline" size="sm" className="bg-gray-200 text-black border border-gray-300 hover:bg-gray-300">
              <i className="fas fa-table mr-2"></i>
              Table View
            </Button>
            <Button variant="outline" size="sm" className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
              <i className="fas fa-th-large mr-2"></i>
              Grid View
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Property</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Price & RIBL</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Verification</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <i className="fas fa-image text-gray-400"></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{property.title}</p>
                          <p className="text-sm text-gray-600">{property.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{property.price}</p>
                        <p className="text-sm text-green-600">RIBL {property.riblScore}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getVerificationBadge(property.verification)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <i className="fas fa-eye text-gray-400 text-sm"></i>
                          <span className="text-sm text-gray-600">{property.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="fas fa-users text-gray-400 text-sm"></i>
                          <span className="text-sm text-gray-600">{property.leads}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-700 p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5h2M12 7v10m-1 0h2m-1 0v2m-1-2h2" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-700 p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16h16" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-700 p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-700 p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 p-0 hover:text-red-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
