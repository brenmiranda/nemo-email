'use client';

import { useEffect, useState } from 'react';
import { useSignature } from '../contexts/SignatureContext';

export default function FontDebug() {
  const { adminSettings } = useSignature();
  const [fontStatus, setFontStatus] = useState('Checking fonts...');
  const [showDebug, setShowDebug] = useState(false);
  
  useEffect(() => {
    // Check if we can access the font loading API
    if ('fonts' in document) {
      // Try to load the fonts
      Promise.all([
        document.fonts.load(`400 1em 'CustomFont'`),
        document.fonts.load(`500 1em 'CustomFont'`),
        document.fonts.load(`700 1em 'CustomFont'`)
      ]).then(() => {
        // Check if the fonts are actually loaded
        const fontLoaded = document.fonts.check(`400 1em 'CustomFont'`);
        if (fontLoaded) {
          setFontStatus('Fonts loaded successfully! ✅');
        } else {
          setFontStatus('Font loading API reports success, but fonts are not available. Check URLs and CORS settings. ⚠️');
        }
      }).catch(err => {
        setFontStatus(`Font loading failed: ${err.message} ❌`);
      });
    } else {
      setFontStatus('Font Loading API not available in this browser. Using CSS fallback. ℹ️');
    }
  }, [adminSettings.fontUrls]);
  
  return (
    <div className="font-debug">
      <button 
        onClick={() => setShowDebug(!showDebug)} 
        style={{ 
          background: 'none',
          border: 'none',
          color: '#0284c7',
          cursor: 'pointer',
          textDecoration: 'underline',
          fontSize: '12px',
          marginTop: '10px'
        }}
      >
        {showDebug ? 'Hide Font Debug' : 'Font Issues? Debug'}
      </button>
      
      {showDebug && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px',
          backgroundColor: '#f8fafc',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          <p><strong>Font Status:</strong> {fontStatus}</p>
          
          <p style={{ marginTop: '10px' }}><strong>Font URLs:</strong></p>
          <ul style={{ marginLeft: '20px' }}>
            <li>Regular (400): {adminSettings.fontUrls.regular || 'Not set'}</li>
            <li>Medium (500): {adminSettings.fontUrls.medium || 'Not set'}</li>
            <li>Bold (700): {adminSettings.fontUrls.bold || 'Not set'}</li>
          </ul>
          
          <p style={{ marginTop: '10px' }}><strong>Font Sample:</strong></p>
          <div style={{ marginTop: '5px' }}>
            <span style={{ fontFamily: 'CustomFont, serif', fontWeight: 400 }}>
              Regular text with CustomFont
            </span>
          </div>
          <div style={{ marginTop: '5px' }}>
            <span style={{ fontFamily: 'CustomFont, serif', fontWeight: 700 }}>
              Bold text with CustomFont
            </span>
          </div>
          <div style={{ marginTop: '5px' }}>
            <span style={{ fontFamily: 'system-ui, sans-serif' }}>
              Normal text with system font (for comparison)
            </span>
          </div>
          
          <div style={{ marginTop: '10px', color: '#64748b' }}>
            <p><strong>Troubleshooting Tips:</strong></p>
            <ul style={{ marginLeft: '20px' }}>
              <li>Ensure the font URLs are accessible and have proper CORS headers</li>
              <li>Try using woff format instead of woff2 for broader compatibility</li>
              <li>Make sure your font hosts allow cross-origin requests</li>
              <li>Check browser console for any network errors related to font loading</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
