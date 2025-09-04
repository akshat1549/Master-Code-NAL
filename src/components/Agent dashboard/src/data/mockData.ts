import { Property, Agent, Visit, Message, Document, Commission, Notification, Client, Contract } from '../types';

export const mockAgent: Agent = {
  id: '1',
  name: 'Suresh',
  email: 'suresh@nalindia.com',
  phone: '+91 98765 43210',
  avatar: '',
  commission: 125000,
  properties: 24
};

export const properties: Property[] = [
  {
    id: '1',
    title: '3BHK Luxury Apartment in Bandra West',
    price: '₹15,000,000',
    status: 'Available',
    location: 'Bandra West, Mumbai',
    area: '1200 sqft',
    bedrooms: '3 BHK',
    addedDate: 'Added 1/14/2024',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'This luxurious 3BHK apartment in the heart of Bandra West offers premium amenities and stunning city views. Features include marble flooring, modular kitchen, walk-in closet, and a private balcony overlooking the Arabian Sea. Located in a prestigious building with 24/7 security, swimming pool, gym, and parking.',
    amenities: ['Marble Flooring', 'Modular Kitchen', 'Walk-in Closet', 'Private Balcony', '24/7 Security', 'Swimming Pool', 'Gym', 'Parking'],
    nearbyLocations: [
      { name: 'Bandra Station', type: 'metro', distance: '0.3 km away' },
      { name: 'Bandra Bus Depot', type: 'transport', distance: '0.1 km away' },
      { name: 'Lilavati Hospital', type: 'hospital', distance: '0.8 km away' },
      { name: 'Bombay Scottish School', type: 'school', distance: '0.5 km away' },
      { name: 'Carter Road Restaurants', type: 'restaurant', distance: '0.2 km away' },
      { name: 'Linking Road Market', type: 'shopping', distance: '0.7 km away' }
    ]
  },
  {
    id: '2',
    title: 'Independent Villa in Whitefield',
    price: '₹25,000,000',
    status: 'Pending',
    location: 'Whitefield, Bangalore',
    area: '2400 sqft',
    bedrooms: '4 BHK',
    addedDate: 'Added 1/9/2024',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Spacious 4BHK independent villa in Whitefield with modern architecture and premium finishes. The villa features a private garden, servant quarters, modular kitchen with breakfast counter, and a spacious living area. Includes amenities like power backup, water harvesting, and CCTV surveillance.',
    amenities: ['Private Garden', 'Servant Quarters', 'Modular Kitchen', 'Breakfast Counter', 'Power Backup', 'Water Harvesting', 'CCTV Surveillance', 'Car Parking'],
    nearbyLocations: [
      { name: 'Whitefield Station', type: 'metro', distance: '0.5 km away' },
      { name: 'Whitefield Bus Stand', type: 'transport', distance: '0.2 km away' },
      { name: 'Manipal Hospital', type: 'hospital', distance: '1.0 km away' },
      { name: 'Baldwin Boys School', type: 'school', distance: '0.8 km away' },
      { name: 'Phoenix MarketCity', type: 'shopping', distance: '1.2 km away' },
      { name: 'Food Street', type: 'restaurant', distance: '0.4 km away' }
    ]
  },
  {
    id: '3',
    title: 'Commercial Plot in Cyber City',
    price: '₹50,000,000',
    status: 'Sold',
    location: 'Cyber City, Gurgaon',
    area: '5000 sqft',
    bedrooms: 'Commercial',
    addedDate: 'Added 1/4/2024',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Prime commercial plot in Cyber City, Gurgaon, perfect for corporate offices, retail spaces, or mixed-use development. The plot has excellent connectivity to Delhi-Gurgaon Expressway and is surrounded by major IT companies. Zoning allows for high-rise commercial development.',
    amenities: ['Excellent Connectivity', 'High-Rise Zoning', 'Power Connection', 'Water Connection', 'Security', 'Parking Space'],
    nearbyLocations: [
      { name: 'Huda City Centre Metro', type: 'metro', distance: '0.8 km away' },
      { name: 'Cyber City Bus Stop', type: 'transport', distance: '0.1 km away' },
      { name: 'Medanta Hospital', type: 'hospital', distance: '2.0 km away' },
      { name: 'DLF Cyber City', type: 'shopping', distance: '0.3 km away' },
      { name: 'Cyber Hub', type: 'restaurant', distance: '0.2 km away' },
      { name: 'Gurgaon Railway Station', type: 'transport', distance: '3.0 km away' }
    ]
  }
];

export const mockVisits: Visit[] = [
  {
    id: '1',
    propertyId: '1',
    propertyTitle: '3BHK Luxury Apartment in Bandra West',
    clientName: 'Amit Sharma',
    clientPhone: '+91 98765 12345',
    date: '2024-01-25',
    time: '14:00',
    status: 'Scheduled'
  },
  {
    id: '2',
    propertyId: '2',
    propertyTitle: 'Independent Villa in Whitefield',
    clientName: 'Priya Patel',
    clientPhone: '+91 98765 67890',
    date: '2024-01-24',
    time: '11:00',
    status: 'Completed'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Amit Sharma',
    recipient: 'Suresh',
    subject: 'Property Inquiry - Bandra West Apartment',
    content: 'Hi, I am interested in the 3BHK apartment in Bandra West. Can you please provide more details about the amenities and schedule a visit?',
    timestamp: '2024-01-20T10:30:00Z',
    isRead: false
  },
  {
    id: '2',
    sender: 'Priya Patel',
    recipient: 'Suresh',
    subject: 'Villa Visit Confirmation',
    content: 'Thank you for showing the villa. We are very interested and would like to proceed with the purchase.',
    timestamp: '2024-01-19T15:45:00Z',
    isRead: true
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Property Title Deed',
    type: 'Legal Document',
    propertyId: '1',
    propertyTitle: '3BHK Luxury Apartment in Bandra West',
    uploadDate: '2024-01-15',
    status: 'Approved'
  },
  {
    id: '2',
    name: 'Building Approval Plan',
    type: 'Construction Document',
    propertyId: '2',
    propertyTitle: 'Independent Villa in Whitefield',
    uploadDate: '2024-01-10',
    status: 'Pending'
  }
];

export const mockCommissions: Commission[] = [
  {
    id: '1',
    propertyId: '3',
    propertyTitle: 'Commercial Plot in Cyber City',
    clientName: 'Tech Solutions Ltd',
    amount: 2500000,
    percentage: 5,
    date: '2024-01-15',
    status: 'Paid'
  },
  {
    id: '2',
    propertyId: '1',
    propertyTitle: '3BHK Luxury Apartment in Bandra West',
    clientName: 'Amit Sharma',
    amount: 750000,
    percentage: 5,
    date: '2024-01-20',
    status: 'Pending'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Property Inquiry',
    message: 'Amit Sharma has inquired about the Bandra West apartment',
    type: 'info',
    timestamp: '2024-01-20T10:30:00Z',
    isRead: false
  },
  {
    id: '2',
    title: 'Visit Scheduled',
    message: 'Property visit scheduled for Whitefield villa on Jan 24',
    type: 'success',
    timestamp: '2024-01-19T15:45:00Z',
    isRead: true
  }
];

// Clients
export const mockClients: Client[] = [
  { id: 'c1', name: 'Amit Sharma', email: 'amit@example.com', phone: '+91 90000 00001', avatar: '', propertyIds: ['1'] },
  { id: 'c2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 90000 00002', avatar: '', propertyIds: ['2'] },
  { id: 'c3', name: 'Tech Solutions Ltd', email: 'contact@techsolutions.com', phone: '+91 90000 00003', avatar: '', propertyIds: ['3'] },
];

export const mockContracts: Contract[] = [
  { id: 'ct1', clientId: 'c1', propertyId: '1', name: 'Listing Agreement - Bandra West', uploadDate: '2024-01-10' },
  { id: 'ct2', clientId: 'c2', propertyId: '2', name: 'Exclusive Agency Agreement - Whitefield Villa', uploadDate: '2024-01-12' },
];