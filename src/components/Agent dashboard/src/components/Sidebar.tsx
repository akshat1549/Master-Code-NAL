import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Building, Users, Calendar, MessageCircle, FileText, BarChart3, Settings, Shield, TrendingUp } from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'properties', label: 'Properties', icon: Building },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'visits', label: 'Site Visits', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'documents', label: 'Document Tracker', icon: FileText },
    { id: 'digital-vault', label: 'Digital Vault', icon: Shield },
    { id: 'analytics', label: 'Analytics & Reports', icon: TrendingUp },
    { id: 'commissions', label: 'Commissions', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const [logoError, setLogoError] = useState(false);
  const [logoIdx, setLogoIdx] = useState(0);
  const logoCandidates = ['/nal.jpg', '/Public/nal.jpg', '/nal-logo.png'];
  const currentLogo = logoCandidates[logoIdx];

  return (
    <div className={`bg-white shadow-lg h-full overflow-y-hidden ${collapsed ? 'w-20 p-4' : 'w-64 p-6'}`}>
      <div className="mb-8 flex items-center justify-start">
        {!logoError ? (
          <img
            src={currentLogo}
            alt="New Age Land"
            className={`${collapsed ? 'w-12 h-12' : 'w-16 h-16'} rounded-md object-contain`}
            onError={() => {
              if (logoIdx < logoCandidates.length - 1) {
                setLogoIdx(logoIdx + 1);
              } else {
                setLogoError(true);
              }
            }}
          />
        ) : (
          <div className={`${collapsed ? 'w-12 h-12' : 'w-16 h-16'} rounded-md bg-[#2B256D] text-white flex items-center justify-center font-bold`}>NAL</div>
        )}
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(`/agent/dashboard/${item.id === 'dashboard' ? '' : item.id}`)}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                location.pathname === `/agent/dashboard/${item.id === 'dashboard' ? '' : item.id}` || 
                (item.id === 'dashboard' && location.pathname === '/agent/dashboard')
                  ? 'bg-[#0056D2] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-200">
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#2B256D] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">S</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Suresh Kumar</p>
              <p className="text-sm text-gray-600">Real Estate Agent</p>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="w-10 h-10 bg-[#2B256D] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">S</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;