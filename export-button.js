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
      // Configure html2canvas for high quality, transparent PNG
      const canvas = await html2canvas(signatureRef.current, {
        backgroundColor: null, // Transparent background
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true, // Enable CORS for external images
        allowTaint: true
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = `email-signature-${formData.fullName.replace(/\s+/g, '-').toLowerCase() || 'untitled'}.png`;
      
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
