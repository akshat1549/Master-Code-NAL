
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  propertyInterest: string;
  budget?: number;
  status: 'new' | 'contacted' | 'viewing' | 'negotiating' | 'closed' | 'lost';
  priority: 'low' | 'medium' | 'high';
  lastContactedAt?: string;
  createdAt: string;
  messages?: Message[];
}

interface Message {
  id: string;
  text: string;
  sender: 'lead' | 'agent';
  timestamp: string;
}

const statusColors = {
  new: 'bg-green-100 text-green-800',
  contacted: 'bg-blue-100 text-blue-800',
  viewing: 'bg-purple-100 text-purple-800',
  negotiating: 'bg-orange-100 text-orange-800',
  closed: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const priorityLabels = {
  high: 'HOT',
  medium: 'WARM',
  low: 'NEW',
};

export default function LeadsSection() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const leads: Lead[] = [
    {
      id: '1',
      name: 'Rahul Verma',
      email: 'rahul@example.com',
      phone: '+91-98765-43210',
      propertyInterest: '3BHK Premium Apartment - Koramangala',
      budget: 28000000,
      status: 'new',
      priority: 'high',
      lastContactedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Anita Sharma',
      email: 'anita@example.com',
      phone: '+91-99887-66554',
      propertyInterest: '4BHK Villa - Whitefield',
      budget: 42000000,
      status: 'contacted',
      priority: 'medium',
      lastContactedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Vikram Rao',
      email: 'vikram@example.com',
      phone: '+91-91234-56780',
      propertyInterest: '2BHK Modern Flat - Electronic City',
      budget: 16000000,
      status: 'viewing',
      priority: 'low',
      lastContactedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];

  // Add sample messages for demo
  const leadsWithMessages = leads.map(lead => ({
    ...lead,
    messages: [
      {
        id: '1',
        text: `Hi, I am interested in your ${lead.propertyInterest}.`,
        sender: 'lead' as const,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: '2',
        text: 'Hello! Thank you for your interest. The property is available and ready for immediate possession.',
        sender: 'agent' as const,
        timestamp: new Date(Date.now() - 3000000).toISOString(),
      },
      {
        id: '3',
        text: 'Great! What is the exact location and can I get the floor plan?',
        sender: 'lead' as const,
        timestamp: new Date(Date.now() - 2400000).toISOString(),
      },
      {
        id: '4',
        text: 'Sure! It is located on 100 Feet Road, Koramangala 5th Block. Let me share the floor plan.',
        sender: 'agent' as const,
        timestamp: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: '5',
        text: 'Is the property available for site visit this weekend?',
        sender: 'lead' as const,
        timestamp: new Date(Date.now() - 600000).toISOString(),
      },
    ]
  }));

  const filteredLeads = leadsWithMessages.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.propertyInterest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedLead) return;
    
    // In a real app, you would send this to the backend
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'agent',
      timestamp: new Date().toISOString(),
    };
    
    setNewMessage('');
  };

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold">Lead Management CRM</h3>
          <Badge className="bg-blue-100 text-blue-800 text-xs">AI Insights</Badge>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-sm border rounded px-2 py-1">
            <option>All Leads</option>
            <option>Hot Leads</option>
            <option>New Leads</option>
          </select>
          <Button variant="outline" size="sm">
            <i className="fas fa-filter mr-1"></i> Filter
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Lead List */}
        <div className="lg:col-span-1">
          <Card className="h-[70vh] flex flex-col rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <Input
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              {filteredLeads.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  No leads available. Start by adding your first property to attract inquiries.
                </div>
              ) : (
                <div className="divide-y">
                  {filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedLead?.id === lead.id
                          ? 'bg-blue-50 ring-1 ring-blue-400'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedLead(lead)}
                      data-testid={`lead-item-${lead.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-semibold">
                            {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          {lead.priority === 'high' && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium truncate" data-testid={`text-lead-name-${lead.id}`}>
                              {lead.name}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatTime(lead.lastContactedAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge 
                              className={`${priorityColors[lead.priority]} text-[10px] px-1.5 py-0`}
                              data-testid={`badge-priority-${lead.id}`}
                            >
                              {priorityLabels[lead.priority]}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{lead.propertyInterest}</p>
                          <p className="text-xs text-gray-500">
                            {lead.messages && lead.messages.length > 0 
                              ? lead.messages[lead.messages.length - 1].text.substring(0, 50) + '...'
                              : 'No messages yet'
                            }
                          </p>
                          <p className="text-xs text-blue-600 font-medium">
                            {lead.budget ? `₹${(lead.budget / 100000).toFixed(1)}L` : 'Budget not specified'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Conversation */}
        <div className="lg:col-span-2">
          {selectedLead ? (
            <Card className="h-[70vh] flex flex-col rounded-xl shadow-sm">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-semibold">
                      {selectedLead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedLead.name}</h3>
                      <p className="text-sm text-gray-600">{selectedLead.propertyInterest}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <i className="fas fa-phone mr-1"></i> Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <i className="fas fa-calendar mr-1"></i> Schedule Tour
                    </Button>
                    <Button variant="ghost" size="sm">
                      <i className="fas fa-ellipsis-h"></i>
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {selectedLead.messages?.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'agent'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'agent' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatMessageTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500">WhatsApp integration enabled</span>
                  <div className="ml-auto flex gap-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      Quick Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Templates
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm">
                    <i className="fas fa-paperclip"></i>
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-[70vh] flex items-center justify-center rounded-xl shadow-sm">
              <div className="text-center text-gray-500">
                <i className="fas fa-comments text-4xl mb-4 text-gray-300"></i>
                <p className="text-lg font-medium">Select a lead to start conversation</p>
                <p className="text-sm">Choose a lead from the list to view their messages and respond</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
