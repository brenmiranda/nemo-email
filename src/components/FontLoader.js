'use client';

import { useEffect } from 'react';
import { useSignature } from '../contexts/SignatureContext';

export default function FontLoader() {
  const { adminSettings } = useSignature();
  
  useEffect(() => {
    // Make sure fontUrls exists before proceeding
    if (!adminSettings.fontUrls) return;
    
    // Create a style element for font-face declarations
    const style = document.createElement('style');
    
    // Generate @font-face rules from admin settings
    const fontFaces = `
      @font-face {
        font-family: 'CustomFont';
        src: url('${adminSettings.fontUrls.regular || ''}') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'CustomFont';
        src: url('${adminSettings.fontUrls.medium || ''}') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'CustomFont';
        src: url('${adminSettings.fontUrls.bold || ''}') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
    `;
    
    style.textContent = fontFaces;
    document.head.appendChild(style);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(style);
    };
  }, [adminSettings.fontUrls]);
  
  // This component doesn't render anything
  return null;
}
