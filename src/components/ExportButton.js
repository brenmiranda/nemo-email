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
      // Store original styles to restore later
      const originalStyles = {};
      const elements = {
        wrapper: signatureRef.current,
        name: signatureRef.current.querySelector('.name-text'),
        position: signatureRef.current.querySelector('.position-text'),
        contact: signatureRef.current.querySelector('.contact-text'),
        atSymbols: Array.from(signatureRef.current.querySelectorAll('.at-symbol'))
      };
      
      // Save original styles before modifying
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
      
      // Apply explicit styles directly to the original elements before capture
      // This helps html2canvas to see the correct styles
      if (elements.name) {
        elements.name.style.cssText = `
          font-family: 'CustomFontBold', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 700 !important;
          letter-spacing: ${adminSettings.letterSpacing || "0.01em"} !important;
          color: #000000 !important;
          margin-bottom: ${adminSettings.lineSpacing}px !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        `;
      }
      
      if (elements.position) {
        elements.position.style.cssText = `
          font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 400 !important;
          letter-spacing: ${adminSettings.letterSpacing || "0.01em"} !important;
          color: rgba(0, 0, 0, 0.5) !important;
          margin-bottom: ${adminSettings.lineSpacing}px !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        `;
      }
      
      if (elements.contact) {
        elements.contact.style.cssText = `
          font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-variation-settings: "opsz" 144, "wght" 400 !important;
          letter-spacing: ${adminSettings.letterSpacing || "0.01em"} !important;
          color: rgba(0, 0, 0, 0.5) !important;
          margin-bottom: ${adminSettings.lineSpacing}px !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        `;
      }
      
      if (elements.atSymbols.length > 0) {
        elements.atSymbols.forEach(symbol => {
          symbol.style.cssText = `
            font-family: 'AtSymbolFont', Arial, sans-serif !important;
            font-weight: bold !important;
            letter-spacing: -0.04em !important;
            font-size: 1em !important;
          `;
        });
      }
      
      // Wait for a moment to make sure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Now capture the signature with the directly applied styles
      const canvas = await html2canvas(signatureRef.current, {
        backgroundColor: null,
        scale: 4,
        logging: true,
        useCORS: true,
        allowTaint: true,
      });
      
      // Create download link
      const link = document.createElement('a');
      const filename = formData.fullName 
        ? `email-signature-${formData.fullName.replace(/\s+/g, '-').toLowerCase()}.png`
        : 'email-signature.png';
      
      link.download = filename;
      link.href = canvas.toDataURL('image/png', 1.0);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Restore original styles
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
