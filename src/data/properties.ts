export interface Property {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
  images: string[];
  verified: boolean;
  riblScore: string;
  urgent?: boolean;
  description: string;
  amenities: string[];
  nearbyPlaces: { name: string; distance: string; type: string }[];
  priceHistory: { month: string; price: number }[];
  agent: {
    name: string;
    rating: number;
    experience: string;
    phone: string;
    image: string;
  };
  specifications: {
    propertyType: string;
    facing: string;
    floor: string;
    totalFloors: string;
    age: string;
    furnishing: string;
    parking: number;
  };
  legalInfo: {
    approvals: string[];
    rera: string;
    ownership: string;
  };
  projectInfo?: {
    projectTitle: string;
    builderName: string;
    fullLocation: string;
    priceRange: string;
    pricePerSqft: string;
    emiFrom: string;
    projectArea: string;
    buildings: number;
    units: number;
    sizes: string;
    configurations: string;
    launchDate: string;
    possessionDate: string;
  };
  developer?: {
    name: string;
    established: string;
    experience: string;
    logo?: string;
    description: string;
    notableProjects: string[];
    certifications: string[];
  };
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Sattva Vasanta Skye",
    price: "₹83.47 L – ₹2.45 Cr",
    originalPrice: "₹2.8 Cr",
    location: "Devanahalli, North Bangalore",
    beds: 3,
    baths: 2,
    area: "1,200 sq ft",
    image: "https://images.unsplash.com/photo-1664892798972-079f15663b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTY3OTY5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1664892798972-079f15663b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTY3OTY5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1648147870253-c45f6f430528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGludGVyaW9yJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTY3NDkyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1635108199395-8cd24af60af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjBleHRlcmlvcnxlbnwxfHx8fDE3NTY3OTY5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    verified: true,
    riblScore: "A+",
    description: "Experience luxury living in this meticulously designed residential project located strategically on Bellary Road with direct connectivity to the International Airport. This premium development offers world-class amenities, sustainable features like rainwater harvesting and solar heating, and modern living spaces designed for the discerning homebuyer seeking both comfort and convenience.",
    amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Covered Parking", "Landscaped Gardens", "High-Speed WiFi", "Power Backup", "High-Speed Elevators", "Rainwater Harvesting", "Solar Water Heating", "Children's Play Area", "Jogging Track"],
    nearbyPlaces: [
      { name: "Kempegowda International Airport", distance: "5 min", type: "transport" },
      { name: "Devanahalli Business Park", distance: "2 km", type: "business" },
      { name: "Aster CMI Hospital", distance: "3 km", type: "hospital" },
      { name: "Ryan International School", distance: "1.5 km", type: "school" },
      { name: "Nandi Hills", distance: "15 km", type: "recreation" },
      { name: "Devanahalli Fort", distance: "3 km", type: "heritage" }
    ],
    priceHistory: [
      { month: "Jan", price: 1.15 },
      { month: "Feb", price: 1.18 },
      { month: "Mar", price: 1.22 },
      { month: "Apr", price: 1.20 }
    ],
    agent: {
      name: "Rajesh Kumar",
      rating: 4.8,
      experience: "8 years",
      phone: "+91 98765 43210",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    specifications: {
      propertyType: "Apartment",
      facing: "North-East",
      floor: "Various Floors",
      totalFloors: "25 Floors",
      age: "Under Construction",
      furnishing: "Semi-Furnished",
      parking: 2
    },
    legalInfo: {
      approvals: ["RERA Approved", "Bank Loan Available", "Clear Title"],
      rera: "PRM/KA/RERA/1251/446/PR/010119/002054",
      ownership: "Freehold"
    },
    projectInfo: {
      projectTitle: "Sattva Vasanta Skye",
      builderName: "Sattva Group",
      fullLocation: "On Bellary Road, near International Airport, Devanahalli, North Bangalore",
      priceRange: "₹83.47 L – ₹2.45 Cr",
      pricePerSqft: "₹8,500 - ₹12,000/sq.ft",
      emiFrom: "₹41.4K",
      projectArea: "15.82 acres",
      buildings: 16,
      units: 1077,
      sizes: "731–2254 sq.ft",
      configurations: "1/2/3/4 BHK",
      launchDate: "Apr 2024",
      possessionDate: "Dec 2027"
    },
    developer: {
      name: "Sattva Group",
      established: "1993",
      experience: "30+ years",
      description: "Sattva Group is one of South India's most trusted real estate developers with over three decades of experience. Known for delivering quality projects on time, the group has developed over 50 million sq.ft of residential and commercial space.",
      notableProjects: ["Sattva Luxuria - Whitefield", "Sattva Lumina - Devanahalli", "Sattva Knowledge City - Outer Ring Road"],
      certifications: ["RERA Certified", "ISO Certified"]
    }
  },
  {
    id: "2",
    title: "Prestige Lakeside Habitat",
    price: "₹1.2 Cr – ₹3.8 Cr",
    originalPrice: "₹4.2 Cr",
    location: "Whitefield, Bangalore",
    beds: 4,
    baths: 3,
    area: "2,800 sq ft",
    image: "https://images.unsplash.com/photo-1635108199395-8cd24af60af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjBleHRlcmlvcnxlbnwxfHx8fDE3NTY3OTY5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1635108199395-8cd24af60af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjBleHRlcmlvcnxlbnwxfHx8fDE3NTY3OTY5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1648147870253-c45f6f430528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGludGVyaW9yJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTY3NDkyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    verified: true,
    riblScore: "A",
    urgent: true,
    description: "Premium lakeside residential project offering stunning water views and contemporary architecture. This development features high-end finishes, integrated smart home technology, sustainable design elements, and is strategically located in Whitefield's most coveted neighborhood with excellent connectivity to major IT hubs and the airport.",
    amenities: ["Infinity Swimming Pool", "Lakeside Deck", "24/7 Security", "Valet Parking", "Smart Home Automation", "Solar Panels", "Clubhouse", "Spa & Wellness Center", "Tennis Court", "Amphitheatre", "Meditation Garden", "Concierge Services"],
    nearbyPlaces: [
      { name: "Whitefield Railway Station", distance: "1.2 km", type: "transport" },
      { name: "Phoenix MarketCity", distance: "2.5 km", type: "shopping" },
      { name: "Columbia Asia Hospital", distance: "1.8 km", type: "hospital" },
      { name: "Ryan International School", distance: "1.0 km", type: "school" },
      { name: "ITPL Tech Park", distance: "3.5 km", type: "business" },
      { name: "Varthur Lake", distance: "2.0 km", type: "recreation" }
    ],
    priceHistory: [
      { month: "Jan", price: 2.3 },
      { month: "Feb", price: 2.4 },
      { month: "Mar", price: 2.5 },
      { month: "Apr", price: 2.5 }
    ],
    agent: {
      name: "Priya Sharma",
      rating: 4.9,
      experience: "12 years",
      phone: "+91 98765 43211",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    specifications: {
      propertyType: "Apartment",
      facing: "South",
      floor: "Various Floors",
      totalFloors: "28 Floors",
      age: "Under Construction",
      furnishing: "Semi-Furnished",
      parking: 3
    },
    legalInfo: {
      approvals: ["RERA Approved", "Bank Loan Available", "Clear Title", "Khata Certificate"],
      rera: "PRM/KA/RERA/1251/446/PR/010119/002055",
      ownership: "Freehold"
    },
    projectInfo: {
      projectTitle: "Prestige Lakeside Habitat",
      builderName: "Prestige Group",
      fullLocation: "Varthur Road, Whitefield, East Bangalore",
      priceRange: "₹1.2 Cr – ₹3.8 Cr",
      pricePerSqft: "₹7,200 - ₹11,500/sq.ft",
      emiFrom: "₹58.2K",
      projectArea: "28.5 acres",
      buildings: 12,
      units: 1456,
      sizes: "890–2850 sq.ft",
      configurations: "2/3/4 BHK",
      launchDate: "Mar 2023",
      possessionDate: "Jun 2026"
    },
    developer: {
      name: "Prestige Group",
      established: "1986",
      experience: "35+ years",
      description: "Prestige Group is one of India's leading real estate developers with a strong presence across residential, commercial, retail, and hospitality sectors. The group has delivered over 280 projects spanning 150 million sq.ft.",
      notableProjects: ["Prestige Shantiniketan", "Prestige Falcon City", "Prestige Tech Park"],
      certifications: ["RERA Certified", "ISO 9001:2015", "IGBC Certified"]
    }
  },
  {
    id: "3",
    title: "Godrej Meridien",
    price: "₹65 L – ₹1.85 Cr",
    location: "Sector 106, Gurgaon",
    beds: 2,
    baths: 2,
    area: "1,100 sq ft",
    image: "https://images.unsplash.com/photo-1648147870253-c45f6f430528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGludGVyaW9yJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTY3NDkyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1648147870253-c45f6f430528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGludGVyaW9yJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTY3NDkyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    verified: true,
    riblScore: "B+",
    description: "Thoughtfully designed residential project in prime Gurgaon location on the rapidly developing Dwarka Expressway. Perfect for young professionals and growing families, offering modern amenities, green spaces, and excellent connectivity to Cyber City, IGI Airport, and Delhi NCR with future metro connectivity planned.",
    amenities: ["Fitness Center", "Gated Security", "Multi-level Parking", "100% Power Backup", "High-Speed Elevators", "Business Center", "Retail Spaces", "Food Court", "Rooftop Garden", "EV Charging Stations"],
    nearbyPlaces: [
      { name: "Dwarka Expressway", distance: "0.5 km", type: "transport" },
      { name: "Cyber City", distance: "8.2 km", type: "business" },
      { name: "Medanta Hospital", distance: "4.1 km", type: "hospital" },
      { name: "DPS School", distance: "2.5 km", type: "school" },
      { name: "IGI Airport", distance: "25 km", type: "transport" },
      { name: "Ambience Mall", distance: "6.5 km", type: "shopping" }
    ],
    priceHistory: [
      { month: "Jan", price: 0.82 },
      { month: "Feb", price: 0.83 },
      { month: "Mar", price: 0.84 },
      { month: "Apr", price: 0.85 }
    ],
    agent: {
      name: "Amit Singh",
      rating: 4.6,
      experience: "6 years",
      phone: "+91 98765 43212",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    specifications: {
      propertyType: "Apartment",
      facing: "East",
      floor: "Various Floors",
      totalFloors: "32 Floors",
      age: "Under Construction",
      furnishing: "Semi-Furnished",
      parking: 1
    },
    legalInfo: {
      approvals: ["RERA Approved", "Bank Loan Available"],
      rera: "GGM/298/2019/15",
      ownership: "Freehold"
    },
    projectInfo: {
      projectTitle: "Godrej Meridien",
      builderName: "Godrej Properties",
      fullLocation: "Sector 106, Dwarka Expressway, Gurgaon",
      priceRange: "₹65 L – ₹1.85 Cr",
      pricePerSqft: "₹5,900 - ₹8,200/sq.ft",
      emiFrom: "₹32.1K",
      projectArea: "9.8 acres",
      buildings: 8,
      units: 1050,
      sizes: "645–1850 sq.ft",
      configurations: "2/3/4 BHK",
      launchDate: "Jan 2023",
      possessionDate: "Dec 2025"
    },
    developer: {
      name: "Godrej Properties",
      established: "1990",
      experience: "30+ years",
      description: "Godrej Properties is one of India's leading real estate developers, known for innovative and sustainable developments. The company has delivered over 95 projects and developed over 67 million sq.ft of space.",
      notableProjects: ["Godrej Woodsman Estate", "Godrej Central", "Godrej Park Avenue"],
      certifications: ["RERA Certified", "IGBC Platinum", "GRIHA 5 Star"]
    }
  },
  {
    id: "4",
    title: "Lodha Serenity",
    price: "₹2.8 Cr – ₹6.5 Cr",
    location: "Kolshet Road, Thane West",
    beds: 3,
    baths: 3,
    area: "1,800 sq ft",
    image: "https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTY3NjM2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTY3NjM2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    verified: true,
    riblScore: "A+",
    description: "Premium residential towers offering world-class amenities and panoramic city views. Featuring modern architecture with sustainable design principles, excellent connectivity to Mumbai via multiple transport modes, and a prestigious address in Thane's most desirable location with easy access to business districts and recreational facilities.",
    amenities: ["Temperature Controlled Pool", "Multi-tier Security", "Automated Parking", "Premium Clubhouse", "State-of-art Gym", "DG Power Backup", "Banquet Hall", "Library", "Yoga Deck", "Senior Citizen Area", "Pet Park", "Visitor Parking"],
    nearbyPlaces: [
      { name: "Thane Railway Station", distance: "2.2 km", type: "transport" },
      { name: "Viviana Mall", distance: "1.5 km", type: "shopping" },
      { name: "Jupiter Hospital", distance: "3.0 km", type: "hospital" },
      { name: "DAV School", distance: "0.8 km", type: "school" },
      { name: "Eastern Express Highway", distance: "1.0 km", type: "transport" },
      { name: "Upvan Lake", distance: "2.5 km", type: "recreation" }
    ],
    priceHistory: [
      { month: "Jan", price: 3.6 },
      { month: "Feb", price: 3.7 },
      { month: "Mar", price: 3.8 },
      { month: "Apr", price: 3.8 }
    ],
    agent: {
      name: "Neha Patel",
      rating: 4.7,
      experience: "10 years",
      phone: "+91 98765 43213",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    specifications: {
      propertyType: "Apartment",
      facing: "North",
      floor: "Various Floors",
      totalFloors: "42 Floors",
      age: "Ready to Move",
      furnishing: "Semi-Furnished",
      parking: 2
    },
    legalInfo: {
      approvals: ["RERA Approved", "Bank Loan Available", "Clear Title", "OC Received"],
      rera: "P51700000456",
      ownership: "Freehold"
    },
    projectInfo: {
      projectTitle: "Lodha Serenity",
      builderName: "Lodha Group",
      fullLocation: "Kolshet Road, Thane West, Mumbai",
      priceRange: "₹2.8 Cr – ₹6.5 Cr",
      pricePerSqft: "₹15,500 - ₹18,200/sq.ft",
      emiFrom: "₹1.35L",
      projectArea: "12.2 acres",
      buildings: 6,
      units: 892,
      sizes: "1250–3200 sq.ft",
      configurations: "2/3/4 BHK",
      launchDate: "Jan 2019",
      possessionDate: "Ready to Move"
    },
    developer: {
      name: "Lodha Group",
      established: "1980",
      experience: "40+ years",
      description: "Lodha Group is India's leading real estate developer with a portfolio spanning residential, commercial, and retail developments. The group has delivered over 100 projects across Mumbai, Pune, and London.",
      notableProjects: ["World Towers", "Lodha Park", "Palava City"],
      certifications: ["RERA Certified", "IGBC Gold", "LEED Certified"]
    }
  },
  {
    id: "5",
    title: "DLF Cyber City",
    price: "₹1.5 Cr – ₹4.2 Cr",
    location: "Cyber City, Gurgaon",
    beds: 3,
    baths: 3,
    area: "1,650 sq ft",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"],
    verified: true,
    riblScore: "A+",
    description: "Premium office spaces in the heart of Cyber City with modern amenities.",
    amenities: ["High-Speed Internet", "24/7 Security", "Cafeteria", "Parking"],
    nearbyPlaces: [{name: "Metro Station", distance: "0.5 km", type: "transport"}],
    priceHistory: [{month: "Jan", price: 2.5}],
    agent: {name: "Vikram Singh", rating: 4.7, experience: "9 years", phone: "+91 98765 43214", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Office", facing: "North", floor: "Various", totalFloors: "40", age: "5 years", furnishing: "Furnished", parking: 2},
    legalInfo: {approvals: ["RERA Approved"], rera: "GGM/298/2019/16", ownership: "Leasehold"}
  },
  {
    id: "6",
    title: "Hiranandani Gardens",
    price: "₹2.1 Cr – ₹5.8 Cr",
    location: "Powai, Mumbai",
    beds: 4,
    baths: 4,
    area: "2,200 sq ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"],
    verified: true,
    riblScore: "A",
    description: "Luxury residential complex with lake views and premium amenities.",
    amenities: ["Lake View", "Swimming Pool", "Club House", "Security"],
    nearbyPlaces: [{name: "Powai Lake", distance: "0.2 km", type: "recreation"}],
    priceHistory: [{month: "Jan", price: 3.5}],
    agent: {name: "Sunita Mehta", rating: 4.8, experience: "11 years", phone: "+91 98765 43215", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "East", floor: "Various", totalFloors: "25", age: "Ready", furnishing: "Semi-Furnished", parking: 3},
    legalInfo: {approvals: ["RERA Approved"], rera: "P51700000457", ownership: "Freehold"}
  },
  {
    id: "7",
    title: "Sobha City",
    price: "₹45 L – ₹1.2 Cr",
    location: "Thanisandra, Bangalore",
    beds: 2,
    baths: 2,
    area: "980 sq ft",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"],
    verified: true,
    riblScore: "B+",
    description: "Affordable housing project with modern amenities and good connectivity.",
    amenities: ["Gym", "Playground", "Security", "Power Backup"],
    nearbyPlaces: [{name: "Manyata Tech Park", distance: "3 km", type: "business"}],
    priceHistory: [{month: "Jan", price: 0.8}],
    agent: {name: "Ravi Kumar", rating: 4.5, experience: "7 years", phone: "+91 98765 43216", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "South", floor: "Various", totalFloors: "15", age: "Under Construction", furnishing: "Unfurnished", parking: 1},
    legalInfo: {approvals: ["RERA Approved"], rera: "PRM/KA/RERA/1251/446/PR/010119/002056", ownership: "Freehold"}
  },
  {
    id: "8",
    title: "Emaar Palm Heights",
    price: "₹1.8 Cr – ₹3.5 Cr",
    location: "Sector 77, Gurgaon",
    beds: 3,
    baths: 3,
    area: "1,750 sq ft",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
    images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400"],
    verified: true,
    riblScore: "A",
    urgent: true,
    description: "Premium residential towers with world-class amenities and golf course views.",
    amenities: ["Golf Course", "Swimming Pool", "Spa", "Concierge"],
    nearbyPlaces: [{name: "Golf Course", distance: "0.1 km", type: "recreation"}],
    priceHistory: [{month: "Jan", price: 2.6}],
    agent: {name: "Deepak Sharma", rating: 4.6, experience: "8 years", phone: "+91 98765 43217", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "West", floor: "Various", totalFloors: "30", age: "Ready", furnishing: "Semi-Furnished", parking: 2},
    legalInfo: {approvals: ["RERA Approved"], rera: "GGM/298/2019/17", ownership: "Freehold"}
  },
  {
    id: "9",
    title: "Mahindra Lifespaces",
    price: "₹75 L – ₹2.1 Cr",
    location: "Baner, Pune",
    beds: 3,
    baths: 2,
    area: "1,400 sq ft",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400"],
    verified: true,
    riblScore: "A-",
    description: "Sustainable living spaces with green building features and modern design.",
    amenities: ["Solar Panels", "Rainwater Harvesting", "Gym", "Garden"],
    nearbyPlaces: [{name: "Baner IT Park", distance: "2 km", type: "business"}],
    priceHistory: [{month: "Jan", price: 1.4}],
    agent: {name: "Kavita Joshi", rating: 4.7, experience: "10 years", phone: "+91 98765 43218", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "North", floor: "Various", totalFloors: "20", age: "Under Construction", furnishing: "Semi-Furnished", parking: 2},
    legalInfo: {approvals: ["RERA Approved"], rera: "P52100000458", ownership: "Freehold"}
  },
  {
    id: "10",
    title: "Tata Housing Primanti",
    price: "₹1.2 Cr – ₹2.8 Cr",
    location: "Sector 72, Gurgaon",
    beds: 2,
    baths: 2,
    area: "1,300 sq ft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400"],
    verified: true,
    riblScore: "A",
    description: "Contemporary apartments with smart home features and premium finishes.",
    amenities: ["Smart Home", "Fitness Center", "Rooftop Garden", "Security"],
    nearbyPlaces: [{name: "Sector 54 Metro", distance: "1.5 km", type: "transport"}],
    priceHistory: [{month: "Jan", price: 2.0}],
    agent: {name: "Arjun Malhotra", rating: 4.8, experience: "9 years", phone: "+91 98765 43219", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "East", floor: "Various", totalFloors: "25", age: "Ready", furnishing: "Furnished", parking: 2},
    legalInfo: {approvals: ["RERA Approved"], rera: "GGM/298/2019/18", ownership: "Freehold"}
  },
  {
    id: "11",
    title: "Brigade Cornerstone Utopia",
    price: "₹95 L – ₹3.2 Cr",
    location: "Varthur, Bangalore",
    beds: 4,
    baths: 4,
    area: "2,100 sq ft",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400",
    images: ["https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400"],
    verified: true,
    riblScore: "A+",
    description: "Luxury residential project with resort-style amenities and lake views.",
    amenities: ["Resort Pool", "Lake View", "Spa", "Tennis Court"],
    nearbyPlaces: [{name: "Varthur Lake", distance: "0.3 km", type: "recreation"}],
    priceHistory: [{month: "Jan", price: 2.1}],
    agent: {name: "Meera Reddy", rating: 4.9, experience: "12 years", phone: "+91 98765 43220", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "South", floor: "Various", totalFloors: "35", age: "Under Construction", furnishing: "Semi-Furnished", parking: 3},
    legalInfo: {approvals: ["RERA Approved"], rera: "PRM/KA/RERA/1251/446/PR/010119/002057", ownership: "Freehold"}
  },
  {
    id: "12",
    title: "Oberoi Realty Esquire",
    price: "₹3.5 Cr – ₹8.2 Cr",
    location: "Goregaon East, Mumbai",
    beds: 4,
    baths: 5,
    area: "2,800 sq ft",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400",
    images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400"],
    verified: true,
    riblScore: "A+",
    urgent: true,
    description: "Ultra-luxury residences with panoramic city and sea views.",
    amenities: ["Infinity Pool", "Sky Lounge", "Valet Parking", "Concierge"],
    nearbyPlaces: [{name: "Malad Metro", distance: "1 km", type: "transport"}],
    priceHistory: [{month: "Jan", price: 5.8}],
    agent: {name: "Rohit Oberoi", rating: 4.9, experience: "15 years", phone: "+91 98765 43221", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "West", floor: "Various", totalFloors: "45", age: "Ready", furnishing: "Luxury Furnished", parking: 4},
    legalInfo: {approvals: ["RERA Approved"], rera: "P51700000459", ownership: "Freehold"}
  },
  {
    id: "13",
    title: "Puravankara Purva Riviera",
    price: "₹68 L – ₹1.8 Cr",
    location: "Marathahalli, Bangalore",
    beds: 2,
    baths: 2,
    area: "1,150 sq ft",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=400",
    images: ["https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=400"],
    verified: true,
    riblScore: "B+",
    description: "Well-connected residential project near IT corridor with modern amenities.",
    amenities: ["Swimming Pool", "Gym", "Children's Play Area", "Security"],
    nearbyPlaces: [{name: "Marathahalli Bridge", distance: "0.8 km", type: "transport"}],
    priceHistory: [{month: "Jan", price: 1.2}],
    agent: {name: "Sanjay Gupta", rating: 4.4, experience: "6 years", phone: "+91 98765 43222", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "North", floor: "Various", totalFloors: "18", age: "Ready", furnishing: "Semi-Furnished", parking: 1},
    legalInfo: {approvals: ["RERA Approved"], rera: "PRM/KA/RERA/1251/446/PR/010119/002058", ownership: "Freehold"}
  },
  {
    id: "14",
    title: "Shapoorji Pallonji Joyville",
    price: "₹42 L – ₹95 L",
    location: "Sector 102, Gurgaon",
    beds: 1,
    baths: 1,
    area: "650 sq ft",
    image: "https://images.unsplash.com/photo-1600607688960-e095d9d82de3?w=400",
    images: ["https://images.unsplash.com/photo-1600607688960-e095d9d82de3?w=400"],
    verified: true,
    riblScore: "B",
    description: "Affordable housing with essential amenities and good connectivity.",
    amenities: ["Basic Gym", "Security", "Power Backup", "Parking"],
    nearbyPlaces: [{name: "Dwarka Expressway", distance: "1 km", type: "transport"}],
    priceHistory: [{month: "Jan", price: 0.68}],
    agent: {name: "Pooja Agarwal", rating: 4.3, experience: "5 years", phone: "+91 98765 43223", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "East", floor: "Various", totalFloors: "12", age: "Under Construction", furnishing: "Unfurnished", parking: 1},
    legalInfo: {approvals: ["RERA Approved"], rera: "GGM/298/2019/19", ownership: "Freehold"}
  },
  {
    id: "15",
    title: "Kolte Patil Life Republic",
    price: "₹55 L – ₹1.4 Cr",
    location: "Hinjewadi, Pune",
    beds: 2,
    baths: 2,
    area: "1,050 sq ft",
    image: "https://images.unsplash.com/photo-1600607688684-c7b8b1c63e2c?w=400",
    images: ["https://images.unsplash.com/photo-1600607688684-c7b8b1c63e2c?w=400"],
    verified: true,
    riblScore: "A-",
    description: "Integrated township with schools, hospitals, and recreational facilities.",
    amenities: ["School", "Hospital", "Mall", "Sports Complex"],
    nearbyPlaces: [{name: "Hinjewadi IT Park", distance: "2.5 km", type: "business"}],
    priceHistory: [{month: "Jan", price: 0.95}],
    agent: {name: "Rahul Patil", rating: 4.6, experience: "8 years", phone: "+91 98765 43224", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "South", floor: "Various", totalFloors: "22", age: "Ready", furnishing: "Semi-Furnished", parking: 1},
    legalInfo: {approvals: ["RERA Approved"], rera: "P52100000460", ownership: "Freehold"}
  },
  {
    id: "16",
    title: "Adani Shantigram",
    price: "₹38 L – ₹85 L",
    location: "Vaishali Nagar, Ahmedabad",
    beds: 1,
    baths: 1,
    area: "580 sq ft",
    image: "https://images.unsplash.com/photo-1600607688697-4a57b5d6c5c5?w=400",
    images: ["https://images.unsplash.com/photo-1600607688697-4a57b5d6c5c5?w=400"],
    verified: true,
    riblScore: "B+",
    description: "Budget-friendly apartments with basic amenities in developing area.",
    amenities: ["Garden", "Security", "Power Backup", "Water Supply"],
    nearbyPlaces: [{name: "Vaishali Metro", distance: "1.2 km", type: "transport"}],
    priceHistory: [{month: "Jan", price: 0.61}],
    agent: {name: "Kiran Shah", rating: 4.2, experience: "4 years", phone: "+91 98765 43225", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "North", floor: "Various", totalFloors: "10", age: "Under Construction", furnishing: "Unfurnished", parking: 1},
    legalInfo: {approvals: ["RERA Approved"], rera: "PR/GJ/AHMEDABAD/AHMEDABAD CITY/RERA/PRO/2019/19/1909", ownership: "Freehold"}
  },
  {
    id: "17",
    title: "Kalpataru Paramount",
    price: "₹2.8 Cr – ₹6.5 Cr",
    location: "Thane West, Mumbai",
    beds: 3,
    baths: 3,
    area: "1,950 sq ft",
    image: "https://images.unsplash.com/photo-1600607688440-6b8b3c7b2c2c?w=400",
    images: ["https://images.unsplash.com/photo-1600607688440-6b8b3c7b2c2c?w=400"],
    verified: true,
    riblScore: "A",
    urgent: true,
    description: "Premium residential towers with excellent connectivity to Mumbai.",
    amenities: ["Clubhouse", "Swimming Pool", "Gym", "Landscaped Gardens"],
    nearbyPlaces: [{name: "Thane Station", distance: "1.8 km", type: "transport"}],
    priceHistory: [{month: "Jan", price: 4.6}],
    agent: {name: "Anita Kulkarni", rating: 4.7, experience: "11 years", phone: "+91 98765 43226", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "West", floor: "Various", totalFloors: "38", age: "Ready", furnishing: "Semi-Furnished", parking: 2},
    legalInfo: {approvals: ["RERA Approved"], rera: "P51700000461", ownership: "Freehold"}
  },
  {
    id: "18",
    title: "Nitesh Hyde Park",
    price: "₹1.1 Cr – ₹2.9 Cr",
    location: "Sarjapur Road, Bangalore",
    beds: 3,
    baths: 3,
    area: "1,580 sq ft",
    image: "https://images.unsplash.com/photo-1600607688326-f2c8b8b8b8b8?w=400",
    images: ["https://images.unsplash.com/photo-1600607688326-f2c8b8b8b8b8?w=400"],
    verified: true,
    riblScore: "A-",
    description: "Modern apartments with tech-enabled features and green spaces.",
    amenities: ["Tech Hub", "Co-working Space", "Organic Garden", "EV Charging"],
    nearbyPlaces: [{name: "Sarjapur IT Corridor", distance: "1.5 km", type: "business"}],
    priceHistory: [{month: "Jan", price: 2.0}],
    agent: {name: "Suresh Babu", rating: 4.5, experience: "7 years", phone: "+91 98765 43227", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "East", floor: "Various", totalFloors: "28", age: "Under Construction", furnishing: "Smart Furnished", parking: 2},
    legalInfo: {approvals: ["RERA Approved"], rera: "PRM/KA/RERA/1251/446/PR/010119/002059", ownership: "Freehold"}
  },
  {
    id: "19",
    title: "Runwal Elegante",
    price: "₹1.8 Cr – ₹4.2 Cr",
    location: "Andheri West, Mumbai",
    beds: 2,
    baths: 2,
    area: "1,280 sq ft",
    image: "https://images.unsplash.com/photo-1600607688112-2c2c2c2c2c2c?w=400",
    images: ["https://images.unsplash.com/photo-1600607688112-2c2c2c2c2c2c?w=400"],
    verified: true,
    riblScore: "A",
    description: "Contemporary living spaces in prime Mumbai location with metro connectivity.",
    amenities: ["Metro Connectivity", "Shopping Mall", "Multiplex", "Food Court"],
    nearbyPlaces: [{name: "Andheri Metro", distance: "0.3 km", type: "transport"}],
    priceHistory: [{month: "Jan", price: 3.0}],
    agent: {name: "Priyanka Jain", rating: 4.8, experience: "9 years", phone: "+91 98765 43228", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "North", floor: "Various", totalFloors: "32", age: "Ready", furnishing: "Premium Furnished", parking: 2},
    legalInfo: {approvals: ["RERA Approved"], rera: "P51700000462", ownership: "Freehold"}
  },
  {
    id: "20",
    title: "Ashiana Rangoli Gardens",
    price: "₹28 L – ₹65 L",
    location: "Sector 95, Gurgaon",
    beds: 1,
    baths: 1,
    area: "485 sq ft",
    image: "https://images.unsplash.com/photo-1600607687998-1c1c1c1c1c1c?w=400",
    images: ["https://images.unsplash.com/photo-1600607687998-1c1c1c1c1c1c?w=400"],
    verified: true,
    riblScore: "B",
    description: "Affordable housing project for first-time homebuyers with essential amenities.",
    amenities: ["Community Hall", "Children's Park", "Security", "Water Supply"],
    nearbyPlaces: [{name: "NH-8", distance: "2 km", type: "transport"}],
    priceHistory: [{month: "Jan", price: 0.46}],
    agent: {name: "Manish Agarwal", rating: 4.1, experience: "3 years", phone: "+91 98765 43229", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"},
    specifications: {propertyType: "Apartment", facing: "South", floor: "Various", totalFloors: "8", age: "Ready", furnishing: "Unfurnished", parking: 1},
    legalInfo: {approvals: ["RERA Approved"], rera: "GGM/298/2019/20", ownership: "Freehold"}
  }
];

// Sample data for additional properties to demonstrate the comprehensive layout
export const sampleProjectData = {
  highlights: [
    "Privacy spacing between towers ensuring maximum natural light and ventilation",
    "Double-glazed windows for noise reduction and energy efficiency", 
    "1-acre clubhouse with premium amenities and recreational facilities",
    "50+ world-class amenities including swimming pool, gym, and sports facilities",
    "Rain-fed water body for sustainable water management",
    "5-minute access to Kempegowda International Airport"
  ],
  floorPlans: [
    { type: "1BHK", priceRange: "₹45L - ₹65L", area: "650-950 sq.ft SBA" },
    { type: "2BHK", priceRange: "₹75L - ₹1.2Cr", area: "950-1350 sq.ft SBA" },
    { type: "3BHK", priceRange: "₹1.2Cr - ₹2.1Cr", area: "1350-1850 sq.ft SBA" },
    { type: "4BHK", priceRange: "₹2.1Cr - ₹2.8Cr", area: "1850-2254 sq.ft SBA" }
  ],
  amenitiesList: [
    { icon: '🏊', name: 'Swimming Pool' },
    { icon: '💪', name: 'Gymnasium' },
    { icon: '🎭', name: 'Amphitheatre' },
    { icon: '🎮', name: "Children's Play Area" },
    { icon: '🏛️', name: 'Clubhouse' },
    { icon: '⚡', name: 'Power Backup' },
    { icon: '💧', name: 'Rainwater Harvesting' },
    { icon: '🚗', name: 'Covered Parking' },
    { icon: '🌳', name: 'Landscaped Gardens' },
    { icon: '🔒', name: '24/7 Security' },
    { icon: '🏃', name: 'Jogging Track' },
    { icon: '🎾', name: 'Sports Courts' }
  ]
};

export { properties as default };

export function getPropertyById(id: string): Property | undefined {
  return properties.find(property => property.id === id);
}