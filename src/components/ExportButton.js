'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import { useSignature } from '../contexts/SignatureContext';

export default function ExportButton({ signatureRef }) {
  const [exporting, setExporting] = useState(false);
  const { formData, adminSettings } = useSignature();
  
  const exportAsPNG = async () => {
    if (!signatureRef.current) return;
    
    setExporting(true);
    
    try {
      // Before export, ensure all fonts are loaded
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      
      // Configure html2canvas for high quality, transparent PNG
      const canvas = await html2canvas(signatureRef.current, {
        backgroundColor: null, // Transparent background
        scale: 4, // Higher scale for better quality
        logging: false,
        useCORS: true, // Enable CORS for external images
        allowTaint: true,
        onclone: (clonedDoc) => {
          // Get the letter spacing from admin settings
          const letterSpacing = adminSettings.letterSpacing || "-0.02em";
          
          // Apply letter spacing to all elements
          const allElements = clonedDoc.querySelectorAll('.signature-wrapper *');
          allElements.forEach(el => {
            if (el.style) {
              el.style.letterSpacing = letterSpacing;
              el.style.WebkitFontSmoothing = 'antialiased';
              el.style.MozOsxFontSmoothing = 'grayscale';
              el.style.textRendering = 'optimizeLegibility';
            }
          });
          
          // Ensure separator spacing is consistent
          const separators = clonedDoc.querySelectorAll('.signature-wrapper span[style*="margin"]');
          separators.forEach(sep => {
            sep.style.margin = '0 0.4em';
          });
          
          // Make sure @ symbol styling is preserved
          const atSymbols = clonedDoc.querySelectorAll('.at-symbol');
          atSymbols.forEach(symbol => {
            // Reinforce the styling in the cloned document
            symbol.style.fontFamily = 'AtSymbolFont, Arial, sans-serif';
            symbol.style.letterSpacing = '0.02em';
            symbol.style.fontSize = '1.05em';
          });
        }
      });
      
      // Create download link
      const link = document.createElement('a');
      const filename = formData.fullName 
        ? `email-signature-${formData.fullName.replace(/\s+/g, '-').toLowerCase()}.png`
        : 'email-signature.png';
      
      link.download = filename;
      
      // Convert to PNG with high quality
      link.href = canvas.toDataURL('image/png', 1.0);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting signature:', error);
      alert('Failed to export signature. Please try again.');
    }
    
    setExporting(false);
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
