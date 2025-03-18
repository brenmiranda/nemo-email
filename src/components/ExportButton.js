'use client';

import { useState } from 'react';
import domtoimage from 'dom-to-image';
import { useSignature } from '../contexts/SignatureContext';

export default function ExportButton({ signatureRef }) {
  const [exporting, setExporting] = useState(false);
  const { formData } = useSignature();
  
  const exportAsPNG = async () => {
    if (!signatureRef.current) return;
    
    setExporting(true);
    
    try {
      // Create a clone of the signature to modify for export
      const clone = signatureRef.current.cloneNode(true);
      
      // Style the clone for capture
      clone.style.position = 'fixed';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.zIndex = '-9999';
      clone.style.backgroundColor = 'transparent';
      
      // Add to document
      document.body.appendChild(clone);
      
      // Apply explicit font styles to the clone elements
      const nameElement = clone.querySelector('.name-text');
      const positionElement = clone.querySelector('.position-text');
      const contactElement = clone.querySelector('.contact-text');
      const atSymbols = clone.querySelectorAll('.at-symbol');
      
      if (nameElement) {
        nameElement.style.cssText = `
          font-family: 'CustomFontBold', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 700 !important;
          font-weight: 700 !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        `;
      }
      
      if (positionElement) {
        positionElement.style.cssText = `
          font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 400 !important;
          font-weight: 400 !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        `;
      }
      
      if (contactElement) {
        contactElement.style.cssText = `
          font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 400 !important;
          font-weight: 400 !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        `;
      }
      
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
      
      // Ensure separator spacing is consistent
      const separators = clone.querySelectorAll('span[style*="margin"]');
      separators.forEach(sep => {
        sep.style.margin = '0 0.4em';
      });
      
      // Get computed dimensions
      const rect = clone.getBoundingClientRect();
      const computedWidth = rect.width;
      const computedHeight = rect.height;
      
      // Wait for font rendering and layout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Capture the clone
      const dataUrl = await domtoimage.toSvg(clone, {
        width: computedWidth,
        height: computedHeight,
        style: {
          'margin': '0',
          'padding': '0',
          'background': 'transparent'
        }
      });
      
      // Remove the clone from the DOM
      document.body.removeChild(clone);
      
      // Convert SVG to high resolution PNG
      const img = new Image();
      img.onload = function() {
        // Create a high resolution canvas
        const canvas = document.createElement('canvas');
        canvas.width = computedWidth * 3;
        canvas.height = computedHeight * 3;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw image at higher resolution
        ctx.scale(3, 3);
        ctx.drawImage(img, 0, 0);
        
        // Get high res PNG
        const pngUrl = canvas.toDataURL('image/png', 1.0);
        
        // Create download link
        const link = document.createElement('a');
        const filename = formData.fullName 
          ? `email-signature-${formData.fullName.replace(/\s+/g, '-').toLowerCase()}.png`
          : 'email-signature.png';
        
        link.download = filename;
        link.href = pngUrl;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setExporting(false);
      };
      
      img.onerror = function() {
        console.error('Error loading image');
        setExporting(false);
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
