'use client';

import { useRef } from 'react';
import { useSignature } from '../contexts/SignatureContext';
import ExportButton from './ExportButton';

export default function SignaturePreview() {
  const { formData, adminSettings } = useSignature();
  const signatureRef = useRef(null);
  
  // Format email to style the @ symbol differently
  const formatEmail = (email) => {
    if (!email) return '';
    
    const parts = email.split('@');
    if (parts.length !== 2) return email; // If no @ or multiple @, return as is
    
    return (
      <>
        {parts[0]}
        <span className="at-symbol">@</span>
        {parts[1]}
      </>
    );
  };
  
  // Construct the contact line if both phone and email are provided
  const contactLine = () => {
    if (formData.phoneNumber && formData.email) {
      return (
        <>
          {formData.phoneNumber} | {formatEmail(formData.email)}
        </>
      );
    } else if (formData.phoneNumber) {
      return formData.phoneNumber;
    } else if (formData.email) {
      return formatEmail(formData.email);
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
            paddingLeft: `${adminSettings.leftBuffer}px`,
          }}
        >
          {/* Full Name */}
          {formData.fullName && (
            <div className="name-text"
              style={{
                color: '#000000',
                marginBottom: `${adminSettings.lineSpacing}px`,
              }}
            >
              {formData.fullName}
            </div>
          )}
          
          {/* Position */}
          {formData.position && (
            <div className="position-text"
              style={{
                color: 'rgba(0, 0, 0, 0.5)',
                marginBottom: `${adminSettings.lineSpacing}px`,
              }}
            >
              {formData.position}
            </div>
          )}
          
          {/* Contact Line (Phone | Email) */}
          {contactLine() && (
            <div className="contact-text"
              style={{
                color: 'rgba(0, 0, 0, 0.5)',
                marginBottom: `${adminSettings.lineSpacing}px`,
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
