'use client';

import { useRef } from 'react';
import { useSignature } from '../contexts/SignatureContext';
import ExportButton from './ExportButton';

export default function SignaturePreview() {
  const { formData, adminSettings } = useSignature();
  const signatureRef = useRef(null);
  
  // Construct the contact line if both phone and email are provided
  const contactLine = () => {
    if (formData.phoneNumber && formData.email) {
      return `${formData.phoneNumber} | ${formData.email}`;
    } else if (formData.phoneNumber) {
      return formData.phoneNumber;
    } else if (formData.email) {
      return formData.email;
    }
    return '';
  };

  // Use the logo URL directly
  const logoUrl = formData.selectedLogo || null;

  return (
    <div className="preview-section">
      <h2>Signature Preview</h2>
      
      <div className="signature-preview">
        <div 
          ref={signatureRef}
          className="signature-wrapper"
          style={{
            fontFamily: `CustomFont, sans-serif !important`,
            paddingLeft: `${adminSettings.leftBuffer}px`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility'
          }}
        >
          {/* Full Name */}
          {formData.fullName && (
            <div 
              style={{
                color: '#000000',
                marginBottom: `${adminSettings.lineSpacing}px`,
                fontWeight: adminSettings.fullNameWeight,
                fontFamily: `CustomFont, sans-serif !important`,
                fontVariationSettings: `'wght' ${adminSettings.fullNameWeight}`,
                letterSpacing: '0.01em'
              }}
            >
              {formData.fullName}
            </div>
          )}
          
          {/* Position */}
          {formData.position && (
            <div 
              style={{
                color: 'rgba(0, 0, 0, 0.5)',
                marginBottom: `${adminSettings.lineSpacing}px`,
                fontWeight: adminSettings.positionWeight,
                fontFamily: `CustomFont, sans-serif !important`,
                fontVariationSettings: `'wght' ${adminSettings.positionWeight}`,
                letterSpacing: '0.01em'
              }}
            >
              {formData.position}
            </div>
          )}
          
          {/* Contact Line (Phone | Email) */}
          {contactLine() && (
            <div 
              style={{
                color: 'rgba(0, 0, 0, 0.5)',
                marginBottom: `${adminSettings.lineSpacing}px`,
                fontWeight: adminSettings.contactWeight,
                fontFamily: `CustomFont, sans-serif !important`,
                fontVariationSettings: `'wght' ${adminSettings.contactWeight}`,
                letterSpacing: '0.01em'
              }}
            >
              {contactLine()}
            </div>
          )}
          
          {/* Logo */}
          {logoUrl && (
            <div>
              <img 
                src={logoUrl} 
                alt="Company Logo" 
                style={{ maxHeight: '80px', maxWidth: '200px' }}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="export-actions">
        <ExportButton signatureRef={signatureRef} />
      </div>
    </div>
  );
}
