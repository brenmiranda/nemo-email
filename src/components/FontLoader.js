'use client';

import { useEffect, useState } from 'react';
import { useSignature } from '../contexts/SignatureContext';

export default function FontLoader() {
  const { adminSettings } = useSignature();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    // Create a style element for font-face declarations
    const style = document.createElement('style');
    
    // Generate @font-face rules from pre-defined font URLs
    const fontFaces = `
      @font-face {
        font-family: 'CustomFont';
        src: url('${adminSettings.fontUrls.regular}') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'CustomFont';
        src: url('${adminSettings.fontUrls.medium}') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'CustomFont';
        src: url('${adminSettings.fontUrls.bold}') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
    `;
    
    style.textContent = fontFaces;
    document.head.appendChild(style);
    
    // Add preload links for the fonts to improve loading performance
    adminSettings.fontUrls.regular && addPreloadLink(adminSettings.fontUrls.regular);
    adminSettings.fontUrls.medium && addPreloadLink(adminSettings.fontUrls.medium);
    adminSettings.fontUrls.bold && addPreloadLink(adminSettings.fontUrls.bold);

    // Use the Font Loading API to detect when fonts are loaded
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load(`400 1em 'CustomFont'`),
        document.fonts.load(`500 1em 'CustomFont'`),
        document.fonts.load(`700 1em 'CustomFont'`)
      ]).then(() => {
        setFontsLoaded(true);
        console.log('All fonts loaded successfully!');
      }).catch(err => {
        console.warn('Font loading issue:', err);
        // Still set as loaded to not block the UI
        setFontsLoaded(true);
      });
    } else {
      // If Font Loading API is not available, assume fonts will load with CSS
      setFontsLoaded(true);
    }
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(style);
      // Remove any preload links we added
      document.querySelectorAll('link[data-font-preload="true"]').forEach(link => {
        document.head.removeChild(link);
      });
    };
  }, [adminSettings.fontUrls]);
  
  // Helper function to add preload links
  const addPreloadLink = (url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.dataset.fontPreload = 'true';
    document.head.appendChild(link);
  };
  
  // This shows a loading indicator while fonts are loading
  if (!fontsLoaded) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        padding: '8px', 
        backgroundColor: '#f0f9ff', 
        color: '#0369a1',
        textAlign: 'center',
        fontSize: '14px',
        zIndex: 1000
      }}>
        Loading brand fonts...
      </div>
    );
  }
  
  return null;
}
