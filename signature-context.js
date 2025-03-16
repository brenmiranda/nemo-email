'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const SignatureContext = createContext();

export const SignatureProvider = ({ children }) => {
  // Form data
  const [formData, setFormData] = useState({
    fullName: '',
    position: '',
    phoneNumber: '',
    email: '',
    selectedLogo: '',
  });

  // Admin settings
  const [adminSettings, setAdminSettings] = useState({
    // Font weights
    fullNameWeight: 700,
    positionWeight: 400,
    contactWeight: 400,
    
    // Spacing (in pixels)
    lineSpacing: 26,
    leftBuffer: 14,
    
    // Available logos
    logos: [
      { value: 'logo1.png', label: 'Logo 1' },
      { value: 'logo2.png', label: 'Logo 2' },
    ],
    
    // GitHub repo info for assets
    repoBaseUrl: 'https://raw.githubusercontent.com/yourusername/your-repo/main',
    
    // Font family from GitHub
    fontFamily: 'CustomFont, sans-serif',
  });

  // Load admin settings from localStorage if available
  useEffect(() => {
    const savedSettings = localStorage.getItem('signatureAdminSettings');
    if (savedSettings) {
      setAdminSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save admin settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('signatureAdminSettings', JSON.stringify(adminSettings));
  }, [adminSettings]);

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const updateAdminSettings = (newSettings) => {
    setAdminSettings({ ...adminSettings, ...newSettings });
  };

  const value = {
    formData,
    adminSettings,
    updateFormData,
    updateAdminSettings,
  };

  return (
    <SignatureContext.Provider value={value}>
      {children}
    </SignatureContext.Provider>
  );
};

export const useSignature = () => {
  const context = useContext(SignatureContext);
  if (context === undefined) {
    throw new Error('useSignature must be used within a SignatureProvider');
  }
  return context;
};
