'use client';

import { useState } from 'react';
import { useSignature } from '../contexts/SignatureContext';
import Select from 'react-select';

export default function SignatureForm() {
  const { formData, updateFormData, adminSettings } = useSignature();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleLogoChange = (selectedOption) => {
    updateFormData({ selectedLogo: selectedOption.value });
  };

  return (
    <div className="form-section">
      <h2>Email Signature Information</h2>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="John Doe"
        />
      </div>

      <div className="form-group">
        <label htmlFor="position">Position</label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          placeholder="Marketing Manager"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="555.123.4567"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="jdoe@nemoind.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="selectedLogo">NEMO Logos</label>
        <Select
          id="selectedLogo"
          options={adminSettings.logos}
          onChange={handleLogoChange}
          placeholder="Select a logo..."
          classNamePrefix="select"
        />
      </div>
    </div>
  );
}
