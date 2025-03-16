'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import { useSignature } from '../contexts/SignatureContext';

export default function ExportButton({ signatureRef }) {
  const [exporting, setExporting] = useState(false);
  const { formData, adminSettings } = useSignature();
  
  // Helper function to determine font family based on weight
  const getFontFamily = (weight) => {
    if (weight >= 700) return 'CustomFontBold';
    if (weight >= 500) return 'CustomFontMedium';
    return 'CustomFontRegular';
  };
  
  const exportAsPNG = async () => {
    if (!signatureRef.current) return;
    
    setExporting(true);
    
    try {
      // Before export, we need to ensure all fonts are fully loaded
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
          // Get all the signature elements
          const fullNameEl = clonedDoc.querySelector('.name-text');
          const positionEl = clonedDoc.querySelector('.position-text');
          const contactEl = clonedDoc.querySelector('.contact-text');
          
          // Apply specific styles to ensure consistent appearance
          if (fullNameEl) {
            const fontFamily = getFontFamily(adminSettings.fullNameWeight);
            fullNameEl.style.fontFamily = `${fontFamily}, sans-serif !important`;
            fullNameEl.style.fontWeight = `${adminSettings.fullNameWeight} !important`;
          }
          
          if (positionEl) {
            const fontFamily = getFontFamily(adminSettings.positionWeight);
            positionEl.style.fontFamily = `${fontFamily}, sans-serif !important`;
            positionEl.style.fontWeight = `${adminSettings.positionWeight} !important`;
          }
          
          if (contactEl) {
            const fontFamily = getFontFamily(adminSettings.contactWeight);
            contactEl.style.fontFamily = `${fontFamily}, sans-serif !important`;
            contactEl.style.fontWeight = `${adminSettings.contactWeight} !important`;
          }
          
          // Apply additional rendering styles to all elements
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
