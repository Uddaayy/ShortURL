const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

router.get('/:id', async (req, res) => {
  try {
    const logs = await Analytics.find({ urlId: req.params.id }).sort({ timestamp: 1 });
    res.json(logs);
  } catch (err) {
    console.error('Error fetching analytics:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
