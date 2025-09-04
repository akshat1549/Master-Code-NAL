import { Button } from "./ui/button";
import { User, ChevronDown, Crown, Check, Heart, Eye, Bookmark, FileText, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export function Header() {
  const [showPremiumDropdown, setShowPremiumDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate logged in state

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="NAL India" className="w-12 h-12 rounded-lg object-contain" />
              <span className="ml-2 text-xl font-bold text-gray-900">NAL India</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-8 sm:space-x-8 lg:space-x-16">
            <Link
              to="/properties"
              className="text-gray-700 hover:text-[#0056D2] px-3 py-2 text-sm font-medium transition-colors"
            >
              Properties
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-[#0056D2] px-3 py-2 text-sm font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-[#0056D2] px-3 py-2 text-sm font-medium transition-colors"
            >
              Contact Us
            </Link>
            <div className="relative">
              <button
                onMouseEnter={() => setShowPremiumDropdown(true)}
                onMouseLeave={() => setShowPremiumDropdown(false)}
                className="flex items-center text-gray-700 hover:text-[#0056D2] px-3 py-2 text-sm font-medium transition-colors"
              >
                NAL Premium
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              {showPremiumDropdown && (
                <div 
                  className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  onMouseEnter={() => setShowPremiumDropdown(true)}
                  onMouseLeave={() => setShowPremiumDropdown(false)}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Crown className="w-5 h-5 text-yellow-500" />
                      <h3 className="text-base font-bold text-gray-900">NAL Premium</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Pay Zero Commission | Save Time & Money</p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-gray-700">Contact 30 Owners</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-gray-700">Premium Properties</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-gray-700">Priority Support</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-gray-700">Advanced Filters</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-[#0056D2] hover:bg-[#0056D2]/90 text-white text-sm h-8">
                      Join Now
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/list-property">
              <Button size="sm" className="bg-[#0056D2] hover:bg-[#0056D2]/90 text-white">
                Post Property
              </Button>
            </Link>
            {!isLoggedIn ? (
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            ) : (
              <div className="relative">
                <button
                  onMouseEnter={() => setShowProfileDropdown(true)}
                  onMouseLeave={() => setShowProfileDropdown(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#0056D2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">JD</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">John Doe</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showProfileDropdown && (
                  <div 
                    className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    onMouseEnter={() => setShowProfileDropdown(true)}
                    onMouseLeave={() => setShowProfileDropdown(false)}
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0056D2] rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">JD</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">John Doe</h3>
                          <p className="text-sm text-gray-500">john.doe@email.com</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <Link to="/profile/wishlisted" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                        <Heart className="w-4 h-4" />
                        Wishlisted Properties
                      </Link>
                      <Link to="/profile/viewed" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                        <Eye className="w-4 h-4" />
                        Viewed Properties
                      </Link>
                      <Link to="/profile/saved" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                        <Bookmark className="w-4 h-4" />
                        Saved Properties
                      </Link>
                      <Link to="/profile/requested" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                        <FileText className="w-4 h-4" />
                        Requested Properties
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <Link to="/profile/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <button 
                          onClick={() => setIsLoggedIn(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}