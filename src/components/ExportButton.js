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
      // Ensure all fonts are fully loaded before capturing
      if (window.document.fonts && window.document.fonts.ready) {
        console.log('Waiting for fonts to load...');
        await window.document.fonts.ready;
        console.log('Fonts loaded successfully');
      }
      
      // Force a small delay to ensure all styles are applied
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Configure html2canvas for high quality, transparent PNG
      const canvas = await html2canvas(signatureRef.current, {
        backgroundColor: null, // Transparent background
        scale: 4, // Higher scale for better quality
        logging: true, // Enable logging to help diagnose issues
        useCORS: true, // Enable CORS for external images
        allowTaint: true,
        onclone: (clonedDoc) => {
          console.log('Cloning document for export...');
          
          // Inject font declarations into the cloned document
          const style = clonedDoc.createElement('style');
          style.textContent = `
            @font-face {
              font-family: 'CustomFont';
              src: url('https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/fonts/Rena.woff2') format('woff2');
              font-variation-settings: "opsz" 144, "wght" 400 !important;
              font-style: normal;
              font-display: swap;
            }
            
            @font-face {
              font-family: 'CustomFontBold';
              src: url('https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/fonts/Rena.woff2') format('woff2');
              font-variation-settings: "opsz" 144, "wght" 700 !important;
              font-style: normal;
              font-display: swap;
            }
            
            @font-face {
              font-family: 'AtSymbolFont';
              src: url('https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/fonts/AlteHaasGroteskBold.woff2') format('woff2');
              font-weight: bold;
              font-style: normal;
              font-display: swap;
            }
            
            .signature-wrapper {
              font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif !important;
              font-variation-settings: "opsz" 144, "wght" 400 !important;
            }
            
            .name-text {
              font-family: 'CustomFontBold', -apple-system, BlinkMacSystemFont, sans-serif !important;
              font-variation-settings: "opsz" 144, "wght" 700 !important;
            }
            
            .at-symbol {
              font-family: 'AtSymbolFont', Arial, sans-serif !important;
              font-weight: bold !important;
              letter-spacing: -0.04em !important;
              font-size: 1em !important;
            }
          `;
          clonedDoc.head.appendChild(style);
          
          // Get the letter spacing from admin settings
          const letterSpacing = adminSettings.letterSpacing || "0.01em";
          
          // Find and style specific elements
          const nameElement = clonedDoc.querySelector('.name-text');
          const positionElement = clonedDoc.querySelector('.position-text');
          const contactElement = clonedDoc.querySelector('.contact-text');
          const atSymbols = clonedDoc.querySelectorAll('.at-symbol');
          const separatorElement = clonedDoc.querySelector('span[style*="margin"]');
          
          // Apply explicit styles to each element
          if (nameElement) {
            nameElement.style.cssText = `
              font-family: 'CustomFontBold', -apple-system, BlinkMacSystemFont, sans-serif !important;
              font-variation-settings: "opsz" 144, "wght" 700 !important;
              letter-spacing: ${letterSpacing} !important;
              color: #000000 !important;
              -webkit-font-smoothing: antialiased !important;
              -moz-osx-font-smoothing: grayscale !important;
              text-rendering: optimizeLegibility !important;
            `;
            console.log('Applied styling to name element');
          }
          
          if (positionElement) {
            positionElement.style.cssText = `
              font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif !important;
              font-variation-settings: "opsz" 144, "wght" 400 !important;
              letter-spacing: ${letterSpacing} !important;
              color: rgba(0, 0, 0, 0.5) !important;
              -webkit-font-smoothing: antialiased !important;
              -moz-osx-font-smoothing: grayscale !important;
              text-rendering: optimizeLegibility !important;
            `;
            console.log('Applied styling to position element');
          }
          
          if (contactElement) {
            contactElement.style.cssText = `
              font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif !important;
              font-variation-settings: "opsz" 144, "wght" 400 !important;
              letter-spacing: ${letterSpacing} !important;
              color: rgba(0, 0, 0, 0.5) !important;
              -webkit-font-smoothing: antialiased !important;
              -moz-osx-font-smoothing: grayscale !important;
              text-rendering: optimizeLegibility !important;
            `;
            console.log('Applied styling to contact element');
          }
          
          // Apply styling to @ symbols
          atSymbols.forEach(symbol => {
            symbol.style.cssText = `
              font-family: 'AtSymbolFont', Arial, sans-serif !important;
              font-weight: bold !important;
              letter-spacing: -0.04em !important;
              font-size: 1em !important;
            `;
            console.log('Applied styling to @ symbol');
          });
          
          // Ensure separator styling
          if (separatorElement) {
            separatorElement.style.margin = '0 0.4em';
            console.log('Applied styling to separator');
          }
          
          console.log('All elements styled in cloned document');
        }
      });
      
      console.log('Canvas rendered successfully');
      
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
      console.log('Download link created and clicked');
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
