import React, { useState, useEffect } from 'react';
import InquiryForm from './components/inquiryForm';
import InquiryList from './components/inquiryList';
import { getAllInquiries } from './services/api';
import './app.css';

function App() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const data = await getAllInquiries();
      setInquiries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleInquiryAdded = () => {
    fetchInquiries();
  };

  const handleStatusUpdate = () => {
    fetchInquiries();
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Inquiry Management System</h1>
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <h2>Submit New Inquiry</h2>
          <InquiryForm onInquiryAdded={handleInquiryAdded} />
        </section>

        <section className="list-section">
          <h2>All Inquiries</h2>
          {loading ? (
            <p>Loading inquiries...</p>
          ) : (
            <InquiryList 
              inquiries={inquiries} 
              onStatusUpdate={handleStatusUpdate}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;