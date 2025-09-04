import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, Eye, CheckCircle, XCircle, Clock, Filter, X, FileText, AlertCircle, Check, Trash2, Edit } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';

interface Document {
  id: string;
  name: string;
  type: string;
  propertyId: string;
  propertyTitle: string;
  uploadDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  fileSize?: number;
  fileName?: string;
  description?: string;
  tags?: string[];
}

const DocumentTracker: React.FC = () => {
  const { properties } = usePropertyContext();
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadForm, setUploadForm] = useState({
    documentType: '',
    propertyId: '',
    description: '',
    tags: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock documents data
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Property Title Deed',
      type: 'Legal Document',
      propertyId: '1',
      propertyTitle: '3BHK Luxury Apartment in Bandra West',
      uploadDate: '2024-01-15',
      status: 'Approved',
      fileSize: 2048576,
      fileName: 'title_deed.pdf',
      description: 'Original property title deed for Bandra West apartment',
      tags: ['legal', 'title', 'deed']
    },
    {
      id: '2',
      name: 'Building Approval Plan',
      type: 'Construction Document',
      propertyId: '1',
      propertyTitle: '3BHK Luxury Apartment in Bandra West',
      uploadDate: '2024-01-10',
      status: 'Pending',
      fileSize: 1536000,
      fileName: 'building_plan.pdf',
      description: 'Municipal building approval plan and permits',
      tags: ['construction', 'approval', 'plan']
    },
    {
      id: '3',
      name: 'Property Tax Receipt',
      type: 'Financial Document',
      propertyId: '2',
      propertyTitle: 'Independent Villa in Whitefield',
      uploadDate: '2024-01-20',
      status: 'Approved',
      fileSize: 512000,
      fileName: 'tax_receipt.pdf',
      description: 'Latest property tax payment receipt',
      tags: ['financial', 'tax', 'receipt']
    }
  ]);

  const filteredDocuments = documents.filter(doc => {
    const matchesStatus = filterStatus === 'All' || doc.status === filterStatus;
    const matchesType = filterType === 'All' || doc.type === filterType;
    return matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !uploadForm.documentType || !uploadForm.propertyId) {
      alert('Please select files and fill in required fields');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload delay
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      // Add new documents to the list
      const newDocuments = selectedFiles.map((file, index) => {
        const property = properties.find(p => p.id === uploadForm.propertyId);
        return {
          id: Date.now().toString() + index,
          name: file.name.split('.')[0],
          type: uploadForm.documentType,
          propertyId: uploadForm.propertyId,
          propertyTitle: property?.title || 'Unknown Property',
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'Pending' as const,
          fileSize: file.size,
          fileName: file.name,
          description: uploadForm.description,
          tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        };
      });

      setDocuments(prev => [...prev, ...newDocuments]);
      
      // Reset form
      setSelectedFiles([]);
      setUploadForm({
        documentType: '',
        propertyId: '',
        description: '',
        tags: ''
      });
      setShowUploadModal(false);
      setUploading(false);
      setUploadProgress(0);
    }, 2000);
  };

  const openUploadModal = () => {
    setShowUploadModal(true);
    setSelectedFiles([]);
    setUploadForm({
      documentType: '',
      propertyId: '',
      description: '',
      tags: ''
    });
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setSelectedFiles([]);
    setUploadForm({
      documentType: '',
      propertyId: '',
      description: '',
      tags: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Document Tracker</h2>
            <p className="text-gray-600">Track and manage property documents</p>
          </div>
          <button 
            onClick={openUploadModal}
            className="flex items-center space-x-2 px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
            >
              <option value="All">All Types</option>
              <option value="Legal Document">Legal Document</option>
              <option value="Construction Document">Construction Document</option>
              <option value="Financial Document">Financial Document</option>
              <option value="Property Document">Property Document</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
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
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{document.name}</div>
                        {document.fileSize && (
                          <div className="text-sm text-gray-500">{formatFileSize(document.fileSize)}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{document.propertyTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{document.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{document.uploadDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                      {getStatusIcon(document.status)}
                      <span className="ml-1">{document.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-[#2B256D] hover:text-[#4A3F8C] transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-700 transition-colors" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600 mb-6">
            {filterStatus !== 'All' || filterType !== 'All'
              ? 'Try adjusting your filters'
              : 'No documents have been uploaded yet'
            }
          </p>
          {filterStatus === 'All' && filterType === 'All' && (
            <button 
              onClick={openUploadModal}
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
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Upload Documents</h3>
              <button
                onClick={closeUploadModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-[#2B256D] bg-[#2B256D] bg-opacity-5' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {dragActive ? 'Drop files here' : 'Drag and drop files here'}
                </p>
                <p className="text-gray-600 mb-4">or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors"
                >
                  Browse Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB per file)
                </p>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Selected Files:</h4>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={uploadForm.documentType}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, documentType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
                    required
                  >
                    <option value="">Select Document Type</option>
                    <option value="Legal Document">Legal Document</option>
                    <option value="Construction Document">Construction Document</option>
                    <option value="Financial Document">Financial Document</option>
                    <option value="Property Document">Property Document</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={uploadForm.propertyId}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, propertyId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
                    required
                  >
                    <option value="">Select Property</option>
                    {properties.map(property => (
                      <option key={property.id} value={property.id}>
                        {property.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
                  placeholder="Enter document description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]"
                  placeholder="Enter tags separated by commas (e.g., legal, property, deed)"
                />
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Uploading...</span>
                    <span className="text-sm text-gray-500">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#2B256D] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeUploadModal}
                disabled={uploading}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading || selectedFiles.length === 0 || !uploadForm.documentType || !uploadForm.propertyId}
                className="flex items-center space-x-2 px-4 py-2 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload Documents</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentTracker;