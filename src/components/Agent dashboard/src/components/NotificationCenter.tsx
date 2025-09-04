import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, TrendingUp, MessageSquare, Calendar, FileCheck, Trash2 } from 'lucide-react';
import { mockNotifications } from '../data/mockData';

const NotificationCenter: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredNotifications = mockNotifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileCheck className="w-5 h-5 text-blue-600" />;
      case 'visit':
        return <Calendar className="w-5 h-5 text-green-600" />;
      case 'commission':
        return <TrendingUp className="w-5 h-5 text-purple-600" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string, read: boolean) => {
    const baseColors = {
      document: 'border-l-blue-500',
      visit: 'border-l-green-500',
      commission: 'border-l-purple-500',
      message: 'border-l-orange-500',
      default: 'border-l-gray-500'
    };

    const bgColor = read ? 'bg-white' : 'bg-blue-50';
    const borderColor = baseColors[type as keyof typeof baseColors] || baseColors.default;
    
    return `${bgColor} ${borderColor}`;
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <span className="ml-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="document">Document Updates</option>
              <option value="visit">Visit Reminders</option>
              <option value="commission">Commission Updates</option>
              <option value="message">Messages</option>
            </select>
            
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
              Mark All as Read
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`border-l-4 rounded-lg p-4 ${getNotificationColor(notification.type, notification.read)} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`text-sm font-medium ${
                        notification.read ? 'text-gray-900' : 'text-gray-900 font-semibold'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                      
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        notification.type === 'document' ? 'bg-blue-100 text-blue-800' :
                        notification.type === 'visit' ? 'bg-green-100 text-green-800' :
                        notification.type === 'commission' ? 'bg-purple-100 text-purple-800' :
                        notification.type === 'message' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {!notification.read && (
                    <button className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-full transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">
              {filter === 'unread' 
                ? "You're all caught up! No unread notifications." 
                : "No notifications match your current filter."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;