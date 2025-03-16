'use client';

import { createContext, useState, useContext, useEffect } from 'react';

// Pre-defined assets - replace these URLs with your actual font and logo URLs
const FONTS = {
  regular: 'https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/fonts/RenaVF-pre-redraw.woff2',
  medium: 'https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/fonts/RenaVF-pre-redraw.woff2',
  bold: 'https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/fonts/RenaVF-pre-redraw.woff2',
};

const LOGOS = [
  { value: 'https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/logos/01%20-%20Steel%20%26%20Black.png', label: 'Primary Logo' },
  { value: 'https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/logos/02%20-%20Flat%20Logo%20%26%20Black.png', label: 'Secondary Logo' },
  { value: 'https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/logos/03%20-%20Flat%20Logo%20%26%20White.png', label: 'White on White' },
  { value: 'https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/logos/04%20-%20Steel%20%26%20White.png', label: 'Steel on White' },
];

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
    
    // Pre-defined assets
    fontFamily: 'CustomFont, sans-serif',
    fontUrls: FONTS,
    logos: LOGOS,
  });

  // Load admin settings from localStorage if available
  useEffect(() => {
    const savedSettings = localStorage.getItem('signatureAdminSettings');
    if (savedSettings) {
      // Merge saved settings with pre-defined assets
      const parsedSettings = JSON.parse(savedSettings);
      setAdminSettings({
        ...parsedSettings,
        // Always use the pre-defined assets
        fontUrls: FONTS,
        logos: LOGOS,
      });
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
