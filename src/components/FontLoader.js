'use client';

import { useEffect, useState } from 'react';
import { useSignature } from '../contexts/SignatureContext';

export default function FontLoader() {
  const { adminSettings } = useSignature();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    // Create a style element for font-face declarations
    const style = document.createElement('style');
    
    // For variable fonts, we use a different approach - one declaration with weight range
    const fontFaces = `
      @font-face {
        font-family: 'CustomFont';
        src: url('${adminSettings.fontUrls.regular}') format('woff2-variations');
        font-weight: 100 900; /* Full range for variable fonts */
        font-style: normal;
        font-display: swap;
      }
    `;
    
    style.textContent = fontFaces;
    document.head.appendChild(style);
    
    // Add font smoothing to improve rendering
    const smoothingStyle = document.createElement('style');
    smoothingStyle.textContent = `
      .signature-wrapper, .signature-wrapper * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
    `;
    document.head.appendChild(smoothingStyle);
    
    // Add preload link for the font
    if (adminSettings.fontUrls.regular) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = adminSettings.fontUrls.regular;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }

    // Use the Font Loading API to detect when fonts are loaded
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load(`400 1em 'CustomFont'`),
        document.fonts.load(`700 1em 'CustomFont'`)
      ]).then(() => {
        setFontsLoaded(true);
        console.log('Variable font loaded successfully!');
      }).catch(err => {
        console.warn('Font loading issue:', err);
        setFontsLoaded(true);
      });
    } else {
      setFontsLoaded(true);
    }
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(style);
      document.head.removeChild(smoothingStyle);
      const preloadLink = document.querySelector('link[rel="preload"][as="font"]');
      if (preloadLink) document.head.removeChild(preloadLink);
    };
  }, [adminSettings.fontUrls]);
  
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
