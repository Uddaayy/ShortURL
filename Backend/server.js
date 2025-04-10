const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // move to top
dotenv.config(); // load .env at the very top before anything uses env vars

const cors = require('cors');
const authRoutes = require('./routes/auth');
const linkRoutes = require('./routes/links');
const Link = require('./models/Link');
const Click = require('./models/Click');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);

// Redirection & Click Tracking Route
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  try {
    const link = await Link.findOne({ shortCode });
    if (!link) return res.status(404).send('<h1>404 - Short URL Not Found</h1>');

    if (link.expireAt && new Date() > link.expireAt) {
      return res.status(410).send('<h1>410 - Link Expired</h1>');
    }

    // Track click asynchronously
    const click = new Click({
      linkId: link._id,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
    click.save();

    res.redirect(link.originalUrl);
  } catch (err) {
    console.error('Redirect error:', err);
    res.status(500).send('<h1>500 - Server Error</h1>');
  }
});

// DB Connection & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
      console.log('✅ MongoDB Connected');
    });
  })
  .catch(err => console.error('DB connection error:', err));
