// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

// Seed a hardcoded user if not exists
const email = 'intern@dacoid.com';
const password = 'Test123';

User.findOne({ email }).then(async (user) => {
  if (!user) {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed });
    console.log('👤 Hardcoded user created!');
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });

  res.json({ token, userId: user._id });
});

module.exports = router;
