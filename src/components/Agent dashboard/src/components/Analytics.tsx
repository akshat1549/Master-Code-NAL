import React, { useState, useRef } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building, 
  CreditCard, 
  Calendar, 
  Mail, 
  Download,
  Filter,
  Calendar as CalendarIcon,
  MapPin,
  Home,
  Eye,
  Phone,
  MessageCircle,
  Share2,
  FileText,
  PieChart,
  Activity,
  Target,
  DollarSign,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Search,
  RefreshCw,
  Settings,
  Share,
  Printer,
  Check,
  X
} from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';

interface AnalyticsProps {}

const Analytics: React.FC<AnalyticsProps> = () => {
  const { properties } = usePropertyContext();
  const [activeTab, setActiveTab] = useState('sales');
  const [dateRange, setDateRange] = useState('30');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedPropertyType, setSelectedPropertyType] = useState('All');
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showExportModal, setShowExportModal] = useState(false);
  const exportRef = useRef<HTMLAnchorElement>(null);

  const tabs = [
    { id: 'sales', label: 'Sales & Performance', icon: TrendingUp },
    { id: 'leads', label: 'Leads & Clients', icon: Users },
    { id: 'properties', label: 'Property Insights', icon: Building },
    { id: 'commission', label: 'Commission & Earnings', icon: CreditCard },
    { id: 'visits', label: 'Visit Reports', icon: Calendar },
    { id: 'marketing', label: 'Marketing Campaigns', icon: Mail },
    { id: 'custom', label: 'Custom Reports', icon: FileText },
  ];

  // Mock data for analytics
  const mockData = {
    totalProperties: properties.length,
    soldProperties: 12,
    rentedProperties: 8,
    totalLeads: 156,
    conversionRate: 23.5,
    totalCommission: 125000,
    pendingCommission: 25000,
    monthlyGrowth: 15.2,
    topPerformingProperties: properties.slice(0, 5),
    leadSources: [
      { source: 'Website', count: 45, percentage: 28.8 },
      { source: 'Social Media', count: 38, percentage: 24.4 },
      { source: 'Referrals', count: 32, percentage: 20.5 },
      { source: 'Direct Calls', count: 25, percentage: 16.0 },
      { source: 'Walk-ins', count: 16, percentage: 10.3 },
    ],
    leadStatus: [
      { status: 'Hot', count: 45, percentage: 28.8 },
      { status: 'Warm', count: 67, percentage: 42.9 },
      { status: 'Cold', count: 44, percentage: 28.2 },
    ],
    propertyViews: [
      { property: '3BHK Luxury Apartment', views: 234, inquiries: 12 },
      { property: 'Independent Villa', views: 189, inquiries: 8 },
      { property: '2BHK Apartment', views: 156, inquiries: 15 },
      { property: 'Commercial Space', views: 98, inquiries: 6 },
      { property: 'Plot for Sale', views: 145, inquiries: 9 },
    ],
    popularLocations: [
      { location: 'Bandra West', demand: 95, properties: 8 },
      { location: 'Andheri West', demand: 87, properties: 12 },
      { location: 'Whitefield', demand: 92, properties: 6 },
      { location: 'Electronic City', demand: 78, properties: 10 },
      { location: 'Koramangala', demand: 85, properties: 9 },
    ],
    monthlyCommissions: [
      { month: 'Jan', earned: 85000, pending: 15000 },
      { month: 'Feb', earned: 92000, pending: 18000 },
      { month: 'Mar', earned: 78000, pending: 12000 },
      { month: 'Apr', earned: 105000, pending: 22000 },
      { month: 'May', earned: 95000, pending: 20000 },
      { month: 'Jun', earned: 125000, pending: 25000 },
    ],
    visitStats: {
      totalScheduled: 89,
      completed: 67,
      canceled: 22,
      averageTimeToClose: 45, // days
    },
    marketingStats: {
      emailsSent: 1250,
      emailsOpened: 890,
      socialShares: 234,
      adSpend: 15000,
      leadsGenerated: 45,
    }
  };

  // Export functionality
  const generateCSV = (data: any[], headers: string[]) => {
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        Object.values(row).map(value => 
          typeof value === 'string' && value.includes(',') ? `"${value}"` : value
        ).join(',')
      )
    ].join('\n');
    return csvContent;
  };

  const generateExcelData = () => {
    const workbook = {
      sheets: {
        'Sales & Performance': [
          ['Metric', 'Value', 'Growth'],
          ['Total Properties', mockData.totalProperties, ''],
          ['Sold Properties', mockData.soldProperties, '+12%'],
          ['Rented Properties', mockData.rentedProperties, '+8%'],
          ['Conversion Rate', `${mockData.conversionRate}%`, '+2.3%'],
          ['Total Commission', `₹${mockData.totalCommission.toLocaleString()}`, `+${mockData.monthlyGrowth}%`]
        ],
        'Leads & Clients': [
          ['Source', 'Count', 'Percentage'],
          ...mockData.leadSources.map(source => [source.source, source.count, `${source.percentage}%`])
        ],
        'Property Insights': [
          ['Property', 'Views', 'Inquiries', 'Inquiry Rate'],
          ...mockData.propertyViews.map(prop => [
            prop.property, 
            prop.views, 
            prop.inquiries, 
            `${((prop.inquiries / prop.views) * 100).toFixed(1)}%`
          ])
        ],
        'Commission Details': [
          ['Month', 'Earned', 'Pending', 'Total'],
          ...mockData.monthlyCommissions.map(month => [
            month.month,
            `₹${month.earned.toLocaleString()}`,
            `₹${month.pending.toLocaleString()}`,
            `₹${(month.earned + month.pending).toLocaleString()}`
          ])
        ]
      }
    };
    return workbook;
  };

  const exportToCSV = async (data: any[], filename: string, headers: string[]) => {
    const csv = generateCSV(data, headers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = async () => {
    // For demo purposes, we'll create a CSV that Excel can open
    // In a real app, you'd use a library like xlsx or exceljs
    const workbook = generateExcelData();
    
    // Export each sheet as a separate CSV
    Object.entries(workbook.sheets).forEach(([sheetName, data]) => {
      const headers = data[0] as string[];
      const rows = data.slice(1);
      exportToCSV(rows, `${sheetName}_${new Date().toISOString().split('T')[0]}`, headers);
    });
  };

  const exportToPDF = async () => {
    // For demo purposes, we'll create a text representation
    // In a real app, you'd use a library like jsPDF or react-pdf
    const pdfContent = `
      AGENT DASHBOARD - ANALYTICS REPORT
      Generated on: ${new Date().toLocaleDateString()}
      
      SALES & PERFORMANCE
      - Total Properties: ${mockData.totalProperties}
      - Sold Properties: ${mockData.soldProperties}
      - Rented Properties: ${mockData.rentedProperties}
      - Conversion Rate: ${mockData.conversionRate}%
      - Total Commission: ₹${mockData.totalCommission.toLocaleString()}
      
      LEADS & CLIENTS
      - Total Leads: ${mockData.totalLeads}
      - Hot Leads: ${mockData.leadStatus[0].count}
      - Conversion Rate: ${mockData.conversionRate}%
      
      PROPERTY INSIGHTS
      - Most Viewed: ${mockData.propertyViews[0].property} (${mockData.propertyViews[0].views} views)
      - Top Location: ${mockData.popularLocations[0].location} (Demand: ${mockData.popularLocations[0].demand}/100)
      
      COMMISSION ANALYSIS
      - Monthly Growth: ${mockData.monthlyGrowth}%
      - Pending Amount: ₹${mockData.pendingCommission.toLocaleString()}
    `;
    
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Analytics_Report_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAllData = async () => {
    setExporting(true);
    setExportProgress(0);
    setShowExportModal(true);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Export all data in different formats
      await Promise.all([
        exportToCSV(
          mockData.leadSources.map(source => ({ Source: source.source, Count: source.count, Percentage: `${source.percentage}%` })),
          'Lead_Sources_Analysis',
          ['Source', 'Count', 'Percentage']
        ),
        exportToCSV(
          mockData.propertyViews.map(prop => ({ 
            Property: prop.property, 
            Views: prop.views, 
            Inquiries: prop.inquiries,
            'Inquiry Rate': `${((prop.inquiries / prop.views) * 100).toFixed(1)}%`
          })),
          'Property_Performance_Analysis',
          ['Property', 'Views', 'Inquiries', 'Inquiry Rate']
        ),
        exportToCSV(
          mockData.monthlyCommissions.map(month => ({
            Month: month.month,
            Earned: `₹${month.earned.toLocaleString()}`,
            Pending: `₹${month.pending.toLocaleString()}`,
            Total: `₹${(month.earned + month.pending).toLocaleString()}`
          })),
          'Commission_Analysis',
          ['Month', 'Earned', 'Pending', 'Total']
        )
      ]);

      // Export Excel format
      await exportToExcel();
      
      // Export PDF format
      await exportToPDF();

      // Complete export
      setTimeout(() => {
        setExporting(false);
        setExportProgress(0);
        setShowExportModal(false);
        alert('All analytics data has been exported successfully!');
      }, 1000);

    } catch (error) {
      console.error('Export failed:', error);
      setExporting(false);
      setExportProgress(0);
      alert('Export failed. Please try again.');
    }
  };

  const renderSalesTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.totalProperties}</p>
            </div>
            <Building className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Listed</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sold Properties</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.soldProperties}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rented Properties</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.rentedProperties}</p>
            </div>
            <Home className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">+8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.conversionRate}%</p>
            </div>
            <Target className="w-8 h-8 text-orange-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">+2.3% from last month</span>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Performance chart will be displayed here</p>
            <p className="text-sm text-gray-500">Showing monthly sales and rental trends</p>
          </div>
        </div>
      </div>

      {/* Top Performing Properties */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Properties</h3>
        <div className="space-y-4">
          {mockData.topPerformingProperties.map((property, index) => (
            <div key={property.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#2B256D] rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{property.title}</p>
                  <p className="text-sm text-gray-600">{property.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">₹{property.price}</p>
                <p className="text-sm text-green-600">+{Math.floor(Math.random() * 20) + 10}% views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLeadsTab = () => (
    <div className="space-y-6">
      {/* Lead Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.totalLeads}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">+15% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hot Leads</p>
              <p className="text-2xl font-bold text-red-600">{mockData.leadStatus[0].count}</p>
            </div>
            <Activity className="w-8 h-8 text-red-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">{mockData.leadStatus[0].percentage}% of total</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.conversionRate}%</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">+3.2% from last month</span>
          </div>
        </div>
      </div>

      {/* Lead Sources */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Sources</h3>
        <div className="space-y-4">
          {mockData.leadSources.map((source, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-purple-500' : index === 3 ? 'bg-orange-500' : 'bg-gray-500'}`}></div>
                <span className="font-medium text-gray-900">{source.source}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{source.count} leads</span>
                <span className="text-gray-500">({source.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Status Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Status Distribution</h3>
        <div className="space-y-4">
          {mockData.leadStatus.map((status, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
                <span className="font-medium text-gray-900">{status.status}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{status.count} leads</span>
                <span className="text-gray-500">({status.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Engagement */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Client Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">234</p>
            <p className="text-sm text-gray-600">Total Calls</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="text-sm text-gray-600">Messages</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">89</p>
            <p className="text-sm text-gray-600">Site Visits</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPropertiesTab = () => (
    <div className="space-y-6">
      {/* Property Views */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Property Views & Inquiries</h3>
        <div className="space-y-4">
          {mockData.propertyViews.map((property, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{property.property}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {property.views} views
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {property.inquiries} inquiries
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Inquiry Rate</p>
                <p className="font-medium text-gray-900">{((property.inquiries / property.views) * 100).toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Locations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Demand Heatmap - Popular Locations</h3>
        <div className="space-y-4">
          {mockData.popularLocations.map((location, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">{location.location}</p>
                  <p className="text-sm text-gray-600">{location.properties} properties</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Demand Score</p>
                <p className="font-medium text-gray-900">{location.demand}/100</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Type Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Most Searched Property Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Home className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">45%</p>
            <p className="text-sm text-gray-600">Apartments</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Building className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">32%</p>
            <p className="text-sm text-gray-600">Villas</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">23%</p>
            <p className="text-sm text-gray-600">Plots</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommissionTab = () => (
    <div className="space-y-6">
      {/* Commission Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Commission</p>
              <p className="text-2xl font-bold text-gray-900">₹{mockData.totalCommission.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">+{mockData.monthlyGrowth}% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Commission</p>
              <p className="text-2xl font-bold text-orange-600">₹{mockData.pendingCommission.toLocaleString()}</p>
            </div>
            <CreditCard className="w-8 h-8 text-orange-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Expected in 15-30 days</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Forecast (Next Month)</p>
              <p className="text-2xl font-bold text-blue-600">₹{(mockData.totalCommission * 1.15).toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Based on current pipeline</span>
          </div>
        </div>
      </div>

      {/* Monthly Commission Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Commission Trend</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Commission trend chart will be displayed here</p>
            <p className="text-sm text-gray-500">Showing monthly earned vs pending commissions</p>
          </div>
        </div>
      </div>

      {/* Commission Details */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Commission Details</h3>
        <div className="space-y-4">
          {mockData.monthlyCommissions.map((month, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{month.month} 2024</p>
                <p className="text-sm text-gray-600">Total: ₹{(month.earned + month.pending).toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Earned</p>
                  <p className="font-medium text-green-600">₹{month.earned.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="font-medium text-orange-600">₹{month.pending.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVisitsTab = () => (
    <div className="space-y-6">
      {/* Visit Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.visitStats.totalScheduled}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{mockData.visitStats.completed}</p>
            </div>
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Canceled</p>
              <p className="text-2xl font-bold text-red-600">{mockData.visitStats.canceled}</p>
            </div>
            <X className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Time to Close</p>
              <p className="text-2xl font-bold text-purple-600">{mockData.visitStats.averageTimeToClose} days</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Visit Success Rate */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Visit Success Rate</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Completion Rate</span>
            <span className="font-medium text-gray-900">{((mockData.visitStats.completed / mockData.visitStats.totalScheduled) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(mockData.visitStats.completed / mockData.visitStats.totalScheduled) * 100}%` }}></div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{mockData.visitStats.completed} completed</span>
            <span>{mockData.visitStats.canceled} canceled</span>
          </div>
        </div>
      </div>

      {/* Recent Visits */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Site Visits</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((visit, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${index % 3 === 0 ? 'bg-green-500' : index % 3 === 1 ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                <div>
                  <p className="font-medium text-gray-900">Site Visit #{visit}</p>
                  <p className="text-sm text-gray-600">3BHK Luxury Apartment • Bandra West</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{index % 3 === 0 ? 'Completed' : index % 3 === 1 ? 'Canceled' : 'Scheduled'}</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMarketingTab = () => (
    <div className="space-y-6">
      {/* Marketing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Emails Sent</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.marketingStats.emailsSent}</p>
            </div>
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Emails Opened</p>
              <p className="text-2xl font-bold text-green-600">{mockData.marketingStats.emailsOpened}</p>
            </div>
            <Eye className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Social Shares</p>
              <p className="text-2xl font-bold text-purple-600">{mockData.marketingStats.socialShares}</p>
            </div>
            <Share2 className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ad Spend</p>
              <p className="text-2xl font-bold text-orange-600">₹{mockData.marketingStats.adSpend.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Email Campaign Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Campaign Performance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Open Rate</span>
            <span className="font-medium text-gray-900">{((mockData.marketingStats.emailsOpened / mockData.marketingStats.emailsSent) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(mockData.marketingStats.emailsOpened / mockData.marketingStats.emailsSent) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* ROI Analysis */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">ROI Analysis</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Ad Spend</p>
              <p className="text-sm text-gray-600">Total advertising expenditure</p>
            </div>
            <p className="font-medium text-gray-900">₹{mockData.marketingStats.adSpend.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Leads Generated</p>
              <p className="text-sm text-gray-600">Leads from marketing campaigns</p>
            </div>
            <p className="font-medium text-gray-900">{mockData.marketingStats.leadsGenerated}</p>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Cost per Lead</p>
              <p className="text-sm text-gray-600">Average cost to acquire a lead</p>
            </div>
            <p className="font-medium text-gray-900">₹{(mockData.marketingStats.adSpend / mockData.marketingStats.leadsGenerated).toFixed(0)}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomTab = () => (
    <div className="space-y-6">
      {/* Report Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Generate Custom Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
              <option value="custom">Custom range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
            >
              <option value="All">All Locations</option>
              <option value="Bandra West">Bandra West</option>
              <option value="Andheri West">Andheri West</option>
              <option value="Whitefield">Whitefield</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select 
              value={selectedPropertyType} 
              onChange={(e) => setSelectedPropertyType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
            >
              <option value="All">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]">
              <option>Sales Report</option>
              <option>Leads Report</option>
              <option>Commission Report</option>
              <option>Visit Report</option>
              <option>Marketing Report</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Export Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-gray-900">Export as PDF</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-6 h-6 text-green-600" />
            <span className="font-medium text-gray-900">Export as Excel</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Share className="w-6 h-6 text-purple-600" />
            <span className="font-medium text-gray-900">Share Report</span>
          </button>
        </div>
      </div>

      {/* Saved Reports */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Saved Reports</h3>
        <div className="space-y-4">
          {[
            { name: 'Monthly Sales Report', date: '2024-06-01', type: 'Sales' },
            { name: 'Q2 Commission Summary', date: '2024-04-01', type: 'Commission' },
            { name: 'Lead Source Analysis', date: '2024-05-15', type: 'Leads' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{report.name}</p>
                <p className="text-sm text-gray-600">Generated on {report.date} • {report.type} Report</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Share className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sales':
        return renderSalesTab();
      case 'leads':
        return renderLeadsTab();
      case 'properties':
        return renderPropertiesTab();
      case 'commission':
        return renderCommissionTab();
      case 'visits':
        return renderVisitsTab();
      case 'marketing':
        return renderMarketingTab();
      case 'custom':
        return renderCustomTab();
      default:
        return renderSalesTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-[#2B256D]" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
              <p className="text-gray-600">Comprehensive insights into your real estate performance</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button 
              onClick={exportAllData}
              disabled={exporting}
              className="flex items-center space-x-2 px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export All</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#2B256D] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Exporting Analytics Data</h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <Download className="w-12 h-12 text-[#2B256D] mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    {exporting ? 'Preparing and exporting all analytics data...' : 'Export completed successfully!'}
                  </p>
                  
                  {exporting && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{exportProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#2B256D] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${exportProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {!exporting && exportProgress === 100 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">Export Complete!</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Files have been downloaded to your device
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
