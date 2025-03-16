'use client';

import { useState } from 'react';
import { useSignature } from '../contexts/SignatureContext';

export default function AdminPanel() {
  const { adminSettings, updateAdminSettings } = useSignature();
  const [newLogo, setNewLogo] = useState({ value: '', label: '' });
  const [fontUrls, setFontUrls] = useState({
    regular: adminSettings.fontUrls.regular,
    medium: adminSettings.fontUrls.medium,
    bold: adminSettings.fontUrls.bold,
  });

  // Font weight options
  const fontWeightOptions = [
    { value: 300, label: 'Light' },
    { value: 400, label: 'Regular' },
    { value: 500, label: 'Medium' },
    { value: 600, label: 'Semi Bold' },
    { value: 700, label: 'Bold' },
    { value: 800, label: 'Extra Bold' }
  ];

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    updateAdminSettings({ [name]: parseInt(value, 10) });
  };

  const handleFontWeightChange = (e) => {
    const { name, value } = e.target;
    updateAdminSettings({ [name]: parseInt(value, 10) });
  };

  const handleFontUrlsUpdate = () => {
    updateAdminSettings({ fontUrls });
    alert('Font URLs updated!');
  };

  const handleLogoInputChange = (e) => {
    const { name, value } = e.target;
    setNewLogo({ ...newLogo, [name]: value });
  };

  const addLogo = () => {
    if (newLogo.value && newLogo.label) {
      const updatedLogos = [...adminSettings.logos, newLogo];
      updateAdminSettings({ logos: updatedLogos });
      setNewLogo({ value: '', label: '' });
    }
  };

  const removeLogo = (logoValue) => {
    const updatedLogos = adminSettings.logos.filter(logo => logo.value !== logoValue);
    updateAdminSettings({ logos: updatedLogos });
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* Font Weight Settings */}
      <div className="admin-section">
        <h3>Font Weight Settings</h3>
        <div className="setting-group">
          <div className="setting-item">
            <label htmlFor="fullNameWeight">Full Name</label>
            <select
              id="fullNameWeight"
              name="fullNameWeight"
              value={adminSettings.fullNameWeight}
              onChange={handleFontWeightChange}
            >
              {fontWeightOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.value})
                </option>
              ))}
            </select>
          </div>

          <div className="setting-item">
            <label htmlFor="positionWeight">Position</label>
            <select
              id="positionWeight"
              name="positionWeight"
              value={adminSettings.positionWeight}
              onChange={handleFontWeightChange}
            >
              {fontWeightOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.value})
                </option>
              ))}
            </select>
          </div>

          <div className="setting-item">
            <label htmlFor="contactWeight">Contact Info</label>
            <select
              id="contactWeight"
              name="contactWeight"
              value={adminSettings.contactWeight}
              onChange={handleFontWeightChange}
            >
              {fontWeightOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.value})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Spacing Settings */}
      <div className="admin-section">
        <h3>Spacing Settings</h3>
        <div className="setting-group">
          <div className="setting-item">
            <label htmlFor="lineSpacing">Line Spacing (px)</label>
            <input
              type="number"
              id="lineSpacing"
              name="lineSpacing"
              value={adminSettings.lineSpacing}
              onChange={handleNumberChange}
              min="0"
              max="100"
            />
          </div>

          <div className="setting-item">
            <label htmlFor="leftBuffer">Left Buffer (px)</label>
            <input
              type="number"
              id="leftBuffer"
              name="leftBuffer"
              value={adminSettings.leftBuffer}
              onChange={handleNumberChange}
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Font URL Settings */}
      <div className="admin-section">
        <h3>Font URL Settings</h3>
        <div className="setting-group" style={{ flexDirection: 'column', gap: '15px' }}>
          <div className="setting-item" style={{ width: '100%' }}>
            <label htmlFor="regularFontUrl">Regular Font URL (400)</label>
            <input
              type="text"
              id="regularFontUrl"
              value={fontUrls.regular}
              onChange={(e) => setFontUrls({...fontUrls, regular: e.target.value})}
              placeholder="https://example.com/fonts/Regular.woff2"
              style={{ width: '100%' }}
            />
          </div>
          
          <div className="setting-item" style={{ width: '100%' }}>
            <label htmlFor="mediumFontUrl">Medium Font URL (500)</label>
            <input
              type="text"
              id="mediumFontUrl"
              value={fontUrls.medium}
              onChange={(e) => setFontUrls({...fontUrls, medium: e.target.value})}
              placeholder="https://example.com/fonts/Medium.woff2"
              style={{ width: '100%' }}
            />
          </div>
          
          <div className="setting-item" style={{ width: '100%' }}>
            <label htmlFor="boldFontUrl">Bold Font URL (700)</label>
            <input
              type="text"
              id="boldFontUrl"
              value={fontUrls.bold}
              onChange={(e) => setFontUrls({...fontUrls, bold: e.target.value})}
              placeholder="https://example.com/fonts/Bold.woff2"
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ alignSelf: 'flex-start' }}>
            <button className="btn btn-secondary" onClick={handleFontUrlsUpdate}>
              Update Font URLs
            </button>
          </div>
          
          <p style={{ fontSize: '12px', color: '#666' }}>
            Add direct URLs to your font files in WOFF2 format. The fonts will be loaded dynamically.
          </p>
        </div>
      </div>

      {/* Logo Management */}
      <div className="admin-section">
        <h3>Logo Management</h3>
        <p style={{ marginBottom: '15px' }}>
          Add direct URLs to your logo images.
        </p>

        <div className="setting-group">
          <div className="setting-item">
            <label htmlFor="logoValue">Logo URL</label>
            <input
              type="text"
              id="logoValue"
              name="value"
              value={newLogo.value}
              onChange={handleLogoInputChange}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="setting-item">
            <label htmlFor="logoLabel">Display Name</label>
            <input
              type="text"
              id="logoLabel"
              name="label"
              value={newLogo.label}
              onChange={handleLogoInputChange}
              placeholder="Company Logo"
            />
          </div>

          <div className="setting-item" style={{ alignSelf: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={addLogo}>
              Add Logo
            </button>
          </div>
        </div>

        {/* Logo List */}
        <div style={{ marginTop: '20px' }}>
          <h4>Available Logos</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {adminSettings.logos.map((logo, index) => (
              <li 
                key={index} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid #eee' 
                }}
              >
                <span>{logo.label} ({logo.value})</span>
                <button 
                  onClick={() => removeLogo(logo.value)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
