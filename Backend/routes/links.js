const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Link = require('../models/Link');
const Click = require('../models/Click');
const verifyToken = require('../middleware/verifyToken');

// 🔗 Create a short link
router.post('/create', verifyToken, async (req, res) => {
  const { originalUrl, shortCode } = req.body;
  if (!originalUrl || !shortCode) return res.status(400).json({ message: 'Missing fields' });

  try {
    const existing = await Link.findOne({ shortCode });
    if (existing) return res.status(409).json({ message: 'Short code already exists' });

    const newLink = new Link({
      originalUrl,
      shortCode,
      userId: req.userId,
      createdAt: new Date(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });

    await newLink.save();

    // Return full short URL along with link details
    res.status(201).json({
      ...newLink._doc,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`
    });
  } catch (err) {
    console.error('Create link error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📈 Get analytics for a specific shortCode
router.get('/analytics/:shortCode', verifyToken, async (req, res) => {
  const { shortCode } = req.params;

  try {
    const link = await Link.findOne({ shortCode, userId: req.userId });
    if (!link) return res.status(404).json({ message: 'Link not found' });

    const clicks = await Click.find({ linkId: link._id });

    const totalClicks = clicks.length;

    const clicksPerDay = {};
    clicks.forEach(click => {
      const date = new Date(click.timestamp).toISOString().split('T')[0];
      clicksPerDay[date] = (clicksPerDay[date] || 0) + 1;
    });

    const clickDetails = clicks.map(click => ({
      ip: click.ip,
      userAgent: click.userAgent,
      timestamp: click.timestamp
    }));

    res.json({
      shortCode: link.shortCode,
      originalUrl: link.originalUrl,
      totalClicks,
      clicksPerDay,
      clickDetails
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🧾 Get all links for a user with optional search/sort/filter
router.get('/', verifyToken, async (req, res) => {
  const { search = '', sort = 'createdAt', order = 'desc' } = req.query;

  const sortOptions = {};
  sortOptions[sort] = order === 'asc' ? 1 : -1;

  try {
    const links = await Link.find({
      userId: req.userId,
      $or: [
        { originalUrl: new RegExp(search, 'i') },
        { shortCode: new RegExp(search, 'i') }
      ]
    }).sort(sortOptions);

    res.json(links);
  } catch (err) {
    console.error('Fetch links error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✏️ Update a link
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { originalUrl } = req.body;

  try {
    const updated = await Link.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { originalUrl },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Link not found' });

    res.json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ❌ Delete a link
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Link.findOneAndDelete({ _id: id, userId: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Link not found' });

    await Click.deleteMany({ linkId: deleted._id });

    res.json({ message: 'Link deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🚀 Redirect route
router.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const link = await Link.findOne({ shortCode });

    if (!link) return res.status(404).send('Link not found');
    if (new Date() > link.expiryDate) return res.status(410).send('Link expired');

    const newClick = new Click({
      linkId: link._id,
      userId: link.userId,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    await newClick.save();

    res.redirect(link.originalUrl);
  } catch (err) {
    console.error('Redirect error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
