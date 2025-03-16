'use client';

import { useState } from 'react';
import { useSignature } from '../contexts/SignatureContext';

export default function AdminPanel() {
  const { adminSettings, updateAdminSettings } = useSignature();

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

  return (
    <div className="admin-panel">
      <h2>Signature Settings</h2>

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
    </div>
  );
}
