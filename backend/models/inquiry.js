const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  contact: {
    type: String,
    required: [true, 'Contact is required'],
    trim: true
  },
  source: {
    type: String,
    enum: ['Website', 'WhatsApp', 'Email', 'Referral'],
    required: [true, 'Source is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Closed'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inquiry', inquirySchema);