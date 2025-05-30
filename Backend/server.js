const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const analyticsRoutes = require('./routes/analytics');
const authRoutes = require('./routes/auth');
const urlRoutes = require('./routes/url'); 
const redirectRoutes = require('./routes/redirect');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo Error", err));

app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/links', urlRoutes);   // <-- use urlRoutes for /api/links
app.use('/api/url', urlRoutes);     // (optional if you want this also)
app.use('/', redirectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
