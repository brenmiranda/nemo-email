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

  // Use the logo URL directly since we're now storing full URLs
  const logoUrl = formData.selectedLogo || null;

  return (
    <div className="preview-section">
      <h2>Signature Preview</h2>
      
      <div className="signature-preview">
        <div 
          ref={signatureRef}
          className="signature-wrapper"
          style={{
            fontFamily: adminSettings.fontFamily,
            paddingLeft: `${adminSettings.leftBuffer}px`
          }}
        >
          {/* Full Name */}
          {formData.fullName && (
            <div 
              style={{
                color: '#000000',
                marginBottom: `${adminSettings.lineSpacing}px`,
                fontWeight: adminSettings.fullNameWeight
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
                fontWeight: adminSettings.positionWeight
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
                fontWeight: adminSettings.contactWeight
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
