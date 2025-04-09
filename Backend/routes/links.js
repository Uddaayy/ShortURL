const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Link = require('../models/Link');
const Click = require('../models/Click');

// Utility to dynamically import nanoid
const generateShortCode = async () => {
  const { nanoid } = await import('nanoid');
  return nanoid(8);
};

// POST /create - Create a new shortened link
router.post('/create', auth, async (req, res) => {
  const { originalUrl, shortCode: customCode, expireAt } = req.body;
  const userId = req.user.userId;

  try {
    let finalShortCode = customCode;

    if (customCode) {
      const existing = await Link.findOne({ shortCode: customCode });
      if (existing) {
        return res.status(400).json({ message: 'Custom short code already exists' });
      }
    } else {
      finalShortCode = await generateShortCode();
    }

    const newLink = new Link({
      userId,
      originalUrl,
      shortCode: finalShortCode,
      expireAt: expireAt ? new Date(expireAt) : null,
    });

    await newLink.save();

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${finalShortCode}`,
      originalUrl,
      expireAt,
      createdAt: newLink.createdAt,
    });
  } catch (err) {
    console.error('Link creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /analytics - Get analytics for user’s links
router.get('/analytics', auth, async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user.userId });

    const analyticsData = await Promise.all(
      links.map(async (link) => {
        const clickCount = await Click.countDocuments({ linkId: link._id });
        return {
          _id: link._id,
          shortCode: link.shortCode,
          shortUrl: `${process.env.BASE_URL}/${link.shortCode}`,
          originalUrl: link.originalUrl,
          clicks: clickCount,
          createdAt: link.createdAt,
          expireAt: link.expireAt,
        };
      })
    );

    res.json(analyticsData);
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ message: 'Server error while fetching analytics' });
  }
});

// PUT /edit/:id - Edit a link’s originalUrl or expiry
router.put('/edit/:id', auth, async (req, res) => {
  const { originalUrl, expireAt } = req.body;

  try {
    const link = await Link.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      {
        originalUrl,
        expireAt: expireAt ? new Date(expireAt) : null,
      },
      { new: true }
    );

    if (!link) {
      return res.status(404).json({ message: 'Link not found or unauthorized' });
    }

    res.json({
      message: 'Link updated successfully',
      link,
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error while updating link' });
  }
});

// DELETE /delete/:id - Delete a link
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const result = await Link.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!result) {
      return res.status(404).json({ message: 'Link not found or unauthorized' });
    }

    await Click.deleteMany({ linkId: result._id });

    res.json({ message: 'Link deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error while deleting link' });
  }
});

module.exports = router;
