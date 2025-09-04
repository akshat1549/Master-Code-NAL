import React, { useRef, useState } from 'react';
import { Users, FileText, Link as LinkIcon, TrendingUp } from 'lucide-react';
import { mockClients, properties, mockContracts } from '../data/mockData';

const Clients: React.FC = () => {
  // Simple insights: count properties per client
  const clientPropertyCounts: Record<string, number> = mockClients.reduce((acc, c) => {
    acc[c.id] = c.propertyIds.length;
    return acc;
  }, {} as Record<string, number>);

  const [contracts, setContracts] = useState(mockContracts);
  const [showUploader, setShowUploader] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFile = () => fileInputRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFileName(file.name);
  };

  const onSaveAgreement = () => {
    if (!selectedClientId || !selectedFileName) return;
    const newContract = {
      id: `ct_${Date.now()}`,
      clientId: selectedClientId,
      propertyId: selectedPropertyId || undefined,
      name: selectedFileName,
      uploadDate: new Date().toISOString().slice(0, 10),
    };
    setContracts(prev => [newContract, ...prev]);
    setSelectedClientId('');
    setSelectedPropertyId('');
    setSelectedFileName('');
    setShowUploader(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center"><Users className="w-6 h-6 mr-2"/> Client Profiles</h2>
        <p className="text-gray-600 mb-4">Maintain details of property owners.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockClients.map(client => (
            <div key={client.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-600">{client.email}</p>
                  <p className="text-sm text-gray-600">{client.phone}</p>
                </div>
                <div className="text-xs bg-[#2B256D] text-white px-2 py-1 rounded">{clientPropertyCounts[client.id]} properties</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center"><LinkIcon className="w-5 h-5 mr-2"/> Property-to-Client Mapping</h2>
        <p className="text-gray-600 mb-4">See which property belongs to which client.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-4">Property</th>
                <th className="py-2 pr-4">Client</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(p => {
                const owner = mockClients.find(c => c.propertyIds.includes(p.id));
                return (
                  <tr key={p.id} className="border-t">
                    <td className="py-2 pr-4">{p.title}</td>
                    <td className="py-2 pr-4">{owner ? owner.name : '—'}</td>
                    <td className="py-2 pr-4">{p.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center"><FileText className="w-5 h-5 mr-2"/> Contracts / Agreements</h2>
        <p className="text-gray-600 mb-4">Upload and manage client-agent agreements.</p>
        {showUploader && (
          <div className="mb-4 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="px-3 py-2 border rounded">
                <option value="">Select Client</option>
                {mockClients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <select value={selectedPropertyId} onChange={(e) => setSelectedPropertyId(e.target.value)} className="px-3 py-2 border rounded">
                <option value="">Optional: Link Property</option>
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
              <div className="flex items-center">
                <input ref={fileInputRef} type="file" onChange={onFileChange} className="hidden" />
                <button type="button" onClick={triggerFile} className="px-3 py-2 border rounded bg-white hover:bg-gray-100">Choose File</button>
                <span className="ml-3 text-sm text-gray-700 truncate">{selectedFileName || 'No file chosen'}</span>
              </div>
            </div>
            <div className="mt-3 flex gap-3">
              <button type="button" onClick={() => setShowUploader(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Cancel</button>
              <button type="button" disabled={!selectedClientId || !selectedFileName} onClick={onSaveAgreement} className="px-4 py-2 bg-[#2B256D] text-white rounded disabled:opacity-50">Save Agreement</button>
            </div>
          </div>
        )}
        <div className="space-y-2">
          {contracts.map(ct => {
            const client = mockClients.find(c => c.id === ct.clientId);
            const prop = properties.find(p => p.id === ct.propertyId);
            return (
              <div key={ct.id} className="p-3 bg-gray-50 rounded border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{ct.name}</p>
                    <p className="text-sm text-gray-600">{client?.name} {prop ? `• ${prop.title}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500">{ct.uploadDate}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3">
          <button onClick={() => setShowUploader(true)} className="px-4 py-2 bg-[#2B256D] text-white rounded hover:bg-[#4A3F8C]">Upload Agreement</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center"><TrendingUp className="w-5 h-5 mr-2"/> Client Insights</h2>
        <p className="text-gray-600 mb-4">Which client’s listings perform best (views, inquiries).</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockClients.map(c => (
            <div key={c.id} className="p-4 border rounded">
              <p className="font-semibold text-gray-900">{c.name}</p>
              <p className="text-sm text-gray-600">Listings: {clientPropertyCounts[c.id]}</p>
              <p className="text-xs text-gray-500">Insights placeholder (views/inquiries)</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
