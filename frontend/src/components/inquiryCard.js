import React, { useState } from 'react';
import { updateInquiryStatus } from '../services/api';
import './inquiryCard.css';

function InquiryCard({ inquiry, onStatusUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setIsUpdating(true);

    try {
      await updateInquiryStatus(inquiry._id, newStatus);
      onStatusUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`inquiry-card status-${inquiry.status.toLowerCase()}`}>
      <div className="card-header">
        <h3>{inquiry.name}</h3>
        <span className={`status-badge ${inquiry.status.toLowerCase()}`}>
          {inquiry.status}
        </span>
      </div>

      <div className="card-body">
        <div className="info-row">
          <strong>Contact:</strong> {inquiry.contact}
        </div>
        <div className="info-row">
          <strong>Source:</strong> {inquiry.source}
        </div>
        <div className="info-row">
          <strong>Message:</strong>
          <p className="message-text">{inquiry.message}</p>
        </div>
        <div className="info-row">
          <strong>Submitted:</strong> {formatDate(inquiry.createdAt)}
        </div>
      </div>

      <div className="card-footer">
        <label htmlFor={`status-${inquiry._id}`}>Update Status:</label>
        <select
          id={`status-${inquiry._id}`}
          value={inquiry.status}
          onChange={handleStatusChange}
          disabled={isUpdating}
          className="status-select"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    </div>
  );
}

export default InquiryCard;