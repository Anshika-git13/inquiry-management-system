import React, { useState } from 'react';
import { createInquiry } from '../services/api';
import './inquiryForm.css';

function InquiryForm({ onInquiryAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    source: 'Website',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSuccess(false);

    if (!validate()) {
      return;
    }

    try {
      await createInquiry(formData);
      setSuccess(true);
      setFormData({
        name: '',
        contact: '',
        source: 'Website',
        message: ''
      });
      onInquiryAdded();
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setSubmitError(error.response?.data?.error || 'Failed to submit inquiry');
    }
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      {success && (
        <div className="success-message">Inquiry submitted successfully!</div>
      )}
      
      {submitError && (
        <div className="error-message">{submitError}</div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="contact">Contact (Email/Phone) *</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className={errors.contact ? 'error' : ''}
        />
        {errors.contact && <span className="error-text">{errors.contact}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="source">Source *</label>
        <select
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
        >
          <option value="Website">Website</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Email">Email</option>
          <option value="Referral">Referral</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className={errors.message ? 'error' : ''}
        ></textarea>
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>

      <button type="submit" className="submit-btn">Submit Inquiry</button>
    </form>
  );
}

export default InquiryForm;