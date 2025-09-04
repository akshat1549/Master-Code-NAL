import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Property } from '../types';
import { properties as initialProperties } from '../data/mockData';

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'addedDate' | 'image'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const addProperty = (propertyData: Omit<Property, 'id' | 'addedDate' | 'image'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      addedDate: `Added ${new Date().toLocaleDateString()}`,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Default image
    };
    
    setProperties(prev => [newProperty, ...prev]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === id ? { ...property, ...updates } : property
      )
    );
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(property => property.id !== id));
  };

  const value: PropertyContextType = {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
