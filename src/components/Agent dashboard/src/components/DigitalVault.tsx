import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Download, 
  Eye, 
  Share2, 
  Lock, 
  Unlock, 
  Search, 
  Filter, 
  Folder, 
  File, 
  Calendar, 
  AlertTriangle, 
  Cloud, 
  Edit, 
  Trash2, 
  Plus, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle,
  X,
  ChevronDown,
  ChevronRight,
  Star,
  Tag,
  Copy,
  Mail,
  Link
} from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'deed' | 'agreement' | 'noc' | 'id' | 'property' | 'other';
  category: 'property' | 'client' | 'transaction';
  propertyId?: string;
  propertyTitle?: string;
  clientId?: string;
  clientName?: string;
  size: number;
  uploadDate: string;
  expiryDate?: string;
  version: number;
  isEncrypted: boolean;
  accessLevel: 'agent' | 'client' | 'admin';
  tags: string[];
  isSigned: boolean;
  cloudSync: 'google' | 'onedrive' | 'dropbox' | 'none';
  sharedWith: string[];
  password?: string;
  description?: string;
}

const DigitalVault: React.FC = () => {
  const { properties } = usePropertyContext();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Sale Deed - Bandra Property',
      type: 'deed',
      category: 'property',
      propertyId: '1',
      propertyTitle: '3BHK Luxury Apartment in Bandra West',
      size: 2048576,
      uploadDate: '2024-01-15',
      expiryDate: '2025-01-15',
      version: 1,
      isEncrypted: true,
      accessLevel: 'agent',
      tags: ['sale', 'deed', 'bandra'],
      isSigned: true,
      cloudSync: 'google',
      sharedWith: ['client@email.com'],
      description: 'Original sale deed for Bandra West property'
    },
    {
      id: '2',
      name: 'Rent Agreement - Whitefield Villa',
      type: 'agreement',
      category: 'property',
      propertyId: '2',
      propertyTitle: 'Independent Villa in Whitefield',
      size: 1536000,
      uploadDate: '2024-01-10',
      expiryDate: '2024-07-10',
      version: 2,
      isEncrypted: true,
      accessLevel: 'client',
      tags: ['rent', 'agreement', 'whitefield'],
      isSigned: false,
      cloudSync: 'dropbox',
      sharedWith: [],
      description: 'Rental agreement for Whitefield villa'
    },
    {
      id: '3',
      name: 'Client ID Proof - Amit Sharma',
      type: 'id',
      category: 'client',
      clientId: '1',
      clientName: 'Amit Sharma',
      size: 512000,
      uploadDate: '2024-01-20',
      version: 1,
      isEncrypted: true,
      accessLevel: 'agent',
      tags: ['id', 'client', 'verification'],
      isSigned: false,
      cloudSync: 'none',
      sharedWith: [],
      description: 'Aadhar card copy for client verification'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterAccess, setFilterAccess] = useState('All');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'All' || doc.type === filterType;
    const matchesCategory = filterCategory === 'All' || doc.category === filterCategory;
    const matchesAccess = filterAccess === 'All' || doc.accessLevel === filterAccess;
    return matchesSearch && matchesType && matchesCategory && matchesAccess;
  });

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'contract':
        return <File className="w-8 h-8 text-blue-500" />;
      case 'deed':
        return <File className="w-8 h-8 text-green-500" />;
      case 'agreement':
        return <File className="w-8 h-8 text-purple-500" />;
      case 'noc':
        return <File className="w-8 h-8 text-orange-500" />;
      case 'id':
        return <File className="w-8 h-8 text-red-500" />;
      case 'property':
        return <File className="w-8 h-8 text-indigo-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const getAccessIcon = (accessLevel: string) => {
    switch (accessLevel) {
      case 'agent':
        return <Shield className="w-4 h-4 text-blue-600" />;
      case 'client':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'admin':
        return <Lock className="w-4 h-4 text-red-600" />;
      default:
        return <Unlock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCloudIcon = (cloudSync: string) => {
    switch (cloudSync) {
      case 'google':
        return <Cloud className="w-4 h-4 text-blue-500" />;
      case 'onedrive':
        return <Cloud className="w-4 h-4 text-blue-600" />;
      case 'dropbox':
        return <Cloud className="w-4 h-4 text-blue-400" />;
      default:
        return <X className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    return expiry < now;
  };

  const handleUpload = (files: FileList | null) => {
    if (files) {
      const newDocuments: Document[] = Array.from(files).map((file, index) => ({
        id: Date.now().toString() + index,
        name: file.name,
        type: 'other' as any,
        category: 'property' as any,
        size: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        version: 1,
        isEncrypted: true,
        accessLevel: 'agent' as any,
        tags: [],
        isSigned: false,
        cloudSync: 'none' as any,
        sharedWith: [],
        description: `Uploaded on ${new Date().toLocaleDateString()}`
      }));
      setDocuments(prev => [...newDocuments, ...prev]);
    }
  };

  const handleDelete = (documentId: string) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      setSelectedDocument(null);
    }
  };

  const handleShare = (document: Document) => {
    setSelectedDocument(document);
    setShowShareModal(true);
  };

  const handleSign = (document: Document) => {
    setSelectedDocument(document);
    setShowSignatureModal(true);
  };

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
    const key = doc.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Digital Vault</h2>
            <p className="text-gray-600">Secure document storage and management system</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
            >
              <option value="All">All Types</option>
              <option value="contract">Contract</option>
              <option value="deed">Deed</option>
              <option value="agreement">Agreement</option>
              <option value="noc">NOC</option>
              <option value="id">ID</option>
              <option value="property">Property</option>
              <option value="other">Other</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
            >
              <option value="All">All Categories</option>
              <option value="property">Property</option>
              <option value="client">Client</option>
              <option value="transaction">Transaction</option>
            </select>
            <select
              value={filterAccess}
              onChange={(e) => setFilterAccess(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
            >
              <option value="All">All Access</option>
              <option value="agent">Agent</option>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-green-600" />
          <div>
            <h3 className="text-sm font-medium text-green-800">Vault Security Status</h3>
            <p className="text-sm text-green-700">All documents are encrypted and securely stored</p>
          </div>
        </div>
      </div>

      {/* Documents Grid/List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {viewMode === 'grid' ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((document) => (
                <div key={document.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    {getDocumentIcon(document.type)}
                    <div className="flex items-center space-x-1">
                      {document.isEncrypted && <Lock className="w-4 h-4 text-green-600" />}
                      {document.isSigned && <CheckCircle className="w-4 h-4 text-blue-600" />}
                      {isExpiringSoon(document.expiryDate) && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                      {isExpired(document.expiryDate) && <AlertTriangle className="w-4 h-4 text-red-600" />}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{document.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Size: {formatFileSize(document.size)}</span>
                      <span>v{document.version}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        {getAccessIcon(document.accessLevel)}
                        <span className="capitalize">{document.accessLevel}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getCloudIcon(document.cloudSync)}
                      </div>
                    </div>
                    {document.expiryDate && (
                      <div className={`text-sm ${isExpired(document.expiryDate) ? 'text-red-600' : isExpiringSoon(document.expiryDate) ? 'text-yellow-600' : 'text-gray-600'}`}>
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Expires: {new Date(document.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedDocument(document)}
                        className="text-[#2B256D] hover:text-[#4A3F8C] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleShare(document)}
                        className="text-green-600 hover:text-green-700 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      {!document.isSigned && (
                        <button
                          onClick={() => handleSign(document)}
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(document.id)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Access
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getDocumentIcon(document.type)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{document.name}</div>
                          <div className="text-sm text-gray-500">{document.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize text-sm text-gray-900">{document.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatFileSize(document.size)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {getAccessIcon(document.accessLevel)}
                        <span className="text-sm text-gray-900 capitalize">{document.accessLevel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {document.isEncrypted && <Lock className="w-4 h-4 text-green-600" />}
                        {document.isSigned && <CheckCircle className="w-4 h-4 text-blue-600" />}
                        {isExpiringSoon(document.expiryDate) && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                        {isExpired(document.expiryDate) && <AlertTriangle className="w-4 h-4 text-red-600" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedDocument(document)}
                          className="text-[#2B256D] hover:text-[#4A3F8C] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare(document)}
                          className="text-green-600 hover:text-green-700 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        {!document.isSigned && (
                          <button
                            onClick={() => handleSign(document)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(document.id)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterType !== 'All' || filterCategory !== 'All' || filterAccess !== 'All'
              ? 'Try adjusting your search or filters'
              : 'Start by uploading your first document to the vault'
            }
          </p>
          {!searchTerm && filterType === 'All' && filterCategory === 'All' && filterAccess === 'All' && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors mx-auto"
            >
              <Upload className="w-4 h-4" />
              <span>Upload First Document</span>
            </button>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Document</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Files</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  onChange={(e) => handleUpload(e.target.files)}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#2B256D] transition-colors"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click to select files</p>
                  <p className="text-sm text-gray-500">or drag and drop</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Share Document</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Share via Email</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Generate Secure Link</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={`https://vault.example.com/share/${selectedDocument.id}`}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                  <button className="px-3 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Set Password (Optional)</label>
                <input
                  type="password"
                  placeholder="Enter password to protect link"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* E-Signature Modal */}
      {showSignatureModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">E-Signature</h3>
              <button
                onClick={() => setShowSignatureModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Sign document: {selectedDocument.name}</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <p className="text-gray-500">Signature pad will appear here</p>
                  <p className="text-sm text-gray-400 mt-2">Click and drag to sign</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowSignatureModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Update document to signed
                    setDocuments(prev => prev.map(doc => 
                      doc.id === selectedDocument.id 
                        ? { ...doc, isSigned: true }
                        : doc
                    ));
                    setShowSignatureModal(false);
                  }}
                  className="px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors"
                >
                  Sign Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">{selectedDocument.name}</h2>
              <button
                onClick={() => setSelectedDocument(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{selectedDocument.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{selectedDocument.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{formatFileSize(selectedDocument.size)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Version:</span>
                      <span className="font-medium">{selectedDocument.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Upload Date:</span>
                      <span className="font-medium">{new Date(selectedDocument.uploadDate).toLocaleDateString()}</span>
                    </div>
                    {selectedDocument.expiryDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expiry Date:</span>
                        <span className={`font-medium ${isExpired(selectedDocument.expiryDate) ? 'text-red-600' : isExpiringSoon(selectedDocument.expiryDate) ? 'text-yellow-600' : 'text-gray-900'}`}>
                          {new Date(selectedDocument.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Access</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Encryption:</span>
                      <div className="flex items-center space-x-1">
                        {selectedDocument.isEncrypted ? (
                          <>
                            <Lock className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-medium">Enabled</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-4 h-4 text-red-600" />
                            <span className="text-red-600 font-medium">Disabled</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Access Level:</span>
                      <div className="flex items-center space-x-1">
                        {getAccessIcon(selectedDocument.accessLevel)}
                        <span className="font-medium capitalize">{selectedDocument.accessLevel}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">E-Signature:</span>
                      <div className="flex items-center space-x-1">
                        {selectedDocument.isSigned ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-600 font-medium">Signed</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 font-medium">Not Signed</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Cloud Sync:</span>
                      <div className="flex items-center space-x-1">
                        {getCloudIcon(selectedDocument.cloudSync)}
                        <span className="font-medium capitalize">{selectedDocument.cloudSync}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedDocument.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedDocument.description}</p>
                </div>
              )}
              
              {selectedDocument.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDocument.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-[#2B256D]/10 text-[#2B256D] rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => handleShare(selectedDocument)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => handleSign(selectedDocument)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Sign</span>
                </button>
                <button
                  onClick={() => handleDelete(selectedDocument.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalVault;
