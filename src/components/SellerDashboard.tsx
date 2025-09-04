import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Home, Building, Calendar, MessageCircle, FileText, 
  Shield, TrendingUp, BarChart3, Settings, Bell,
  Star, IndianRupee, Eye, Users, Camera
} from "lucide-react";

export function SellerDashboard() {
  const [sellerName, setSellerName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("sellerLoggedIn");
    const name = localStorage.getItem("sellerName");
    
    if (!isLoggedIn) {
      navigate("/seller");
      return;
    }
    
    setSellerName(name || "Seller");
  }, [navigate]);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Building, label: "My Properties" },
    { icon: Camera, label: "Property Photos" },
    { icon: Users, label: "Interested Buyers" },
    { icon: Calendar, label: "Viewings" },
    { icon: MessageCircle, label: "Messages" },
    { icon: FileText, label: "Documents" },
    { icon: TrendingUp, label: "Market Analysis" },
    { icon: BarChart3, label: "Property Insights" },
    { icon: Settings, label: "Settings" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("sellerLoggedIn");
    localStorage.removeItem("sellerName");
    navigate("/seller");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-sm text-gray-600">Property Management</p>
        </div>
        
        <nav className="px-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                item.active 
                  ? "bg-[#3B4CB8] text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Seller Dashboard</h2>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
                <Badge className="bg-red-500 text-white ml-1">2</Badge>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#3B4CB8] rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div>
                  <p className="font-medium">{sellerName}</p>
                  <p className="text-sm text-gray-600">Property Owner</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#3B4CB8] to-[#5B6BC8] rounded-lg p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Welcome back, {sellerName}!</h3>
                  <p className="text-white/80">Manage your properties and track buyer interest</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Card className="bg-green-500 text-white border-0">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <IndianRupee className="w-4 h-4" />
                      <span className="text-2xl font-bold">45L</span>
                    </div>
                    <p className="text-sm">Property Value</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-500 text-white border-0">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-2xl font-bold">12</span>
                    </div>
                    <p className="text-sm">Interested Buyers</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Property Statistics */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold">Property Overview</h4>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Listed Properties</p>
                      <p className="text-3xl font-bold text-purple-900">2</p>
                      <p className="text-sm text-purple-600">Active listings</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-green-600">Property Views</p>
                      <p className="text-3xl font-bold text-green-900">156</p>
                      <p className="text-sm text-green-600">This month</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Scheduled Visits</p>
                      <p className="text-3xl font-bold text-blue-900">8</p>
                      <p className="text-sm text-blue-600">This week</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Offers Received</p>
                      <p className="text-3xl font-bold text-yellow-900">3</p>
                      <p className="text-sm text-yellow-600">Pending review</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h5 className="text-lg font-semibold mb-4">Recent Property Activity</h5>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">New property view</p>
                      <p className="text-sm text-gray-600">Modern Apartment - Bandra West</p>
                    </div>
                    <span className="text-sm text-gray-500">2 min ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Visit scheduled</p>
                      <p className="text-sm text-gray-600">Luxury Villa - Juhu</p>
                    </div>
                    <span className="text-sm text-gray-500">1 hour ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Offer received</p>
                      <p className="text-sm text-gray-600">₹42L for Modern Apartment</p>
                    </div>
                    <span className="text-sm text-gray-500">3 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h5 className="text-lg font-semibold mb-4">Quick Actions</h5>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="h-20 flex-col gap-2 bg-[#3B4CB8] hover:bg-[#3B4CB8]/90">
                    <Building className="w-6 h-6" />
                    <span className="text-sm">Add Property</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Camera className="w-6 h-6" />
                    <span className="text-sm">Upload Photos</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="w-6 h-6" />
                    <span className="text-sm">Schedule Visit</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <TrendingUp className="w-6 h-6" />
                    <span className="text-sm">Market Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}