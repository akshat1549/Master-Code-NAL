import React from 'react';
import { Bell } from 'lucide-react';
import { mockAgent, mockNotifications } from '../data/mockData';

const Header: React.FC = () => {
  const unreadNotifications = mockNotifications.filter(n => !n.isRead).length;

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">Agent Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button 
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
          
          {/* Agent Info */}
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 rounded-full bg-[#2B256D] text-white flex items-center justify-center font-semibold">
              {mockAgent.name?.charAt(0) || 'S'}
            </div>
            <div className="text-left hidden sm:block">
              <p className="font-medium text-gray-900">{mockAgent.name}</p>
              <p className="text-sm text-gray-500">Agent</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;