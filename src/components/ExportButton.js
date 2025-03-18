'use client';

import { useState } from 'react';
import domtoimage from 'dom-to-image';
import { useSignature } from '../contexts/SignatureContext';

export default function ExportButton({ signatureRef }) {
  const [exporting, setExporting] = useState(false);
  const { formData, adminSettings } = useSignature();
  
  const exportAsPNG = async () => {
    if (!signatureRef.current) return;
    
    setExporting(true);
    
    try {
      // Store original styles to restore later
      const originalStyles = {};
      const elements = {
        wrapper: signatureRef.current,
        name: signatureRef.current.querySelector('.name-text'),
        position: signatureRef.current.querySelector('.position-text'),
        contact: signatureRef.current.querySelector('.contact-text'),
        atSymbols: Array.from(signatureRef.current.querySelectorAll('.at-symbol'))
      };
      
      // Save original styles and dimensions
      const originalPosition = signatureRef.current.style.position;
      const originalWidth = signatureRef.current.style.width;
      const originalHeight = signatureRef.current.style.height;
      const originalPadding = signatureRef.current.style.padding;
      const originalMargin = signatureRef.current.style.margin;
      const originalDisplay = signatureRef.current.style.display;
      const originalPaddingLeft = signatureRef.current.style.paddingLeft;
      
      // Save element styles
      for (const [key, element] of Object.entries(elements)) {
        if (!element || (Array.isArray(element) && element.length === 0)) continue;
        
        if (Array.isArray(element)) {
          originalStyles[key] = element.map(el => ({ 
            cssText: el.style.cssText 
          }));
        } else {
          originalStyles[key] = { cssText: element.style.cssText };
        }
      }
      
      // Get the current computed dimensions
      const rect = signatureRef.current.getBoundingClientRect();
      const computedWidth = rect.width;
      const computedHeight = rect.height;
      
      // Important: Get the left buffer from settings or use default 14px
      const leftBuffer = adminSettings?.leftBuffer || 14;
      
      // Prepare the element for capture - IMPORTANT: preserve the left buffer
      signatureRef.current.style.width = `${computedWidth}px`;
      signatureRef.current.style.height = `${computedHeight}px`;
      signatureRef.current.style.padding = '0';
      signatureRef.current.style.paddingLeft = `${leftBuffer}px`; // Preserve left buffer
      signatureRef.current.style.margin = '0';
      signatureRef.current.style.display = 'inline-block';
      
      // Apply explicit styles directly to the original elements before capture
      if (elements.name) {
        elements.name.style.cssText = `
          font-family: 'CustomFontBold', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 700 !important;
          font-weight: 700 !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        `;
      }
      
      if (elements.position) {
        elements.position.style.cssText = `
          font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 400 !important;
          font-weight: 400 !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        `;
      }
      
      if (elements.contact) {
        elements.contact.style.cssText = `
          font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 400 !important;
          font-weight: 400 !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        `;
      }
      
      if (elements.atSymbols.length > 0) {
        elements.atSymbols.forEach(symbol => {
          symbol.style.cssText = `
            font-family: 'AtSymbolFont', Arial, sans-serif !important;
            font-weight: bold !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            text-rendering: optimizeLegibility !important;
          `;
        });
      }
      
      // Wait for font rendering and layout to stabilize
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use dom-to-image with specific options to capture the full element
      const dataUrl = await domtoimage.toPng(signatureRef.current, {
        quality: 1.0,
        bgcolor: null, // Transparent background
        width: computedWidth,
        height: computedHeight,
        style: {
          'transform': 'none',  // Disable any transforms during capture
          'padding-left': `${leftBuffer}px`, // Ensure left buffer is applied
        },
        filter: (node) => {
          // Make sure we capture everything, including pseudo elements
          return true;
        }
      });
      
      // Create a new image to render at higher resolution
      const img = new Image();
      img.onload = function() {
        // Create a canvas with higher resolution
        const canvas = document.createElement('canvas');
        canvas.width = computedWidth * 3;
        canvas.height = computedHeight * 3;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas with transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the image at higher resolution
        ctx.scale(3, 3);
        ctx.drawImage(img, 0, 0);
        
        // Convert to PNG and download
        const highResUrl = canvas.toDataURL('image/png', 1.0);
        
        // Create download link
        const link = document.createElement('a');
        const filename = formData.fullName 
          ? `email-signature-${formData.fullName.replace(/\s+/g, '-').toLowerCase()}.png`
          : 'email-signature.png';
        
        link.download = filename;
        link.href = highResUrl;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Restore original styles
        signatureRef.current.style.position = originalPosition;
        signatureRef.current.style.width = originalWidth;
        signatureRef.current.style.height = originalHeight;
        signatureRef.current.style.padding = originalPadding;
        signatureRef.current.style.margin = originalMargin;
        signatureRef.current.style.display = originalDisplay;
        signatureRef.current.style.paddingLeft = originalPaddingLeft;
        
        for (const [key, element] of Object.entries(elements)) {
          if (!element || (Array.isArray(element) && element.length === 0)) continue;
          
          if (Array.isArray(element)) {
            element.forEach((el, index) => {
              el.style.cssText = originalStyles[key][index].cssText;
            });
          } else {
            element.style.cssText = originalStyles[key].cssText;
          }
        }
        
        setExporting(false);
      };
      
      img.onerror = function() {
        console.error('Error loading image');
        setExporting(false);
        // Restore original styles
        signatureRef.current.style.position = originalPosition;
        signatureRef.current.style.width = originalWidth;
        signatureRef.current.style.height = originalHeight;
        signatureRef.current.style.padding = originalPadding;
        signatureRef.current.style.margin = originalMargin;
        signatureRef.current.style.display = originalDisplay;
        signatureRef.current.style.paddingLeft = originalPaddingLeft;
      };
      
      img.src = dataUrl;
      
    } catch (error) {
      console.error('Error exporting signature:', error);
      alert('Failed to export signature. Please try again.');
      setExporting(false);
    }
  };
  
  return (
    <button 
      className="btn" 
      onClick={exportAsPNG}
      disabled={exporting}
    >
      {exporting ? 'Exporting...' : 'Export as PNG'}
    </button>
  );
}
