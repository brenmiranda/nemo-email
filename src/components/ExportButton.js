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
      // Clone the signature to modify for export
      const clone = signatureRef.current.cloneNode(true);
      
      // Get the left buffer
      const leftBuffer = adminSettings?.leftBuffer || 14;
      
      // Style the clone for capture
      clone.style.position = 'fixed';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.zIndex = '-9999';
      clone.style.backgroundColor = 'transparent';
      clone.style.padding = '0';
      clone.style.paddingLeft = `${leftBuffer}px`;
      clone.style.margin = '0';
      clone.style.width = 'auto';
      clone.style.height = 'auto';
      clone.style.display = 'inline-block';
      
      // Add to document body
      document.body.appendChild(clone);
      
      // Get elements from the clone
      const nameElement = clone.querySelector('.name-text');
      const positionElement = clone.querySelector('.position-text');
      const contactElement = clone.querySelector('.contact-text');
      const atSymbols = clone.querySelectorAll('.at-symbol');
      
      // Apply styling to name element (100% opacity)
      if (nameElement) {
        nameElement.style.cssText = `
          font-family: 'CustomFontBold', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 700 !important;
          font-weight: 700 !important;
          color: rgb(0, 0, 0) !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        `;
      }
      
      // Apply styling to position element with 50% opacity
      if (positionElement) {
        positionElement.style.cssText = `
          font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 400 !important;
          font-weight: 400 !important;
          color: rgb(128, 128, 128) !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        `;
      }
      
      // Apply styling to contact element with 50% opacity
      if (contactElement) {
        contactElement.style.cssText = `
          font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 400 !important;
          font-weight: 400 !important;
          color: rgb(128, 128, 128) !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        `;
      }
      
      // Apply styling to @ symbols
      if (atSymbols.length > 0) {
        atSymbols.forEach(symbol => {
          symbol.style.cssText = `
            font-family: 'AtSymbolFont', Arial, sans-serif !important;
            font-weight: bold !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            text-rendering: optimizeLegibility !important;
          `;
        });
      }
      
      // Ensure separator spacing and styling
      const separators = clone.querySelectorAll('span[style*="margin"]');
      separators.forEach(sep => {
        sep.style.margin = '0 0.4em';
        sep.style.color = 'rgba(0, 0, 0, 0.5)';
        sep.style.opacity = '0.5';
      });
      
      // Wait for font rendering and layout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get computed dimensions after adding to DOM
      const rect = clone.getBoundingClientRect();
      const computedWidth = rect.width;
      const computedHeight = rect.height;
      
      // Set explicit dimensions
      clone.style.width = `${computedWidth}px`;
      clone.style.height = `${computedHeight}px`;
      
      // Use higher quality settings for dom-to-image
      const scale = 4; // Higher scale for better quality
      
      // Use SVG as intermediate format for better quality
      const svgDataUrl = await domtoimage.toSvg(clone, {
        width: computedWidth,
        height: computedHeight,
        style: {
          'transform': 'scale(1)',
          'transform-origin': 'top left',
          'padding-left': `${leftBuffer}px`,
          'background-color': 'transparent'
        },
        quality: 1.0,
        cacheBust: true // Prevent caching issues
      });
      
      // Remove the clone from DOM
      document.body.removeChild(clone);
      
      // Convert SVG to high-res PNG
      const img = new Image();
      img.onload = function() {
        // Create a high-resolution canvas with 4x scaling
        const canvas = document.createElement('canvas');
        canvas.width = computedWidth * scale;
        canvas.height = computedHeight * scale;
        const ctx = canvas.getContext('2d');
        
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Clear canvas with transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the image at higher resolution
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        
        // Convert to high-quality PNG
        const highResPngUrl = canvas.toDataURL('image/png', 1.0);
        
        // Create download link
        const link = document.createElement('a');
        const filename = formData.fullName 
          ? `email-signature-${formData.fullName.replace(/\s+/g, '-').toLowerCase()}.png`
          : 'email-signature.png';
        
        link.download = filename;
        link.href = highResPngUrl;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setExporting(false);
      };
      
      img.onerror = function() {
        console.error('Error loading SVG image');
        setExporting(false);
      };
      
      // Set the source to the SVG data URL
      img.src = svgDataUrl;
      
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
