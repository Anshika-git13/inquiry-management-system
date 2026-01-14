import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const createInquiry = async (inquiryData) => {
  const response = await axios.post(`${API_BASE_URL}/inquiries`, inquiryData);
  return response.data;
};

export const getAllInquiries = async () => {
  const response = await axios.get(`${API_BASE_URL}/inquiries`);
  return response.data;
};

export const updateInquiryStatus = async (id, status) => {
  const response = await axios.patch(`${API_BASE_URL}/inquiries/${id}/status`, { status });
  return response.data;
};