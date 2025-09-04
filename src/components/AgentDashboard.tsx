import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './Agent dashboard/src/components/Sidebar';
import Header from './Agent dashboard/src/components/Header';
import Dashboard from './Agent dashboard/src/components/Dashboard';
import PropertyListings from './Agent dashboard/src/components/PropertyListings';
import ScheduleVisits from './Agent dashboard/src/components/ScheduleVisits';
import CommunicationPanel from './Agent dashboard/src/components/CommunicationPanel';
import DocumentTracker from './Agent dashboard/src/components/DocumentTracker';
import DigitalVault from './Agent dashboard/src/components/DigitalVault';
import CommissionSummary from './Agent dashboard/src/components/CommissionSummary';
import Settings from './Agent dashboard/src/components/Settings';
import Analytics from './Agent dashboard/src/components/Analytics';
import Clients from './Agent dashboard/src/components/Clients';
import { PropertyProvider } from './Agent dashboard/src/context/PropertyContext';

const AgentDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleScheduleVisit = () => {
    navigate('/agent/dashboard/visits');
  };

  return (
    <PropertyProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 sticky top-0 h-screen shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1">
            <Header />
            <main className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/properties" element={<PropertyListings onScheduleVisit={handleScheduleVisit} />} />
                <Route path="/visits" element={<ScheduleVisits />} />
                <Route path="/messages" element={<CommunicationPanel />} />
                <Route path="/documents" element={<DocumentTracker />} />
                <Route path="/digital-vault" element={<DigitalVault />} />
                <Route path="/commissions" element={<CommissionSummary />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/clients" element={<Clients />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </PropertyProvider>
  );
};

export default AgentDashboard;
