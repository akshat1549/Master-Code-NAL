import React, { useState, useRef, useEffect } from 'react';
import { Save, Camera, Upload, MapPin, Square, Bed, Calendar, X, FileText, Image as ImageIcon, CheckCircle, ArrowLeft, Eye } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { Property } from '../types';

interface AddPropertyProps {
  onNavigateToDashboard?: () => void;
  editingProperty?: Property | null;
  onEditComplete?: () => void;
}

const AddProperty: React.FC<AddPropertyProps> = ({ 
  onNavigateToDashboard, 
  editingProperty, 
  onEditComplete 
}) => {
  const { addProperty, updateProperty } = usePropertyContext();
  const steps = ['Details', 'Documents', 'Intent', 'Location', 'Media', 'Review'];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    area: '',
    bedrooms: '',
    description: '',
    status: 'Available' as 'Available' | 'Pending' | 'Sold',
    fullAddress: '',
    city: '',
    state: '',
    pincode: '',
    latitude: '',
    longitude: ''
  });

  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState({ images: false, documents: false, videos: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [addedProperty, setAddedProperty] = useState<any>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  // Load editing property data when editingProperty changes
  useEffect(() => {
    if (editingProperty) {
      setFormData({
        title: editingProperty.title,
        price: editingProperty.price,
        status: editingProperty.status,
        location: editingProperty.location,
        area: editingProperty.area,
        bedrooms: editingProperty.bedrooms,
        description: editingProperty.description || '',
        fullAddress: '',
        city: '',
        state: '',
        pincode: '',
        latitude: '',
        longitude: ''
      });
    } else {
      // Reset form when not editing
      setFormData({
        title: '',
        price: '',
        location: '',
        area: '',
        bedrooms: '',
        description: '',
        status: 'Available',
        fullAddress: '',
        city: '',
        state: '',
        pincode: '',
        latitude: '',
        longitude: ''
      });
    }
  }, [editingProperty]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.location || !formData.area || !formData.bedrooms) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (editingProperty) {
        // Update existing property
        updateProperty(editingProperty.id, {
          title: formData.title,
          price: formData.price,
          status: formData.status,
          location: formData.location,
          area: formData.area,
          bedrooms: formData.bedrooms,
          description: formData.description,
        });
        
        setAddedProperty({ title: formData.title });
        setShowSuccess(true);
        
        // Reset form
        setFormData({
          title: '',
          price: '',
          location: '',
          area: '',
          bedrooms: '',
          description: '',
          status: 'Available'
        });
        setImages([]);
        setDocuments([]);
        
        // Call onEditComplete after a short delay
        setTimeout(() => {
          if (onEditComplete) {
            onEditComplete();
          }
        }, 2000);
        
      } else {
        // Add new property
        const newProperty = {
          title: formData.title,
          price: formData.price,
          status: formData.status,
          location: formData.location,
          area: formData.area,
          bedrooms: formData.bedrooms,
          description: formData.description,
          amenities: [], // You can add amenities handling later
          nearbyLocations: [] // You can add nearby locations handling later
        };
        
        addProperty(newProperty);
        setAddedProperty(newProperty);

        // Show success message
        setShowSuccess(true);
        
        // Reset form
        setFormData({
          title: '',
          price: '',
          location: '',
          area: '',
          bedrooms: '',
          description: '',
          status: 'Available'
        });
        setImages([]);
        setDocuments([]);
      }
      
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Error saving property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewDashboard = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  const goNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const [showCoordinates, setShowCoordinates] = useState(false);

  // Image handling functions
  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).filter(file => file.type.startsWith('image/'));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleVideoUpload = (files: FileList | null) => {
    if (files) {
      const newVideos = Array.from(files).filter(file => file.type.startsWith('video/'));
      setVideos(prev => [...prev, ...newVideos]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, images: false }));
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const handleImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, images: true }));
  };

  const handleImageDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, images: false }));
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, videos: false }));
    const files = e.dataTransfer.files;
    handleVideoUpload(files);
  };

  const handleVideoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, videos: true }));
  };

  const handleVideoDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, videos: false }));
  };

  // Document handling functions
  const handleDocumentUpload = (files: FileList | null) => {
    if (files) {
      const newDocuments = Array.from(files);
      setDocuments(prev => [...prev, ...newDocuments]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleDocumentDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, documents: false }));
    const files = e.dataTransfer.files;
    handleDocumentUpload(files);
  };

  const handleDocumentDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, documents: true }));
  };

  const handleDocumentDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, documents: false }));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="w-8 h-8 text-blue-500" />;
    } else if (file.type.includes('pdf')) {
      return <FileText className="w-8 h-8 text-red-500" />;
    } else if (file.type.includes('word') || file.type.includes('document')) {
      return <FileText className="w-8 h-8 text-blue-600" />;
    } else {
      return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-8 h-8 text-green-600 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                {editingProperty ? 'Property Updated Successfully!' : 'Property Added Successfully!'}
              </h3>
              <p className="text-green-700 mb-4">
                {editingProperty 
                  ? `Your property "${addedProperty?.title}" has been updated successfully.`
                  : `Your new property "${addedProperty?.title}" has been added to the dashboard and is now visible to all users.`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleViewDashboard}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View in Dashboard</span>
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  {editingProperty ? 'Edit Another Property' : 'Add Another Property'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header + Stepper */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onNavigateToDashboard && (
              <button
                onClick={handleViewDashboard}
                className="flex items-center space-x-2 text-[#2B256D] hover:text-[#4A3F8C] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Properties</span>
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
              <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="mt-6 flex items-center justify-between">
          {steps.map((label, index) => (
            <div key={label} className="flex items-center flex-1">
              <div className={`flex items-center justify-center rounded-full border transition-colors ${
                index === currentStep ? 'bg-[#2B256D] text-white border-[#2B256D]' : index < currentStep ? 'bg-[#2B256D] text-white border-[#2B256D]' : 'bg-white text-gray-600 border-gray-300'
              }`} style={{ width: 36, height: 36 }}>
                <span className="text-sm font-semibold">{index + 1}</span>
              </div>
              <div className="ml-3 mr-2 text-sm font-medium text-gray-800 whitespace-nowrap hidden sm:block">{label}</div>
              {index < steps.length - 1 && (
                <div className={`h-px flex-1 ${index < currentStep ? 'bg-[#2B256D]' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Property Form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          {currentStep === 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
                  placeholder="Enter property title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg font-medium">₹</span>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
                    placeholder="Enter location"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area *
                </label>
                <div className="relative">
                  <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
                    placeholder="Enter area (e.g., 1200 sqft)"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms *
                </label>
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
                    placeholder="Enter bedrooms (e.g., 3 BHK)"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors"
                >
                  <option value="Available">Available</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </div>
          </div>
          )}

          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
              <p className="text-gray-600 mb-4">Upload all relevant property documents.</p>
              {/* Reuse existing document uploader */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Documents</label>
                <input ref={documentInputRef} type="file" multiple accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png" onChange={(e) => handleDocumentUpload(e.target.files)} className="hidden" />
                <div onClick={() => documentInputRef.current?.click()} onDrop={handleDocumentDrop} onDragOver={handleDocumentDragOver} onDragLeave={handleDocumentDragLeave} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragActive.documents ? 'border-[#2B256D] bg-[#2B256D]/5' : 'border-gray-300 hover:border-[#2B256D]'}`}>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Upload Documents</p>
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                </div>
                {documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {documents.map((document, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(document)}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{document.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(document.size)}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeDocument(index)} className="text-red-500 hover:text-red-700 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Intent</h3>
              <p className="text-gray-600 mb-4">Tell us the intent for this listing.</p>
              <select name="intent" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]">
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Location</h3>
              <p className="text-gray-600 mb-4">Provide the complete address of your property</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address *</label>
                  <textarea name="fullAddress" value={formData.fullAddress} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors resize-none" placeholder="Enter full address" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <select name="city" value={formData.city} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors">
                      <option value="">Select City</option>
                      <option>Chennai</option>
                      <option>Mumbai</option>
                      <option>Delhi</option>
                      <option>Bengaluru</option>
                      <option>Kolkata</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="e.g., Tamil Nadu" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="e.g., 600001" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]" />
                  </div>
                  <div className="flex items-end justify-end">
                    <button type="button" onClick={() => setShowCoordinates(s => !s)} className="text-[#2B256D] text-sm font-medium hover:underline ml-auto">{showCoordinates ? 'Hide Coordinates' : 'Add Coordinates'}</button>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-700">Location Coordinates (Optional)</div>
                {showCoordinates && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                      <input type="text" name="latitude" value={formData.latitude} onChange={handleInputChange} placeholder="e.g., 12.9716" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                      <input type="text" name="longitude" value={formData.longitude} onChange={handleInputChange} placeholder="e.g., 77.5946" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D]" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Map Preview</label>
                  <div className="rounded-lg border border-gray-200 p-10 bg-gradient-to-r from-blue-50 to-green-50 text-center">
                    <div className="mx-auto w-10 h-10 rounded-full border-2 border-[#2B256D] flex items-center justify-center text-[#2B256D] mb-3">📍</div>
                    <p className="font-medium text-gray-800">Default India Map</p>
                    <p className="text-sm text-gray-600">No coordinates provided - showing India map</p>
                    <p className="text-xs text-[#2B256D] mt-2">Google Maps integration ready</p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-900">
                  <p className="font-semibold mb-2">Location Tips:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Include nearby landmarks for easy identification</li>
                    <li>Mention proximity to schools, hospitals, or transport hubs</li>
                    <li>Be specific about the area/locality name</li>
                    <li>Include pin code if available</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Media</h3>
              <p className="text-gray-600 mb-4">Upload property images and videos.</p>
              <input ref={imageInputRef} type="file" multiple accept="image/*" onChange={(e) => handleImageUpload(e.target.files)} className="hidden" />
              <div onClick={() => imageInputRef.current?.click()} onDrop={handleImageDrop} onDragOver={handleImageDragOver} onDragLeave={handleImageDragLeave} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragActive.images ? 'border-[#2B256D] bg-[#2B256D]/5' : 'border-gray-300 hover:border-[#2B256D]'}`}>
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Add Image</p>
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
              </div>
              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img src={URL.createObjectURL(image)} alt={`Property ${index + 1}`} className="w-full h-24 object-cover rounded-lg border border-gray-300" />
                      <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={12} />
                      </button>
                      <p className="text-xs text-gray-500 mt-1 truncate">{image.name}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Video Upload */}
              <div className="mt-6">
                <input ref={videoInputRef} type="file" multiple accept="video/*" onChange={(e) => handleVideoUpload(e.target.files)} className="hidden" />
                <div onClick={() => videoInputRef.current?.click()} onDrop={handleVideoDrop} onDragOver={handleVideoDragOver} onDragLeave={handleVideoDragLeave} className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors border-gray-300 hover:border-[#2B256D]">
                  <p className="text-gray-600 font-medium">Add Video</p>
                  <p className="text-sm text-gray-500">MP4, WebM, AVI - Click to upload or drag and drop</p>
                </div>
                {videos.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videos.map((video, index) => (
                      <div key={index} className="relative group border rounded-lg p-2">
                        <video controls className="w-full rounded" src={URL.createObjectURL(video)} />
                        <button type="button" onClick={() => removeVideo(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs">×</span>
                        </button>
                        <p className="text-xs text-gray-500 mt-1 truncate">{video.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review</h3>
              <p className="text-gray-600 mb-4">Confirm the details and save.</p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-800">
                <div><span className="font-medium">Title:</span> {formData.title || '-'} </div>
                <div><span className="font-medium">Price:</span> {formData.price || '-'} </div>
                <div><span className="font-medium">Location:</span> {formData.location || '-'} </div>
                <div><span className="font-medium">Area:</span> {formData.area || '-'} </div>
                <div><span className="font-medium">Bedrooms:</span> {formData.bedrooms || '-'} </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B256D] focus:border-[#2B256D] transition-colors resize-none"
              placeholder="Provide a detailed description of the property..."
            />
          </div>

          

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            {currentStep > 0 && (
              <button type="button" onClick={goBack} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Back</button>
            )}
            {currentStep < steps.length - 1 && (
              <button type="button" onClick={goNext} className="px-6 py-3 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] transition-colors">Next</button>
            )}
            {currentStep === steps.length - 1 && (
              <button type="submit" disabled={isSubmitting} className="flex items-center justify-center px-6 py-3 bg-[#2B256D] text-white rounded-lg hover:bg-[#4A3F8C] focus:ring-2 focus:ring-[#2B256D] focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {editingProperty ? 'Updating Property...' : 'Adding Property...'}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {editingProperty ? 'Update Property' : 'Save Property'}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;