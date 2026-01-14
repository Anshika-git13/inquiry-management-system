require("dotenv").config()
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const inquiryRoutes = require('./routes/inquiryRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/inquiries', inquiryRoutes);

app.get('/', (req, res) => {
  res.send('Inquiry Management System API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});