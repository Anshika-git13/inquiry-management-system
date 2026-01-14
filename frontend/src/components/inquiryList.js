import React from 'react';
import { updateInquiryStatus } from '../services/api';
import './inquiryList.css';

function InquiryList({ inquiries, onStatusUpdate }) {
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateInquiryStatus(id, newStatus);
      onStatusUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
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

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  if (inquiries.length === 0) {
    return <p className="no-inquiries">No inquiries yet.</p>;
  }

  return (
    <div className="inquiry-list-container">
      <div className="inquiry-table-wrapper">
        <table className="inquiry-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Source</th>
              <th>Message</th>
              <th>Submitted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(inquiry => (
              <tr key={inquiry._id}>
                <td className="name-cell">{inquiry.name}</td>
                <td className="contact-cell">{inquiry.contact}</td>
                <td className="source-cell">
                  <span className="source-badge">{inquiry.source}</span>
                </td>
                <td className="message-cell">
                  <div className="message-text">{inquiry.message}</div>
                </td>
                <td className="date-cell">{formatDate(inquiry.createdAt)}</td>
                <td className="status-cell">
                  <select
                    value={inquiry.status}
                    onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                    className={`status-select ${getStatusClass(inquiry.status)}`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InquiryList;