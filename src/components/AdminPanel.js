'use client';

import { useState } from 'react';
import { useSignature } from '../contexts/SignatureContext';

export default function AdminPanel() {
  const { adminSettings, updateAdminSettings } = useSignature();
  const [newLogo, setNewLogo] = useState({ value: '', label: '' });
  const [repoUrl, setRepoUrl] = useState(adminSettings.repoBaseUrl);

  // Font weight options
  const fontWeightOptions = [
    { value: 400, label: 'Regular' },
    { value: 700, label: 'Bold' },
  ];

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    updateAdminSettings({ [name]: parseInt(value, 10) });
  };

  const handleFontWeightChange = (e) => {
    const { name, value } = e.target;
    updateAdminSettings({ [name]: parseInt(value, 10) });
  };

  const handleRepoUrlChange = () => {
    updateAdminSettings({ repoBaseUrl: repoUrl });
    alert('Repository URL updated!');
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

      {/* GitHub Repository Settings */}
      <div className="admin-section">
        <h3>GitHub Repository Settings</h3>
        <div className="setting-group">
          <div className="setting-item" style={{ flexBasis: '100%' }}>
            <label htmlFor="repoBaseUrl">Repository Base URL</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                id="repoBaseUrl"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://raw.githubusercontent.com/username/repo/main"
                style={{ flex: 1 }}
              />
              <button className="btn btn-secondary" onClick={handleRepoUrlChange}>
                Update
              </button>
            </div>
            <p style={{ fontSize: '12px', marginTop: '5px', color: '#666' }}>
              e.g. https://raw.githubusercontent.com/username/repo/main
            </p>
          </div>
        </div>
      </div>

      {/* Logo Management */}
      <div className="admin-section">
        <h3>Logo Management</h3>
        <p style={{ marginBottom: '15px' }}>
          Add the filenames of logos available in your GitHub repository.
        </p>

        <div className="setting-group">
          <div className="setting-item">
            <label htmlFor="logoValue">Logo Filename</label>
            <input
              type="text"
              id="logoValue"
              name="value"
              value={newLogo.value}
              onChange={handleLogoInputChange}
              placeholder="logo.png"
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
