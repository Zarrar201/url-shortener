const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection - replace with your MongoDB Atlas URI (password URL-encoded if needed)
const mongoURI = 'mongodb+srv://tanzeelurrahman2015_db_user:Musabhai%40007@cluster0.xwvhbn5.mongodb.net/?appName=Cluster0';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// URL Schema
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortId: { type: String, unique: true, default: shortid.generate },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);

// Route to shorten URLs
app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'Original URL is required' });

  // Check if URL already shortened
  let url = await Url.findOne({ originalUrl });
  if (url) {
    return res.json({
      originalUrl: url.originalUrl,
      shortUrl: `${req.protocol}://${req.get('host')}/${url.shortId}`,
      shortId: url.shortId,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });
  }

  // Create new short URL
  url = new Url({ originalUrl });
  await url.save();

  res.json({
    originalUrl: url.originalUrl,
    shortUrl: `${req.protocol}://${req.get('host')}/${url.shortId}`,
    shortId: url.shortId,
    clicks: url.clicks,
    createdAt: url.createdAt,
  });
});

// Redirect to original URL and track clicks
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });
  if (url) {
    url.clicks++;
    await url.save();
    return res.redirect(url.originalUrl);
  }
  return res.status(404).json({ error: 'URL not found' });
});

// Get all URL statistics
app.get('/stats', async (req, res) => {
  const urls = await Url.find();
  res.json(urls);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
