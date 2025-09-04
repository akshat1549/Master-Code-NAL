-- Real Estate Database Setup
CREATE DATABASE IF NOT EXISTS real_estate_db;
USE real_estate_db;

-- Main properties table with all property details
CREATE TABLE properties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    property_type ENUM('Apartment', 'Villa', 'Plot', 'Commercial') NOT NULL,
    bhk_config VARCHAR(10),
    area_sqft INT NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    description TEXT NOT NULL,
    seller_type ENUM('Owner', 'Agent', 'Company') NOT NULL,
    listing_intent ENUM('For Sale', 'For Rent', 'Urgent Sale') NOT NULL,
    enable_bidding BOOLEAN DEFAULT FALSE,
    address TEXT NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    landmark VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    beds INT,
    baths INT,
    area VARCHAR(50),
    location VARCHAR(255),
    developer_name VARCHAR(255),
    developer_established VARCHAR(50),
    developer_experience VARCHAR(100),
    rera_id VARCHAR(100),
    possession_date VARCHAR(50),
    project_area VARCHAR(100),
    buildings VARCHAR(50),
    units VARCHAR(50),
    configurations VARCHAR(100),
    launch_date VARCHAR(50),
    price_range VARCHAR(100),
    price_per_sqft VARCHAR(100),
    emi_from VARCHAR(50),
    amenities TEXT,
    nearby_places TEXT,
    media LONGBLOB,
    documents LONGBLOB,
    status ENUM('Draft', 'Active', 'Sold', 'Rented') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO properties (title, property_type, bhk_config, area_sqft, price, description, seller_type, listing_intent, address, state, city, pincode, beds, baths, area, location, developer_name, rera_id, possession_date, price_range, amenities, nearby_places) VALUES
('Luxury Villa in Gurgaon', 'Villa', '4BHK', 2500, 15000000, 'Beautiful villa with modern amenities', 'Owner', 'For Sale', '123 Sector 45', 'Haryana', 'Gurgaon', '122001', 4, 3, '2500 sq.ft', 'Sector 45, Gurgaon', 'ABC Developers', 'RERA123456', 'Ready to Move', '₹1.5Cr - ₹2Cr', 'Swimming Pool,Gym,Garden,Security', 'Metro Station:2 km,Airport:15 km,Mall:1 km');