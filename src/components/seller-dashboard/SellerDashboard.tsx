import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Home, Building, Calendar, MessageCircle, FileText,
  Shield, TrendingUp, BarChart3, Settings, Bell,
  ChevronDown, ChevronRight
} from "lucide-react";
import {
  IndianRupee,
  Star,
  Users,
  Eye,
  Camera,
  List,
  LayoutGrid,
  Upload,
  Plus,
  CheckCircle2,
  Clock3,
  Edit,
  Share2,
  Copy,
  Pin,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import DashboardOverview from "./pages/DashboardOverview";
import MyPropertiesAdd from "./pages/MyPropertiesAdd";
import MyPropertiesManage from "./pages/MyPropertiesManage";
import BookingVisitRequests from "./pages/BookingVisitRequests";
import BookingAuctionHold from "./pages/BookingAuctionHold";
import BookingFlashSale from "./pages/BookingFlashSale";
import LeadsInquiries from "./pages/LeadsInquiries";
import AuctionBidding from "./pages/AuctionBidding";
import AdCampaigns from "./pages/AdCampaigns";
import InstantVerification from "./pages/InstantVerification";
import AnalyticsInsights from "./pages/AnalyticsInsights";
import ValuationTools from "./pages/ValuationTools";
import FinancialsTransactions from "./pages/FinancialsTransactions";

export function SellerDashboard() {
  const [sellerName, setSellerName] = useState("");
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();

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
    { icon: Home, label: "Overview" },
    {
      icon: Building,
      label: "My Properties",
      children: [
        { label: "Add New Property" },
        { label: "Manage Properties" }
      ]
    },
    {
      icon: Calendar,
      label: "Booking & Scheduling",
      children: [
        { label: "Property Visit Requests" },
        { label: "Auction Hold & Confirmation" },
        { label: "Urgent / Flash Sale Visits" }
      ]
    },
    { icon: MessageCircle, label: "Leads & Inquiries" },
    { icon: BarChart3, label: "Auction / Bidding" },
    { icon: TrendingUp, label: "Ad Campaigns" },
    { icon: Shield, label: "Instant Verification" },
    { icon: BarChart3, label: "Analytics & Market Insights" },
    { icon: FileText, label: "Valuation Tools" },
    { icon: IndianRupee, label: "Financials & Transactions" },
    { icon: Settings, label: "Settings" }
  ];

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3B4CB8] text-white flex items-center justify-center text-lg font-bold">N</div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">NAL INDIA</h1>
              <p className="text-sm text-gray-600">Agent Portal</p>
            </div>
          </div>
        </div>
        
        <nav className="px-4 space-y-2">
          {sidebarItems.map((item) => {
            const hasChildren = (item as any).children && (item as any).children.length > 0;
            const slug = item.label.toLowerCase().replace(/ & /g, "-").replace(/\s+|\//g, "-");
            const isOpen = hasChildren && (openMenus[item.label] || location.pathname.includes(slug));
            const isActive = location.pathname.includes(slug) || (slug === "overview" && location.pathname.endsWith("/dashboard"));
            return (
              <div key={item.label}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleMenu(item.label);
                    } else {
                      navigate(`/seller/dashboard/${slug}`);
                    }
                  }}
                  className={`relative w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-colors border ${
                    isActive
                      ? "bg-indigo-50 text-[#1f2a6b] border-indigo-100"
                      : "text-gray-700 hover:bg-gray-50 border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </span>
                  {hasChildren && (
                    isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                  )}
                  {isActive && (
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-2 bg-[#3B4CB8] rounded-full" />
                  )}
                </button>
                {hasChildren && isOpen && (
                  <div className="ml-10 mt-1 space-y-1">
                    {(item as any).children.map((child: { label: string }) => (
                      <button
                        key={child.label}
                        onClick={() => {
                          const parent = item.label.toLowerCase().replace(/ & /g, "-").replace(/\s+|\//g, "-");
                          const childPath = child.label.toLowerCase().replace(/ & /g, "-").replace(/\s+|\//g, "-");
                          setOpenMenus((prev) => ({ ...prev, [item.label]: true }));
                          navigate(`/seller/dashboard/${parent}/${childPath}`);
                        }}
                        className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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

        {/* Routes */}
        <div className="p-6">
          <Routes>
            <Route path="" element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<DashboardOverview sellerName={sellerName} />} />
            <Route path="my-properties/add-new-property" element={<MyPropertiesAdd />} />
            <Route path="my-properties/manage-properties" element={<MyPropertiesManage />} />
            <Route path="booking-scheduling/property-visit-requests" element={<BookingVisitRequests />} />
            <Route path="booking-scheduling/auction-hold-confirmation" element={<BookingAuctionHold />} />
            <Route path="booking-scheduling/urgent-flash-sale-visits" element={<BookingFlashSale />} />
            <Route path="leads-inquiries" element={<LeadsInquiries />} />
            <Route path="auction-bidding" element={<AuctionBidding />} />
            <Route path="ad-campaigns" element={<AdCampaigns />} />
            <Route path="instant-verification" element={<InstantVerification />} />
            <Route path="analytics-market-insights" element={<AnalyticsInsights />} />
            <Route path="valuation-tools" element={<ValuationTools />} />
            <Route path="financials-transactions" element={<FinancialsTransactions />} />
          </Routes>
        </div>
        
      </div>
    </div>
  );
}


