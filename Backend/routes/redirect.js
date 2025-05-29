const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const Analytics = require('../models/Analytics');
const UAParser = require('ua-parser-js');

router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });

  if (!url) return res.status(404).send("Not found");

  // Expiry check
  if (url.expireAt && new Date() > url.expireAt)
    return res.status(410).send("Link expired");

  // Increment clicks
  url.clicks += 1;
  await url.save();

  // Parse user-agent
  const parser = new UAParser(req.headers['user-agent']);
  const result = parser.getResult();

  const deviceType = result.device.type || 'desktop';
  const browser = result.browser.name || 'unknown';
  const os = result.os.name || 'unknown';

  // Asynchronous analytics logging
  Analytics.create({
    urlId: url._id,
    ip: req.ip,
    device: deviceType,
    browser,
    os,
    timestamp: new Date(),
  });

  // Redirect
  res.redirect(url.originalUrl);
});

module.exports = router;
