import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PropertyListings from './components/PropertyListings';
import ScheduleVisits from './components/ScheduleVisits';
import CommunicationPanel from './components/CommunicationPanel';
import DocumentTracker from './components/DocumentTracker';
import DigitalVault from './components/DigitalVault';
import CommissionSummary from './components/CommissionSummary';
import Settings from './components/Settings';
import Analytics from './components/Analytics';
import Clients from './components/Clients';
import { PropertyProvider } from './context/PropertyContext';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <PropertyListings onScheduleVisit={() => setActiveView('visits')} />;
      case 'visits':
        return <ScheduleVisits />;
      case 'messages':
        return <CommunicationPanel />;
      case 'documents':
        return <DocumentTracker />;
      case 'digital-vault':
        return <DigitalVault />;
      case 'commissions':
        return <CommissionSummary />;
      case 'settings':
        return <Settings />;
      case 'analytics':
        return <Analytics />;
      case 'clients':
        return <Clients />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <PropertyProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar with floating collapse/expand button */}
          <div className={`relative sticky top-0 h-screen shrink-0 ${collapsed ? 'w-20' : 'w-64'}`}>
            <Sidebar activeView={activeView} onViewChange={setActiveView} collapsed={collapsed} />
            <button
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={() => setCollapsed(prev => !prev)}
              className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-8 h-8 rounded-full shadow-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
            >
              {/* Chevron changes direction based on state */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-700">
                {collapsed ? (
                  <path d="M9 6l6 6-6 6" />
                ) : (
                  <path d="M15 18l-6-6 6-6" />
                )}
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <Header />
            <main className="p-6">
              {renderActiveView()}
            </main>
          </div>
        </div>
      </div>
    </PropertyProvider>
  );
};

export default App;