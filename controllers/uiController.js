const Url = require('../models/Url');
const shortid = require('shortid');

// Render the homepage with the form
exports.renderHome = (req, res) => {
  res.render('index', { shortUrl: null, error: null });
};

// Handle the form submission
exports.handleShortenUi = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.render('index', {
      shortUrl: null,
      error: 'URL is required',
    });
  }

  try {
    const shortCode = shortid.generate();
    const newUrl = await Url.create({
      url,
      shortCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
    res.render('index', { shortUrl, error: null });
  } catch (err) {
    res.render('index', {
      shortUrl: null,
      error: 'Something went wrong',
    });
  }
};
