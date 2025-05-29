const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const Analytics = require('../models/Analytics');
const useragent = require('useragent');

router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });

  if (!url) return res.status(404).send("Not found");

  if (url.expireAt && new Date() > url.expireAt)
    return res.status(410).send("Link expired");

  url.clicks += 1;
  await url.save();

  // Async logging
  const agent = useragent.parse(req.headers['user-agent']);
  Analytics.create({
    urlId: url._id,
    ip: req.ip,
    device: agent.device.toString(),
    browser: agent.toAgent(),
    os: agent.os.toString()
  });

  res.redirect(url.originalUrl);
});

module.exports = router;
