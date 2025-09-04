export interface Property {
  id: string;
  title: string;
  price: string;
  status: 'Available' | 'Pending' | 'Sold';
  location: string;
  area: string;
  bedrooms: string;
  addedDate: string;
  image: string;
  description?: string;
  amenities?: string[];
  nearbyLocations?: NearbyLocation[];
}

export interface NearbyLocation {
  name: string;
  type: string;
  distance: string;
  icon?: React.ReactNode;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  commission: number;
  properties: number;
}

export interface Visit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface Message {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  propertyId: string;
  propertyTitle: string;
  uploadDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface Commission {
  id: string;
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  amount: number;
  percentage: number;
  date: string;
  status: 'Pending' | 'Paid';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
}

// Client Management
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  propertyIds: string[]; // Properties owned by this client
}

export interface Contract {
  id: string;
  clientId: string;
  propertyId?: string;
  name: string;
  url?: string;
  uploadDate: string;
}