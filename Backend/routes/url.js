const express = require('express');
const router = express.Router();
const nanoid = require('nanoid').nanoid;
const Url = require('../models/Url');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/shorten', authMiddleware, async (req, res) => {
  const { originalUrl, customAlias, expireAt } = req.body;

  const shortId = customAlias || nanoid(6);
  const exists = await Url.findOne({ shortId });

  if (exists) return res.status(400).json({ msg: "Alias already taken." });

  const newUrl = new Url({
    userId: req.user,
    originalUrl,
    shortId,
    customAlias,
    expireAt
  });

  await newUrl.save();
  res.json({ shortUrl: `https://yourdomain.com/${shortId}` });
});

router.get('/my-urls', authMiddleware, async (req, res) => {
  const urls = await Url.find({ userId: req.user }).sort({ createdAt: -1 });
  res.json(urls);
});

module.exports = router;
