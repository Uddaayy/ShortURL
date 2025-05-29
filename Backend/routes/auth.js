const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Hardcoded login
  const hardcoded = { email: 'intern@dacoid.com', password: 'Test123' };

  if (email === hardcoded.email && password === hardcoded.password) {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, password });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
  }

  res.status(401).json({ msg: 'Invalid credentials' });
});

module.exports = router;
