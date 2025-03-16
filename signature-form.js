'use client';

import { useState } from 'react';
import { useSignature } from '../contexts/SignatureContext';
import Select from 'react-select';

export default function SignatureForm() {
  const { formData, updateFormData, adminSettings } = useSignature();
  
  // Convert the logos array to format required by react-select
  const logoOptions = adminSettings.logos.map(logo => ({
    value: logo.value,
    label: logo.label
  }));

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
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john.doe@company.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="selectedLogo">Company Logo</label>
        <Select
          id="selectedLogo"
          options={logoOptions}
          onChange={handleLogoChange}
          placeholder="Select a logo..."
          classNamePrefix="select"
        />
      </div>
    </div>
  );
}
