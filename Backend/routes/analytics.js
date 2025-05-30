const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const Url = require('../models/Url');
const mongoose = require('mongoose');

router.get('/:urlId', async (req, res) => {
  const { urlId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(urlId)) {
    return res.status(400).json({ error: 'Invalid URL ID' });
  }

  try {
    const url = await Url.findById(urlId);
    if (!url) return res.status(404).json({ error: 'URL not found' });

    // Fetch analytics data
    const allAnalytics = await Analytics.find({ urlId });

    // Aggregate clicks by date (YYYY-MM-DD)
    const clicksByDate = {};
    allAnalytics.forEach((entry) => {
      const date = entry.timestamp.toISOString().slice(0, 10);
      clicksByDate[date] = (clicksByDate[date] || 0) + 1;
    });

    // Aggregate counts by device
    const deviceCounts = {};
    allAnalytics.forEach((entry) => {
      const device = entry.device || 'Unknown';
      deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });

    // Aggregate counts by browser
    const browserCounts = {};
    allAnalytics.forEach((entry) => {
      const browser = entry.browser || 'Unknown';
      browserCounts[browser] = (browserCounts[browser] || 0) + 1;
    });

    res.json({
      clicksByDate,
      deviceCounts,
      browserCounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
