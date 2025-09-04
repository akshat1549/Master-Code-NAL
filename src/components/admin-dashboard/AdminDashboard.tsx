import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  Home, Users, Building, FileText, Shield, TrendingUp, 
  BarChart3, Settings, Bell, Search, ChevronDown,
  UserCheck, AlertTriangle, IndianRupee, Eye,
  CheckCircle, XCircle, Clock, MapPin, Filter
} from "lucide-react";

export function AdminDashboard() {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    const name = localStorage.getItem("adminName");
    
    if (!isLoggedIn) {
      navigate("/admin");
      return;
    }
    
    setAdminName(name || "Admin");
  }, [navigate]);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "Users" },
    { icon: Building, label: "Properties" },
    { icon: FileText, label: "Documents" },
    { icon: Shield, label: "Compliance" },
    { icon: TrendingUp, label: "Analytics" },
    { icon: BarChart3, label: "Campaigns" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Settings" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminName");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0056D2] rounded-lg flex items-center justify-center text-white font-bold">
              N
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">NAL</h1>
              <p className="text-xs text-gray-600">Admin Panel</p>
            </div>
          </div>
        </div>
        
        <nav className="px-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                item.active 
                  ? "bg-[#0056D2] text-white" 
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
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Users</span>
                <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Properties</span>
                <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Documents</span>
                <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Compliance</span>
                <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Analytics</span>
                <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Campaigns</span>
                <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Reports</span>
                <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Settings</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
                <Badge className="bg-red-500 text-white ml-1">3</Badge>
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0056D2] rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div>
                  <p className="font-medium">{adminName}</p>
                  <p className="text-sm text-gray-600">Administrator</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Overview Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Active Users</p>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Properties Listed</p>
                    <p className="text-2xl font-bold">3,456</p>
                    <p className="text-xs text-green-600">+8% from last month</p>
                  </div>
                  <Building className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Verified Documents</p>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-xs text-green-600">+2% from last month</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Leads Generated</p>
                    <p className="text-2xl font-bold">892</p>
                    <p className="text-xs text-green-600">+15% from last month</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue This Month</p>
                    <p className="text-2xl font-bold">₹2.4L</p>
                    <p className="text-xs text-green-600">+18% from last month</p>
                  </div>
                  <IndianRupee className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* System Alerts Panel */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Fraud Alert</p>
                    <p className="text-xs text-gray-600">Suspicious activity detected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Compliance Warning</p>
                    <p className="text-xs text-gray-600">RERA documents pending</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">System Maintenance</p>
                    <p className="text-xs text-gray-600">Scheduled for tonight</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User & Role Management */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Input placeholder="Search users..." className="w-48" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Amit Singh</p>
                        <p className="text-sm text-gray-600">Agent • KYC Verified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Active</Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Priya Sharma</p>
                        <p className="text-sm text-gray-600">Buyer • KYC Pending</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Pending</Badge>
                      <Button variant="outline" size="sm">Approve</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Rajesh Kumar</p>
                        <p className="text-sm text-gray-600">Seller • KYC Verified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Active</Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Property Listings Oversight */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Property Listings Oversight</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    Heatmap
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div>
                      <p className="font-medium">Luxury Villa in Gurgaon</p>
                      <p className="text-sm text-gray-600">ID: #P001 • Gurgaon • Amit Singh</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">Views: 234</span>
                        <span className="text-xs text-gray-500">Leads: 12</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <Button variant="outline" size="sm">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div>
                      <p className="font-medium">Modern Apartment in Mumbai</p>
                      <p className="text-sm text-gray-600">ID: #P002 • Mumbai • Priya Sharma</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">Views: 156</span>
                        <span className="text-xs text-gray-500">Leads: 8</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    <Button variant="outline" size="sm">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Verification & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Verification Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Sale Deed - Property #P001</p>
                        <p className="text-sm text-gray-600">Submitted 2 hours ago</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Clock className="w-3 h-3 mr-1" />
                      In Review
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">EC Certificate - Property #P002</p>
                        <p className="text-sm text-gray-600">Submitted 1 day ago</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">User Growth</span>
                    <span className="text-sm font-medium text-green-600">+12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Property Listings</span>
                    <span className="text-sm font-medium text-blue-600">+8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Revenue Growth</span>
                    <span className="text-sm font-medium text-purple-600">+18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '82%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t px-6 py-4 mt-8">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>About</span>
              <span>Help</span>
              <span>Contact</span>
              <span>Privacy Policy</span>
              <span>Terms</span>
            </div>
            <p>NAL India – Verified. Trusted. Transparent Real Estate.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}