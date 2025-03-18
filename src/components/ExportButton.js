'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import { useSignature } from '../contexts/SignatureContext';

export default function ExportButton({ signatureRef }) {
  const [exporting, setExporting] = useState(false);
  const { formData } = useSignature();
  
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
        scale: 3, // Higher scale for better quality
        logging: false,
        useCORS: true, // Enable CORS for external images
        allowTaint: true,
        onclone: (clonedDoc) => {
          // Make sure @ symbol styling is preserved
          const atSymbols = clonedDoc.querySelectorAll('.at-symbol');
          atSymbols.forEach(symbol => {
            // Reinforce the styling in the cloned document
            symbol.style.fontFamily = 'AtSymbolFont, Arial, sans-serif';
            symbol.style.letterSpacing = '0.02em';
            symbol.style.fontSize = '1.05em';
            // Add any other styles you want to reinforce
          });
          
          // Apply additional styling if needed
          const allElements = clonedDoc.querySelectorAll('.signature-wrapper *');
          allElements.forEach(el => {
            if (el.style) {
              el.style.WebkitFontSmoothing = 'antialiased';
              el.style.MozOsxFontSmoothing = 'grayscale';
              el.style.textRendering = 'optimizeLegibility';
            }
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
